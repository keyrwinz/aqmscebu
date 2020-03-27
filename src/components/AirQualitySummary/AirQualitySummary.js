import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Clock from 'react-live-clock'
import {
  Carousel, OverlayTrigger, Popover,
} from 'react-bootstrap'
import styled from 'styled-components'
import CautionaryStatements from './CautionaryStatements'
import Color from '../Theme/ColorPallete'
import Spinner from '../Spinner'
import nodes from '../GoogleMap/AqmsNodes'

const WEATHER_API = 'e48a7eafd3731c7718a4c34b6a06e78f'

const styles = {
  spanMeasurements: {
    marginLeft: '15px',
    fontWeight: 'normal',
  },
}

const popover = (param, param2 = null) => {
  let title = ''
  let unit = ''

  if (param === 'PM25') {
    title = 'Particulate Matter 2.5'
    unit = 'µg/m³'
  } else if (param === 'PM10') {
    title = 'Particulate Matter 10'
    unit = 'µg/m³'
  } else if (param === 'NO2') {
    title = 'Nitrogen Dioxide'
    unit = 'ppm'
  } else if (param === 'SO2') {
    title = 'Sulfur Dioxide'
    unit = 'ppm'
  } else if (param === 'TEMP') {
    title = 'Temperature'
    unit = '°C'
  } else if (param === 'HUMIDITY') {
    title = 'Humidity'
    unit = '%'
  } else if (param === 'weather') {
    title = 'Current Weather'
    unit = param2 || 'No weather data'
  }

  return (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{title}</Popover.Title>
      <Popover.Content>
        unit:
        {' '}
        <strong>{unit}</strong>
      </Popover.Content>
    </Popover>
  )
}

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

const AQContent = ({
  loading, nodeName, data,
}) => {
  // let {
  //   pm25, pm10, so2, no2, temp, humidity,
  // } = data
  let {
    temp, humidity,
  } = data

  const [weatherIcon, setWeatherIcon] = useState(null)
  const [weather, setWeather] = useState({ loading: true })

  const fetchWeather = async ({ lat, lng }) => {
    setWeatherIcon(() => <Spinner small />)
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${WEATHER_API}/${lat},${lng}`)
    const resData = await response.json()
    const { icon } = resData.currently
    /* eslint-disable global-require */
    /* eslint-disable import/no-dynamic-require */
    const iconSrc = require(`../../assets/weather-icons/${icon}.svg`)
    setWeatherIcon(() => <img src={iconSrc} alt="weather-icon" height="60" />)
    setWeather(resData)
  }

  useEffect(() => {
    const nodeObj = nodes.nodesLoc.find((obj) => obj.id === nodeName)
    fetchWeather(nodeObj)
  }, [nodeName])

  // eslint-disable-next-line one-var
  let pm25Data = 'No data',
    pm10Data = 'No data',
    so2Data = 'No data',
    no2Data = 'No data',
    tempData = 'No data',
    humidityData = 'No data',
    pm25Badge = '',
    pm10Badge = '',
    so2Badge = '',
    no2Badge = ''

  let paramKeys = []
  const paramClassifications = {
    PM25: null,
    PM10: null,
    NO2: null,
    SO2: null,
  }

  // for testing
  const [pm25, setPM25] = useState(50)
  const [pm10, setPM10] = useState(154)
  const [no2, setNO2] = useState(1.2)
  const [so2, setSO2] = useState(0.99)

  // pm25 = 50
  // pm10 = 154
  // no2 = 1.2
  // so2 = 0.99
  temp = 35
  humidity = 75

  const randomNum = () => {
    setPM25((Math.random() * (504 - 0) + 0).toFixed(2))
    setPM10((Math.random() * (504 - 0) + 0).toFixed(2))
    setNO2((Math.random() * (1.64 - 0) + 0).toFixed(2))
    setSO2((Math.random() * (0.804 - 0) + 0).toFixed(2))
  }

  if (loading) {
    pm25Data = <Spinner small />
    pm10Data = <Spinner small />
    so2Data = <Spinner small />
    no2Data = <Spinner small />
    tempData = <Spinner small />
    humidityData = <Spinner small />
  } else {
    if (pm25 || pm25 === 0) {
      pm25Data = pm25
      // classification of air quality
      if (pm25 >= 0 && pm25 <= 54) {
        paramClassifications.PM25 = 'Good'
      } else if (pm25 >= 55 && pm25 <= 154) {
        paramClassifications.PM25 = 'Fair'
      } else if (pm25 >= 155 && pm25 <= 254) {
        paramClassifications.PM25 = 'Unhealthy'
      } else if (pm25 >= 255 && pm25 <= 354) {
        paramClassifications.PM25 = 'Very Unhealthy'
      } else if (pm25 >= 355 && pm25 <= 424) {
        paramClassifications.PM25 = 'Acutely Unhealthy'
      } else if (pm25 >= 425 && pm25 <= 504) {
        paramClassifications.PM25 = 'Emergency'
      } else {
        paramClassifications.PM25 = 'Invalid'
      }

      pm25Badge = makeBadge(paramClassifications.PM25)
    }
    if (pm10 || pm10 === 0) {
      pm10Data = pm10
      if (pm10 >= 0 && pm10 <= 54) {
        paramClassifications.PM10 = 'Good'
      } else if (pm10 >= 55 && pm10 <= 154) {
        paramClassifications.PM10 = 'Fair'
      } else if (pm10 >= 155 && pm10 <= 254) {
        paramClassifications.PM10 = 'Unhealthy'
      } else if (pm10 >= 255 && pm10 <= 354) {
        paramClassifications.PM10 = 'Very Unhealthy'
      } else if (pm10 >= 355 && pm10 <= 424) {
        paramClassifications.PM10 = 'Acutely Unhealthy'
      } else if (pm10 >= 425 && pm10 <= 504) {
        paramClassifications.PM10 = 'Emergency'
      } else {
        paramClassifications.PM10 = 'Invalid'
      }

      pm10Badge = makeBadge(paramClassifications.PM10)
    }

    if (no2) {
      no2Data = no2
      if (no2 >= 0 && no2 <= 0.64) {
        // no classification for this range yet
      } else if (no2 >= 0.65 && no2 <= 1.24) {
        paramClassifications.NO2 = 'Acutely Unhealthy'
      } else if (no2 >= 1.25 && no2 <= 1.64) {
        paramClassifications.NO2 = 'Emergency'
      } else {
        paramClassifications.NO2 = 'Invalid'
      }

      no2Badge = makeBadge(paramClassifications.NO2)
    }

    if (so2 || so2 === 0) {
      so2Data = so2
      if (so2 >= 0 && so2 <= 0.034) {
        paramClassifications.SO2 = 'Good'
      } else if (so2 >= 0.035 && so2 <= 0.144) {
        paramClassifications.SO2 = 'Fair'
      } else if (so2 >= 0.145 && so2 <= 0.224) {
        paramClassifications.SO2 = 'Unhealthy'
      } else if (so2 >= 0.225 && so2 <= 0.304) {
        paramClassifications.SO2 = 'Very Unhealthy'
      } else if (so2 >= 0.305 && so2 <= 0.604) {
        paramClassifications.SO2 = 'Acutely Unhealthy'
      } else if (so2 >= 0.605 && so2 <= 0.804) {
        paramClassifications.SO2 = 'Emergency'
      } else {
        paramClassifications.SO2 = 'Invalid'
      }

      so2Badge = makeBadge(paramClassifications.SO2)
    }

    if (temp || temp === 0) {
      tempData = temp
    }

    if (humidity || humidity === 0) {
      humidityData = humidity
    }

    paramKeys = Object.keys(paramClassifications)
  }

  return (
    <Style>
      <div className="measurements-tab">
        <div className="weather-row">
          <div className="weather-icon">
            <OverlayTrigger
              placement="top"
              overlay={popover('weather', weather.loading ? 'Loading...' : weather.currently.icon)}
            >
              <span>{weatherIcon}</span>
            </OverlayTrigger>
          </div>
          &nbsp;&nbsp;
          <div className="weather-summary">
            {weather.loading ? <Spinner small /> : weather.currently.summary }
          </div>
          <div className="clock">
            <Clock
              format="h:mm A"
              ticking
              timezone="Asia/Singapore"
            />
          </div>
        </div>
        <div
          style={{ width: '100%', borderTop: `1px solid ${Color.fourthColor}33` }}
        >
          <div className="row" style={{ paddingLeft: '20px' }}>
            <div className="col col-12" style={{ maxHeight: '100px', paddingRight: '50px' }}>
              <span>Selected Node: </span>
              <button type="button" style={{ float: 'right' }} onClick={() => randomNum()}>random</button>
            </div>
            <div
              className="col col-12"
              style={{
                display: 'flex',
                alignItems: 'center',
                maxHeight: '50px',
              }}
            >
              <span
                style={{
                  fontSize: '-webkit-xxx-large',
                  textTransform: 'uppercase',
                }}
              >
                {nodeName}
              </span>
            </div>
            <div className="col col-12" style={{ maxHeight: '100px' }}>
              <span>Measurements:</span>
            </div>
          </div>
          <div style={{ marginLeft: '45px' }}>
            <ul
              style={{ listStyle: 'none', fontWeight: 'bold', color: 'white' }}
            >
              <li>
                <OverlayTrigger
                  placement="top"
                  overlay={popover('PM25')}
                >
                  <span>PM2.5:</span>
                </OverlayTrigger>
                <span style={styles.spanMeasurements}>{pm25Data}</span>
                &nbsp;&nbsp;
                {pm25Badge}
              </li>
              <li>
                <OverlayTrigger
                  placement="top"
                  overlay={popover('PM10')}
                >
                  <span>PM10:</span>
                </OverlayTrigger>
                <span style={styles.spanMeasurements}>{pm10Data}</span>
                &nbsp;&nbsp;
                {pm10Badge}
              </li>
              <li>
                <OverlayTrigger
                  placement="top"
                  overlay={popover('NO2')}
                >
                  <span>NO2:</span>
                </OverlayTrigger>
                <span style={styles.spanMeasurements}>{no2Data}</span>
                &nbsp;&nbsp;
                {no2Badge}
              </li>
              <li>
                <OverlayTrigger
                  placement="top"
                  overlay={popover('SO2')}
                >
                  <span>SO2:</span>
                </OverlayTrigger>
                <span style={styles.spanMeasurements}>{so2Data}</span>
                &nbsp;&nbsp;
                {so2Badge}
              </li>
              <li>
                <OverlayTrigger
                  placement="top"
                  overlay={popover('TEMP')}
                >
                  <span>TEMP:</span>
                </OverlayTrigger>
                <span style={styles.spanMeasurements}>{tempData}</span>
              </li>
              <li>
                <OverlayTrigger
                  placement="top"
                  overlay={popover('HUMIDITY')}
                >
                  <span>HUMIDITY:</span>
                </OverlayTrigger>
                <span style={styles.spanMeasurements}>{humidityData}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="cautionary-tab">
        <div className="cautionary-header">
          <span>Pollutants-Specific Cautionary Statements for</span>
          <br />
          <span>the General Public</span>
        </div>
        <div className="cautionary-content">
          <div style={{ height: '320px' }}>
            <Carousel style={{ height: '100%' }} interval="10000">
              {paramKeys.map((key, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Carousel.Item key={index}>
                  <CautionaryStatements
                    param={key}
                    classification={paramClassifications[key]}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </Style>
  )
}

AQContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  nodeName: PropTypes.string.isRequired,
  data: PropTypes.shape({
    pm25: PropTypes.number,
    pm10: PropTypes.number,
    no2: PropTypes.number,
    so2: PropTypes.number,
    temp: PropTypes.number,
    humidity: PropTypes.number,
  }).isRequired,
}

const Style = styled.div`
  .measurements-tab {
    display: flex;
    flex-flow: column;
    margin-bottom: 10px;
    height: calc(50% - 5px);
    background: ${Color.thirdColor};
  }

  .weather-row {
    color: white;
    position: relative;
    max-height: 51px;
    min-height: 51px;
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipses;
  }

  .weather-row img {
    margin: 0;
    padding: 0;
  }

  .clock {
    right: 0;
    position: absolute;
    height: 51px;
    display: flex;
    align-items: center;
    background: ${Color.thirdColor};
    padding-left: 10px;
  }

  .cautionary-tab {
    display: flex;
    flex-flow: column;
    height: 400px;
    background: ${Color.thirdColor};
  }

  .cautionary-header {
    align-self: center;
    margin-top: 5px;
    margin-bottom: 5px;
    font-weight: bold;
    text-align: center;
    padding: 0 5px;
  }

  .cautionary-content {
    width: 100%;
    border-top: 1px solid ${Color.fourthColor}33;
    padding-top: 0px;
    min-height: 320px;
    max-height: 320px;
  }

  .carousel-content {
    margin-top: 10px;
    color: white;
  }
  .carousel-content-title {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 10px;
    margin-right: 10px;
  }
  .carousel-content ul {
    list-style: none;
  }

  #style-5::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: black;
  }

  #style-5::-webkit-scrollbar {
    width: 5px;
    background-color: black;
  }

  #style-5::-webkit-scrollbar-thumb {
    background-color: #99ddff;

    background-image: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      color-stop(0.5, rgba(255, 255, 255, 0.2)),
      color-stop(0.5, transparent),
      to(transparent)
    );
  }

  .carousel-control-prev,
  .carousel-control-next {
    width: 45px;
  }
  
  .carousel-indicators {
    bottom: -30px !important;
  }
`

export default AQContent
