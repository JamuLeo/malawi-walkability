'use client'

import { walkabilityRanges } from '@/utils/colors'

export default function MapLegend() {
  return (
    <div className="absolute top-20 left-4 bg-white rounded-lg shadow-xl border-2 border-blue-500 p-4 z-[9999] min-w-64">
      <h4 className="font-bold text-lg mb-3 text-gray-800">Road Safety Legend</h4>
      
      {/* Safety Score Ranges */}
      <div className="space-y-2 mb-3">
        {walkabilityRanges.map((item) => (
          <div key={item.range} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-sm flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-700 flex-1">
              <span className="font-medium">{item.range}</span> - {item.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* Service Markers */}
      <div className="pt-2 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></div>
          <span className="text-sm text-gray-700">Schools</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></div>
          <span className="text-sm text-gray-700">Health Facilities</span>
        </div>
      </div>
    </div>
  )
}