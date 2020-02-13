import React, {useState, useEffect} from 'react';
import Layout from "../components/layout"
import firebase from '../firebase'
// import RenderData from '../components/RenderData'
var moment = require('moment');

const updateTime = () => {
  console.log(moment().format('D MMMM YYYY h:mm:ss a'))
}

const TestStates = () => {
  const [data, setData] = useState([])
  const [node, setNode] = useState('usc-mc')

  const addData = async (node) => {
    const db = firebase.firestore();
    db.collection('aqms-cebu').doc(node).collection('states').doc().set({
      humidity: 100,
      no2: 3,
      so2: 3,
      pm10: 3,
      pm25: 3,
      temp: 37,
      timestamp: moment().format('D MMMM YYYY h:mm:ss a')
    }).then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  useEffect(() => {
    let array = []
    firebase.firestore().collection('aqms-cebu').doc(node).collection('states').orderBy('timestamp').onSnapshot(snapshot => {
      let changes = snapshot.docChanges()
      changes.forEach(change => {
        let d = change.doc.data()
        array.push(d)
      })
      setData(array)
    });
  }, [node]);

  return (
    <Layout>
      <div className="container-sm">
        <div className="row">
          <div className="col">
            <button onClick={() => setNode('usc-mc')} >USC-MC</button>
            <button onClick={() => setNode('usc-sc')} >USC-SC</button>
            <button style={{float: 'right'}} onClick={() => addData(node)}>Add data</button>
            {/* <button style={{float: 'right'}} onClick={() => updateTime()}>Update time</button> */}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">PM<sub>2.5</sub></th>
                  <th scope="col">PM<sub>10</sub></th>
                  <th scope="col">NO<sub>2</sub></th>
                  <th scope="col">SO<sub>2</sub></th>
                  <th scope="col">Humidity</th>
                  <th scope="col">Temperature</th>
                  <th scope="col">Timestamp</th>
                </tr>
              </thead>
              <tbody>
              {/* <RenderData data={data}/> */}
                { data.map((d) => {
                  return(
                    <tr key={d.timestamp}>
                      <td>{d.pm25 ? d.pm25 : 'No data'}</td>
                      <td>{d.pm10 ? d.pm10 : 'No data'}</td>
                      <td>{d.no2 ? d.no2 : 'No data'}</td>
                      <td>{d.so2 ? d.so2 : 'No data'}</td>
                      <td>{d.humidity ? d.humidity : 'No data'}</td>
                      <td>{d.temp ? d.temp : 'No data'}</td>
                      <td>{d.timestamp ? d.timestamp.toString() : 'No data'}</td>
                    </tr>
                    )
                  })
                }
              </tbody>
            </table>
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