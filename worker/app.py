from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime
import time
import random

app = Flask(__name__)
CORS(app)

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'worker',
        'timestamp': datetime.utcnow().isoformat()
    })

@app.route('/process', methods=['GET'])
def process_get():
    time.sleep(random.uniform(0.1, 0.5))
    
    result = {
        'message': 'Data processed by worker service',
        'processed_at': datetime.utcnow().isoformat(),
        'processing_time': round(random.uniform(10, 100), 2),
        'worker_id': os.environ.get('WORKER_ID', 'worker-1')
    }
    
    return jsonify(result)

@app.route('/process', methods=['POST'])
def process_post():
    data = request.get_json() or {}
    
    time.sleep(random.uniform(0.2, 0.8))
    
    processed_data = {
        'original': data,
        'processed': True,
        'processed_at': datetime.utcnow().isoformat(),
        'processing_time': round(random.uniform(20, 150), 2),
        'worker_id': os.environ.get('WORKER_ID', 'worker-1')
    }
    
    return jsonify(processed_data)

@app.route('/')
def index():
    return jsonify({
        'service': 'Docker Flow Worker',
        'version': '1.1.0',
        'author': 'Harsh Pardhi',
        'endpoints': {
            'health': '/health',
            'process': '/process'
        }
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
