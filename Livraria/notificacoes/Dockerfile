 FROM python:3.9

 WORKDIR /app

 COPY . .

 ENV PYTHONPATH=/app/livraria

 RUN pip install grpcio grpcio-tools websockets
  
 EXPOSE 8765

 CMD ["python", "notificacao_server.py"]