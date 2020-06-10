import React from 'react'
import { Popover } from 'react-bootstrap'

const popover = (param, param2 = null) => {
  let title = ''
  let unit = ''

  if (param === 'PM25') {
    title = 'Particulate Matter 2.5'
    unit = 'µg/m³'
  } else if (param === 'PM10') {
    title = 'Particulate Matter 10'
    unit = 'µg/m³'
  } else if (param === 'NO2') {
    title = 'Nitrogen Dioxide'
    unit = 'ppm'
  } else if (param === 'SO2') {
    title = 'Sulfur Dioxide'
    unit = 'ppm'
  } else if (param === 'TEMP') {
    title = 'Temperature'
    unit = '°C'
  } else if (param === 'HUMIDITY') {
    title = 'Humidity'
    unit = '%'
  } else if (param === 'weather') {
    title = 'Current Weather'
    unit = param2 || 'No weather data'
  }

  return (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{title}</Popover.Title>
      <Popover.Content>
        unit:
        {' '}
        <strong>{unit}</strong>
      </Popover.Content>
    </Popover>
  )
}

export default popover
