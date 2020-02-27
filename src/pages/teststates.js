import React, {useState, useEffect} from 'react';
import Layout from "../components/layout"
import firebase, { firebaseFunctions } from '../firebase'
import RenderData from '../components/RenderData'
import RenderPMSData from '../components/RenderPMSData'

const moment = require('moment');

const TestStates = () => {
  const [data, setData] = useState([])
  const [node, setNode] = useState('usc-mc')

  const addtemp = 10 + 6;

  const addData = async (node) => {
    const db = await firebase.firestore();
    const time = new Date()
    db.collection('aqms-cebu').doc(node).collection('states').doc().set({
      humidity: 100,
      no2: addtemp,
      so2: addtemp,
      pm10: addtemp,
      pm25: addtemp,
      temp: addtemp,
      timestamp: time.getTime()
    }).then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

  useEffect(() => {
    setNode('usc-mc');
    console.log(firebaseFunctions.database.ref('/'))
  }, [])

  useEffect(() => {
    let array = []
    firebase.firestore().collection('aqms-cebu').doc(node).collection('test').orderBy('timestamp').onSnapshot(snapshot => {
      let changes = snapshot.docChanges()
      changes.forEach(change => {
        let d = change.doc.data()
        array.push(d)
      })
      // console.log(array)
      let result = array.sort((a, b) => b.timestamp - a.timestamp);
      setData(result)
    });
  }, [node]);

  let renderComponent = null

  if(node === 'usc-mc'){
    renderComponent = <RenderPMSData data={data} />
  }else if(node === 'usc-sc'){
    renderComponent = <RenderData data={data}/>
  }

  return (
    <Layout>
      <div className="container-sm">
        <div className="row">
          <div className="col">
            <button onClick={() => setNode('usc-mc')}>USC-MC</button>
            <button onClick={() => setNode('usc-sc')}>USC-SC</button>
            <button style={{float: 'right'}} onClick={() => addData(node)}>Add data</button>
          </div>
        </div>
        <div className="row">
          <div className="col" style={{color: 'black'}}>
            {renderComponent}
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
    </Layout>
  )
}

export default TestStates