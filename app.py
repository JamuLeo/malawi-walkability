from flask import Flask, jsonify
from flask_cors import CORS
import os
import sys


sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

# Import blueprints
from src.api.routes.roads import roads_bp
from src.api.routes.services import services_bp
from src.api.routes.analysis import analysis_bp

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

# Register blueprints
app.register_blueprint(roads_bp, url_prefix='/api')
app.register_blueprint(services_bp, url_prefix='/api')
app.register_blueprint(analysis_bp, url_prefix='/api')

@app.route('/')
def home():
    return jsonify({
        'message': 'Malawi Walkability Analysis API',
        'version': '1.0.0',
        'endpoints': {
            'roads': '/api/roads',
            'roads_stats': '/api/roads/stats',
            'services': '/api/services',
            'services_stats': '/api/services/stats',
            'analysis_stats': '/api/analysis/stats',
            'analysis_priorities': '/api/analysis/priorities'
        }
    })

@app.route('/health')
def health():
    return jsonify({'status': 'healthy', 'service': 'walkability-api'})

if __name__ == '__main__':
    print('=' * 50)
    print('Malawi Walkability Analysis API')
    print('=' * 50)
    print('Server: http://localhost:5000')
    print('Documentation: http://localhost:5000/')
    print('=' * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
