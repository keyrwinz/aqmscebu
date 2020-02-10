import React from 'react';
import HappyFace from "../assets/images/happy.png";

const styles = {
  spanMeasurements: {
    marginLeft: '15px',
    fontWeight: 'normal'
  }
}

const AQContent = ({data}) => {

  return (
    <>
      <div style={{ display: 'flex', flexFlow: 'column', border: '1px solid #1e1e1e', marginBottom: '10px', height: `calc(50% - 5px)`, borderRadius: '5px', background: '#272727' }}>
        <div style={{alignSelf: 'center', marginTop: '5px', marginBottom: '5px'}}>
          <span style={{fontWeight: 'bold'}}>GOOD</span>
        </div>
        <div style={{width: '100%', borderTop: '1px solid black', paddingTop: '20px'}}>
          <span style={{marginLeft: '20px'}}>Measurements:</span>
          <div style={{marginLeft: '45px', marginTop: '10px'}}>
            <ul style={{listStyle: 'none', fontWeight: 'bold', color: 'white'}}>
              <li>PM2.5: 
                <span style={styles.spanMeasurements}> {data.pm25 || 'loading...'} </span>
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
      <div style={{ display: 'flex', flexFlow: 'column', border: '1px solid #1e1e1e', marginBottom: '10px', height: `calc(50% - 5px)`, borderRadius: '5px', background: '#272727' }}>
        <div style={{alignSelf: 'center', marginTop: '5px', marginBottom: '5px', fontWeight: 'bold', textAlign: 'center'}}>
            <span>Pollutants-Specific Cautionary Statements for</span><br/> 
            <span>the General Public</span>
        </div>
        <div style={{width: '100%', borderTop: '1px solid black', paddingTop: '20px'}}>
          <div style={{marginTop: '10px'}}>
            <img src={HappyFace} alt="happy-face" height="200" width="200" style={{display: 'block', margin: '30px auto'}} />
          </div>
        </div>
      </div>
    </>
  )
}

export default AQContent;