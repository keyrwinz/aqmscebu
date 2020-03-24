import React from 'react'; 
import HappyFace from "../../assets/images/happy.png"
import SmileFace from "../../assets/images/smile.png"
import SadFace from "../../assets/images/sad.png"

const CautionaryStatements = ({param, classification}) => {

  console.log(param, classification)
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

  let emoticon = null
  let DisplayList = null
  let ListStatements = []

  if(param){
    if(classification === 'Good'){
      emoticon = HappyFace
      ListStatements = [Statements[0]]
    }else if(classification === 'Fair'){
      emoticon = SmileFace
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
      emoticon = SadFace
      ListStatements = ['No classification']
    }
  }else{
    ListStatements = ['No parameter was passed']
  }

  let style = {
    maxHeight: '200px', overflow: 'auto', margin: '0 60px', position: 'relative',height: '215px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  if(ListStatements){
    DisplayList = ListStatements.map((statement, index) => {
      if(statement === 'None' || statement === 'No classification'){
        return (
          <li key={index} style={{margin: 0}}>
            <img key={index} src={emoticon} alt="emoticon-face" height="140" width="140" style={{margin: 0, marginTop: '20px'}}/>
            <p style={{margin: 0, paddingTop: '10px', textAlign: 'center'}}>{statement}</p>
          </li>
        )
      }else{
        return (<li key={index}>{statement}</li>)
      }
    })
  }

  return (
    <div className="carousel-content">
      <h3 className="carousel-content-title">{param}&nbsp;&nbsp;{classification ? `(${classification})` : ''}</h3>
      <div id="style-5" style={style}>
        <ul style={{margin: '0', position: 'absolute', top: 0, paddingRight: '7px'}}>
          {DisplayList}
        </ul>
      </div>
    </div>
  )
}

export default CautionaryStatements