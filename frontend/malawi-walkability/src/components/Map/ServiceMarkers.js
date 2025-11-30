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
  if (!services || services.length === 0) {
    return null
  }

  return services.map((service, index) => {
    const properties = service.properties || {}
    const coordinates = service.geometry?.coordinates
    
    if (!coordinates || coordinates.length < 2) {
      return null
    }

    const position = [coordinates[1], coordinates[0]] // [lat, lng]
    const type = properties.type || 'school'

    return (
      <Marker
        key={`${type}-${index}`}
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
}