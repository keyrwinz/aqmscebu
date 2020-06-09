import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Modal, Backdrop, Fade, Grid, Paper, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import Firebase from '../Firebase/firebase'

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

  const handleClose = () => {
    setOpen(false)
  }

  const signInHandler = () => {
    Firebase.auth().signInWithPopup(provider)
      .then(() => {
        setOpen(false)
      })
      .catch((error) => {
        console.log({ error })
      })
  }

  return (
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
            </Paper>
          </Grid>
        </div>
      </Fade>
    </Modal>
  )
}

SignInModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
}

export default SignInModal
