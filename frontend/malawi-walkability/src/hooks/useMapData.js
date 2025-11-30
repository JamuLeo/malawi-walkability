'use client'

import { useState, useEffect } from 'react'
import { fetchRoads, fetchServices, fetchStats, fetchPriorities } from '@/lib/api'

export function useMapData() {
  const [roads, setRoads] = useState([])
  const [services, setServices] = useState([])
  const [stats, setStats] = useState({
    totalRoads: 0,
    avgScore: 0,
    priorityRoads: 0,
    totalServices: 0
  })
  const [priorities, setPriorities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        
    
        const [roadsData, servicesData, statsData, prioritiesData] = await Promise.all([
          fetchRoads().catch(err => {
            console.warn('Failed to fetch roads:', err)
            return []
          }),
          fetchServices().catch(err => {
            console.warn('Failed to fetch services:', err)
            return []
          }),
          fetchStats().catch(err => {
            console.warn('Failed to fetch stats:', err)
            return { totalRoads: 0, avgScore: 0, priorityRoads: 0, totalServices: 0 }
          }),
          fetchPriorities().catch(err => {
            console.warn('Failed to fetch priorities:', err)
            return []
          })
        ])

        setRoads(roadsData)
        setServices(servicesData)
        setStats(statsData)
        setPriorities(prioritiesData)
      } catch (err) {
        console.error('Error loading map data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return {
    roads,
    services,
    stats,
    priorities,
    loading,
    error
  }
}


export function useRoads() {
  const { roads, loading, error } = useMapData()
  return { roads, loading, error }
}

export function useServices() {
  const { services, loading, error } = useMapData()
  return { services, loading, error }
}

export function useStats() {
  const { stats, loading, error } = useMapData()
  return { stats, loading, error }
}

export function usePriorities() {
  const { priorities, loading, error } = useMapData()
  return { priorities, loading, error }
}