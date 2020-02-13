import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import Layout from "../components/layout"
import SEO from "../components/seo"
import DataGraph from '../components/Graphs/TimeSeriesGraph'
import GoogleMap from '../components/GoogleMap/GoogleMap'
import AirQualitySummary from '../components/AirQualitySummary'
import {
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import firebase from '../firebase'

const API_MAP = 'AIzaSyCeEtWrTm6_sPXDtijAIYYyxWG6_dMSME4';
const MapWrapped = withScriptjs(withGoogleMap(GoogleMap));


const fetchData = async (node) => {
  let data;
  const db = firebase.firestore();
  const doc = await db.collection("aqms-cebu").doc(node).get();
  data = doc.data()
  return data
};

const IndexPage = () => {
  const [selectedNode, setSelectedNode] = useState('usc-mc');
  const [state, setState] = useState({})
  const [data, setData] = useState([]);

  // fetch data
  useEffect(() => {
    fetchData(selectedNode).then(data => setState(data.state))
  }, [selectedNode])

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
              <input className="form-control" id="nodeSearch" type="text" placeholder="Search..." />
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
              <AirQualitySummary nodeName={selectedNode} data={state}/>
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
  .googleMap, .graph {
    color: black
  }
`;

export default IndexPage
