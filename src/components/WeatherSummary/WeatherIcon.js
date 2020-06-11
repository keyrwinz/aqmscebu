import React from 'react'
import PropTypes from 'prop-types'
import ClearDay from '../../assets/weather-icons/clear-day.svg'
import ClearNight from '../../assets/weather-icons/clear-night.svg'
import Cloudy from '../../assets/weather-icons/cloudy.svg'
import Fog from '../../assets/weather-icons/fog.svg'
import PartlyCloudyDay from '../../assets/weather-icons/partly-cloudy-day.svg'
import PartlyCloudyNight from '../../assets/weather-icons/partly-cloudy-night.svg'
import Rain from '../../assets/weather-icons/rain.svg'
import Snow from '../../assets/weather-icons/snow.svg'
import Thunderstorm from '../../assets/weather-icons/thunderstorm.svg'
import Wind from '../../assets/weather-icons/wind.svg'

const GetIcon = (icon) => {
  switch (icon) {
    case 'clear-day': return ClearDay
    case 'clear-night': return ClearNight
    case 'cloudy': return Cloudy
    case 'fog': return Fog
    case 'partly-cloudy-day': return PartlyCloudyDay
    case 'partly-cloudy-night': return PartlyCloudyNight
    case 'rain': return Rain
    case 'snow': return Snow
    case 'thunderstorm': return Thunderstorm
    case 'wind': return Wind
    default: return ClearDay
  }
}

const WeatherIcon = ({ icon }) => {
  const iconSrc = GetIcon(icon)
  return <img src={iconSrc} alt="weather-icon" height="60" />
}

WeatherIcon.propTypes = {
  icon: PropTypes.string.isRequired,
}

export default WeatherIcon
