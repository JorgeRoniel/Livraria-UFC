 FROM python:3.9

 WORKDIR /app

 COPY . .

 RUN pip install grpcio grpcio-tools websockets
 
 RUN python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. proto/payment.proto

 CMD ["python", "notificacao_server.py"]