import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# API Settings
API_PORT = 5000
API_HOST = '0.0.0.0'

# Data paths - CORRECTED
DATA_DIR = BASE_DIR / 'data' / 'processed'

# File names - CORRECTED to match what you have
ROADS_FILE = 'roads/roads.json'           # You have 446,995 features
HEALTH_FILE = 'health/health.json'        # You have 162 features
SCHOOLS_FILE = 'schools/schools.json'     # You have 7,098 features
DISTRICTS_FILE = 'boundaries/districts.json'  # You have 28 features

print(f'✅ Config loaded: API will run on http://{API_HOST}:{API_PORT}')
print(f'✅ Data directory: {DATA_DIR}')
print(f'✅ Roads file: {ROADS_FILE}')
print(f'✅ Health file: {HEALTH_FILE}')