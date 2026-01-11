from flask import Blueprint, jsonify
import json
from pathlib import Path

services_bp = Blueprint('services', __name__)

def load_blantyre_services():
    """Load Blantyre schools and health facilities"""
	
    try:
        # Load schools
        schools_path = Path('data/blantyre/schools.json')
        with open(schools_path, 'r') as f:
            schools = json.load(f)
        
        # Load health
        health_path = Path('data/blantyre/health.json')
        with open(health_path, 'r') as f:
            health = json.load(f)
        
        return {
            'schools': schools.get('features', []),
            'health': health.get('features', [])
        }
    except Exception as e:
        print(f"Error loading services: {e}")
        return {'schools': [], 'health': []}

@services_bp.route('/services')
def get_services():
    """Get all Blantyre services"""
    data = load_blantyre_services()
    
    # Combine schools and health
    all_services = data['schools'] + data['health']
    
    return jsonify({
        'type': 'FeatureCollection',
        'features': all_services,
        'count': len(all_services),
        'district': 'Blantyre',
        'school_count': len(data['schools']),
        'health_count': len(data['health'])
    })

@services_bp.route('/services/<service_type>')
def get_services_by_type(service_type):
    """Get Blantyre services by type"""
    data = load_blantyre_services()
    
    if service_type == 'school':
        features = data['schools']
    elif service_type == 'health':
        features = data['health']
    else:
        return jsonify({'error': 'Invalid service type. Use "school" or "health"'}), 400
    
    return jsonify({
        'type': 'FeatureCollection',
        'features': features,
        'count': len(features),
        'service_type': service_type,
        'district': 'Blantyre'
    })

@services_bp.route('/services/stats')
def get_service_stats():
    """Get Blantyre service statistics"""
    data = load_blantyre_services()
    
    return jsonify({
        'district': 'Blantyre',
        'total_services': len(data['schools']) + len(data['health']),
        'health_facilities': len(data['health']),
        'schools': len(data['schools']),
        'data_source': 'Blantyre filtered data'
    })