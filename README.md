markdown
# Malawi Urban Walkability Analysis - Blantyre District

A Next.js web application that analyzes pedestrian accessibility in **Blantyre District, Malawi** using real spatial data.

## 🎯 What is Walkability Analysis?

Walkability analysis measures how easy and safe it is for people to walk to essential services like schools, hospitals, and shops in **Blantyre**. Our tool scores **Blantyre streets** based on pedestrian safety and infrastructure quality, identifies areas with poor access to essential services in **Blantyre**, and highlights priority zones for sidewalk and crossing improvements in **Blantyre**.

## 🏗️ Project Overview

This project identifies areas with poor walkability and limited access to essential services in **Blantyre District**. We combine spatial analysis with web visualization to help urban planners prioritize pedestrian infrastructure investments in **Blantyre's urban areas**.

## 🔑 Key Differences from Navigation Apps

| Feature | Navigation Apps | Our Blantyre Walkability Tool |
|---------|----------------|---------------------|
| **Purpose** | Route from A to B | **Blantyre neighborhood** walkability assessment |
| **Focus** | Trip navigation | **Blantyre** infrastructure quality & service access |
| **Users** | General public | **Blantyre** urban planners, policymakers |
| **Output** | Directions | **Blantyre** priority zones for improvements |

## 🚀 Features

### **For Blantyre District:**
- Calculate walkability scores for **Blantyre streets**
- Interactive maps showing walkability levels across **Blantyre**
- Identify priority areas for pedestrian improvements in **Blantyre**
- Analyze access to **Blantyre schools** and **Blantyre healthcare facilities**

## 📁 Project Structure
malawi-walkability/
├── backend/ # Flask API for Blantyre data
│ ├── app.py # Main Flask application
│ ├── requirements.txt # Python dependencies
│ └── data/processed/ # Blantyre GeoJSON data
└── frontend/ # Next.js application for Blantyre
│ ├── src/app/ # Next.js pages
│ ├── src/components/ # React components
│ └── package.json # Node.js dependencies

text

## 🛠️ Tech Stack

### **Backend** (Data Processing & API)
- **Python/Flask API** - Serves **Blantyre spatial data**
- **HDX Malawi Datasets** - Filtered for **Blantyre District**
- **GeoJSON** - **Blantyre** roads, schools, health facilities

### **Frontend** (User Interface - **NEXT.JS**)
- **Next.js 14** - React framework with App Router
- **Leaflet.js** - Interactive **Blantyre maps**
- **React-Leaflet** - React components for **Blantyre mapping**
- **Tailwind CSS** - Styling

### **Data Focus: Blantyre District**
- **Blantyre Roads** (from OpenStreetMap via HDX)
- **Blantyre Health Facilities** (from HDX)
- **Blantyre Schools** (from HDX)
- **Blantyre District Boundary** (from HDX)

## 🚀 Quick Start

### **1. Clone Repository**
```bash
git clone https://github.com/JamuLeo/malawi-walkability.git
cd malawi-walkability
2. Backend Setup (Flask API)
bash
# Install Python dependencies
pip install -r requirements.txt

# Run Flask API for Blantyre data
python app.py
# API runs at: http://localhost:5000
3. Frontend Setup (Next.js)
bash
cd frontend
npm install
npm run dev
# Frontend runs at: http://localhost:3000