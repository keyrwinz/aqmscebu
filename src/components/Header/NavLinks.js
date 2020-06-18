import React from 'react'
import { Link } from 'gatsby'
import { Routes } from '../../config'

const NavLinks = () => (
  <>
    {
      Routes.map((link) => (
        <Link key={link.route} className="nav-link" to={link.route} activeClassName="active">
          {link.text}
        </Link>
      ))
    }
  </>
)

export default NavLinks
