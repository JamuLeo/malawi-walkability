'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useMapData } from '@/hooks/useMapData'
import MapLegend from './MapLegend'

// Dynamically import Leaflet components with SSR disabled
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const RoadLayer = dynamic(() => import('./RoadLayer'), { ssr: false })
const ServiceMarkers = dynamic(() => import('./ServiceMarkers'), { ssr: false })

export default function WalkabilityMap({ filters = {}, selectedRoad, onRoadSelect }) {
  const { roads, services, loading } = useMapData()

 
  const safeFilters = {
    minScore: filters.minScore || 0,
    maxScore: filters.maxScore || 100,
    roadType: filters.roadType || 'all',
    showSchools: filters.showSchools !== false,
    showHealth: filters.showHealth !== false
  }
  
  // Blantyre coordinates
  const blantyreCenter = [-15.7861, 35.0058]
  
  const filteredRoads = roads.filter(road => {
    const score = road.properties?.safety_score || road.properties?.walkability_score || 50
    return score >= safeFilters.minScore && score <= safeFilters.maxScore
  })

  const filteredServices = services.filter(service => {
    if (service.properties?.type === 'school') return safeFilters.showSchools
    if (service.properties?.type === 'health') return safeFilters.showHealth
    return false
  })

  if (loading) {
    return (
      <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Blantyre map data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
     
      
      <MapContainer
        center={blantyreCenter}
        zoom={12}
        style={{ height: '100%', width: '100%', position: 'relative' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <RoadLayer 
          roads={filteredRoads}
          selectedRoad={selectedRoad}
          onRoadSelect={onRoadSelect}
        />
        
        <ServiceMarkers services={filteredServices} />
      </MapContainer>
    </div>
  )
}