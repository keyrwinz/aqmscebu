import React from 'react'; 

const CautionaryStatements = ({param, classification}) => {

  // console.log(param, classification)
  const Statements = [
    /*[0]*/ 'None',
    /*[1]*/ 'People with respiratory disease, such as asthma, should limit outdoor exertion.',
    /*[2]*/ 'Pedestrians should avoid heavy traffic areas.',
    /*[3]*/ 'People with heart or respiratory disease, such as asthma, should stay indoors and rest as much as possible.',
    /*[4]*/ 'Unnecessary trips should be postponed.',
    /*[5]*/ 'People should voluntarily restrict the use of vehicles',
    /*[6]*/ 'People should limit outdoor exertion.',
    /*[7]*/ 'Motor vehicle use may be restricted',
    /*[8]*/ 'Industrial activities may be curtailed.',
    /*[9]*/ 'Everyone should remain indoors, (keeping windows and doors closed unless heat stress is possible).',
    /*[10]*/ 'Motor vehicle use should be prohibited except for emergency situations',
    /*[11]*/ 'Industrial activities, except that which is vital for public safety and health, should be curtailed.'
  ]

  let ListStatements = ''

  switch(param){
    case 'pm25':
      if(classification === 'Good'){
        ListStatements = [Statements[0]]
      }else if(classification === 'Fair'){
        ListStatements = [Statements[0]]
      }else if(classification === 'Unhealthy'){
        ListStatements = [Statements[1]]
      }else if(classification === 'Very Unhealthy'){
        ListStatements = [Statements[2], Statements[3], Statements[4], Statements[5]]
      }else if(classification === 'Acutely Unhealthy'){
        ListStatements = [Statements[6], Statements[3], Statements[4], Statements[7], Statements[8]]
      }else if(classification === 'Emergency'){
        ListStatements = [Statements[9], Statements[10], Statements[11]]
      }else{
        ListStatements = ['Invalid']
      }
      // console.log('param: ', param)
      // console.log('cstatements: ', ListStatements)
      break;
    case 'pm10':
      console.log('pm10 napasa')
      break;
    case 'so2':
      console.log('so2 napasa')
      break;
    case 'no2':
      console.log('no2 napasa')
      break;
    default:
      console.log('invalid')
      break;
  }

  return (
    <div className="carousel-content">
      <h3 className="carousel-content-title">{param}&nbsp;&nbsp;({classification})</h3>
      <div id="style-5" style={{maxHeight: '200px', overflow: 'auto', margin: '0 60px'}}>
        <ul>
          {ListStatements ? ListStatements.map((statement, index) => <li key={index}>{statement}</li>) : ''}
        </ul>
      </div>
    </div>
  )
}

export default CautionaryStatements