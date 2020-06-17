import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import Color from '../Theme/ColorPallete'

const RenderData = ({ data, pageSize, loading }) => {
  const [displayData, setDisplayData] = useState([])

  useEffect(() => {
    setDisplayData(data)
  }, [data])

  const tableRows = []
  if (loading) {
    let i = 0
    for (i; i < pageSize; i += 1) {
      tableRows.push(
        <tr id="loading-tr" key={i}>
          <td><span /></td>
          <td><span /></td>
          <td><span /></td>
          <td><span /></td>
          <td><span /></td>
          <td><span style={{ width: '80px' }} /></td>
          <td><span style={{ width: '120px' }} /></td>
        </tr>,
      )
    }
  } else {
    displayData.map((d, index) => {
      const time = d.ti ? d.ti : 0
      const timestamp = moment.unix(time).format('llll')
      return (tableRows.push(
        // eslint-disable-next-line react/no-array-index-key
        <tr key={index}>
          <td>{d.p2 ? d.p2 : 'No data'}</td>
          <td>{d.p1 ? d.p1 : 'No data'}</td>
          <td>{d.n ? d.n : 'No data'}</td>
          <td>{d.s ? d.s : 'No data'}</td>
          <td>{d.h ? d.h : 'No data'}</td>
          <td>{d.te ? d.te : 'No data'}</td>
          <td>{d.ti ? timestamp : 'No data'}</td>
        </tr>,
      ))
    })
  }

  return (
    <Style>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              PM
              <sub>2.5</sub>
            </th>
            <th scope="col">
              PM
              <sub>10</sub>
            </th>
            <th scope="col">
              NO
              <sub>2</sub>
            </th>
            <th scope="col">
              SO
              <sub>2</sub>
            </th>
            <th scope="col">Humidity</th>
            <th scope="col">Temperature</th>
            <th scope="col">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </table>
    </Style>
  )
}

RenderData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  pageSize: PropTypes.number.isRequired,
  loading: PropTypes.bool,
}

RenderData.defaultProps = {
  data: [],
  loading: true,
}

const Style = styled.div`
  .table {
    margin-bottom: 0rem;
    color: ${Color.whiteColor};
  }
  .table thead th {
    border: 0px;
  }
  .table tbody tr:nth-of-type(odd) {
    background: rgba(0, 0, 0, 0.6);
  }
  .table tbody tr:nth-of-type(even) {
    background: rgba(0, 0, 0, 0.5);
  }

  @keyframes pulse {
    50% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }
  span {
    display: block;
    border-radius: 10px;
    width: 50px;
    height: 25px;
    animation: pulse 2s ease-out;
    animation-iteration-count: infinite;
    background: rgba(95, 95, 95, 1);
  }
`

export default RenderData
