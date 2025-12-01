from flask import Blueprint, jsonify
import json
import os
from pathlib import Path

# Create blueprint
roads_bp = Blueprint('roads', __name__)

# Sample road data (will be replaced with real data later)
sample_roads = [
    {
        'id': 1,
        'name': 'Chileka Road',
        'walkability_score': 75,
        'safety_score': 70,
        'road_type': 'primary',
        'coordinates': [[35.01, -15.78], [35.015, -15.785]]
    },
    {
        'id': 2,
        'name': 'Glyn Jones Road',
        'walkability_score': 45,
        'safety_score': 40,
        'road_type': 'secondary',
        'coordinates': [[35.02, -15.79], [35.025, -15.795]]
    }
]

@roads_bp.route('/roads')
def get_roads():
    '''Get all road segments'''
    return jsonify(sample_roads)

@roads_bp.route('/roads/<int:road_id>')
def get_road(road_id):
    '''Get specific road by ID'''
    for road in sample_roads:
        if road['id'] == road_id:
            return jsonify(road)
    return jsonify({'error': 'Road not found'}), 404

@roads_bp.route('/roads/stats')
def get_road_stats():
    '''Get road statistics'''
    total_roads = len(sample_roads)
    avg_score = sum(r['walkability_score'] for r in sample_roads) / total_roads
    
    return jsonify({
        'total_roads': total_roads,
        'avg_walkability_score': avg_score,
        'road_types': {
            'primary': 1,
            'secondary': 1
        }
    })
