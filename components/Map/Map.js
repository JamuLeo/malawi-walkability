"use client";

import { MapContainer, TileLayer ,GeoJSON} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import roadsData from "../data/roads.json";
export default function Map() {

  const roadStyle=(feature)=>({
    color:feature.properties.security_status ==="secure"? "green":"red",
    weight:4,
  })
  return (
    <MapContainer
     center={[-15.3850, 35.3240]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      />


      <GeoJSON
        data={roadsData}
        style={roadStyle}
        onEachFeature={(feature, layer) => {
          layer.bindPopup(`
            <strong>${feature.properties.road_name}</strong><br/>
            Status: ${feature.properties.security_status}
          `);
        }}
      />
    </MapContainer>
  );
}
    