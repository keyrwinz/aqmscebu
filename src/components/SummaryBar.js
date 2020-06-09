import React from 'react'
import styled from 'styled-components'
import Color from './Theme/ColorPallete'

const SummaryBar = () => (
  <Style>
    <span>Notification: </span>
  </Style>
)

const Style = styled.div`
  width: 100%;
  height 100%;
  padding: 0 10px;
  background: ${Color.thirdColor};
  display: flex;
  align-items: center;
`

export default SummaryBar
