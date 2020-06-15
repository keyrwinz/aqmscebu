import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { OverlayTrigger } from 'react-bootstrap'
import { AppCtx } from '../../../provider'
import WeatherIcon from './WeatherIcon'
import { AirMonitoringNodes as AqmsNodes } from '../../config'
import Spinner from '../Spinner'

const { API_WEATHER } = process.env

const WeatherSummary = ({ popover }) => {
  const store = useContext(AppCtx)
  const { node } = store
  const [weatherIcon, setWeatherIcon] = useState(null)
  const [weather, setWeather] = useState({ loading: true })

  const fetchWeather = async ({ lat, lng }) => {
    setWeatherIcon(null)
    setWeather({ loading: true })
    try {
      const response = await axios(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_WEATHER}/${lat},${lng}`)
      const { data } = response
      const { icon } = data.currently
      setWeatherIcon(<WeatherIcon icon={icon} />)
      setWeather(data)
    } catch (error) {
      console.log({ error })
    }
  }

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
