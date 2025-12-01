export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Blantyre Walkability Analysis</h1>
            <p className="text-blue-100 text-sm mt-1">
              Urban pedestrian accessibility mapping for Blantyre District, Malawi
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-blue-100">HDX Malawi Data</p>
            <p className="text-xs text-blue-200">Real-time Infrastructure Analysis</p>
          </div>
        </div>
      </div>
    </header>
  )
}