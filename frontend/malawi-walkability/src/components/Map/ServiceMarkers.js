'use client'

import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Custom marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'frontend\malawi-walkability\public\leaflet\marker-icon-2x.png',
  iconUrl: 'frontend\malawi-walkability\public\leaflet\marker-icon.png',
  shadowUrl: 'frontend\malawi-walkability\public\leaflet\marker-shadow.png',
})

const createCustomIcon = (type) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${type === 'school' ? '#10b981' : '#ef4444'};
        color: white;
        border: 2px solid white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      ">
        ${type === 'school' ? 'S' : 'H'}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  })
}

export default function ServiceMarkers({ services }) {
  // FIXED: Added Array.isArray() check
  if (!services || !Array.isArray(services) || services.length === 0) {
    return null
  }

  // FIXED: Added safe mapping with type checking
  const markers = services
    .map((service, index) => {
      // Check if service exists and has required properties
      if (!service || typeof service !== 'object') {
        return null
      }
      
      const properties = service.properties || {}
      const coordinates = service.geometry?.coordinates
      
      if (!coordinates || !Array.isArray(coordinates) || coordinates.length < 2) {
        return null
      }

      const position = [coordinates[1], coordinates[0]] // [lat, lng]
      const type = properties.type || 'school'

      return (
        <Marker
          key={`${type}-${index}-${properties.id || ''}`}
          position={position}
          icon={createCustomIcon(type)}
        >
          <Popup>
            <div className="text-sm">
              <strong>{properties.name || `${type.charAt(0).toUpperCase() + type.slice(1)} Facility`}</strong>
              <br />
              <span className="text-gray-600">
                Type: {type}
                {properties.amenity && <br />}
                {properties.amenity && `Amenity: ${properties.amenity}`}
              </span>
            </div>
          </Popup>
        </Marker>
      )
    })
    .filter(marker => marker !== null) // Remove null markers

  return markers
}