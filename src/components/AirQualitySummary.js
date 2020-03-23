import React, {useState, useEffect} from 'react';
import { Carousel } from 'react-bootstrap'
import HappyFace from "../assets/images/happy2.png";
import styled from 'styled-components';
import Color from './Theme/ColorPallete'
import Spinner from './Spinner'

const styles = {
  spanMeasurements: {
    marginLeft: '15px',
    fontWeight: 'normal'
  }
}

const makeBadge = ({bg, color, text}) => {
  return (<span className="badge badge-secondary" style={{background: bg, color: color}}>{text}</span>)
}

const AQContent = ({loading, nodeName, data}) => {
  let {pm25, pm10, so2, no2, temp, humidity} = data;
  let pm25Badge = ''
  let pm10Badge = ''
  let so2Badge = ''
  let no2Badge = ''

  pm25 = 10
  pm10 = 10
  no2 = 0.64
  so2 = 0.123
  temp = 35
  humidity = 75

  let pm25Data = 'No data'
  let pm10Data = 'No data'
  let so2Data= 'No data'
  let no2Data= 'No data'
  let tempData = 'No data'
  let humidityData = 'No data'

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
        pm25Badge = makeBadge({bg: 'green', text: 'Good'})
      }else if(pm25 >= 55 && pm25 <= 154){
        pm25Badge = makeBadge({bg: 'Yellow', color: 'black', text: 'Fair'})
      }else if(pm25 >= 155 && pm25 <= 254){
        pm25Badge = makeBadge({bg: 'Orange', color: 'black', text: 'Unhealthy'})
      }else if(pm25 >= 255 && pm25 <= 354){
        pm25Badge = makeBadge({bg: 'Red', text: 'Very Unhealthy'})
      }else if(pm25 >= 355 && pm25 <= 424){
        pm25Badge = makeBadge({bg: 'Purple', text: 'Acutely Unhealthy'})
      }else if(pm25 >= 425 && pm25 <= 504){
        pm25Badge = makeBadge({bg: 'Maroon', text: 'Emergency'})
      }else{
        pm25Badge = makeBadge({text: 'invalid'})
      }
    }
  
    if(pm10 || pm10 === 0){
      pm10Data = pm10
      if(pm10 >= 0 && pm10 <= 54){
        pm10Badge = makeBadge({bg: 'green', text: 'Good'})
      }else if(pm10 >= 55 && pm10 <= 154){
        pm10Badge = makeBadge({bg: 'Yellow', color: 'black', text: 'Fair'})
      }else if(pm10 >= 155 && pm10 <= 254){
        pm10Badge = makeBadge({bg: 'Orange', color: 'black', text: 'Unhealthy'})
      }else if(pm10 >= 255 && pm10 <= 354){
        pm10Badge = makeBadge({bg: 'Red', text: 'Very Unhealthy'})
      }else if(pm10 >= 355 && pm10 <= 424){
        pm10Badge = makeBadge({bg: 'Purple', text: 'Acutely Unhealthy'})
      }else if(pm10 >= 425 && pm10 <= 504){
        pm10Badge = makeBadge({bg: 'Maroon', text: 'Emergency'})
      }else{
        pm10Badge = makeBadge({text: 'invalid'})
      }
    }
  
    if(so2 || so2 === 0){
      so2Data = so2
      if(so2 >= 0 && so2 <= 0.034){
        so2Badge = makeBadge({bg: 'green', text: 'Good'})
      }else if(so2 >= 0.035 && so2 <= 0.144){
        so2Badge = makeBadge({bg: 'Yellow', color: 'black', text: 'Fair'})
      }else if(so2 >= 0.145 && so2 <= 0.224){
        so2Badge = makeBadge({bg: 'Orange', color: 'black', text: 'Unhealthy'})
      }else if(so2 >= 0.225 && so2 <= 0.304){
        so2Badge = makeBadge({bg: 'Red', text: 'Very Unhealthy'})
      }else if(so2 >= 0.305 && so2 <= 0.604){
        so2Badge = makeBadge({bg: 'Purple', text: 'Acutely Unhealthy'})
      }else if(so2 >= 0.605 && so2 <= 0.804){
        so2Badge = makeBadge({bg: 'Maroon', text: 'Emergency'})
      }else{
        so2Badge = makeBadge({text: 'invalid'})
      }
    }  
  
    if(no2){
      no2Data = no2
      if(no2 >= 0 && no2 <= 0.64){
        //no classification for this range yet
      }else if(no2 >= 0.65 && no2 <= 1.24){
        no2Badge = makeBadge({bg: 'Purple', text: 'Acutely Unhealthy'})
      }else if(no2 >= 1.25 && no2 <= 1.64){
        no2Badge = makeBadge({bg: 'Maroon', text: 'Emergency'})
      }else {
        no2Badge = makeBadge({text: 'invalid'})
      }
    }
  
    if(temp || temp === 0){
      tempData = temp
    }
  
    if(humidity || humidity === 0){
      humidityData = humidity
    }
  }

  return (
    <Style>
      <div className="measurements-tab">
        <div className="measurements-label bold green">
          <span>..</span>
        </div>
        <div style={{width: '100%', borderTop: `1px solid ${Color.fourthColor}`, paddingTop: '20px'}}>
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
            {/* <img src={HappyFace} alt="happy-face" height="200" width="200" style={{display: 'block', margin: '30px auto'}} /> */}
            <Carousel style={{height: '100%'}}>
              <Carousel.Item>
                <div className="carousel-content">
                  <h3 className="carousel-content-title">PM10 (Unhealthy)</h3>
                  <div id="style-5" style={{maxHeight: '200px', overflow: 'auto', margin: '0 60px'}}>
                    <ul>
                      <li>People with respiratory disease, such as asthma, should limit outdoor exertion.</li>
                      <li>People with respiratory disease, such as asthma, should limit outdoor exertion.</li>
                      <li>People with respiratory disease, such as asthma, should limit outdoor exertion.</li>
                      <li>People with respiratory disease, such as asthma, should limit outdoor exertion.</li>
                    </ul>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="carousel-content">
                  <h3 className="carousel-content-title">PM10 (health)</h3>
                  <div id="style-5" style={{maxHeight: '200px', overflow: 'auto', margin: '0 60px'}}>
                    <ul>
                      <li>People with respiratory disease, such as asthma, should limit outdoor exertion.</li>
                      <li>People with respiratory disease, such as asthma, should limit outdoor exertion.</li>
                      <li>People with respiratory disease, such as asthma, should limit outdoor exertion.</li>
                      <li>People with respiratory disease, such as asthma, should limit outdoor exertion.</li>
                    </ul>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="carousel-content">
                  <h3 className="carousel-content-title">PM10 (emergency)</h3>
                  <div id="style-5" style={{maxHeight: '200px', overflow: 'auto', margin: '0 60px'}}>
                    <ul>
                      <li>People with respiratory disease, such as asthma, should limit outdoor exertion.</li>
                      <li>People with respiratory disease, such as asthma, should limit outdoor exertion.</li>
                      <li>People with respiratory disease, such as asthma, should limit outdoor exertion.</li>
                      <li>People with respiratory disease, such as asthma, should limit outdoor exertion.</li>
                    </ul>
                  </div>
                </div>
              </Carousel.Item>
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

  .measurements-label {
    align-self: center; 
    margin-top: 5px; 
    margin-bottom: 5px;
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
    width: 10%;
  }
`;

export default AQContent;