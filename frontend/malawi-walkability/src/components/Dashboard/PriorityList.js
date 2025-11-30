
'use client'

import { usePriorities } from '@/hooks/useMapData'

export default function PriorityList({ onSelectRoad }) {
  const { priorities, loading } = usePriorities()

  if (loading) {
    return <div className="bg-gray-50 rounded-lg p-4 animate-pulse h-64"></div>
  }

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b bg-red-50">
        <h3 className="font-bold text-lg">Priority Improvement Areas</h3>
        <p className="text-xs text-gray-600 mt-1">Roads requiring urgent attention</p>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {priorities.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No priority areas found</p>
            <p className="text-xs mt-2">Connect to backend to load data</p>
          </div>
        ) : (
          priorities.map((area, index) => (
            <div 
              key={area.id} 
              className="p-4 border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelectRoad && onSelectRoad(area)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                    <h4 className="font-semibold">{area.name || `Area ${area.id}`}</h4>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <span>Score: {area.avg_score}/100</span>
                    <span>•</span>
                    <span>{area.population_affected} people affected</span>
                  </div>
                  
                  {area.missing_services && area.missing_services.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {area.missing_services.map(service => (
                        <span key={service} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  area.priority === 'critical' ? 'bg-red-100 text-red-700' :
                  area.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {area.priority}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}