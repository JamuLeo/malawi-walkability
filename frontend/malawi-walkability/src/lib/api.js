const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function fetchRoads(filters = {}) {
  const params = new URLSearchParams({
    min_score: filters.minScore || 0,
    max_score: filters.maxScore || 100,
    road_type: filters.roadType || 'all'
  })
  const response = await fetch(`${API_BASE_URL}/roads?${params}`)
  if (!response.ok) throw new Error('Failed to fetch roads')
  return response.json()
}

export async function fetchSchools() {
  const response = await fetch(`${API_BASE_URL}/schools`)
  if (!response.ok) throw new Error('Failed to fetch schools')
  return response.json()
}

export async function fetchHealthFacilities() {
  const response = await fetch(`${API_BASE_URL}/health-facilities`)
  if (!response.ok) throw new Error('Failed to fetch health facilities')
  return response.json()
}

export async function fetchStats() {
  const response = await fetch(`${API_BASE_URL}/stats`)
  if (!response.ok) throw new Error('Failed to fetch stats')
  return response.json()
}

export async function fetchPriorities() {
  const response = await fetch(`${API_BASE_URL}/priorities`)
  if (!response.ok) throw new Error('Failed to fetch priorities')
  return response.json()
}