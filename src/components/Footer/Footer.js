import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import {
  GitHub, Facebook, Twitter, Instagram,
} from '@material-ui/icons'
import { SocialMediaLinks } from '../../config'
import Alert from '../Utils/alert'
import Color from '../Theme/ColorPallete'

const getIcon = (icon) => {
  switch (icon) {
    case 'Github':
      return <GitHub />
    case 'Facebook':
      return <Facebook />
    case 'Twitter':
      return <Twitter />
    case 'Instagram':
      return <Instagram />
    default:
      return null
  }
}

const Footer = () => {
  const author = useStaticQuery(graphql`
    query SiteAuthorQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const [alert, setAlert] = useState({
    open: false,
    message: '',
  })

  const navigatePlatforms = (route) => (route.slice(0, 4) === 'http'
    ? window.open(route, '_blank', 'noopener')
    : setAlert({ open: true, message: `No ${route} Link Yet` }))

  const PlatformLinks = (
    <>
      {SocialMediaLinks.map((platform) => (
        <span
          className="media-icons"
          role="presentation"
          key={platform.text}
          onClick={() => navigatePlatforms(platform.route)}
        >
          {getIcon(platform.icon)}
        </span>
      ))}
    </>
  )

  return (
    <Style>
      <Alert open={alert.open} setOpen={setAlert} message={alert.message} severity="warning" />
      <div className="row">
        <div className="col">
          <div className="footer-row">
            {PlatformLinks}
          </div>
          <div className="footer-row">
            ©
            { new Date().getFullYear() }
            , Built by
            &nbsp;
            <a href="#home">
              {author.site.siteMetadata.author}
            </a>
          </div>
        </div>
      </div>
    </Style>
  )
}

const Style = styled.div`
  background: ${Color.thirdColor};
  color: ${Color.whiteColor};

  .row {
    width: 100%;
    margin: 0px;
  }

  .footer-row {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50px;
  }

  .media-icons {
    margin: 0 15px;
  }
  .media-icons:hover {
    cursor: pointer;
  }
`

export default Footer
