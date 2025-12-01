# src/analysis/data_preprocessor.py
def extract_blantyre_data():
    # Load all Malawi data
    all_districts = gpd.read_file("data/boundaries/malawi_districts.shp")
    all_roads = gpd.read_file("data/roads/malawi_roads.shp")
    all_schools = gpd.read_file("data/schools/malawi_schools.shp")
    all_health = gpd.read_file("data/health/malawi_health.shp")
    
    # Extract Blantyre district
    blantyre_boundary = all_districts[all_districts['name'] == 'Blantyre']
    
    # Clip all datasets to Blantyre
    roads_blantyre = gpd.clip(all_roads, blantyre_boundary)
    schools_blantyre = gpd.clip(all_schools, blantyre_boundary)
    health_blantyre = gpd.clip(all_health, blantyre_boundary)
    
    return roads_blantyre, schools_blantyre, health_blantyre, blantyre_boundary