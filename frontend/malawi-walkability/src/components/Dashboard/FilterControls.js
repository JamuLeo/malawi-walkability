
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
              onChange={(e) => setFilters({...filters, minScore: parseInt(e.target.value)})}
              className="w-20 px-2 py-1 border rounded"
            />
            <span>to</span>
            <input
              type="number"
              min="0"
              max="100"
              value={filters.maxScore}
              onChange={(e) => setFilters({...filters, maxScore: parseInt(e.target.value)})}
              className="w-20 px-2 py-1 border rounded"
            />
          </div>
        </div>

        {/* Road Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Road Type</label>
          <select
            value={filters.roadType}
            onChange={(e) => setFilters({...filters, roadType: e.target.value})}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="all">All Types</option>
            <option value="primary">Primary Roads</option>
            <option value="secondary">Secondary Roads</option>
            <option value="tertiary">Tertiary Roads</option>
          </select>
        </div>

        {/* Service Toggles */}
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.showSchools}
              onChange={(e) => setFilters({...filters, showSchools: e.target.checked})}
              className="w-4 h-4"
            />
            <span className="text-sm">Show Schools</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.showHealth}
              onChange={(e) => setFilters({...filters, showHealth: e.target.checked})}
              className="w-4 h-4"
            />
            <span className="text-sm">Show Health Facilities</span>
          </label>
        </div>
      </div>
    </div>
  )
}