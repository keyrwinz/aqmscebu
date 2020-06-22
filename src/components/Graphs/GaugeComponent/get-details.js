/* eslint-disable import/prefer-default-export */
import React from 'react'

export const getTitleAndUnit = (param) => {
  switch (param) {
    case 'PM25':
      return {
        title: (
          <p className="param">
            PM
            <sub>2.5</sub>
          </p>
        ),
        unit: 'µg/m³',
      }
    case 'PM10':
      return {
        title: (
          <p className="param">
            PM
            <sub>10</sub>
          </p>
        ),
        unit: 'µg/m³',
      }
    case 'NO2':
      return {
        title: (
          <p className="param">
            NO
            <sub>2</sub>
          </p>
        ),
        unit: 'ppm',
      }
    case 'SO2':
      return {
        title: (
          <p className="param">
            SO
            <sub>2</sub>
          </p>
        ),
        unit: 'ppm',
      }
    case 'Temperature':
      return {
        title: (
          <p className="param">Temperature</p>
        ),
        unit: '°C',
      }
    case 'Humidity':
      return {
        title: (
          <p className="param">Humidity</p>
        ),
        unit: '%',
      }
    default:
      return {
        title: (
          <p className="param">
            No Title
          </p>
        ),
        unit: 'unit',
      }
  }
}

export const getPercent = (param, value) => {
  switch (param) {
    case 'PM25': return ((value * 100) / 504)
    case 'PM10': return ((value * 100) / 504)
    case 'NO2': return ((value * 100) / 1.64)
    case 'SO2': return ((value * 100) / 0.804)
    case 'Temperature': return ((value * 100) / 100)
    case 'Humidity': return ((value * 100) / 100)
    default: return 0
  }
}

export const getColor = (param, value, classification) => {
  switch (classification) {
    case 'Good': return '#32CD32'
    case 'Fair': return '#FFFF00'
    case 'Unhealthy': return '#FFA500'
    case 'Very Unhealthy': return '#FF0000'
    case 'Acutely Unhealthy': return '#800080'
    case 'Emergency': return '#800000'
    case '':
      if (param === 'Temperature') {
        if (value > 38) return '#FFFF00'
        return '#32CD32'
      }
      if (param === 'Humidity') {
        if (value > 70) return '#FFFF00'
        return '#32CD32'
      }
      break
    default: return '#808080'
  }
}
