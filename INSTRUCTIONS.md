 Dataset Setup Instructions

## Download from HDX (https://data.humdata.org):

### REQUIRED FILES:
1. **Malawi Roads** 
   - Search: "Malawi Roads" on HDX
   - Download: "hotosm_mwi_roads_lines_shp.zip"
   - Extract to: `data/raw/roads/`
   - Should contain: `hotosm_mwi_roads_lines_shp.shp`, `.dbf`, `.shx`, `.prj`

2. **Malawi Administrative Boundaries**
   - Search: "Malawi Administrative Boundaries"
   - Download: Shapefile format
   - Extract to: `data/raw/boundaries/`
   - Should contain: `mw_districts.shp`, `.dbf`, `.shx`, `.prj`

3. **Malawi Health Facilities**
   - Search: "Malawi Health Facilities"
   - Download: "hotosm_mwi_health_facilities_points_shp.zip"
   - Extract to: `data/raw/health/`
   - Should contain: `hotosm_mwi_health_facilities_points_shp.shp`

4. **Malawi Schools** (Optional - if available)
   - Search: "Malawi Schools"
   - Download any available schools dataset
   - Extract to: `data/raw/schools/`

## Expected Folder Structure:
data/
├── raw/ # Original shapefiles (NOT in git)
│ ├── roads/
│ │ ├── hotosm_mwi_roads_lines_shp.shp
│ │ ├── hotosm_mwi_roads_lines_shp.dbf
│ │ └── hotosm_mwi_roads_lines_shp.shx
│ ├── boundaries/
│ │ ├── mw_districts.shp
│ │ ├── mw_districts.dbf
│ │ └── mw_districts.shx
│ ├── health/
│ │ ├── hotosm_mwi_health_facilities_points_shp.shp
│ │ ├── hotosm_mwi_health_facilities_points_shp.dbf
│ │ └── hotosm_mwi_health_facilities_points_shp.shx
│ └── schools/ # If you find schools data
└── processed/ # GeoJSON files (auto-generated)
├── roads_processed.geojson
├── health_facilities.geojson
└── boundaries.geojson

text

## How to Process the Data:
Run the data processing script:
```bash
python convert_shapefiles.py