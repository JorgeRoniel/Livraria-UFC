# Usa uma imagem base do Python
FROM python:3.9-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo de requisitos
COPY requirements.txt requirements.txt

# Instala as dependências
RUN pip install -r requirements.txt

# Copia o restante do código da aplicação
COPY . .

# Define a variável de ambiente para o Flask
ENV FLASK_APP=/api/controllers.py

# Expõe a porta em que a aplicação Flask será executada
EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]