import React from 'react'
import PropTypes from 'prop-types'
import GrowingSpinner from 'react-bootstrap/Spinner'
import Color from './Theme/ColorPallete'

/**
 *
 * @param { boolean } small -> Changes spinner size to 1rem, default size: 4rem
 * @param { object } style -> To customize spinner container style
 */
const Spinner = ({ small, style }) => {
  let Container = {
    ...style,
    color: Color.secondaryColor,
  }
  let CustomSpinner = {
    width: '4rem',
    height: '4rem',
  }

  if (small) {
    Container = {
      ...Container,
      display: 'inline-block',
    }
    CustomSpinner = {
      width: '1rem',
      height: '1rem',
    }
  } else {
    Container = {
      ...Container,
      height: '100%',
      minHeight: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }

  return (
    <div style={Container}>
      <GrowingSpinner style={CustomSpinner} animation="grow" />
    </div>
  )
}

Spinner.propTypes = {
  small: PropTypes.bool,
  style: PropTypes.shape(),
}

Spinner.defaultProps = {
  small: false,
  style: {},
}


export default Spinner
