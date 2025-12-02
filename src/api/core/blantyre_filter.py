import json
from pathlib import Path

def get_blantyre_boundary():
    """Extract Blantyre district boundary"""
    districts_path = Path('data/processed/boundaries/districts.json')
    
    with open(districts_path, 'r') as f:
        districts = json.load(f)
    
    for feature in districts['features']:
        props = feature.get('properties', {})
        if props.get('district', '').lower() == 'blantyre':
            return feature
    
    return None

def save_blantyre_data():
    """Save Blantyre boundary to separate file"""
    blantyre = get_blantyre_boundary()
    
    if blantyre:
        # Create blantyre folder
        blantyre_dir = Path('data/blantyre')
        blantyre_dir.mkdir(exist_ok=True)
        
        # Save Blantyre boundary
        output = {
            'type': 'FeatureCollection',
            'features': [blantyre]
        }
        
        with open(blantyre_dir / 'boundary.json', 'w') as f:
            json.dump(output, f)
        
        print(f"✅ Saved Blantyre boundary to data/blantyre/boundary.json")
        return True
    
    print("❌ Could not find Blantyre boundary")
    return False

if __name__ == "__main__":
    save_blantyre_data()