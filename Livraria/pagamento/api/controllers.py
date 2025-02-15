from flask import Flask, request, jsonify
from pagamento.api.models import Pagamento

app = Flask(__name__)

@app.route('/pagamento', methods=['POST'])
def realizar_pagamento():
    data = request.get_json()
    pagamento = Pagamento(**data)
    resultado = pagamento.processar_pagamento()
    return jsonify({"status": resultado})

if __name__ == '__main__':
    app.run(debug=True)