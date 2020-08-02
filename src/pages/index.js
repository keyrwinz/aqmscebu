import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import { AppCtx } from '../../provider'
import Layout from '../components/layout'
import SEO from '../components/seo'
import getFirebase from '../components/Firebase/firebase'
import TimeSeriesGraph from '../components/Graphs/TimeSeriesGraph'
import GoogleMap from '../components/GoogleMap/GoogleMap'
import AirQualitySummary from '../components/AirQualitySummary'
import DatePickerComponent from '../components/Others/DatePicker'
import SignInModal from '../components/Feedback/SignInModal'
import SummaryBar from '../components/Others/SummaryBar'
import SearchBar from '../components/Others/SearchBar'
import SelectComponent from '../components/Others/Select'
import Spinner from '../components/Spinner'
import Color from '../components/Theme/ColorPallete'

const { API_MAP } = process.env

const IndexPage = () => {
  const firebase = getFirebase()
  const store = useContext(AppCtx)
  const { node, updateNode, user } = store
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState(null)
  const [data, setData] = useState([])

  // graph
  const [graphInterval, setGraphInterval] = useState('daily')

  // date-range
  const [minDate, setMintDate] = useState(null)
  const [maxDate, setMaxDate] = useState(null)
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndtDate] = useState(null)
  const [dateTriggered, triggerDate] = useState(false)

  // sign in modal
  const [modalState, showModal] = useState(false)

  const firebaseCallback = (snapshot) => {
    let snapVal
    snapshot.forEach((d) => {
      snapVal = d.val()
    })
    setState(snapVal)
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

  const firebaseForGraphCb = (snapshot) => {
    const snapVal = []
    snapshot.forEach((d) => {
      snapVal.push(d.val())
    })
    setData(snapVal)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    const firebaseDB = firebase.database()
    const nodeForGraphRef = firebaseDB.ref(`aqmnodes/${node}/${graphInterval}`).orderByChild('ti').startAt(selectedStartDate).endAt(selectedEndDate)
    nodeForGraphRef.on('value', firebaseForGraphCb)
    return () => {
      nodeForGraphRef.off('value', firebaseForGraphCb)
    }
  }, [node, firebase, graphInterval, dateTriggered])

  const minDateCb = (snapshot) => {
    let snapVal = null
    snapshot.forEach((d) => {
      snapVal = d.val()
    })
    if (snapVal && snapVal.ti != null) {
      setMintDate(snapVal.ti)
    }
    setLoading(false)
  }
  const maxDateCb = (snapshot) => {
    let snapVal = null
    snapshot.forEach((d) => {
      snapVal = d.val()
    })
    if (snapVal && snapVal.ti != null) {
      setMaxDate(snapVal.ti)
      setSelectedStartDate(snapVal.ti - 86400) // last data - 1 day
      setSelectedEndtDate(snapVal.ti)
    }
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    const firebaseDB = firebase.database()
    const nodeForMinDate = firebaseDB.ref(`aqmnodes/${node}/${graphInterval}`).orderByKey().limitToFirst(1)
    const nodeForMaxDate = firebaseDB.ref(`aqmnodes/${node}/${graphInterval}`).orderByKey().limitToLast(1)
    nodeForMinDate.on('value', minDateCb)
    nodeForMaxDate.on('value', maxDateCb)
    return () => {
      nodeForMinDate.off('value', minDateCb)
      nodeForMaxDate.off('value', maxDateCb)
    }
  }, [node, firebase])

  let pm25 = []
  let pm10 = []
  let no2 = []
  let so2 = []

  if (user != null) {
    pm25 = data.map((x) => [x.ti, x.p2 === 'No data' ? 0 : x.p2])
    pm10 = data.map((x) => [x.ti, x.p1 === 'No data' ? 0 : x.p1])
    no2 = data.map((x) => [x.ti, x.n === 'No data' ? 0 : x.n])
    so2 = data.map((x) => [x.ti, x.s === 'No data' ? 0 : x.s])
  }

  const onClickMapNode = (nodeId) => updateNode(nodeId)

  return (
    <Layout>
      <Style>
        <SEO title="Home" />
        <SignInModal
          open={modalState}
          setOpen={showModal}
          title="You are not authenticated"
          description="Sign in now to view graph"
        />
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
          <hr />
          <div className="row graph graph-header">
            { user != null
              ? (
                <div className="col col-12">
                  <div className="borderbox graph-nav">
                    <div className="col-md-6 col-sm-12">
                      <SearchBar />
                    </div>
                    <div className="col-md-2 col-sm-12" style={{ display: 'flex', justifyContent: 'flex-end'}}>
                      <SelectComponent
                        options={['hourly', 'daily']}
                        value={graphInterval}
                        onChange={(event) => setGraphInterval(event.target.value)}
                      />
                    </div>
                    <div className="date-picker col-md-4 col-sm-12">
                      {
                        minDate != null && maxDate != null
                          ? (
                            <>
                              <DatePickerComponent
                                minDate={new Date((minDate - 86400) * 1000)}
                                maxDate={new Date((maxDate + 86400) * 1000)}
                                startDate={new Date(selectedStartDate * 1000)}
                                endDate={new Date(selectedEndDate * 1000)}
                                onChangeStart={(start) => {
                                  setSelectedStartDate((moment(start).valueOf()) / 1000)
                                }}
                                onChangeEnd={(end) => {
                                  setSelectedEndtDate((moment(end).valueOf() / 1000))
                                }}
                              />
                              <Button
                                variant="contained"
                                color="primary"
                                style={{ height: '33px', marginLeft: '5px' }}
                                onClick={() => triggerDate(!dateTriggered)}
                              >
                                Set Date
                              </Button>
                            </>
                          )
                          : (
                            <div style={{ width: '100%', color: Color.whiteColor, textAlign: 'center' }}>
                              <span>No Graph available for this node</span>
                            </div>
                          )
                        }
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col col-12">
                  <div className="borderbox graph-nav w-100" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => showModal(true)}>
                      Sign in to view graph
                    </Button>
                  </div>
                </div>
              )}
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <TimeSeriesGraph
                  title={`Data Measurement for PM2.5 (${graphInterval})`}
                  unit="µg/m³"
                  label="PM2.5"
                  states={pm25}
                />
              </div>
            </div>
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <TimeSeriesGraph
                  title={`Data Measurement for PM10 (${graphInterval})`}
                  unit="µg/m³"
                  label="PM10"
                  states={pm10}
                />
              </div>
            </div>
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <TimeSeriesGraph
                  title={`Data Measurement for NO2 (${graphInterval})`}
                  unit="ppm"
                  label="NO2"
                  states={no2}
                />
              </div>
            </div>
          </div>
          <div className="row graph">
            <div className="col col-12">
              <div className="borderbox">
                <TimeSeriesGraph
                  title={`Data Measurement for SO2 (${graphInterval})`}
                  unit="ppm"
                  label="SO2"
                  states={so2}
                />
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

  .graph-header {
    display: flex;
    flex-wrap: wrap;
  }

  .graph-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .date-picker {
    display: flex;
    flex-wrap: wrap;
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
`

export default IndexPage
