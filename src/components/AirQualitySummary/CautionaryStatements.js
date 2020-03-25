import React from 'react'
import PropTypes from 'prop-types'
import HappyFace from '../../assets/images/happy.png'
import SmileFace from '../../assets/images/smile.png'
import SadFace from '../../assets/images/sad.png'

const CautionaryStatements = ({ param, classification }) => {
  const Statements = [
    { id: 0, mssg: 'None' },
    { id: 1, mssg: 'People with respiratory disease, such as asthma, should limit outdoor exertion.' },
    { id: 2, mssg: 'Pedestrians should avoid heavy traffic areas.' },
    { id: 3, mssg: 'People with heart or respiratory disease, such as asthma, should stay indoors and rest as much as possible.' },
    { id: 4, mssg: 'Unnecessary trips should be postponed.' },
    { id: 5, mssg: 'People should voluntarily restrict the use of vehicles' },
    { id: 6, mssg: 'People should limit outdoor exertion.' },
    { id: 7, mssg: 'Motor vehicle use may be restricted' },
    { id: 8, mssg: 'Industrial activities may be curtailed.' },
    { id: 9, mssg: 'Everyone should remain indoors, (keeping windows and doors closed unless heat stress is possible).' },
    { id: 10, mssg: 'Motor vehicle use should be prohibited except for emergency situations' },
    { id: 11, mssg: 'Industrial activities, except that which is vital for public safety and health, should be curtailed.' },
    { id: 12, mssg: 'No classification' },
    { id: 13, mssg: 'No parameter was passed' },
  ]

  let emoticon = null
  let DisplayList = null
  let ListStatements = []
  let color = ''

  if (param) {
    if (classification === 'Good') {
      color = 'Green'
      emoticon = HappyFace
      ListStatements = [Statements[0]]
    } else if (classification === 'Fair') {
      color = 'Yellow'
      emoticon = SmileFace
      ListStatements = [Statements[0]]
    } else if (classification === 'Unhealthy') {
      color = 'Orange'
      ListStatements = [Statements[1]]
    } else if (classification === 'Very Unhealthy') {
      color = 'Red'
      ListStatements = [
        Statements[2],
        Statements[3],
        Statements[4],
        Statements[5],
      ]
    } else if (classification === 'Acutely Unhealthy') {
      color = 'Purple'
      ListStatements = [
        Statements[6],
        Statements[3],
        Statements[4],
        Statements[7],
        Statements[8],
      ]
    } else if (classification === 'Emergency') {
      color = 'Maroon'
      ListStatements = [Statements[9], Statements[10], Statements[11]]
    } else {
      emoticon = SadFace
      ListStatements = [Statements[12]]
    }
  } else {
    ListStatements = [Statements[13]]
  }

  const style = {
    maxHeight: '200px',
    overflow: 'auto',
    margin: '0 60px',
    position: 'relative',
    height: '215px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  if (ListStatements) {
    DisplayList = ListStatements.map((statement) => {
      if (statement.mssg === 'None' || statement.mssg === 'No classification') {
        return (
          <li key={statement.id} style={{ margin: 0 }}>
            <img
              key={statement.id}
              src={emoticon}
              alt="emoticon-face"
              height="140"
              width="140"
              style={{ margin: 0, marginTop: '20px' }}
            />
            <p style={{ margin: 0, paddingTop: '10px', textAlign: 'center' }}>
              {statement.mssg}
            </p>
          </li>
        )
      }
      return <li key={statement.id}>{statement.mssg}</li>
    })
  }

  return (
    <div className="carousel-content">
      <h3 className="carousel-content-title">
        {param}
        &nbsp;&nbsp;
        <span style={{ color }}>
          {classification ? `(${classification})` : ''}
        </span>
      </h3>
      <div id="style-5" style={style}>
        <ul
          style={{
            margin: '0',
            position: 'absolute',
            top: 0,
            paddingRight: '7px',
          }}
        >
          {DisplayList}
        </ul>
      </div>
    </div>
  )
}

CautionaryStatements.propTypes = {
  param: PropTypes.string.isRequired,
  classification: PropTypes.string.isRequired,
}

export default CautionaryStatements
