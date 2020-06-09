import React from 'react'
import { Link } from 'gatsby'
import Logo from '../../assets/images/Logo.png'

export default () => (
  <Link to="/">
    <img
      src={Logo}
      alt="logo"
      height="50"
      width="50"
    />
  </Link>
)
