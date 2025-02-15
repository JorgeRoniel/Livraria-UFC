from psycopg2 import connect

def conexao():
    try:
        conn = connect(
            dbname="livraria_ufc",
            user="postgres",
            password="Password123#@!",
            host="postgres",
            port="5432"
        )
        return conn
    except Exception as e:
        print("Erro de conexão: ", e)
