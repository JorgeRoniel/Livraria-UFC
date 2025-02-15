 FROM python:3.9

 WORKDIR /app

 COPY . .

 RUN pip install grpcio grpcio-tools websockets
 

 CMD ["python", "notificacao_server.py"]