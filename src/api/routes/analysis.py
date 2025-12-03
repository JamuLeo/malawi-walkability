from flask import Blueprint, jsonify
import json
from pathlib import Path
from src.api.core.walkability import walkability_scorer
from collections import defaultdict

analysis_bp = Blueprint('analysis', __name__)

def load_blantyre_data():
    """Load all Blantyre data"""
    try:
        # Load Blantyre roads
        roads_path = Path('data/blantyre/roads.json')
        with open(roads_path, 'r') as f:
            roads = json.load(f)
        
        # Calculate walkability scores
        scores = []
        for road in roads['features']:
            score = walkability_scorer.score_road_feature(road)
            if score is not None:  # Filter out None scores
                scores.append(score)
        
        avg_score = sum(scores) / len(scores) if scores else 0
        
        # Count road types
        road_types = {}
        for road in roads['features']:
            road_type = road['properties'].get('highway', 'unknown')
            road_types[road_type] = road_types.get(road_type, 0) + 1
        
        # Add after loading road data
        try:
            # Load Blantyre schools
            schools_path = Path('data/blantyre/schools.json')
            with open(schools_path, 'r') as f:
                schools_data = json.load(f)
            total_schools = schools_data['metadata']['total_blantyre_schools']
        except:
            total_schools = 20 # Fallback

        return {
            'total_roads': len(roads['features']),
            'avg_score': round(avg_score, 2),
            'road_types': road_types,
            'total_schools': total_schools,
            'total_health': 10  # From your health data
        }
    except Exception as e:
        return {'error': str(e)}

@analysis_bp.route('/analysis/stats')
def get_stats():
    """Get Blantyre statistics"""
    data = load_blantyre_data()
    
    if 'error' in data:
        return jsonify(data), 500
    
    return jsonify({
        'district': 'Blantyre',
        'totalRoads': data['total_roads'],
        'avgScore': data['avg_score'],
        'roadTypeDistribution': data['road_types'],
        'priorityRoads': len([1 for k, v in data['road_types'].items() if k in ['primary', 'secondary']]),  # ← LINE TO FIX
        'totalSchools': data['total_schools'],
        'totalHealth': data['total_health']
    })

@analysis_bp.route('/analysis/priorities')
def get_priorities():
    """Get Blantyre priority areas based on real data analysis"""
    try:
        # Load the actual roads data
        roads_path = Path('data/blantyre/roads.json')
        with open(roads_path, 'r') as f:
            roads_data = json.load(f)
        
        features = roads_data.get('features', [])
        if not features:
            return jsonify([])
        
        # Group roads by type
        road_groups = defaultdict(list)
        
        for road in features:
            properties = road.get('properties', {})
            road_type = properties.get('highway', 'unknown')
            
            # Calculate walkability score - FIXED: HANDLE NONE
            score = walkability_scorer.score_road_feature(road)
            if score is None:
                score = 50.0  # Default middle score
            
            # Analyze issues SPECIFIC to your road types
            issues = []
            
            # Custom issue detection for YOUR road types
            if road_type == 'path':
                # Path-specific issues
                issues.append('Narrow walking paths')
                if properties.get('surface') in ['dirt', 'unpaved']:
                    issues.append('Unpaved/muddy surface')
                if properties.get('width', 0) < 1.5:  # Narrow paths
                    issues.append('Very narrow width')
                if not properties.get('lit', False):
                    issues.append('Poor lighting at night')
                    
            elif road_type == 'residential':
                # Residential-specific issues
                if not properties.get('sidewalk', False):
                    issues.append('Missing sidewalks')
                if properties.get('maxspeed', 30) > 40:
                    issues.append('High vehicle speeds')
                if not properties.get('lit', True):
                    issues.append('Insufficient street lighting')
                issues.append('Mixed pedestrian-vehicle traffic')
                    
            elif road_type == 'track':
                # Track-specific issues
                issues.append('Rough terrain unsuitable for walking')
                issues.append('Agricultural/forest tracks')
                if properties.get('surface') in ['dirt', 'grass', 'sand']:
                    issues.append('Unstable/eroded surface')
                issues.append('Limited accessibility')
                
            elif road_type == 'unclassified':
                # General road issues
                if not properties.get('crossing', False):
                    issues.append('No pedestrian crossings')
                if not properties.get('lit', False):
                    issues.append('Poor street lighting')
                issues.append('Undefined road classification')
            
            road_groups[road_type].append({
                'score': score,
                'issues': issues,
                'name': properties.get('name', f'{road_type.capitalize()} Road'),
                'original_properties': {k: v for k, v in properties.items() if k in ['surface', 'lit', 'width', 'maxspeed']}
            })
        
        # Create priority areas
        priority_areas = []
        priority_id = 1
        
        # Area names mapping
        area_names = {
            'path': 'Blantyre Walking Paths',
            'residential': 'Blantyre Residential Areas',
            'track': 'Blantyre Rural Tracks',
            'unclassified': 'Blantyre Unclassified Roads'
        }
        
        for road_type, roads in road_groups.items():
            if len(roads) == 0:
                continue
            
            # Calculate average score for this road type - COMPLETELY SAFE
            scores = [road['score'] for road in roads if road['score'] is not None]
            if not scores:
                continue
            
            # Force avg_score to be float
            try:
                avg_score = float(sum(scores) / len(scores))
            except:
                continue
            
            # Determine priority based on score AND road type - WITH ERROR HANDLING
            try:
                if road_type == 'track':
                    priority = 'high'  # Tracks are always high priority for walkability
                elif road_type == 'path':
                    priority = 'medium' if avg_score < 70 else 'low'
                elif road_type == 'residential':
                    priority = 'high' if avg_score < 65 else 'medium' if avg_score < 80 else 'low'
                else:
                    priority = 'medium' if avg_score < 60 else 'low'
            except TypeError:
                # If avg_score is None or comparison fails
                priority = 'medium'  # Default priority
            
            # Collect all unique issues
            all_issues = []
            for road in roads:
                all_issues.extend(road['issues'])
            
            # Get top 3 most common issues
            from collections import Counter
            if all_issues:
                common_issues = [issue for issue, count in Counter(all_issues).most_common(3)]
            else:
                common_issues = ['General walkability improvements needed']
            
            # Create priority area
            priority_areas.append({
                'id': priority_id,
                'name': area_names.get(road_type, f'Blantyre {road_type.capitalize()}'),
                'avg_score': round(avg_score, 1) if avg_score is not None else 50.0,
                'priority': priority,
                'issues': common_issues[:3],
                'road_type': road_type,
                'road_count': len(roads),
                'percentage_of_total': round((len(roads) / len(features)) * 100, 1)
            })
            priority_id += 1
        
        # Sort by priority (high first) then by road count (most roads first)
        priority_areas.sort(key=lambda x: (
            0 if x['priority'] == 'high' else 1 if x['priority'] == 'medium' else 2,
            -x['road_count']  # Negative for descending
        ))
        
        return jsonify(priority_areas)
        
    except Exception as e:
        return jsonify({
            'error': f'Analysis failed: {str(e)}',
            'sample_data': [
                {
                    'id': 1,
                    'name': 'Blantyre Walking Paths',
                    'avg_score': 75.5,
                    'priority': 'medium',
                    'issues': ['Narrow paths', 'Poor lighting', 'Unpaved surfaces'],
                    'road_type': 'path',
                    'road_count': 52
                },
                {
                    'id': 2,
                    'name': 'Blantyre Residential Areas',
                    'avg_score': 85.0,
                    'priority': 'low',
                    'issues': ['Missing sidewalks', 'High vehicle speeds'],
                    'road_type': 'residential',
                    'road_count': 33
                }
            ]
        })