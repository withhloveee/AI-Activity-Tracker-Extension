export function generateGitHubMonth(data = {}, year, month) {
  const now = new Date()
  year = year ?? now.getFullYear()
  month = month ?? now.getMonth() // 0-indexed (June = 5, July = 6)

  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const monthName = firstDay.toLocaleString('default', { month: 'short' })

  const cells = []

  // Empty cells for days { before month starts }
  for (let i = 0; i < firstDay.getDay(); i++) {
    cells.push(null)
  }

  // Actual month days — always 1..daysInMonth for THIS month only
  for (let day = 1; day <= daysInMonth; day++) {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    cells.push({
      date: key,
      count: data[key] || 0
    })
  }

  return {
    monthName,
    cells,
    daysInMonth
  }
}