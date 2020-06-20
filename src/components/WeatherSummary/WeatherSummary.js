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
  const [weather, setWeather] = useState({
    loading: true, icon: null, data: null, error: false,
  })
  const { CancelToken } = axios
  const source = CancelToken.source()
  let unmounted = false

  const fetchWeather = async ({ lat, lng }) => {
    setWeather({
      loading: true, icon: null, data: null, error: false,
    })
    try {
      const response = await axios(
        `https://airnuff.herokuapp.com/https://api.darksky.net/forecast/${API_WEATHER}/${lat},${lng}`,
        { cancelToken: source.token },
      )
      const { data } = response
      const { icon } = data.currently
      if (!unmounted) {
        setWeather({
          loading: false, icon: <WeatherIcon icon={icon} />, data, error: false,
        })
      }
    } catch (error) {
      if (!unmounted) {
        setWeather({ ...weather, loading: false, error: true })
        console.log('Error fetching weather data')
      }
    }
  }

  useEffect(() => {
    const nodeObj = AqmsNodes.nodesLoc.find((obj) => obj.id === node)
    fetchWeather(nodeObj)
    return () => {
      unmounted = true
      source.cancel()
    }
  }, [node])

  if (weather.loading) return <Spinner small style={{ marginLeft: '15px' }} />
  if (weather.error) return <div style={{ marginLeft: '14px' }}>Error fetching weather data</div>

  return (
    <>
      <div className="weather-icon">
        <OverlayTrigger
          placement="top"
          overlay={popover('weather', weather.data?.currently.icon)}
        >
          <span>{weather.icon}</span>
        </OverlayTrigger>
      </div>
      <div className="weather-summary">
        {weather.data?.currently.summary }
      </div>
    </>
  )
}

WeatherSummary.propTypes = {
  popover: PropTypes.func.isRequired,
}

export default WeatherSummary
