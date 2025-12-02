"""
Walkability Scoring Logic for Blantyre
"""

class WalkabilityScorer:
    """Scores roads based on pedestrian-friendliness"""
    
    # Road type scoring (based on OSM highway tags)
    ROAD_TYPE_SCORES = {
        'footway': 100,      # Designed for walking
        'path': 95,          # Walking paths
        'pedestrian': 90,    # Pedestrian zones
        'steps': 85,         # Stairways
        'living_street': 80, # Slow traffic
        'residential': 70,   # Residential areas
        'service': 65,       # Service roads
        'track': 60,         # Rural paths
        'unclassified': 50,  # Unknown type
        'tertiary': 40,      # Local through roads
        'secondary': 30,     # Secondary roads
        'primary': 20,       # Primary roads
        'trunk': 10,         # Major highways
        'motorway': 0        # No pedestrians
    }
    
    def score_by_road_type(self, road_type):
        """Basic scoring based on road type only"""
        road_type = str(road_type).lower() if road_type else 'unclassified'
        return self.ROAD_TYPE_SCORES.get(road_type, 50)
    
    def classify_walkability(self, score):
        """Categorize score for map coloring"""
        if score >= 80:
            return {'category': 'Excellent', 'color': '#00FF00', 'description': 'Very walkable'}
        elif score >= 60:
            return {'category': 'Good', 'color': '#90EE90', 'description': 'Walkable'}
        elif score >= 40:
            return {'category': 'Fair', 'color': '#FFFF00', 'description': 'Moderately walkable'}
        elif score >= 20:
            return {'category': 'Poor', 'color': '#FFA500', 'description': 'Difficult to walk'}
        else:
            return {'category': 'Very Poor', 'color': '#FF0000', 'description': 'Dangerous for walking'}
    
    def score_road_feature(self, feature):
        """Score a GeoJSON road feature"""
        props = feature.get('properties', {})
        road_type = props.get('highway', 'unclassified')
        
        # Start with basic road type score
        score = self.score_by_road_type(road_type)
        
        # Add extra points for sidewalks if data exists
        if props.get('sidewalk') == 'yes':
            score += 10
        if props.get('crossing') == 'yes':
            score += 5
            
        return min(score, 100)  # Cap at 100

# Create instance for easy import
walkability_scorer = WalkabilityScorer()