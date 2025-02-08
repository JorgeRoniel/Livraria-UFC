const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Cliente conectado!");

  ws.on("message", async (message) => {
    const data = JSON.parse(message);
    console.log("Pedido recebido:", data);

    if (data.action === "createOrder") {
      // Atualiza status para "Processando"
      ws.send(JSON.stringify({ orderId: data.orderId, status: "Processando" }));

      // Simula comunicação com o serviço de pagamentos
      const paymentStatus = await processPayment(data.orderId);

      // Envia status atualizado para o cliente
      ws.send(JSON.stringify({ orderId: data.orderId, status: paymentStatus }));
    }
  });

  ws.on("close", () => {
    console.log("Cliente desconectado.");
  });
});

// Simulação de pagamento (seria um outro serviço na prática)
function processPayment(orderId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% de chance de sucesso
      resolve(success ? "Efetuada" : "Falhou");
    }, 2000);
  });
}

console.log("Servidor WebSocket rodando na porta 8080...");
