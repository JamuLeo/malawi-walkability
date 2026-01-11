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
            // FIXED: Check if error has sample_data
            if (err && typeof err === 'object' && err.sample_data) {
              return err.sample_data  // Extract sample_data from error
            }
            return []
          })
        ])

        // Handle roads data
        const roadsArray = Array.isArray(roadsData) ? roadsData : 
                          (roadsData?.features || [])
        setRoads(roadsArray)

        // Handle services data  
        const servicesArray = Array.isArray(servicesData) ? servicesData :
                             (servicesData?.features || [])
        setServices(servicesArray)
        
        // TRANSFORM STATS DATA
        const transformedStats = {
          totalRoads: statsData.totalRoads || 0,
          avgScore: statsData.avgScore || 0,
          priorityRoads: statsData.priorityRoads || 0,
          totalServices: (statsData.totalSchools || 0) + (statsData.totalHealth || 0)
        }
        setStats(transformedStats)
        
        // HANDLE PRIORITIES DATA - FIXED VERSION
        let prioritiesArray = []
        
        // Case 1: Already an array
        if (Array.isArray(prioritiesData)) {
          prioritiesArray = prioritiesData
        }
        // Case 2: Error object with sample_data
        else if (prioritiesData && typeof prioritiesData === 'object' && prioritiesData.sample_data) {
          prioritiesArray = prioritiesData.sample_data
        }
        // Case 3: Has error but no sample_data
        else if (prioritiesData && typeof prioritiesData === 'object' && prioritiesData.error) {
          prioritiesArray = []  // Empty if only error
        }
        
        // Transform the data for frontend
        const transformedPriorities = prioritiesArray.map(priority => ({
          ...priority,
          // Keep original issues array (PriorityList now uses 'issues' not 'missing_services')
          missing_services: priority.issues ? priority.issues.map(issue => 
            issue.toLowerCase().includes('school') ? 'schools' :
            issue.toLowerCase().includes('health') ? 'health facilities' :
            issue.toLowerCase().includes('sidewalk') ? 'sidewalks' :
            issue.toLowerCase().includes('crossing') ? 'crossings' :
            issue.toLowerCase().includes('lighting') ? 'street lighting' :
            issue
          ) : [],
          population_affected: priority.road_count ? priority.road_count * 100 : 5000
        }))
        
        setPriorities(transformedPriorities)
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