import React from 'react'

const makeBadge = (classification) => {
  let color = null
  let bg = null

  switch (classification) {
    case 'Good':
      bg = 'limegreen'
      break
    case 'Fair':
      bg = 'yellow'
      color = 'black'
      break
    case 'Unhealthy':
      bg = 'orange'
      color = 'black'
      break
    case 'Very Unhealthy':
      bg = 'red'
      break
    case 'Acutely Unhealthy':
      bg = 'purple'
      break
    case 'Emergency':
      bg = 'maroon'
      break
    default:
      break
  }

  return (
    <span className="badge badge-secondary" style={{ background: bg, color }}>
      {classification}
    </span>
  )
}

export default makeBadge
