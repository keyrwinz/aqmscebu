import React, {useState, useEffect} from 'react';
import { Carousel } from 'react-bootstrap'
import CautionaryStatements from './CautionaryStatements'
import styled from 'styled-components'
import Color from '../Theme/ColorPallete'
import Spinner from '../Spinner'

const styles = {
  spanMeasurements: {
    marginLeft: '15px',
    fontWeight: 'normal'
  }
}

const makeBadge = (classification) => {
  let color = null
  ,   bg = null

  switch (classification) {
    case 'Good':
      bg = 'Green'
      break;
    case 'Fair':
      bg = 'Yellow'
      color = 'Black'
      break;
    case 'Unhealthy':
      bg = 'Orange'
      color = 'Black'
      break;
    case 'Very Unhealthy':
      bg = 'Red'
      break;
    case 'Acutely Unhealthy':
      bg = 'Purple'
      break;
    case 'Emergency':
      bg = 'Maroon'
      break;
    default:
      break;
  }

  return (<span className="badge badge-secondary" style={{background: bg, color: color}}>{classification}</span>)
}

const AQContent = ({loading, nodeName, data}) => {
  let {pm25, pm10, so2, no2, temp, humidity} = data;
  let pm25Data = 'No data'
  ,   pm10Data = 'No data'
  ,   so2Data= 'No data'
  ,   no2Data= 'No data'
  ,   tempData = 'No data'
  ,   humidityData = 'No data'
  ,   pm25Badge = ''
  ,   pm10Badge = ''
  ,   so2Badge = ''
  ,   no2Badge = ''
  
  let paramKeys = []
  let paramClassifications = {
    PM25: null,
    PM10: null,
    NO2: null,
    SO2: null
  }


  pm25 = 50
  pm10 = 154
  no2 = 1.2
  so2 = 0.99
  temp = 35
  humidity = 75

  if(loading){
    pm25Data = <Spinner small={true}/>
    pm10Data = <Spinner small={true}/>
    so2Data= <Spinner small={true}/>
    no2Data= <Spinner small={true}/>
    tempData = <Spinner small={true}/>
    humidityData = <Spinner small={true}/>
  }else{
    if(pm25 || pm25 === 0){
      pm25Data = pm25
      //classification of air quality
      if(pm25 >= 0 && pm25 <= 54){
        paramClassifications['PM25'] = 'Good'
      }else if(pm25 >= 55 && pm25 <= 154){
        paramClassifications['PM25'] = 'Fair'
      }else if(pm25 >= 155 && pm25 <= 254){
        paramClassifications['PM25'] = 'Unhealthy'
      }else if(pm25 >= 255 && pm25 <= 354){
        paramClassifications['PM25'] = 'Very Unhealthy'
      }else if(pm25 >= 355 && pm25 <= 424){
        paramClassifications['PM25'] = 'Acutely Unhealthy'
      }else if(pm25 >= 425 && pm25 <= 504){
        paramClassifications['PM25'] = 'Emergency'
      }else{
        paramClassifications['PM25'] = 'Invalid'
      }
      
      pm25Badge = makeBadge(paramClassifications['PM25'])
    }
  
    if(pm10 || pm10 === 0){
      pm10Data = pm10
      if(pm10 >= 0 && pm10 <= 54){
        paramClassifications['PM10'] = 'Good'
      }else if(pm10 >= 55 && pm10 <= 154){
        paramClassifications['PM10'] = 'Fair'
      }else if(pm10 >= 155 && pm10 <= 254){
        paramClassifications['PM10'] = 'Unhealthy'
      }else if(pm10 >= 255 && pm10 <= 354){
        paramClassifications['PM10'] = 'Very Unhealthy'
      }else if(pm10 >= 355 && pm10 <= 424){
        paramClassifications['PM10'] = 'Acutely Unhealthy'
      }else if(pm10 >= 425 && pm10 <= 504){
        paramClassifications['PM10'] = 'Emergency'
      }else{
        paramClassifications['PM10'] = 'Invalid'
      }
      
      pm10Badge = makeBadge(paramClassifications['PM10'])
    }
    
    if(no2){
      no2Data = no2
      if(no2 >= 0 && no2 <= 0.64){
        //no classification for this range yet
      }else if(no2 >= 0.65 && no2 <= 1.24){
        paramClassifications['NO2'] = 'Acutely Unhealthy'
      }else if(no2 >= 1.25 && no2 <= 1.64){
        paramClassifications['NO2'] = 'Emergency'
      }else {
        paramClassifications['NO2'] = 'Invalid'
      }

      no2Badge = makeBadge(paramClassifications['NO2'])
    }

    if(so2 || so2 === 0){
      so2Data = so2
      if(so2 >= 0 && so2 <= 0.034){
        paramClassifications['SO2'] = 'Good'
      }else if(so2 >= 0.035 && so2 <= 0.144){
        paramClassifications['SO2'] = 'Fair'
      }else if(so2 >= 0.145 && so2 <= 0.224){
        paramClassifications['SO2'] = 'Unhealthy'
      }else if(so2 >= 0.225 && so2 <= 0.304){
        paramClassifications['SO2'] = 'Very Unhealthy'
      }else if(so2 >= 0.305 && so2 <= 0.604){
        paramClassifications['SO2'] = 'Acutely Unhealthy'
      }else if(so2 >= 0.605 && so2 <= 0.804){
        paramClassifications['SO2'] = 'Emergency'
      }else{
        paramClassifications['SO2'] = 'Invalid'
      }

      so2Badge = makeBadge(paramClassifications['SO2'])
    }  
  
    if(temp || temp === 0){
      tempData = temp
    }
  
    if(humidity || humidity === 0){
      humidityData = humidity
    }

    paramKeys = Object.keys(paramClassifications)
  }

  return (
    <Style>
      <div className="measurements-tab">
        <div className="weather-row bold green">
          <span>..</span>
        </div>
        <div style={{width: '100%', borderTop: `1px solid ${Color.fourthColor}`}}>
          <div className="row" style={{paddingLeft: '20px'}}>
            <div className="col col-12" style={{maxHeight: '100px'}}>
              <span>Selected Node: </span>
            </div>
            <div className="col col-12" style={{display: 'flex', alignItems: 'center', maxHeight: '50px'}}>
              <span style={{fontSize: '-webkit-xxx-large', textTransform: 'uppercase'}}>{nodeName}</span>
            </div>
            <div className="col col-12" style={{maxHeight: '100px'}}>
              <span>Measurements:</span>
            </div>
          </div>
          <div style={{marginLeft: '45px'}}>
            <ul style={{listStyle: 'none', fontWeight: 'bold', color: 'white'}}>
              <li>PM2.5: 
                <span style={styles.spanMeasurements}>{pm25Data}</span>&nbsp;&nbsp;{pm25Badge}
              </li>
              <li>PM10: 
                <span style={styles.spanMeasurements}>{pm10Data}</span>&nbsp;&nbsp;{pm10Badge}
              </li>
              <li>NO2: 
                <span style={styles.spanMeasurements}>{no2Data}</span>&nbsp;&nbsp;{no2Badge}
              </li>
              <li>SO2: 
                <span style={styles.spanMeasurements}>{so2Data}</span>&nbsp;&nbsp;{so2Badge}
              </li>
              <li>TEMP: 
                <span style={styles.spanMeasurements}>{tempData}</span>
              </li>
              <li>HUMIDITY: 
                <span style={styles.spanMeasurements}>{humidityData}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="cautionary-tab">
        <div className="cautionary-header">
            <span>Pollutants-Specific Cautionary Statements for</span><br/> 
            <span>the General Public</span>
        </div>
        <div className="cautionary-content">
          <div style={{height: '320px'}}>
            <Carousel style={{height: '100%'}} interval="7000">
              {paramKeys.map((key, index) => {
                return (
                  <Carousel.Item key={index}>
                    <CautionaryStatements param={key} classification={paramClassifications[key]} />
                  </Carousel.Item>
                )
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </Style>
  )
}

const Style = styled.div`
  .bold {
    font-weight: bold;
  }

  .green {
    color: #1cfc03;
  }

  .measurements-tab {
    display: flex; 
    flex-flow: column; 
    border: 1px solid ${Color.fourthColor}; 
    margin-bottom: 10px; 
    height: calc(50% - 5px);
    border-radius: 5px; 
    background: ${Color.thirdColor};
  }

  .weather-row {
    margin-top: 5px; 
    margin-bottom: 5px;
    max-height: 51px;
    min-height: 51px;
  }

  .cautionary-tab {
    display: flex;
    flex-flow: column; 
    border: 1px solid ${Color.fourthColor}; 
    height: calc(50% - 5px); 
    border-radius: 5px; 
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
    border-top: 1px solid ${Color.fourthColor};
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
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background-color: black;
  }

  #style-5::-webkit-scrollbar {
      width: 5px;
      background-color: black;
  }

  #style-5::-webkit-scrollbar-thumb {
    background-color: #99DDFF;
    
    background-image: -webkit-gradient(linear, 0 0, 0 100%,
      color-stop(.5, rgba(255, 255, 255, .2)),
      color-stop(.5, transparent), to(transparent));
  }

  .carousel-control-prev, .carousel-control-next { 
    width: 45px;
  }
`;

export default AQContent;