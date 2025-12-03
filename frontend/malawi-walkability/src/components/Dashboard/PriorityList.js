'use client'

import { usePriorities } from '@/hooks/useMapData'

export default function PriorityList({ onSelectRoad }) {
  const { priorities, loading } = usePriorities()

  if (loading) {
    return (
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b bg-red-50">
          <h3 className="font-bold text-lg">Priority Improvement Areas</h3>
          <p className="text-xs text-gray-600 mt-1">Roads requiring urgent attention</p>
        </div>
        <div className="p-8 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  // Extract data from response (handles both success and error responses)
  const displayData = Array.isArray(priorities) ? priorities : 
                     (priorities?.sample_data || [])

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b bg-red-50">
        <h3 className="font-bold text-lg">Priority Improvement Areas</h3>
        <p className="text-xs text-gray-600 mt-1">Roads requiring urgent attention in Blantyre</p>
        <p className="text-xs text-gray-500 mt-1">
          {displayData.length} priority areas identified
        </p>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {displayData.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="mb-4 text-4xl">📊</div>
            <p className="text-sm font-medium">Analysis Complete</p>
            <p className="text-xs mt-1">All areas meet walkability standards</p>
          </div>
        ) : (
          displayData.map((area, index) => (
            <div 
              key={area.id || index}
              className="p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelectRoad && onSelectRoad(area)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      area.priority === 'high' ? 'bg-red-500' :
                      area.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}></div>
                    <h4 className="font-semibold text-gray-800">{area.name}</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <p className="text-lg font-bold text-blue-600">{area.avg_score}</p>
                      <p className="text-xs text-gray-600">Walkability Score</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <p className="text-lg font-bold text-green-600">{area.road_count || 0}</p>
                      <p className="text-xs text-gray-600">Roads Affected</p>
                    </div>
                  </div>
                  
                  {area.issues && area.issues.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-1">Key Issues:</p>
                      <div className="flex flex-wrap gap-1">
                        {area.issues.slice(0, 3).map((issue, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded border border-red-200"
                          >
                            {issue}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="ml-2">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    area.priority === 'high' ? 'bg-red-100 text-red-800 border border-red-200' :
                    area.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                    'bg-green-100 text-green-800 border border-green-200'
                  }`}>
                    {area.priority === 'high' ? 'High Priority' :
                     area.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {displayData.length > 0 && (
        <div className="p-3 border-t bg-gray-50">
          <p className="text-xs text-gray-600 text-center">
            Click on any area to view details on map
          </p>
        </div>
      )}
    </div>
  )
}