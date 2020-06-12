import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

/**
 *
 * @param { boolean } open -> triggers alert if true
 * @param { func } setOpen -> callback use to manipulate @param open
 * @param { string } message -> alert message
 * @param { string } severity -> Severity level: success, error, warning, info
 *
 */
const CustomSnackbar = ({
  open, setOpen, message, severity,
}) => {
  const classes = useStyles()
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return
    setOpen((prev) => ({ ...prev, open: false }))
  }

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={7000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

CustomSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.string,
}

CustomSnackbar.defaultProps = {
  severity: 'info',
}

export default CustomSnackbar
