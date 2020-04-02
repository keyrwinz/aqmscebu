import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import Firebase from '../components/Firebase/firebase'
import RenderData from '../components/RenderData'
import SEO from '../components/seo'
import FirestoreData from '../../TEMP_FOLDER/uscmc.json'

const DownloadData = () => {
  const [data, setData] = useState([])
  const [node, setNode] = useState('usc-mc')

  // const addtemp = 10
  const firebaseDB = Firebase.database()
  const nodeRef = firebaseDB.ref('aqmnodes/usc-mc/states')

  const addData = () => {
    FirestoreData.map((d) => {
      nodeRef.push(d)
    })
    console.log('uploaded!')
  }

  useEffect(() => {
    // const starCountRef = firebaseDB.ref('usc-mc/states')
    //   .on('value', (snapshot) => {
    //     console.log(snapshot.val())
    //   })

    // return () => {
    //   starCountRef.off()
    // }
  }, [])


  // const addData = async () => {
  //   const db = await firebase.firestore()
  //   const time = new Date()
  //   db.collection('aqms-cebu')
  //     .doc(node)
  //     .collection('states')
  //     .doc()
  //     .set({
  //       humidity: 100,
  //       no2: addtemp + 1,
  //       so2: addtemp + 2,
  //       pm10: addtemp + 3,
  //       pm25: addtemp + 4,
  //       temp: addtemp + 5,
  //       timestamp: time.getTime(),
  //     })
  //     .then(() => {
  //       console.log('Document successfully written!')
  //     })
  //     .catch((error) => {
  //       console.error('Error writing document: ', error)
  //     })
  // }

  // useEffect(() => {
  //   console.log('fetching data...')
  //   const unsubscribe = Firebase
  //     .firestore()
  //     .collection('aqms-cebu')
  //     .doc(node)
  //     .collection('states')
  //     .orderBy('timestamp')
  //     .onSnapshot((snapshot) => {
  //       const newData = []
  //       snapshot.docs.forEach((d) => {
  //         newData.push(d.data())
  //       })
  //       setData(newData.sort((a, b) => b.timestamp - a.timestamp))
  //     })
  //   return () => {
  //     unsubscribe()
  //   }
  // }, [node, setData])

  let renderComponent = null
  if (node === 'usc-mc') {
    renderComponent = <RenderData data={data} />
  } else if (node === 'usc-sc') {
    renderComponent = <RenderData data={data} />
  }

  const onChangeHandler = (e) => {
    setNode(e.target.value)
  }

  return (
    <Layout>
      <SEO title="Download Data" />
      <Style>
        <div className="container-sm">
          <div className="row">
            <div className="col statesHeader">
              <div className="form-group">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label>Select Node</label>
                <select
                  className="form-control customSelect"
                  onChange={(e) => onChangeHandler(e)}
                  value={node}
                >
                  <option>usc-mc</option>
                  <option>usc-sc</option>
                </select>
              </div>
              <button className="floatRight" type="button" onClick={() => addData(node)}>Add data</button>
            </div>
          </div>
          <div className="row">
            <div className="col" style={{ color: 'black' }}>
              {renderComponent}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="footer page-footer borderbox">
                ©
                {' '}
                {new Date().getFullYear()}
                , Built by
                <a href="#top">
                  WAYDSB Thesis2020
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
  .customSelect {
    width: 200px;
  }
`

export default DownloadData
