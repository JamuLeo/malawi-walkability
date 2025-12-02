import json
from pathlib import Path

print("Filtering schools & health for Blantyre...")

# Create blantyre folder
blantyre_dir = Path('data/blantyre')
blantyre_dir.mkdir(exist_ok=True)

# Filter schools (take first 20 as test)
schools_path = Path('data/processed/schools/schools.json')
with open(schools_path, 'r') as f:
    all_schools = json.load(f)

blantyre_schools = all_schools['features'][:20]

with open(blantyre_dir / 'schools.json', 'w') as f:
    json.dump({'type': 'FeatureCollection', 'features': blantyre_schools}, f)

print(f"✅ Created data/blantyre/schools.json with {len(blantyre_schools)} schools")

# Filter health (take first 10 as test)
health_path = Path('data/processed/health/health.json')
with open(health_path, 'r') as f:
    all_health = json.load(f)

blantyre_health = all_health['features'][:10]

with open(blantyre_dir / 'health.json', 'w') as f:
    json.dump({'type': 'FeatureCollection', 'features': blantyre_health}, f)

print(f"✅ Created data/blantyre/health.json with {len(blantyre_health)} health facilities")