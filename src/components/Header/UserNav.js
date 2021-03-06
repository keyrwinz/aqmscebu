import React, {
  useState, useRef, useEffect, useContext,
} from 'react'
import {
  Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Avatar,
} from '@material-ui/core'
import { AppCtx } from '../../../provider'
import getFirebase from '../Firebase/firebase'
import SignInModal from '../Feedback/SignInModal'

const UserNav = () => {
  const firebase = getFirebase()
  const store = useContext(AppCtx)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!firebase) return
    firebase.auth().onAuthStateChanged(async (userInfo) => {
      if (userInfo) {
        try {
          const token = await userInfo.getIdToken()
          store.updateUser({ ...userInfo, token })
        } catch (error) {
          console.log('On AuthStateChanged Error')
        }
      } else {
        store.updateUser(null)
      }
    })
  }, [firebase])

  useEffect(() => {
    const name = store.user?.displayName
    const email = store.user?.email
    const uid = store.user?.uid
    const photoUrl = store.user?.photoURL
    setUser({
      name,
      email,
      uid,
      photoUrl,
    })
  }, [store])

  const [modalState, setModalState] = useState(false)
  const [openAvatarPopper, setOpenAvatarPopper] = useState(false)
  const anchorRef = useRef(null)

  const googleSignOut = () => {
    if (!firebase) return
    firebase.auth().signOut()
      .then(() => {
        setOpenAvatarPopper(false)
      })
      .catch(() => {
        console.log('Error signing out')
      })
  }

  const handleToggle = () => setOpenAvatarPopper((prevOpen) => !prevOpen)

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return
    setOpenAvatarPopper(false)
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openAvatarPopper)
  useEffect(() => {
    if (prevOpen.current === true && openAvatarPopper === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = openAvatarPopper
  }, [openAvatarPopper])

  return (
    <>
      <SignInModal open={modalState} setOpen={setModalState} />
      { !user || (user?.name === undefined && user?.email === undefined) ? (
        <Button className="loginBtn textWhite" onClick={() => setModalState(true)}>Login</Button>
      ) : (
        <>
          <Button className="textWhite name-btn">
            { user?.name || 'Anonymous' }
          </Button>
          <Avatar
            className="avatar-pic"
            aria-controls={openAvatarPopper ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            ref={anchorRef}
            alt={user?.name}
            src={user?.photoUrl}
            onClick={handleToggle}
          >
            {user?.name[0]}
          </Avatar>
        </>
      )}
      <Popper
        className="avatar-popper"
        open={openAvatarPopper}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'top' : 'bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={openAvatarPopper} id="menu-list-grow">
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={googleSignOut}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default UserNav
