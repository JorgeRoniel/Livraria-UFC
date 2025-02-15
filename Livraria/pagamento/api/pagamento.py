from conexao import conexao

class Pagamento:
    def __init__(self, id_pedido, id_cliente, quantidade, preco, saldo_cliente):
        self.id_pedido = id_pedido
        self.id_cliente = id_cliente
        self.quantidade = quantidade
        self.preco = preco
        self.saldo_cliente = saldo_cliente
        self.status = "pendente"

    def consultar_saldo(self, id_cliente):
        conn = conexao()
        cursor = conn.cursor()
        cursor.execute(f"SELECT balance FROM users WHERE id = {id_cliente}")
        saldo = cursor.fetchone()[0]
        conn.close()
        return saldo
    
    def processar_pagamento(self):
        saldo = self.consultar_saldo(self.id_cliente)
        if saldo >= self.preco:
            conn = conexao()
            cursor = conn.cursor()
            cursor.execute(f"UPDATE users SET balance = {saldo - self.preco} WHERE id = {self.id_cliente}")
            cursor.execute(f"UPDATE orders SET status = 'paid' WHERE id = {self.id_pedido}")
            conn.commit()
            conn.close()
            return "pago"
        return "saldo insuficiente"