export function getWalkabilityColor(score) {
  // Safe roads (high scores) = BLUE
  // Dangerous roads (low scores) = RED
  if (score >= 80) return '#2563eb' // Blue-600 - Very Safe
  if (score >= 60) return '#16a34a' // Green-600 - Safe
  if (score >= 40) return '#ea580c' // Orange-600 - Moderate
  if (score >= 20) return '#dc2626' // Red-600 - Dangerous
  return '#991b1b' // Red-800 - Very Dangerous
}

export function getWalkabilityLevel(score) {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  if (score >= 20) return 'Poor'
  return 'Critical'
}

// Color scheme for the legend and UI
export const walkabilityColors = {
  excellent: '#2563eb', // Blue
  good: '#16a34a',      // Green
  fair: '#ea580c',      // Orange
  poor: '#dc2626',      // Red
  critical: '#991b1b'   // Dark Red
}

export const walkabilityRanges = [
  { range: '81-100', label: 'Excellent', color: '#2563eb', description: 'Very Safe' },
  { range: '61-80', label: 'Good', color: '#16a34a', description: 'Safe' },
  { range: '41-60', label: 'Fair', color: '#ea580c', description: 'Moderate' },
  { range: '21-40', label: 'Poor', color: '#dc2626', description: 'Dangerous' },
  { range: '0-20', label: 'Critical', color: '#991b1b', description: 'Very Dangerous' }
]