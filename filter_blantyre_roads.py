import json
from pathlib import Path

print("Creating Blantyre roads data...")

# Create blantyre folder
blantyre_dir = Path('data/blantyre')
blantyre_dir.mkdir(exist_ok=True)

# Copy first 100 roads as test
roads_path = Path('data/processed/roads/roads.json')
with open(roads_path, 'r') as f:
    all_roads = json.load(f)

test_roads = all_roads['features'][:100]

output = {
    'type': 'FeatureCollection',
    'features': test_roads
}

with open(blantyre_dir / 'roads.json', 'w') as f:
    json.dump(output, f)

print(f"✅ Created data/blantyre/roads.json with {len(test_roads)} roads")