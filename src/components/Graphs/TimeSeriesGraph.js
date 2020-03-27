import React from 'react'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'
import Spinner from '../Spinner'
import Color from '../Theme/ColorPallete'

const LoadableChart = Loadable({
  loader: () => import('../../../node_modules/react-apexcharts/src/react-apexcharts'),
  loading() {
    return <Spinner />
  },
})

const TimeSeriesGraph = ({
  title, unit, states, label,
}) => {
  const graphData = {
    series: [
      {
        name: label,
        data: states,
      },
    ],
    options: {
      chart: {
        type: 'area',
        id: 'realtime',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000,
          },
        },
        stacked: false,
        height: 350,
        foreColor: Color.whiteColor,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: 'zoom',
        },
      },
      dataLabels: {
        enabled: false,
        formatter(val) {
          return val.toFixed(2)
        },
      },
      markers: {
        size: 0,
      },
      title: {
        text: title || 'No title',
        align: 'left',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color: Color.whiteColor,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter(val) {
            return val.toFixed(2)
          },
        },
        title: {
          text: unit || 'No unit',
        },
      },
      xaxis: {
        type: 'datetime',
        title: {
          text: 'Time',
        },
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: '12px',
          color: Color.secondaryColor,
          fontColor: Color.secondaryColor,
        },
        x: {
          formatter(val) {
            const epochTime = new Date(val * 1000)
            const timestamp = epochTime.toLocaleString('en-GB', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: true,
            })
            return timestamp
          },
        },
        shared: false,
        y: {
          formatter(val) {
            return val.toFixed(2)
          },
        },
      },
    },
  }

  return (
    <>
      <LoadableChart
        options={graphData.options}
        series={graphData.series}
        type="area"
        height="350"
      />
    </>
  )
}

TimeSeriesGraph.propTypes = {
  title: PropTypes.string,
  unit: PropTypes.string,
  states: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  label: PropTypes.string,
}

TimeSeriesGraph.defaultProps = {
  title: '',
  unit: '',
  states: [],
  label: '',
}

export default TimeSeriesGraph
