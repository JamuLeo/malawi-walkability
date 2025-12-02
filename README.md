Malawi Urban Walkability Analysis - Blantyre District
A web application that analyzes pedestrian accessibility in Blantyre District, Malawi using real spatial data.

Project Overview
This project identifies areas with poor walkability and limited access to essential services in Blantyre District. We combine spatial analysis with web visualization to help urban planners prioritize pedestrian infrastructure investments in Blantyre's urban areas.

Key Features for Blantyre District
Calculate walkability scores for Blantyre streets

Interactive maps showing walkability levels across Blantyre

Identify priority areas for pedestrian improvements in Blantyre

Analyze access to Blantyre schools and healthcare facilities

Technology Stack
Backend (Data Processing & API)
Python/Flask API - Serves Blantyre spatial data

HDX Malawi Datasets - Filtered for Blantyre District

GeoJSON - Blantyre roads, schools, health facilities

Frontend
Next.js 14 - React framework with App Router

Leaflet.js - Interactive Blantyre maps

React-Leaflet - React components for Blantyre mapping

Tailwind CSS - Styling

Data Focus: Blantyre District
Blantyre Roads (from OpenStreetMap via HDX)

Blantyre Health Facilities (from HDX)

Blantyre Schools (from HDX)

Blantyre District Boundary (from HDX)

Backend Walkability API
Core Endpoints
Road Scoring: GET /api/roads

Calculates walkability scores (0-100) for all Blantyre streets

Returns GeoJSON with scores, categories, and colors for visualization

Uses custom walkability_scorer.score_road_feature() algorithm

Analysis: GET /api/analysis/priorities

Identifies priority areas needing pedestrian improvements

Returns ranked areas based on walkability scores and road properties

Statistics: GET /api/analysis/stats

Provides overall Blantyre statistics including road counts and service access

Data Processing Pipeline
Load Blantyre roads from data/blantyre/roads.json

Calculate walkability scores based on road infrastructure features

Analyze patterns to identify high-priority intervention areas

Serve processed data through REST API endpoints

API Testing
text
http://localhost:5000/api/roads           # Scored roads data
http://localhost:5000/api/analysis/priorities  # Priority areas
http://localhost:5000/api/analysis/stats       # District statistics
Setup Instructions
1. Clone Repository
bash
git clone https://github.com/JamuLeo/malawi-walkability.git
cd malawi-walkability
2. Backend Setup (Flask API)
bash
pip install -r requirements.txt
python app.py
# API available at: http://localhost:5000
3. Frontend Setup
bash
cd frontend
npm install
npm run dev
# Frontend available at: http://localhost:3000
Project Output
The system provides Blantyre urban planners with data-driven insights on pedestrian infrastructure needs, enabling targeted investments in sidewalk improvements, pedestrian crossings, and street lighting to enhance walkability across the district.
