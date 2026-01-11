export default function FilterControls({ filters, setFilters }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-bold text-lg mb-4">Filters</h3>
      
      <div className="space-y-4">
        {/* Score Range */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Walkability Score Range
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="0"
              max="100"
              value={filters.minScore}
              onChange={(e) => setFilters({...filters, minScore: parseInt(e.target.value) || 0})}
              className="w-20 px-2 py-1 border rounded"
              placeholder="0"
            />
            <span>to</span>
            <input
              type="number"
              min="0"
              max="100"
              value={filters.maxScore}
              onChange={(e) => setFilters({...filters, maxScore: parseInt(e.target.value) || 100})}
              className="w-20 px-2 py-1 border rounded"
              placeholder="100"
            />
          </div>
          <div className="mt-2">
            <input
              type="range"
              min="0"
              max="100"
              value={filters.minScore}
              onChange={(e) => setFilters({...filters, minScore: parseInt(e.target.value)})}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0 (Poor)</span>
              <span>100 (Excellent)</span>
            </div>
          </div>
        </div>

        {/* Road Type - UPDATED TO MATCH YOUR DATA */}
        <div>
          <label className="block text-sm font-medium mb-2">Road Type</label>
          <select
            value={filters.roadType}
            onChange={(e) => setFilters({...filters, roadType: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="all">All Road Types</option>
            <option value="path">Walking Paths</option>
            <option value="residential">Residential Roads</option>
            <option value="track">Rural Tracks</option>
            <option value="unclassified">Unclassified Roads</option>
          </select>
        </div>

        {/* Service Toggles */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
            <input
              type="checkbox"
              checked={filters.showSchools}
              onChange={(e) => setFilters({...filters, showSchools: e.target.checked})}
              className="w-4 h-4 text-blue-600"
            />
            <div>
              <span className="text-sm font-medium">Schools</span>
              <span className="text-xs text-gray-500 block">Show educational facilities</span>
            </div>
          </label>
          
          <label className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
            <input
              type="checkbox"
              checked={filters.showHealth}
              onChange={(e) => setFilters({...filters, showHealth: e.target.checked})}
              className="w-4 h-4 text-green-600"
            />
            <div>
              <span className="text-sm font-medium">Health Facilities</span>
              <span className="text-xs text-gray-500 block">Show hospitals & clinics</span>
            </div>
          </label>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => setFilters({
            minScore: 0,
            maxScore: 100,
            roadType: 'all',
            showSchools: true,
            showHealth: true
          })}
          className="w-full px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}