# Malawi Urban Walkability Analysis - Blantyre District

A database-driven web application that analyzes pedestrian accessibility in Blantyre District, Malawi.

## What is Walkability Analysis?

Walkability analysis measures how easy and safe it is for people to walk to essential services like schools, hospitals, and shops. Our walkability analysis scores streets based on pedestrian safety and infrastructure quality, identifies areas with poor access to essential services, and highlights priority zones for sidewalk and crossing improvements.

## Project Overview

This project identifies areas with poor walkability and limited access to essential services in Blantyre District. We combine spatial analysis with web visualization to help urban planners prioritize pedestrian infrastructure investments in Blantyre's urban areas.

## Key Differences from Navigation Apps

- Navigation apps show how to get from point A to B - Our tool shows how walkable an entire neighborhood is in Blantyre
- Navigation apps focus on route navigation - Our tool focuses on infrastructure quality and service access in Blantyre
- Navigation apps are for trip planning - Our tool is for urban planning and infrastructure decisions in Blantyre

## Features

- Calculate walkability scores for streets in Blantyre District
- Interactive maps showing walkability levels across Blantyre
- Identify priority areas for pedestrian improvements in Blantyre
- Analyze access to schools and healthcare facilities in Blantyre

## Quick Start

1. Create a folder on your computer and open it in Visual Studio Code
2. Clone the repository:
   git clone https://github.com/JamuLeo/malawi-walkability.git
   cd malawi-walkability
3. Download datasets (see DATASET_INSTRUCTIONS.md)
4. Install dependencies: pip install -r requirements.txt
5. Run verification: python src/analysis/verify_data.py

## Tech Stack

- Python, PostGIS, GeoPandas
- Flask, Leaflet.js
- PostgreSQL with PostGIS
- HDX Malawi datasets (focused on Blantyre District)