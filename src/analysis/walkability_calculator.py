# src/analysis/walkability_calculator.py
def calculate_walkability_scores(roads_gdf, schools_gdf, health_gdf):
    scores = []
    
    for idx, road in roads_gdf.iterrows():
        # Structural: Intersection density
        structural = calculate_intersection_density(road, roads_gdf)
        
        # Infrastructural: Road type quality
        infrastructural = score_road_infrastructure(road)
        
        # Accessibility: Service proximity
        accessibility = calculate_service_access(road, schools_gdf, health_gdf)
        
        # Combined score
        total = (structural * 0.3) + (infrastructural * 0.4) + (accessibility * 0.3)
        
        scores.append({
            'road_id': idx,
            'structural_score': structural,
            'infrastructural_score': infrastructural,
            'accessibility_score': accessibility,
            'total_score': total
        })
    
    return scores