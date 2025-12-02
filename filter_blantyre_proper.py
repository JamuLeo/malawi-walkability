import json
from pathlib import Path

print("Filtering for Blantyre-only data...")

# Create blantyre folder
blantyre_dir = Path('data/blantyre')
blantyre_dir.mkdir(exist_ok=True)

# 1. Filter schools for Blantyre only
schools_path = Path('data/processed/schools/schools.json')
with open(schools_path, 'r') as f:
    all_schools = json.load(f)

blantyre_schools = []
for feature in all_schools['features']:
    props = feature.get('properties', {})
    district = props.get('district', '').lower()
    if 'blantyre' in district:
        blantyre_schools.append(feature)

print("Found", len(blantyre_schools), "Blantyre schools")

# Save first 20 for testing
with open(blantyre_dir / 'schools.json', 'w') as f:
    json.dump({
        'type': 'FeatureCollection', 
        'features': blantyre_schools[:20],
        'metadata': {'total_blantyre_schools': len(blantyre_schools)}
    }, f)

print("Saved 20 Blantyre schools to data/blantyre/schools.json")

# 2. Filter health facilities
health_path = Path('data/processed/health/health.json')
with open(health_path, 'r') as f:
    all_health = json.load(f)

# For now, take first 10
with open(blantyre_dir / 'health.json', 'w') as f:
    json.dump({
        'type': 'FeatureCollection',
        'features': all_health['features'][:10],
        'metadata': {'note': 'Test data'}
    }, f)

print("Saved health facilities to data/blantyre/health.json")
print("\nSummary:")
print("- Blantyre schools:", len(blantyre_schools), "total, 20 saved")
print("- Health facilities: 10 saved")