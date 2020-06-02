import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Firebase from './Firebase/firebase'
import Color from './Theme/ColorPallete'
import Logo from '../assets/images/Logo.png'

const provider = new Firebase.auth.GoogleAuthProvider()
provider.addScope('profile')
provider.addScope('email')

const googleSignIn = () => {
  Firebase.auth().signInWithPopup(provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken
    // The signed-in user info.
    const { user } = result
    console.log({ user })
    console.log({ token })
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    // The email of the user's account used.
    const { email } = error
    // The firebase.auth.AuthCredential type that was used.
    const { credential } = error
    console.log({ errorCode })
    console.log({ errorMessage })
    console.log({ email })
    console.log({ credential })
  })
}


const Header = ({ siteTitle }) => (
  <header
    style={{
      background: Color.thirdColor,
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div>
      <span style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          <img
            style={{ margin: 0 }}
            src={Logo}
            alt="logo"
            height="50"
            width="50"
          />
          {siteTitle}
        </Link>
      </span>
    </div>
    <button type="button" style={{ position: 'absolute', right: '20px' }} onClick={() => googleSignIn()}>
      Sign in (G)
    </button>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
