from flask import Blueprint, jsonify

# Create blueprint
analysis_bp = Blueprint('analysis', __name__)

@analysis_bp.route('/analysis/stats')
def get_stats():
    '''Get overall statistics'''
    return jsonify({
        'totalRoads': 156,
        'avgScore': 62,
        'priorityRoads': 23,
        'totalServices': 89
    })

@analysis_bp.route('/analysis/priorities')
def get_priorities():
    '''Get priority areas'''
    return jsonify([
        {
            'id': 1,
            'name': 'Mbayani Township',
            'avg_score': 28,
            'population_affected': 15000,
            'missing_services': ['schools', 'health facilities'],
            'priority': 'critical'
        },
        {
            'id': 2,
            'name': 'Ndirande Market Area',
            'avg_score': 35,
            'population_affected': 12000,
            'missing_services': ['sidewalks', 'crossings'],
            'priority': 'high'
        }
    ])
