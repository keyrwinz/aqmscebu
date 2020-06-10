import React from 'react'

const makeBadge = (classification) => {
  let color = null
  let bg = null

  switch (classification) {
    case 'Good':
      bg = 'Green'
      break
    case 'Fair':
      bg = 'Yellow'
      color = 'Black'
      break
    case 'Unhealthy':
      bg = 'Orange'
      color = 'Black'
      break
    case 'Very Unhealthy':
      bg = 'Red'
      break
    case 'Acutely Unhealthy':
      bg = 'Purple'
      break
    case 'Emergency':
      bg = 'Maroon'
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
