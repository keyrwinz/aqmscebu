import React from 'react'
import PropTypes from 'prop-types'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Color from '../Theme/ColorPallete'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: Color.secondaryColor,
  },
}))

/**
 *
 * @param { boolean } open
 */
const BackdropFeedback = ({ open }) => {
  const classes = useStyles()
  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

BackdropFeedback.propTypes = {
  open: PropTypes.bool,
}

BackdropFeedback.defaultProps = {
  open: true,
}

export default BackdropFeedback
