import React from 'react'
import style from 'styled-components'
import NavLinks from './NavLinks'
import UserNav from './UserNav'
import Drawer from './Drawer'
import Logo from './LogoLink'
import Color from '../Theme/ColorPallete'

const Header = () => (
  <header>
    <Style>
      <div className="drawer">
        <Drawer />
      </div>
      <div className="navbar">
        <Logo />
        <div className="d-flex navbar-links">
          <NavLinks />
        </div>
      </div>
      <div className="d-flex">
        <UserNav />
      </div>
    </Style>
  </header>
)

const Style = style.div`
  background: ${Color.primaryColor};
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px 0px 30px;
  .navbar * {
    color: white;
  }
  .navbar {
    padding: 0;
  }
  .navbar-links a {
    text-decoration: none; 
  }
  .navbar-links a::after {
    content: '';
    display: block;
    width: 0;
    height: 3px;
    background: ${Color.whiteColor};
    transition: width .3s;
  }
  .navbar-links a:hover::after {
    width: 100%;
    transition: width .3s;
  }
  .active {
    color: ${Color.secondaryColor};
  }
  a.active::after {
    width: 100% !important;
  }
  .textWhite {
    color: white;
  }
  img {
    margin-bottom: 0px;
  }
  img:hover {
    cursor: pointer;
  }
  .avatar-popper {
    z-index: 99;
    top: 10px !important;
  }
  .drawer {
    display: none;
  }
  .loginBtn {
    padding: 0px;
    min-width: 0px;
  }

  @media (max-width: 767px) {
    padding: 0px 15px 0px 15px;
    .name-btn {
      display: none;
    }
    .drawer {
      display: block;
    }
    .navbar-links {
      display: none !important;
    }
    .avatar-pic {
      width: 30px;
      height: 30px;
    }
  }
`

export default Header
