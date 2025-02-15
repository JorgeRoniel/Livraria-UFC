FROM python:3.9

WORKDIR /app

COPY notificacoes /app/notificacoes

COPY pagamento /app/pagamento

ENV PYTHONPATH=/app

RUN pip install grpcio grpcio-tools websockets

EXPOSE 8765

CMD ["python", "notificacoes/notificacao_server.py"]
