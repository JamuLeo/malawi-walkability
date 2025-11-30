import { useState, useEffect } from 'react'
import { fetchRoads, fetchSchools, fetchHealthFacilities, fetchStats, fetchPriorities } from '@/lib/api'

export function useMapData(filters) {
  const [data, setData] = useState({
    roads: [],
    schools: [],
    healthFacilities: [],
    loading: true,
    error: null
  })

  useEffect(() => {
    async function loadData() {
      try {
        setData(prev => ({ ...prev, loading: true }))
        const [roads, schools, health] = await Promise.all([
          fetchRoads(filters),
          fetchSchools(),
          fetchHealthFacilities()
        ])
        setData({
          roads: roads.features || [],
          schools: schools.features || [],
          healthFacilities: health.features || [],
          loading: false,
          error: null
        })
      } catch (error) {
        setData(prev => ({ ...prev, loading: false, error: error.message }))
      }
    }
    loadData()
  }, [filters.minScore, filters.maxScore, filters.roadType])

  return data
}

export function useStats() {
  const [stats, setStats] = useState({ 
    totalRoads: 0, 
    avgScore: 0, 
    priorityRoads: 0, 
    totalServices: 0 
  })
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch(err => console.error('Error loading stats:', err))
      .finally(() => setLoading(false))
  }, [])
  
  return { stats, loading }
}

export function usePriorities() {
  const [priorities, setPriorities] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchPriorities()
      .then(setPriorities)
      .catch(err => console.error('Error loading priorities:', err))
      .finally(() => setLoading(false))
  }, [])
  
  return { priorities, loading }
}