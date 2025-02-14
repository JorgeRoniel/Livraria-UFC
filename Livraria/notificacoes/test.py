import asyncio
import websockets

async def testar_websocket():
    uri = "ws://localhost:8765"  # URL do servidor WebSocket
    async with websockets.connect(uri) as websocket:
        # Envia uma mensagem ao servidor WebSocket
        await websocket.send("Testando o WebSocket!")
        
        # Aguarda e recebe a resposta do servidor WebSocket
        resposta = await websocket.recv()
        print(f"Mensagem recebida: {resposta}")

# Executa a função assíncrona para testar
asyncio.run(testar_websocket())
