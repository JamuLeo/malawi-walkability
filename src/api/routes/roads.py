from flask import Blueprint, jsonify
import json
from pathlib import Path
from src.api.core.walkability import walkability_scorer

roads_bp = Blueprint('roads', __name__)

def load_blantyre_roads():
    """Load Blantyre roads data"""
    try:
        blantyre_path = Path('data/blantyre/roads.json')
        with open(blantyre_path, 'r') as f:
            data = json.load(f)
        return data.get('features', [])
    except Exception as e:
        print(f"Error loading Blantyre roads: {e}")
        return []

@roads_bp.route('/roads')
def get_roads():
    """Get Blantyre road segments with walkability scores"""
    roads = load_blantyre_roads()
    
    if not roads:
        return jsonify({'error': 'No Blantyre roads data found'}), 404
    
    scored_roads = []
    for road in roads:
        score = walkability_scorer.score_road_feature(road)
        classification = walkability_scorer.classify_walkability(score)
        
        # Add scores to properties
        road['properties']['walkability_score'] = score
        road['properties']['walkability_category'] = classification['category']
        road['properties']['color'] = classification['color']
        
        scored_roads.append(road)
    
    return jsonify({
        'type': 'FeatureCollection',
        'features': scored_roads,
        'count': len(scored_roads),
        'district': 'Blantyre',
        'message': 'Blantyre roads with walkability scores'
    })

@roads_bp.route('/roads/stats')
def get_road_stats():
    """Get Blantyre road statistics"""
    roads = load_blantyre_roads()
    
    if not roads:
        return jsonify({'error': 'No Blantyre roads data found'}), 404
    
    # Calculate scores
    scores = []
    for road in roads:
        score = walkability_scorer.score_road_feature(road)
        scores.append(score)
    
    avg_score = sum(scores) / len(scores) if scores else 0
    
    # Count road types
    road_types = {}
    for road in roads:
        road_type = road['properties'].get('highway', 'unknown')
        road_types[road_type] = road_types.get(road_type, 0) + 1
    
    return jsonify({
        'district': 'Blantyre',
        'total_roads': len(roads),
        'avg_walkability_score': round(avg_score, 2),
        'road_types': road_types,
        'data_source': 'Blantyre filtered data'
    })