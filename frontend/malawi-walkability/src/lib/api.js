const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    console.log(`API Call: ${url}`)
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error)
    throw error
  }
}
// Mock data for development and testing
const mockRoads = [
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [[35.0100, -15.7800], [35.0150, -15.7850]]
    },
    properties: {
      id: 1,
      name: 'Chileka Road',
      safety_score: 85,
      walkability_score: 85,
      road_type: 'primary',
      incident_count: 2
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [[35.0200, -15.7900], [35.0250, -15.7950]]
    },
    properties: {
      id: 2,
      name: 'Glyn Jones Road',
      safety_score: 45,
      walkability_score: 45,
      road_type: 'secondary',
      incident_count: 8
    }
  }
]

const mockServices = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [35.0120, -15.7820]
    },
    properties: {
      id: 1,
      name: 'Blantyre Secondary School',
      type: 'school'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [35.0220, -15.7920]
    },
    properties: {
      id: 2,
      name: 'Queen Elizabeth Central Hospital',
      type: 'health'
    }
  }
]

const mockStats = {
  totalRoads: 156,
  avgScore: 62,
  priorityRoads: 23,
  totalServices: 89
}

const mockPriorities = [
  {
    id: 1,
    name: 'Mbayani Township',
    avg_score: 28,
    population_affected: 15000,
    missing_services: ['schools', 'health facilities'],
    priority: 'critical'
  },
  {
    id: 2,
    name: 'Ndirande Market Area',
    avg_score: 35,
    population_affected: 12000,
    missing_services: ['sidewalks', 'crossings'],
    priority: 'high'
  }
]

// API functions
export async function fetchRoads() {
  try {
    return await apiCall('/roads')
  } catch (error) {
    console.log('Using mock roads data')
    return mockRoads
  }
}

export async function fetchServices() {
  try {
    return await apiCall('/services')
  } catch (error) {
    console.log('Using mock services data')
    return mockServices
  }
}

export async function fetchStats() {
  try {
    return await apiCall('/stats')
  } catch (error) {
    console.log('Using mock stats data')
    return mockStats
  }
}

export async function fetchPriorities() {
  try {
    return await apiCall('/priorities')
  } catch (error) {
    console.log('Using mock priorities data')
    return mockPriorities
  }
}