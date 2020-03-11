import React from 'react';
import HappyFace from "../assets/images/happy.png";
import styled from 'styled-components';

const styles = {
  spanMeasurements: {
    marginLeft: '15px',
    fontWeight: 'normal'
  }
}

const AQContent = ({nodeName, data}) => {
  let {pm25, pm10, so2, no2} = data;
  let pm25Badge = ''
  let pm10Badge = ''
  let so2Badge = ''
  let no2Badge = ''

  const makeBadge = ({bg, color, text}) => {
    return (<span className="badge badge-secondary" style={{background: bg, color: color}}>{text}</span>)
  }


  if(data.pm25){
    if(pm25 >= 0 && pm25 <= 54){
      pm25Badge = makeBadge({bg: 'green', text: 'Good'})
    }else if(pm25 >= 55 && pm25 <= 154){
      pm25Badge = makeBadge({bg: 'Yellow', color: 'black', text: 'Fair'})
    }else if(pm25 >= 155 && pm25 <= 254){
      pm25Badge = makeBadge({bg: 'Orange', text: 'Unhealthy'})
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

  return (
    <Style>
      <div className="measurements-tab">
        <div className="measurements-label bold green">
          <span>..</span>
        </div>
        <div style={{width: '100%', borderTop: '1px solid black', paddingTop: '20px'}}>
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
                <span style={styles.spanMeasurements}> {data.pm25 || 'loading...'} </span>
                {pm25Badge}
              </li>
              <li>PM10: 
                <span style={styles.spanMeasurements}> {data.pm10 || 'loading...'} </span>
              </li>
              <li>NO2: 
                <span style={styles.spanMeasurements}> {data.no2 || 'loading...'} </span>
              </li>
              <li>SO2: 
                <span style={styles.spanMeasurements}> {data.so2 || 'loading...'} </span>
              </li>
              <li>TEMP: 
                <span style={styles.spanMeasurements}> {data.temp || 'loading...'} </span>
              </li>
              <li>HUMIDITY: 
                <span style={styles.spanMeasurements}> {data.humidity || 'loading...'} </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="cautionary-tab">
        <div style={{alignSelf: 'center', marginTop: '5px', marginBottom: '5px', fontWeight: 'bold', textAlign: 'center', padding: '0 5px'}}>
            <span>Pollutants-Specific Cautionary Statements for</span><br/> 
            <span>the General Public</span>
        </div>
        <div style={{width: '100%', borderTop: '1px solid black', paddingTop: '20px'}}>
          <div style={{marginTop: '10px'}}>
            <img src={HappyFace} alt="happy-face" height="200" width="200" style={{display: 'block', margin: '30px auto'}} />
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
    border: 1px solid #1e1e1e; 
    margin-bottom: 10px; 
    height: calc(50% - 5px);
    border-radius: 5px; 
    background: #272727;
  }

  .measurements-label {
    align-self: center; 
    margin-top: 5px; 
    margin-bottom: 5px;
  }

  .cautionary-tab {
    display: flex;
    flex-flow: column; 
    border: 1px solid #1e1e1e; 
    margin-bottom: 10px; 
    height: calc(50% - 5px); 
    border-radius: 5px; 
    background: #272727;
  }
`;

export default AQContent;