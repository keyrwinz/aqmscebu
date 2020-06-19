import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { FormControlLabel, Switch } from '@material-ui/core/'
import Color from '../Theme/ColorPallete'

const CustomSwitch = withStyles({
  switchBase: {
    color: Color.whiteColor,
    '&$checked': {
      color: Color.secondaryColor,
    },
    '&$checked + $track': {
      backgroundColor: Color.secondaryColor,
    },
  },
  checked: {},
  track: {},
})(Switch)


const SwitchComponent = ({
  label, placement, style, state, setState,
}) => (
  <FormControlLabel
    style={{ ...style }}
    control={<CustomSwitch checked={state} onChange={setState} />}
    label={label}
    labelPlacement={placement}
  />
)

SwitchComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placement: PropTypes.string,
  style: PropTypes.shape(),
  state: PropTypes.bool,
  setState: PropTypes.func,
}

SwitchComponent.defaultProps = {
  placement: 'start',
  style: {},
  state: false,
  setState: () => {},
}

export default SwitchComponent
