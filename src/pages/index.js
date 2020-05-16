import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import {
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps'
import Firebase from '../components/Firebase/firebase'
import Layout from '../components/layout'
import Color from '../components/Theme/ColorPallete'
import SEO from '../components/seo'
import TimeSeriesGraph from '../components/Graphs/TimeSeriesGraph'
import GoogleMap from '../components/GoogleMap/GoogleMap'
import AirQualitySummary from '../components/AirQualitySummary/AirQualitySummary'

const MapWrapped = withScriptjs(withGoogleMap(GoogleMap))
const { API_MAP } = process.env

const IndexPage = () => {
  const author = useStaticQuery(graphql`
    query SiteAuthorQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const [selectedNode, setSelectedNode] = useState('usc-mc')
  const [data, setData] = useState([])
  const [state, setState] = useState({})
  const [loading, setLoading] = useState(false)

  const firebaseDB = Firebase.database()
  const nodeRef = firebaseDB.ref(`aqmnodes/${selectedNode}/states`)

  const firebaseCallback = (collection) => {
    if (Object.keys(collection).length !== 0) {
      const entries = Object.entries(collection).reverse()
      const response = entries.map((d) => d[1])
      setData(response)
      console.log({ data })
    }
  }

  useEffect(() => {
    nodeRef.on('value', firebaseCallback)

    return () => {
      nodeRef.off('value', firebaseCallback)
    }
  }, [])

  let pm25 = []
  let pm10 = []
  let no2 = []
  let so2 = []

  pm25 = data.map((x) => [x.timestamp, x.pm25 === 'No data' ? 0 : x.pm25])
  pm10 = data.map((x) => [x.timestamp, x.pm10 === 'No data' ? 0 : x.pm10])
  no2 = data.map((x) => [x.timestamp, x.no2 === 'No data' ? 0 : x.no2])
  so2 = data.map((x) => [x.timestamp, x.so2 === 'No data' ? 0 : x.so2])

  // onclick nodes in google map
  const onClickMapNode = (nodeId) => {
    setSelectedNode(nodeId)
  }

  const scrollTo = (param) => {
    const id = document.querySelector(param)
    if (id) {
      const coordinates = id.getBoundingClientRect()
      const currentY = window.scrollY
      setTimeout(() => {
        window.scrollTo({
          top: coordinates.top + currentY,
          behavior: 'smooth',
        })
      }, 200)
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
              <button
                className="btn btn-dark"
                style={{ width: '35%' }}
                type="button"
                onClick={() => scrollTo('#first-graph')}
              >
                <div className="optionsBtn">
                  View Graph
                </div>
              </button>
              <div className="divider" />
              <Link className="btn btn-dark" style={{ width: '35%' }} to="/realtimedata">
                <div className="optionsBtn">Download Data</div>
              </Link>
              <div className="divider" />
              <Link className="btn btn-dark" style={{ width: '35%' }} to="/download">
                <div className="optionsBtn">Download Data</div>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-7 col-12 googleMap" style={{ minHeight: '500px' }}>
              <MapWrapped
                nodeSelectFunc={onClickMapNode}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                  API_MAP
                }`}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
              />
            </div>
            <div className="col-md-5 col-12">
              <AirQualitySummary
                loading={loading}
                nodeName={selectedNode}
                data={state}
              />
            </div>
          </div>
          <div id="first-graph" className="row graph">
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
          <div className="row">
            <div className="col">
              <div className="footer borderbox" style={{ color: 'white' }}>
                ©
                { new Date().getFullYear() }
                , Built by
                &nbsp;
                <a href="#home">
                  {author.site.siteMetadata.author}
                </a>
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

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${Color.thirdColor};
    min-height: 91px;
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

  @media (max-width: 768px) {
    .groupBtn a, .groupBtn button {
      min-height: 62px !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (max-width: 1130px) {
    .groupBtn a, .groupBtn button {
      min-height: 69.5px 
    }
  }

  @media (min-width: 1130px) {
    .optionsBtn {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .groupBtn a, .groupBtn button {
      max-height: 62.5px
    }
  }

  .divider {
    border-left: 2px solid ${Color.fourthColor};
    height: 25px;
    margin: 0 7px;
  }
`

export default IndexPage
