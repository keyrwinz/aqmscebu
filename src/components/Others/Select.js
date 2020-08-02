import React from 'react'
import PropTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import Color from '../Theme/ColorPallete'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    '& label': {
      color: `${Color.whiteColor}`,
    },
    '& label.Mui-focused': {
      color: `${Color.whiteColor}`,
    },
    '& .MuiSelect-root': {
      color: `${Color.whiteColor}`,
    },
    '& svg': {
      color: `${Color.secondaryColor}`,
    },
    '& .MuiInput-formControl-focused': {
      borderBottomColor: `${Color.secondaryColor}`,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: `${Color.secondaryColor}`,
    },
  },
}))

const SelectComponent = ({ value, options, onChange }) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <Select
        displayEmpty
        labelId="graph-interval"
        value={value}
        onChange={(e) => onChange(e)}
      >
        {
          options.map((option) => (
            <MenuItem key={option} value={option}>
              <span style={{ textTransform: 'capitalize' }}>{option}</span>
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

SelectComponent.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SelectComponent
