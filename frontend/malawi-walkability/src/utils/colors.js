export function getWalkabilityColor(score) {
  if (score >= 80) return '#16a34a'  // green-600
  if (score >= 60) return '#3b82f6'  // blue-500
  if (score >= 40) return '#eab308'  // yellow-500
  if (score >= 20) return '#f97316'  // orange-500
  return '#dc2626'                    // red-600
}

export function getWalkabilityLabel(score) {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  if (score >= 20) return 'Poor'
  return 'Critical'
}