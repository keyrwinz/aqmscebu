import React from 'react'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'
import styled from 'styled-components'
import Spinner from '../../Spinner'
import { getTitleAndUnit, getPercent, getColor } from './get-details'
import makeBadge from '../../Utils/makeBadge'
import Color from '../../Theme/ColorPallete'

const LoadableChart = Loadable({
  loader: () => import('react-apexcharts/src/react-apexcharts'),
  loading() {
    return <Spinner small />
  },
})

const GaugeComponent = ({
  loading, param, value, classification,
}) => {
  if (loading) return <Spinner />
  const percentVal = getPercent(param, value)
  const progressColor = getColor(param, value, classification)
  const angle = param === 'Temperature' || param === 'Humidity' ? 160 : 120
  const graphData = {
    series: [percentVal],
    options: {
      chart: {
        type: 'radialBar',
        offsetY: -5,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -(angle),
          endAngle: angle,
          track: {
            background: Color.primaryColor,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      fill: {
        type: 'solid',
        colors: [progressColor],
      },
    },
  }

  const paramInfo = getTitleAndUnit(param)
  const badge = makeBadge(classification)
  return (
    <Style>
      {paramInfo.title}
      <LoadableChart width="100" height="100" options={graphData.options} series={graphData.series} type="radialBar" />
      <p className="value">{value}</p>
      <p className="unit">
        {paramInfo.unit}
      </p>
      <div className="badge-container">
        {badge}
      </div>
    </Style>
  )
}

const Style = styled.div`
  display: inline-block;
  position: relative;
  height: 100%;
  width: 100px;
  .param {
    margin-bottom: 5px;
    text-align: center;
    color: white;
    font-size: 15px;
  }
  .value {
    position: absolute;
    color: ${Color.whiteColor};
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    top: 50px;
    width: 100%;
  }
  .unit {
    position: absolute;
    color: ${Color.whiteColor};
    text-align: center;
    font-size: 13px;
    font-weight: 100;
    top: 70px;
    width: 100%;
  }
  .badge-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0px;
  }
  .badge-container span {
    max-width: 100px;
    white-space: normal;
  }
`

GaugeComponent.propTypes = {
  loading: PropTypes.bool,
  param: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classification: PropTypes.string,
}

GaugeComponent.defaultProps = {
  loading: false,
  param: '',
  value: 'No data',
  classification: '',
}

export default GaugeComponent
