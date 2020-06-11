import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { OverlayTrigger } from 'react-bootstrap'
import { AppCtx } from '../../../provider'
import AqmsNodes from '../GoogleMap/AqmsNodes'
import Spinner from '../Spinner'

const { API_WEATHER } = process.env

const WeatherSummary = ({ popover }) => {
  const store = useContext(AppCtx)
  const { node } = store
  const [weatherIcon, setWeatherIcon] = useState(null)
  const [weather, setWeather] = useState({ loading: true })

  const fetchWeather = async ({ lat, lng }) => {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_WEATHER}/${lat},${lng}`)
    const resData = await response.json()
    const { icon } = resData.currently
    /* eslint-disable global-require */
    /* eslint-disable import/no-dynamic-require */
    const iconSrc = require(`../../assets/weather-icons/${icon}.svg`)
    setWeatherIcon(() => <img src={iconSrc} alt="weather-icon" height="60" />)
    setWeather(resData)
  }

  // set weather location
  useEffect(() => {
    const nodeObj = AqmsNodes.nodesLoc.find((obj) => obj.id === node)
    fetchWeather(nodeObj)
  }, [node])

  return (
    <>
      <div className="weather-icon">
        <OverlayTrigger
          placement="top"
          overlay={popover('weather', weather.loading ? 'Loading...' : weather.currently.icon)}
        >
          <span>{weatherIcon}</span>
        </OverlayTrigger>
      </div>
      <div className="weather-summary">
        {weather.loading ? <Spinner small style={{ marginLeft: '15px' }} /> : weather.currently.summary }
      </div>
    </>
  )
}

WeatherSummary.propTypes = {
  popover: PropTypes.func.isRequired,
}

export default WeatherSummary
