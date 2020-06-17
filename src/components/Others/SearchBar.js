import React, { useContext } from 'react'
import { TextField } from '@material-ui/core/'
import { Autocomplete } from '@material-ui/lab/'
import { withStyles } from '@material-ui/core/styles'
import { AppCtx } from '../../../provider'
import Color from '../Theme/ColorPallete'
import { AirMonitoringNodes as AqmsNodes } from '../../config'

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

const SearchBar = () => {
  const store = useContext(AppCtx)
  const { node, updateNode } = store
  const selectedNode = AqmsNodes.nodesLoc.find((nodeObj) => nodeObj.id === node)

  const onChangeHandler = (_, value) => {
    if (value === null) return
    updateNode(value.id)
  }

  return (
    <Autocomplete
      className="nodeSearchbar"
      value={selectedNode}
      options={AqmsNodes.nodesLoc}
      getOptionLabel={(option) => option.text}
      onChange={onChangeHandler}
      renderOption={(option) => (
        <>
          {`${option.text}, ${option.locality}`}
        </>
      )}
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
}

export default SearchBar
