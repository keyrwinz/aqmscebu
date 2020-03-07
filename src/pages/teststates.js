import React, {useState, useEffect} from 'react';
import Layout from "../components/layout"
import firebase, { firebaseFunctions } from '../firebase'
import RenderData from '../components/RenderData'
import RenderPMSData from '../components/RenderPMSData'

const moment = require('moment');

const TestStates = () => {
  const [data, setData] = useState([])
  const [node, setNode] = useState('usc-mc')

  const addtemp = 10;

  const addData = async (node) => {
    const db = await firebase.firestore();
    const time = new Date()
    db.collection('aqms-cebu').doc(node).collection('states').doc().set({
      humidity: 100,
      no2: addtemp + 1,
      so2: addtemp + 2,
      pm10: addtemp + 3,
      pm25: addtemp + 4,
      temp: addtemp + 5,
      timestamp: time.getTime()
    }).then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

  useEffect(() => {
    console.log('pre-loading')
    firebase.firestore().collection('aqms-cebu').doc(node).collection('states').orderBy('timestamp').onSnapshot(snapshot => {
      // console.log({ snapshot: snapshot.docs })
      const newData = [];
      snapshot.docs.forEach(d => {
        newData.push(d.data());
      });
      setData(newData.sort((a, b) => b.timestamp - a.timestamp));
      // // let array = []
      // let changes = snapshot.docChanges()
      // // changes.forEach(change => {
      // //   let d = change.doc.data()
      // //   array.push(d)
      // // });
      // const newData = changes.map(change => change.doc.data()).sort((a, b) => b.timestamp - a.timestamp);
      // // let result = array.sort((a, b) => b.timestamp - a.timestamp);
      // setData(() => ([...data, ...newData]));
      // console.log(result)
    });

    // return () => {
    //   unsubscribe();
    // }

  }, [node, setData]);

  let renderComponent = null

  if(node === 'usc-mc'){
    renderComponent = <RenderData data={data} />
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