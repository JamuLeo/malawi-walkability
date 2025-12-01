'use client'

import { useState } from 'react'
import Header from '@/components/Layout/Header'
import WalkabilityMap from '@/components/Map/WalkabilityMap'
import FilterControls from '@/components/Dashboard/FilterControls'
import StatsPanel from '@/components/Dashboard/StatsPanel'
import PriorityList from '@/components/Dashboard/PriorityList'

export default function Home() {
  const [filters, setFilters] = useState({
    minScore: 0,
    maxScore: 100,
    roadType: 'all',
    showSchools: true,
    showHealth: true
  })
  
  const [selectedRoad, setSelectedRoad] = useState(null)

  return (
    <div className="h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
       
        <div className="w-80 bg-white border-r border-gray-200 p-4 flex flex-col gap-4 overflow-y-auto">
          <StatsPanel />
          <FilterControls filters={filters} setFilters={setFilters} />
          <PriorityList onSelectRoad={setSelectedRoad} />
        </div>
        
       
        <div className="flex-1 relative">
          <WalkabilityMap 
            filters={filters}
            selectedRoad={selectedRoad}
            onRoadSelect={setSelectedRoad}
          />
        </div>
      </div>
    </div>
  )
}