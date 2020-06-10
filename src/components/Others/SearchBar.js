import React from 'react'
import { TextField } from '@material-ui/core/'
import { Autocomplete } from '@material-ui/lab/'
import { withStyles } from '@material-ui/core/styles'
import Color from '../Theme/ColorPallete'
import AqmsNodes from '../GoogleMap/AqmsNodes'

const CssTextField = withStyles({
  root: {
    '& label': {
      color: `${Color.whiteColor}`,
    },
    '& .MuiAutocomplete-input': {
      color: `${Color.whiteColor}`,
    },
    '& label.Mui-focused': {
      color: `${Color.whiteColor}`,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: `${Color.secondaryColor}`,
    },
    '& .MuiOutlinedInput-root': {
      background: `${Color.thirdColor}`,
      '& fieldset': {
        borderColor: `${Color.thirdColor}`,
      },
      '&:hover fieldset': {
        borderColor: `${Color.secondaryColor}`,
      },
      '&.Mui-focused fieldset': {
        borderColor: `${Color.secondaryColor}`,
      },
    },
    '& .MuiIconButton-label': {
      color: `${Color.secondaryColor}`,
    },
  },
})(TextField)

const SearchBar = () => (
  <Autocomplete
    className="nodeSearchbar"
    options={AqmsNodes.nodesLoc}
    getOptionLabel={(option) => option.text}
    renderInput={(params) => (
      <CssTextField
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...params}
        className="nodeSearchbar"
        label="Search Node"
        variant="outlined"
        size="small"
      />
    )}
  />
)

export default SearchBar
