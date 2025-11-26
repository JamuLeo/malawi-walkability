from flask import Flask, render_template, jsonify
from utils.config import get_db_connection
import json

app = Flask(__name__)

@app.route('/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/walkability-data')
def get_walkability_data():
    conn = get_db_connection()
    cur = conn.cursor()
    
    query = """
    SELECT r.name, r.road_type, w.total_score, ST_AsGeoJSON(r.geometry) as geometry
    FROM blantyre_roads r
    JOIN walkability_scores w ON r.id = w.road_id
    WHERE w.total_score IS NOT NULL;
    """
    
    cur.execute(query)
    # Process and return GeoJSON
    return jsonify(process_to_geojson(cur.fetchall()))

if __name__ == '__main__':
    app.run(debug=True)