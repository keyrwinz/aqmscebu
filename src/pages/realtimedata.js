import React, { useState, useEffect } from 'react';
import Layout from "../components/layout"
import RealtimeTable from '../components/Tables/RealtimeTable';

const App = () => {
  const [data, setData] = useState(() => {
    const initialData = [{
      text: `1 : ${Math.random()}`,
    }];
    return initialData;
  });

  // add new data every 1 sec
  useEffect(() => {
    const timer = setInterval(() => {
      setData((prevData) => ([
        { text: `${prevData.length + 1} : ${Math.random()}` },
        ...prevData,
      ]));
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [setData]);

  return (
    <Layout>
      <div className="container-sm" style={{color: 'black'}}>
        <RealtimeTable list={data} height={600} />
      </div>
    </Layout>
  );
}

export default App;
