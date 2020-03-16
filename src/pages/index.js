import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import Layout from "../components/layout"
import SEO from "../components/seo"
import TimeSeriesGraph from '../components/Graphs/TimeSeriesGraph'
import GoogleMap from '../components/GoogleMap/GoogleMap'
import AirQualitySummary from '../components/AirQualitySummary'
import {
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import firebase from '../firebase'
import nodes from "../components/GoogleMap/AqmsNodes";

const API_MAP = 'AIzaSyCeEtWrTm6_sPXDtijAIYYyxWG6_dMSME4';
const WEATHER_API = 'e48a7eafd3731c7718a4c34b6a06e78f';
const MapWrapped = withScriptjs(withGoogleMap(GoogleMap));


const IndexPage = () => {
  const [selectedNode, setSelectedNode] = useState('usc-mc');
  const [data, setData] = useState([])
  const [state, setState] = useState({})
  const [ContentButton, setContentButton] = useState(0)
  const [weather, setWeather] = useState({})

  let pm25 = []
  let pm10 = []
  let no2 = []
  let so2 = []

  const fetchWeather = async ({lat, lng}) => {
    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${WEATHER_API}/${lat},${lng}`)
    let data = await response.json()
    setWeather(data)
  }

  const fetchData = async (node) => {
    let data;
    const db = firebase.firestore();
    const doc = await db.collection("aqms-cebu").doc(node).collection('states').get();
    return doc
  };

  // fetch data from database (selected node)
  useEffect(() => {
    let unsubscribe = firebase.firestore().collection('aqms-cebu').doc(selectedNode).collection('states').orderBy('timestamp').onSnapshot(snapshot => {
      const newData = [];
      let length = 0;
      let currentState = {}
      snapshot.docs.forEach(d => {
        newData.push(d.data());
      });
      length = newData.length
      currentState = {...newData[length - 1]}
      setState(currentState)
      setData(newData.sort((a, b) => b.timestamp - a.timestamp));
    }); 

    return () => {
      unsubscribe()
    }
  }, [selectedNode]);

  useEffect(() => {
    console.log(weather)
  }, [weather])

  pm25 = data.map(x => [x.timestamp, x.pm25 === 'No data' ? 0 : x.pm25])
  pm10 = data.map(x => [x.timestamp, x.pm10 === 'No data' ? 0 : x.pm10])
  no2 = data.map(x => [x.timestamp, x.no2 === 'No data' ? 0 : x.no2])
  so2 = data.map(x => [x.timestamp, x.so2 === 'No data' ? 0 : x.so2])

  const onClickMapNode = nodeId => {
    let nodeObj = nodes.nodesLoc.find(obj => obj.id === nodeId)
    setSelectedNode(nodeId)
    // fetchWeather(nodeObj)
  }

  const scrollTo = (param) => {
    const id = document.querySelector(param);
    if(id){
      const coordinates = id.getBoundingClientRect();
      const currentY = window.scrollY;
      setTimeout(() => {
          window.scrollTo({
            top: coordinates.top + currentY,
            behavior: "smooth"
          });
      }, 200);
    }
  }

  return (
    <Layout>
      <Style>
        <SEO title="Home" />
        <div className="container-fluid main-container">
          <div className="row">
            <div className="col-md-7 col-12">
              <input className="form-control" id="nodeSearch" type="text" placeholder="Search..." />
            </div>
            <div className="col-md-5 col-12 groupBtn">
                <button className="btn btn-dark" 
                        style={{width: '35%'}} type="button" 
                        onClick={() => scrollTo('#first-graph')}
                >View Graph</button>
                <div style={{borderLeft: '4px solid #1e1e1e', height:'25px'}}></div>
                <a className="btn btn-dark" style={{width: '35%'}} type="button" href="/realtimedata">Realtime Data</a>
                <div style={{borderLeft: '4px solid #1e1e1e', height:'25px'}}></div>
                <a className="btn btn-dark" style={{width: '35%'}} type="button" href="/teststates">Download Data</a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7 col-12 googleMap" style={{minHeight: '500px'}}>
              <MapWrapped
                nodeSelectFunc={onClickMapNode}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                  API_MAP
                }`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>
            <div className="col-md-5 col-12">
              <AirQualitySummary nodeName={selectedNode} data={state}/>
            </div>
          </div>
          <div id="first-graph" className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <TimeSeriesGraph title="Data Measurement for PM2.5" unit="ug/m3" label="PM2.5" states={pm25}/>
              </div>
            </div>
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <TimeSeriesGraph title="Data Measurement for PM10" unit="ug/m3" label="PM10" states={pm10}/>
              </div>
            </div>
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <TimeSeriesGraph title="Data Measurement for NO2" unit="ppm" label="NO2" states={no2}/>
              </div>
            </div>
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <TimeSeriesGraph title="Data Measurement for SO2"unit="ppm" label="SO2" states={so2}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="footer borderbox">
                © {new Date().getFullYear()}, Built by
                <a href="#">{``}WAYDSB Thesis2020</a>
              </div>
            </div>
          </div>
        </div>
      </Style>
    </Layout>
  )
}

const Style = styled.div`
  flex: 1 1 auto;
  
  @media (min-width: 768px) {
    .main-container {
      padding-left: 30px !important;
      padding-right: 30px !important;
    }
  }

  div.topDiv {
    display: flex;
    width: 100%;
    margin-bottom: 15px;
  }
  div.groupBtn {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  div.btmDiv {
    display: flex;
    width: 100%;
  }
  div.btmGoogleMap { 
    height: 80vh; 
    width: 70%;
    margin-left: 10px;
  }
  div.btmRightPane { 
    maxHeight: 80vh;
    width: 28.2%;
    margin-left: 10px;
    margin-right: 10px;
  }
  .googleMap, .graph {
    color: black
  }
`;

export default IndexPage
