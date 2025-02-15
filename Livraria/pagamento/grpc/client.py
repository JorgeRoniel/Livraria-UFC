import grpc
import pagamento.grpc.protos.pagamento_pb2 as pagamento_pb2
import pagamento.grpc.protos.pagamento_pb2_grpc as pagamento_pb2_grpc

class NotificacaoClient:
    def __init__(self):
        self.channel = grpc.insecure_channel('localhost:50051')
        self.stub = pagamento_pb2_grpc.NotificacaoServiceStub(self.channel)

    def notificar_pagamento(self, id_pedido, id_cliente, valor, status):
        request = pagamento_pb2.NotificacaoRequest(id_pedido=id_pedido, id_cliente=id_cliente, valor=valor, status=status)
        response = self.stub.NotificarPagamento(request)
        print(f"Resposta do servidor: {response.mensagem}")