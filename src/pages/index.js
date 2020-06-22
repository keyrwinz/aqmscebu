import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { AppCtx } from '../../provider'
import Layout from '../components/layout'
import SEO from '../components/seo'
import getFirebase from '../components/Firebase/firebase'
import TimeSeriesGraph from '../components/Graphs/TimeSeriesGraph'
import GoogleMap from '../components/GoogleMap/GoogleMap'
import AirQualitySummary from '../components/AirQualitySummary'
import SummaryBar from '../components/Others/SummaryBar'
import SearchBar from '../components/Others/SearchBar'
import Spinner from '../components/Spinner'
import Color from '../components/Theme/ColorPallete'

const { API_MAP } = process.env

const IndexPage = () => {
  const firebase = getFirebase()
  const [state, setState] = useState(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const store = useContext(AppCtx)
  const { node, updateNode } = store

  const firebaseCallback = (snapshot) => {
    let snapshotVal
    snapshot.forEach((d) => {
      snapshotVal = d.val()
    })
    setState(snapshotVal)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    const firebaseDB = firebase.database()
    const nodeRef = firebaseDB.ref(`aqmnodes/${node}/states`).orderByKey().limitToLast(1)
    nodeRef.on('value', firebaseCallback)

    return () => {
      nodeRef.off('value', firebaseCallback)
    }
  }, [node, firebase])

  let pm25 = []
  let pm10 = []
  let no2 = []
  let so2 = []

  pm25 = data.map((x) => [x.timestamp, x.pm25 === 'No data' ? 0 : x.pm25])
  pm10 = data.map((x) => [x.timestamp, x.pm10 === 'No data' ? 0 : x.pm10])
  no2 = data.map((x) => [x.timestamp, x.no2 === 'No data' ? 0 : x.no2])
  so2 = data.map((x) => [x.timestamp, x.so2 === 'No data' ? 0 : x.so2])

  const onClickMapNode = (nodeId) => updateNode(nodeId)

  return (
    <Layout>
      <Style>
        <SEO title="Home" />
        <div className="container-fluid main-container">
          <div className="row">
            <div className="col-md-7 col-12">
              <SearchBar />
            </div>
            <div className="col-md-5 col-12">
              <SummaryBar node={node} state={state} loading={loading} />
            </div>
          </div>
          <div className="row main-section">
            <div className="col-md-7 col-12 googleMap" style={{ minHeight: '500px' }}>
              <GoogleMap
                nodeSelectFunc={onClickMapNode}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                  API_MAP
                }`}
                loadingElement={<Spinner />}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
              />
            </div>
            <div className="col-md-5 col-12">
              <AirQualitySummary node={node} state={state} loading={loading} />
            </div>
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <TimeSeriesGraph title="Data Measurement for PM2.5" unit="µg/m³" label="PM2.5" states={pm25} />
              </div>
            </div>
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <TimeSeriesGraph title="Data Measurement for PM10" unit="µg/m³" label="PM10" states={pm10} />
              </div>
            </div>
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <TimeSeriesGraph title="Data Measurement for NO2" unit="ppm" label="NO2" states={no2} />
              </div>
            </div>
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <TimeSeriesGraph title="Data Measurement for SO2" unit="ppm" label="SO2" states={so2} />
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

  .main-section {
    flex-wrap: wrap-reverse !important;
  }

  .nodeSearchbar {
    width: 100%;
    color: ${Color.whiteColor};
  }

  .borderbox {
    border-radius: 3px;
    border: 1px solid ${Color.fourthColor}33;
    background: ${Color.thirdColor};
    padding: 10px;
  }

  div.topDiv {
    display: flex;
    width: 100%;
    margin-bottom: 15px;
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

  @media (max-width: 768px) {
  
  }

  @media (max-width: 1130px) {
    
  }

  @media (min-width: 1130px) {

  }
`

export default IndexPage
