class Pagamento:
    def __init__(self, id_pedido, id_cliente, quantidade, preco, saldo_cliente):
        self.id_pedido = id_pedido
        self.id_cliente = id_cliente
        self.quantidade = quantidade
        self.preco = preco
        self.saldo_cliente = saldo_cliente
        self.status = "pendente"

    def processar_pagamento(self):
        if self.saldo_cliente >= self.quantidade * self.preco:
            self.status = "pago"
            # Enviar notificação gRPC
            return "Pagamento realizado com sucesso"
        else:
            return "Saldo insuficiente"