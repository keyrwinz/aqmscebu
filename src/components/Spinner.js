import React from 'react'
import PropTypes from 'prop-types'

const Spinner = ({ small }) => {
  let Style = {}
  let customSpinner = {}

  if (small) {
    Style = {
      display: 'inline-block',
    }
    customSpinner = {
      width: '1rem',
      height: '1rem',
      borderWidth: '0.15em',
    }
  } else {
    Style = {
      minHeight: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }

  return (
    <div style={Style}>
      <div className="spinner-border text-warning" role="status" style={customSpinner}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

Spinner.propTypes = {
  small: PropTypes.bool,
}

Spinner.defaultProps = {
  small: false,
}


export default Spinner
