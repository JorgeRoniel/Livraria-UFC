import asyncio
import grpc
import websockets
from concurrent import futures
from proto import payment_pb2, payment_pb2_grpc

# Servidor gRPC para receber notificações do servidor de pagamentos
class ServicoNotificacao(payment_pb2_grpc.PaymentNotificationServicer):
    def __init__(self, websocket_manager):
        self.websocket_manager = websocket_manager

    async def NotificarStatusPagamento(self, request, context):
        mensagem = f"Pedido {request.order_id} atualizado para status {request.status}"
        print(f"Recebido: {mensagem}")
        await self.websocket_manager.transmitir(mensagem)
        return payment_pb2.PaymentResponse(ack=True)

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

    async def transmitir(self, mensagem):
        if self.clients:
            await asyncio.wait([client.send(mensagem) for client in self.clients])

async def servidor_websocket(gerenciador):
    async with websockets.serve(gerenciador.registrar, "0.0.0.0", 8765):
        await asyncio.Future()  # Mantém o WebSocket rodando

def iniciar_grpc(gerenciador):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    payment_pb2_grpc.add_PaymentNotificationServicer_to_server(ServicoNotificacao(gerenciador), server)
    server.add_insecure_port("[::]:50051")
    server.start()
    print("Servidor gRPC rodando na porta 50051")
    server.wait_for_termination()

if __name__ == "__main__":
    gerenciador = GerenciadorWebSocket()
    loop = asyncio.get_event_loop()
    loop.create_task(servidor_websocket(gerenciador))
    iniciar_grpc(gerenciador)