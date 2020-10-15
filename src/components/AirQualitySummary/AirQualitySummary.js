import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'react-bootstrap'
import styled from 'styled-components'
import { AirMonitoringNodes as AqmsNodes } from '../../config'
import WeatherSummary from '../WeatherSummary'
import CautionaryStatements from '../CautionaryStatements'
import GaugeComponent from '../Graphs/GaugeComponent'
import Color from '../Theme/ColorPallete'
import Spinner from '../Spinner'
import popover from '../Utils/popover'
import airClassification from '../Utils/airClassification'

const AQContent = ({ node, state, loading }) => {
  const pm25 = state?.p2
  const pm10 = state?.p1
  const no2 = state?.n
  const so2 = state?.s
  const temp = state?.te
  const humidity = state?.h

  const selectedNode = AqmsNodes.nodesLoc.find((nodeObj) => nodeObj.id === node)

  const data = {
    PM25: { value: 'No data', classification: '' },
    PM10: { value: 'No data', classification: '' },
    NO2: { value: 'No data', classification: '' },
    SO2: { value: 'No data', classification: '' },
  }

  const variables = {
    Temperature: { value: 'No data' },
    Humidity: { value: 'No data' },
  }

  if (!loading) {
    if (pm25 || pm25 === 0) {
      data.PM25.value = pm25
      data.PM25.classification = airClassification('pm25', pm25)
    }
    if (pm10 || pm10 === 0) {
      data.PM10.value = pm10
      data.PM10.classification = airClassification('pm10', pm10)
    }
    if (no2 || no2 === 0) {
      data.NO2.value = no2
      data.NO2.classification = airClassification('no2', no2)
    }
    if (so2 || so2 === 0) {
      data.SO2.value = so2
      data.SO2.classification = airClassification('so2', so2)
    }
    if (temp || temp === 0) {
      variables.Temperature.value = temp
    }
    if (humidity || humidity === 0) {
      variables.Humidity.value = humidity
    }
  }

  return (
    <Style>
      <div className="measurements-tab">
        <div className="weather-row">
          <WeatherSummary popover={popover} />
        </div>
        <div className="measurements-row">
          <div className="row measurements-title">
            <div className="col col-12 selected-node-title-wrapper">
              <span className="selected-node-title">
                {/* <span className="uppercase">{`${selectedNode.id}, `}</span> */}
                {selectedNode.text || 'No selected node'}
              </span>
            </div>
          </div>
          <div className="measurements-data">
            <div className="measurements-pollutants">
              <div className="pollutants-title">Pollutants</div>
              <div className="pollutants-gauges">
                { Object.keys(data).map((param) => (
                  <div className="measurement-gauge" key={param}>
                    <GaugeComponent
                      loading={loading}
                      param={param}
                      value={data[param].value}
                      classification={data[param].classification}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="measurements-environment">
              <div className="variables-title">Variables</div>
              <div className="variables-gauges">
                { Object.keys(variables).map((param) => (
                  <div className="measurement-gauge" key={param}>
                    <GaugeComponent
                      loading={loading}
                      param={param}
                      value={variables[param].value}
                    />
                  </div>
                ))}
              </div>
            </div>
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
                {Object.keys(data).map((param) => (
                  <Carousel.Item key={param}>
                    <CautionaryStatements
                      param={param}
                      classification={data[param].classification}
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

  .uppercase {
    text-transform: uppercase;
  }

  .selected-node-title-wrapper {
    align-items: center;
    text-align: center;
  }

  .selected-node-title {
    color: ${Color.whiteColor};
  }

  // <-- POLLUTANTS AND VARIABLES -->
  .measurements-data {
    display: flex;
    padding: 0px 15px;
  }
  @media (min-width: 902px) {
    .measurements-data {
      min-height: 337px;
      max-height: 337px;
    }
  }
  .measurements-pollutants {
    flex: 1;
    flex-flow: column;
    display: flex;
    flex-wrap: wrap;
  }
  .pollutants-title {
    padding-left: 15px;
    margin-bottom: 15px;
  }
  .pollutants-gauges {
    display: flex;
    flex-wrap: wrap;
  }
  .variables-title {
    text-align: center;
    padding-left: 20px;
    margin-bottom: 15px;
  }
  .variables-gauges {
    padding-left: 20px;
    border-left: 1px solid ${Color.primaryColor};
  }
  .measurement-gauge {
    min-height: 125px;
    flex: 1 0 35%;
    margin-bottom: 10px;
  }
  
  // <-- CAUTIONARY STATEMENTS TAB -->
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
