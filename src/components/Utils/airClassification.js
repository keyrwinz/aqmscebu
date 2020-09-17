const classification = (param, value) => {
  switch (param) {
    case 'pm25':
      if (value >= 0 && value <= 54) return 'Good'
      if (value >= 55 && value <= 154) return 'Fair'
      if (value >= 155 && value <= 254) return 'Unhealthy'
      if (value >= 255 && value <= 354) return 'Very Unhealthy'
      if (value >= 355 && value <= 424) return 'Acutely Unhealthy'
      if (value >= 425) return 'Emergency'
      // if (value >= 425 && value <= 504) return 'Emergency'
      return 'Invalid'
    case 'pm10':
      if (value >= 0 && value <= 54) return 'Good'
      if (value >= 55 && value <= 154) return 'Fair'
      if (value >= 155 && value <= 254) return 'Unhealthy'
      if (value >= 255 && value <= 354) return 'Very Unhealthy'
      if (value >= 355 && value <= 424) return 'Acutely Unhealthy'
      if (value >= 425) return 'Emergency'
      // if (value >= 425 && value <= 504) return 'Emergency'
      return 'Invalid'
    case 'no2':
      // no classification yet for range 0 to 0.64
      // if (value >= 0 && value <= 0.64) return 'No classification'
      // if (value >= 0.65 && value <= 1.24) return 'Acutely Unhealthy'
      // if (value >= 1.25) return 'Emergency'
      // if (value >= 1.25 && value <= 1.64) return 'Emergency'
      if (value >= 0 && value <= 0.053) return 'Good'
      if (value >= 0.054 && value <= 0.1) return 'Fair'
      if (value >= 0.101 && value <= 0.15) return 'Unhealthy'
      if (value >= 0.151 && value <= 0.2) return 'Unhealthy'
      if (value >= 0.201 && value <= 0.3) return 'Very Unhealthy'
      if (value >= 0.301 && value <= 0.4) return 'Acutely Unhealthy'
      if (value >= 0.401 && value <= 0.5) return 'Acutely Unhealthy'
      if (value > 0.5) return 'Emergency'
      return 'No classification'
    case 'so2':
      if (value >= 0 && value <= 0.034) return 'Good'
      if (value >= 0.035 && value <= 0.144) return 'Fair'
      if (value >= 0.145 && value <= 0.224) return 'Unhealthy'
      if (value >= 0.225 && value <= 0.304) return 'Very Unhealthy'
      if (value >= 0.305 && value <= 0.604) return 'Acutely Unhealthy'
      if (value >= 0.605) return 'Emergency'
      // if (value >= 0.605 && value <= 0.804) return 'Emergency'
      return 'Invalid'
    default:
      break
  }
  return 'Invalid'
}

export default classification
