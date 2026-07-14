export function generateGitHubMonth(data = {}, year, month) {
  const now = new Date()
  year = year ?? now.getFullYear()
  month = month ?? now.getMonth()

  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthName = firstDay.toLocaleString('default', { month: 'short' })
  const cells = []

  // Empty cells align the first day with its weekday.
  for (let i = 0; i < firstDay.getDay(); i++) {
    cells.push(null)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    cells.push({
      date: dateKey,
      count: data[dateKey] || 0
    })
  }

  return {
    monthName,
    cells,
    daysInMonth
  }
}

export function getLevel(count) {
  if (count === 0) return 'level-0'
  if (count <= 10) return 'level-1'
  if (count <= 20) return 'level-2'
  if (count <=30) return 'level-3'
  return 'level-4'
}
