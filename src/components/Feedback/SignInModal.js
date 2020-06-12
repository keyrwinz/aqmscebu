import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Modal, Backdrop, Fade, Grid, Paper, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import Firebase from '../Firebase/firebase'
import Alert from '../Utils/alert'
import BackdropFeedback from './BackDrop'


const provider = new Firebase.auth.GoogleAuthProvider()
provider.addScope('profile')
provider.addScope('email')

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 8, 6),
  },
  gridPaper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const SignInModal = ({ open, setOpen }) => {
  const classes = useStyles()
  const [feedback, setFeedback] = useState(false)
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'info',
  })

  const handleClose = () => setOpen(false)

  const signInHandler = () => {
    setFeedback(true) // display loading backdrop...
    Firebase.auth().signInWithPopup(provider)
      .then((res) => {
        const { displayName } = res.user
        setFeedback(false)
        setOpen(false)
        setAlert({ open: true, message: `Welcome, ${displayName || 'Buddy'}`, severity: 'success' })
      })
      .catch((error) => {
        setFeedback(false)
        setAlert({ open: true, message: error, severity: 'error' })
        console.log({ error })
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
            <h2 id="transition-modal-title">Sign in</h2>
            <hr style={{ margin: '20px 0' }} />
            <Grid item xs={12}>
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
}

SignInModal.defaultProps = {
  open: false,
}

export default SignInModal
