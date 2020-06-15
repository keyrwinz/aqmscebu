import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'
import Color from './Theme/ColorPallete'
import './layout.css'
import '../assets/css/bootstrap.css'

const Layout = ({ children }) => (
  <>
    <Header />
    <MainStyle>
      <main>{children}</main>
    </MainStyle>
    <Footer />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const MainStyle = styled.div`
  box-sizing: border-box;
  background: ${Color.primaryColor};
  color: ${Color.secondaryColor};
  font-family: Roboto, sans-serif;
  padding-top: 15px;
  padding-bottom: 12px;
  min-height: 100vh;
`

export default Layout
