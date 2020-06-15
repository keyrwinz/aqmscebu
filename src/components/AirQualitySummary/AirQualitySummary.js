import React from 'react'
import PropTypes from 'prop-types'
import {
  Carousel, OverlayTrigger,
} from 'react-bootstrap'
import styled from 'styled-components'
import WeatherSummary from '../WeatherSummary'
import CautionaryStatements from '../CautionaryStatements'
import Color from '../Theme/ColorPallete'
import Spinner from '../Spinner'
import popover from '../Utils/popover'
import airClassification from '../Utils/airClassification'
import makeBadge from '../Utils/makeBadge'

const AQContent = ({ node, state, loading }) => {
  const pm25 = state?.p2
  const pm10 = state?.p1
  const no2 = state?.n
  const so2 = state?.s
  const temp = state?.te
  const humidity = state?.h

  const data = {
    PM25: { value: 'No data', badge: '' },
    PM10: { value: 'No data', badge: '' },
    NO2: { value: 'No data', badge: '' },
    SO2: { value: 'No data', badge: '' },
    TEMP: { value: 'No data', badge: '' },
    HUMIDITY: { value: 'No data', badge: '' },
  }

  let paramKeys = []
  const paramClassifications = {
    PM25: null,
    PM10: null,
    NO2: null,
    SO2: null,
  }

  if (loading) {
    data.PM25.value = <Spinner small />
    data.PM10.value = <Spinner small />
    data.NO2.value = <Spinner small />
    data.SO2.value = <Spinner small />
    data.TEMP.value = <Spinner small />
    data.HUMIDITY.value = <Spinner small />
  } else {
    if (pm25 || pm25 === 0) {
      data.PM25.value = pm25
      paramClassifications.PM25 = airClassification('pm25', pm25)
      data.PM25.badge = makeBadge(paramClassifications.PM25)
    }
    if (pm10 || pm10 === 0) {
      data.PM10.value = pm10
      paramClassifications.PM10 = airClassification('pm10', pm10)
      data.PM10.badge = makeBadge(paramClassifications.PM10)
    }
    if (no2 || no2 === 0) {
      data.NO2.value = no2
      paramClassifications.NO2 = airClassification('no2', no2)
      data.NO2.badge = makeBadge(paramClassifications.NO2)
    }
    if (so2 || so2 === 0) {
      data.SO2.value = so2
      paramClassifications.SO2 = airClassification('so2', so2)
      data.SO2.badge = makeBadge(paramClassifications.SO2)
    }
    if (temp || temp === 0) {
      data.TEMP.value = temp
    }
    if (humidity || humidity === 0) {
      data.HUMIDITY.value = temp
    }
    paramKeys = Object.keys(paramClassifications)
  }

  return (
    <Style>
      <div className="measurements-tab">
        <div className="weather-row">
          <WeatherSummary popover={popover} />
        </div>
        <div className="measurements-row">
          <div className="row measurements-title">
            <div className="col col-12">
              <span>Selected Node: </span>
            </div>
            <div className="col col-12 selected-node-title-wrapper">
              <span className="selected-node-title">
                {node}
              </span>
            </div>
            <div className="col col-12">
              <span>Measurements:</span>
            </div>
          </div>
          <div className="measurements-data">
            <ul>
              {Object.keys(data).map((param, index) => (
                <li key={param}>
                  <OverlayTrigger
                    placement="top"
                    overlay={popover(param)}
                  >
                    <span className="param-label">
                      {/* index < 4 -> excluding TEMP and HUMIDITY label from having <sub></sub> */}
                      {index < 4 ? param.slice(0, 2) : param}
                      <sub>
                        {index < 4 ? param.slice(2, 4) : ' '}
                        {' '}
                      </sub>
                      :
                    </span>
                  </OverlayTrigger>
                  <span className={`param-value ${data[param].value === 'No data' ? 'warning' : ''}`}>
                    {data[param].value}
                  </span>
                  {data[param].badge}
                </li>
              ))}
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
            {loading ? <Spinner /> : (
              <Carousel style={{ height: '100%' }} interval="10000">
                {paramKeys.map((key) => (
                  <Carousel.Item key={key}>
                    <CautionaryStatements
                      param={key}
                      classification={paramClassifications[key]}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </Style>
  )
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

  .measurements-row {
    width: 100%; 
    border-top: 1px solid ${Color.fourthColor + 33};
  }

  .measurements-title {
    width: 100%;
    margin: 0;
    padding-left: 15px;
    padding-right: 15px;
  }

  .selected-node-title-wrapper {
    display: flex;
    align-items: center;
    max-height: 50px;
    font-size: -webkit-xxx-large;
    text-transform: uppercase;
  }

  .selected-node-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .measurements-data {
    margin-left: 45px;
  }

  .measurements-data ul {
    list-style: none;
    color: white;
  }

  .param-label:hover {
    cursor: help;
  }

  .param-value {
    color: ${Color.secondaryColor};
    margin: 0px 10px 0px 10px;
    font-weight: bold;
  }

  .warning {
    color: yellow;
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

  .carousel-control-prev,
  .carousel-control-next {
    width: 45px;
  }

  @media (min-width: 978px) {
    .carousel-indicators {
      bottom: -30px;
    }
  }
  @media (min-width: 768px) and (max-width: 977px) {
    .carousel-indicators {
      bottom: -10px;
    }
  }
  @media (min-width: 354px) and (max-width: 767px) {
    .carousel-indicators {
      bottom: -30px;
    }
  }
`

AQContent.propTypes = {
  node: PropTypes.string.isRequired,
  state: PropTypes.shape(),
  loading: PropTypes.bool,
}

AQContent.defaultProps = {
  state: {},
  loading: false,
}

export default AQContent
