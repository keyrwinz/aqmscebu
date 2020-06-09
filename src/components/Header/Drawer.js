import React, { useState } from 'react'
import { navigate } from 'gatsby'
import style from 'styled-components'
import {
  SwipeableDrawer, Button, List, ListItem, ListItemIcon, ListItemText, Divider,
} from '@material-ui/core'
import {
  Home, Assessment, Info, Menu, GitHub, Facebook, Twitter, Instagram,
} from '@material-ui/icons'
import Links from './Links'
import Color from '../Theme/ColorPallete'

const getIcon = (icon) => {
  switch (icon) {
    case 'Home':
      return <Home />
    case 'Data':
      return <Assessment />
    case 'About':
      return <Info />
    case 'Menu':
      return <Menu />
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

const Drawer = () => {
  const [state, setState] = useState(false)

  const toggleDrawer = (newState) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return
    setState(newState)
  }

  const navigateLink = (route) => navigate(route)
  const navigatePlatforms = (route) => window.open(route, '_blank', 'noopener')

  const platforms = [
    { text: 'Github', icon: 'Github', route: 'https://github.com/keyrwinz/aqmscebu' },
    { text: 'Facebook', icon: 'Facebook', route: '#f' },
    { text: 'Twitter', icon: 'Twitter', route: '#t' },
    { text: 'Instagram', icon: 'Instagram', route: '#i' },
  ]

  const DrawerLinks = (
    <div
      style={{ width: '180px' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {Links.map((link) => (
        <ListItem button key={link.route} onClick={() => navigateLink(link.route)}>
          <ListItemIcon>{getIcon(link.text)}</ListItemIcon>
          <ListItemText primary={link.text} />
        </ListItem>
      ))}
    </div>
  )

  const PlatformLinks = (
    <div
      style={{ width: '180px' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {platforms.map((platform) => (
        <ListItem button key={platform.text} onClick={() => navigatePlatforms(platform.route)}>
          <ListItemIcon>
            {getIcon(platform.icon)}
          </ListItemIcon>
          <ListItemText primary={platform.text} />
        </ListItem>
      ))}
    </div>
  )

  return (
    <Style>
      <Button className="drawer-icon" onClick={toggleDrawer(true)}>
        <Menu style={{ color: Color.secondaryColor }} />
      </Button>
      <SwipeableDrawer
        anchor="left"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <List>
          {DrawerLinks}
          <Divider />
          {PlatformLinks}
        </List>
      </SwipeableDrawer>
    </Style>
  )
}

const Style = style.div`
  .drawer-icon {
    padding: 0px;
    min-width: 0px;
  }
`

export default Drawer
