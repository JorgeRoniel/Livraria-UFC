import asyncio
import grpc
import websockets
import json
from concurrent import futures
from pagamento.grpc.protos import pagamento_pb2, pagamento_pb2_grpc

# Servidor gRPC para receber notificações do servidor de pagamentos
class ServicoNotificacao(pagamento_pb2_grpc.NotificacaoServiceServicer):
    def __init__(self, websocket_manager):
        self.websocket_manager = websocket_manager

    async def NotificarPagamento(self, request, context):
        print(f"Recebido: Pedido {request.id_pedido}, Cliente {request.id_cliente}, "
              f"Valor R${request.valor:.2f}, Status {request.status}")
        
        await self.websocket_manager.transmitir(
            id_pedido=request.id_pedido,
            id_cliente=request.id_cliente,
            valor=request.valor,
            status=request.status
        )

        return pagamento_pb2.NotificacaoResposta(mensagem="Notificação enviada com sucesso")

# Gerenciador de WebSockets
class GerenciadorWebSocket:
    def __init__(self):
        self.clients = set()

    async def registrar(self, websocket):
        self.clients.add(websocket)
        try:
            await websocket.wait_closed()
        finally:
            self.clients.remove(websocket)

    async def transmitir(self, id_pedido, id_cliente, valor, status):
        if self.clients:
            mensagem_json = json.dumps({
                "id_pedido": id_pedido,
                "id_cliente": id_cliente,
                "valor": valor,
                "status": status
            })
            await asyncio.wait([client.send(mensagem_json) for client in self.clients])

async def servidor_websocket(gerenciador):
    async with websockets.serve(gerenciador.registrar, "0.0.0.0", 8765):
        await asyncio.Future()  # Mantém o WebSocket rodando

def iniciar_grpc(gerenciador):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pagamento_pb2_grpc.add_NotificacaoServiceServicer_to_server(ServicoNotificacao(gerenciador), server)
    server.add_insecure_port("[::]:50051")
    server.start()
    print("Servidor gRPC rodando na porta 50051")
    server.wait_for_termination()

if __name__ == "__main__":
    gerenciador = GerenciadorWebSocket()
    loop = asyncio.get_event_loop()
    
    loop.create_task(servidor_websocket(gerenciador))
    loop.create_task(asyncio.to_thread(iniciar_grpc, gerenciador))
    
    loop.run_forever()