'use client'

import { useState } from 'react'
import Header from '@/components/Layout/Header'
import WalkabilityMap from '@/components/Map/WalkabilityMap'
import FilterControls from '@/components/Dashboard/FilterControls'
import StatsPanel from '@/components/Dashboard/StatsPanel'
import PriorityList from '@/components/Dashboard/PriorityList'

import styles from './home.module.css'

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
    <div className={styles.page}>
      <Header />
      
      <div className={styles.main}>
        
        <div className={styles.sidebar}>
          <StatsPanel />
          <FilterControls filters={filters} setFilters={setFilters} />
          <PriorityList onSelectRoad={setSelectedRoad} />
        </div>
        
        <div className={styles.mapContainer}>
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
