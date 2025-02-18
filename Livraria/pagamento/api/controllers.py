from flask import Flask, request, jsonify
from flask_cors import CORS
from pagamento import Pagamento

app = Flask(__name__)

# Permite somente uma origem específica (se for outra, ajuste conforme necessário)
CORS(app, resources={r"/pagamento": {"origins": "http://localhost"}})

@app.route('/pagamento', methods=['POST'])
def realizar_pagamento():
    data = request.get_json()
    pagamento = Pagamento(**data)
    resultado = pagamento.processar_pagamento()
    return jsonify({"status": resultado})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
