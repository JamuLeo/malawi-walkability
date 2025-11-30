'use client'

import { useStats } from '@/hooks/useMapData'

export default function StatsPanel() {
  const { stats, loading } = useStats()

  if (loading) {
    return <div className="bg-gray-50 rounded-lg p-4 animate-pulse h-48"></div>
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
      <h3 className="font-bold text-lg mb-4">Blantyre Overview</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded p-3">
          <p className="text-2xl font-bold text-blue-600">{stats.totalRoads}</p>
          <p className="text-xs text-gray-600">Total Roads</p>
        </div>
        
        <div className="bg-white rounded p-3">
          <p className="text-2xl font-bold text-green-600">{stats.avgScore}</p>
          <p className="text-xs text-gray-600">Avg Score</p>
        </div>
        
        <div className="bg-white rounded p-3">
          <p className="text-2xl font-bold text-orange-600">{stats.priorityRoads}</p>
          <p className="text-xs text-gray-600">Priority Roads</p>
        </div>
        
        <div className="bg-white rounded p-3">
          <p className="text-2xl font-bold text-purple-600">{stats.totalServices}</p>
          <p className="text-xs text-gray-600">Services</p>
        </div>
      </div>
    </div>
  )
}