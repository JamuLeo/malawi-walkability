'use client'

import { GeoJSON } from 'react-leaflet'
import { getWalkabilityColor } from '@/utils/colors'

export default function RoadLayer({ roads, selectedRoad, onRoadSelect }) {
  const roadStyle = (feature) => {
    const score = feature.properties?.safety_score || feature.properties?.walkability_score || 50
    const isSelected = selectedRoad && selectedRoad.id === feature.properties?.id
    
    return {
      color: getWalkabilityColor(score),
      weight: isSelected ? 6 : 4,
      opacity: isSelected ? 1 : 0.8,
      lineCap: 'round',
      lineJoin: 'round'
    }
  }

  const onEachRoad = (feature, layer) => {
    const properties = feature.properties || {}
    const score = properties.safety_score || properties.walkability_score || 50
    const roadName = properties.name || `Road ${properties.id}`
    
    // Add click event
    layer.on('click', (e) => {
      onRoadSelect?.({
        id: properties.id,
        name: roadName,
        score: score,
        type: properties.road_type,
        incidents: properties.incident_count,
        coordinates: e.latlng
      })
    })

    // Add hover tooltip
    layer.bindTooltip(`
      <div class="text-sm">
        <strong>${roadName}</strong><br/>
        Score: ${score}/100<br/>
        ${properties.road_type ? `Type: ${properties.road_type}` : ''}
      </div>
    `)
  }

  if (!roads || roads.length === 0) {
    return null
  }

  return (
    <GeoJSON
      key={JSON.stringify(roads)}
      data={{
        type: 'FeatureCollection',
        features: roads
      }}
      style={roadStyle}
      onEachFeature={onEachRoad}
    />
  )
}