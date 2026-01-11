'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useMapData } from '@/hooks/useMapData'

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
  
  // FIXED: Proper filtering with all criteria
  const filteredRoads = Array.isArray(roads) ? roads.filter(road => {
    const properties = road.properties || {}
    
    // Get walkability score
    const score = properties.walkability_score || properties.safety_score || 50
    
    // Get road type
    const roadType = properties.highway || 'unknown'
    
    // Apply all filters
    const scoreMatch = score >= safeFilters.minScore && score <= safeFilters.maxScore
    const typeMatch = safeFilters.roadType === 'all' || roadType === safeFilters.roadType
    
    return scoreMatch && typeMatch
  }) : []

  const filteredServices = Array.isArray(services) ? services.filter(service => {
    const serviceType = service.properties?.type || ''
    
    if (serviceType === 'school') return safeFilters.showSchools
    if (serviceType === 'health') return safeFilters.showHealth
    return false
  }) : []

  // Calculate stats for legend
  const visibleRoadsCount = filteredRoads.length
  const visibleServicesCount = filteredServices.length

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
      {/* Stats overlay */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-xl font-bold text-blue-600">{visibleRoadsCount}</p>
            <p className="text-xs text-gray-600">Visible Roads</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-green-600">{visibleServicesCount}</p>
            <p className="text-xs text-gray-600">Visible Services</p>
          </div>
        </div>
        {safeFilters.roadType !== 'all' && (
          <p className="text-xs text-gray-500 mt-2">
            Showing: {safeFilters.roadType} roads
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Score range: {safeFilters.minScore}-{safeFilters.maxScore}
        </p>
      </div>
      
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