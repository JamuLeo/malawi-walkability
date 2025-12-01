from flask import Blueprint, jsonify

# Create blueprint
services_bp = Blueprint('services', __name__)

# Sample service data
sample_services = [
    {
        'id': 1,
        'name': 'Queen Elizabeth Central Hospital',
        'type': 'health',
        'coordinates': [35.012, -15.782]
    },
    {
        'id': 2,
        'name': 'Blantyre Secondary School',
        'type': 'school',
        'coordinates': [35.022, -15.792]
    }
]

@services_bp.route('/services')
def get_services():
    '''Get all services'''
    return jsonify(sample_services)

@services_bp.route('/services/<service_type>')
def get_services_by_type(service_type):
    '''Get services by type'''
    filtered = [s for s in sample_services if s['type'] == service_type]
    return jsonify(filtered)

@services_bp.route('/services/stats')
def get_service_stats():
    '''Get service statistics'''
    health_count = len([s for s in sample_services if s['type'] == 'health'])
    school_count = len([s for s in sample_services if s['type'] == 'school'])
    
    return jsonify({
        'total_services': len(sample_services),
        'health_facilities': health_count,
        'schools': school_count
    })
