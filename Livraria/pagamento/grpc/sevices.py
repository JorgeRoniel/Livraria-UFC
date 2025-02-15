import grpc
import pagamento.grpc.protos.pagamento_pb2 as pagamento_pb2
import pagamento.grpc.protos.pagamento_pb2_grpc as pagamento_pb2_grpc

class NotificacaoService(pagamento_pb2_grpc.NotificacaoServiceServicer):
    def NotificarPagamento(self, request, context):
        # Enviar notificação para o servidor de notificações
        print(f"Pagamento notificado: Pedido {request.id_pedido}, Status {request.status}")
        return pagamento_pb2.NotificacaoResposta(mensagem="Notificação enviada")

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pagamento_pb2_grpc.add_NotificacaoServiceServicer_to_server(NotificacaoService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()