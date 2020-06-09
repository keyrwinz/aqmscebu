import React from 'react'
import { Link } from 'gatsby'
import Links from './Links'

const NavLinks = () => (
  <>
    {
      Links.map((link) => (
        <Link key={link.route} className="nav-link" to={link.route} activeClassName="active">
          {link.text}
        </Link>
      ))
    }
  </>
)

export default NavLinks
