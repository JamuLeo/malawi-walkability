"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  return (
    <MapContainer
     center={[-15.3850, 35.3240]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}  // Required for visibility
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </MapContainer>
  );
}
    