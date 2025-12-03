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

// API functions - ONLY REAL API CALLS
export async function fetchRoads() {
  return await apiCall('/roads')
}

export async function fetchServices() {
  return await apiCall('/services')
}

export async function fetchStats() {
  return await apiCall('/analysis/stats')
}

export async function fetchPriorities() {
  return await apiCall('/analysis/priorities')
}