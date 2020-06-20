import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Modal, Backdrop, Fade, Grid, Paper, Button, IconButton,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import PropTypes from 'prop-types'
import getFirebase from '../Firebase/firebase'
import Alert from '../Utils/alert'
import BackdropFeedback from './BackDrop'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 8, 6),
  },
  gridPaper: {
    padding: theme.spacing(1),
    maxWidth: '230px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}))

const SignInModal = ({
  open, setOpen, title, description,
}) => {
  const firebase = getFirebase()
  const classes = useStyles()
  const [feedback, setFeedback] = useState(false)
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'info',
  })

  const handleClose = () => setOpen(false)

  const signInHandler = () => {
    if (!firebase) return
    setFeedback(true) // display loading backdrop...
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    firebase.auth().signInWithPopup(provider)
      .then((res) => {
        const { displayName } = res.user
        setFeedback(false)
        setOpen(false)
        setAlert({ open: true, message: `Welcome, ${displayName || 'Buddy'}`, severity: 'success' })
      })
      .catch(() => {
        setFeedback(false)
        setAlert({ open: true, message: 'Error signing in', severity: 'error' })
        console.log('Error signing in')
      })
  }

  return (
    <>
      <Alert
        open={alert.open}
        setOpen={setAlert}
        message={alert.message}
        severity={alert.severity}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <h3 id="transition-modal-title" style={{ textAlign: 'center' }}>{title}</h3>
            <p style={{ textAlign: 'center' }}>{description}</p>
            <hr style={{ margin: '20px 0' }} />
            <Grid item xs={12} className={classes.modal}>
              <Paper className={classes.gridPaper}>
                <Button style={{ textTransform: 'none' }} onClick={signInHandler}>
                  <img
                    width="20px"
                    style={{ marginBottom: '0px', marginRight: '24px' }}
                    alt="Google sign-in"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  />
                  Sign in with Google
                </Button>
                <BackdropFeedback open={feedback} />
              </Paper>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

SignInModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
}

SignInModal.defaultProps = {
  open: false,
  title: 'Sign in',
  description: '',
}

export default SignInModal
