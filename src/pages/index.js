import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import Layout from "../components/layout"
import SEO from "../components/seo"
import DataGraph from '../components/Graphs/TimeSeriesGraph'
import GoogleMap from '../components/GoogleMap/GoogleMap'
import AQSummary from '../components/AirQualitySummary'
import {
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import firebase from '../firebase'

const API_MAP = 'AIzaSyCeEtWrTm6_sPXDtijAIYYyxWG6_dMSME4';
const MapWrapped = withScriptjs(withGoogleMap(GoogleMap));

const IndexPage = () => {
  const [selectedNode, setSelectedNode] = useState('usc-mc');
  const [data, setData] = useState([]);

  let dataState = {};
  let dataGraph = [];

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("aqms-cebu").get();
      setData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));

      console.log(data);
    };

    fetchData();
  }, []);

  if (selectedNode === 'usc-mc' && data) {
    data.map(d => {
      if(d.id === selectedNode){
        dataState = {...d.state, name: 'mc'}
        d.states.map(s => {
          dataGraph.push({...s, name: 'mc'})
        })
      }
    })
  } else if (selectedNode === 'usc-sc' && data) {
    data.map(d => {
      if(d.id === selectedNode){
        dataState = {...d.state, name: 'sc'}
        d.states.map(s => {
          dataGraph.push({...s, name: 'sc'})
        })
      }
    })
  }

  let RightPane = null;
  RightPane = (
    <AQSummary data={dataState}/>
  )

  const onClickMapNode = nodeId => {
    setSelectedNode(nodeId)
  }

  return (
    <Layout>
      <Style>
        <SEO title="Home" />
        <div className="container-sm">
          <div className="row">
            <div className="col-md-12 col-12">
              <input className="form-control" id="nodeSearch" type="text" placeholder="Search.." />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 col-12 googleMap" style={{minHeight: '500px'}}>
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
            <div className="col-md-4 col-12">
              { RightPane }
            </div>
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <DataGraph title="Data Measurement for PM2.5" unit="ug/m3"/>
              </div>
            </div>
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <DataGraph title="Data Measurement for PM10" unit="ug/m3"/>
              </div>
            </div>
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <DataGraph title="Data Measurement for NO2" unit="ppm"/>
              </div>
            </div>
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <DataGraph title="Data Measurement for SO2"unit="ppm"/>
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
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #272727;
    min-height: 91px;
  }
  .borderbox {
    border-radius: 3px;
    border: 2px solid #272727;
  }
  .googleMap, .graph {
    color: black
  }
`;

export default IndexPage
