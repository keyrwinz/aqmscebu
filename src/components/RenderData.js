import React from 'react';

const RenderData = ({data}) => {
  let list = []

  React.useEffect(() => console.log('value changed!'), [data]);

  if(data){
    data.map((d, index) => {
      list.push(
        <tr key={index}>
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

  // console.log(list)
  
  return (
    <tbody>
      {list}
    </tbody>
  )
}

export default RenderData