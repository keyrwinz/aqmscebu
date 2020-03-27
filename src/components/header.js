import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Color from './Theme/ColorPallete'
import Logo from '../assets/images/Logo.png'

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
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
