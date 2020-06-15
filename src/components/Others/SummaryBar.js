import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import Spinner from '../Spinner'
import Color from '../Theme/ColorPallete'

const ONE_HOUR = 1000 * 60 * 60 // in ms

const SummaryBar = ({ node, state, loading }) => {
  if (loading && !state) return <Style><Spinner style={{ marginLeft: '5px' }} small /></Style>

  let isOnline = false
  const timestamp = moment.unix(state.ti)
  const now = moment(Date.now())

  if ((now - timestamp) < ONE_HOUR) {
    isOnline = true
  }

  return (
    <Style>
      <span className="label">
        Node:
        <span className="value node">
          {` ${node}`}
        </span>
      </span>
      <span className="label status">
        Status:
        { loading ? <Style><Spinner small /></Style> : (
          <span className={`value ${isOnline ? 'green' : 'red'}`}>
            <span className={`indicator ${isOnline ? 'online' : 'offline'}`} />
            {`${isOnline ? 'Online' : 'Offline'}`}
          </span>
        )}
      </span>
      <span className="label">
        Last update:
        { !loading ? (
          <span className="value">
            {` ${moment.unix(state.ti).fromNow()}`}
          </span>
        )
          : ''}
      </span>
    </Style>
  )
}

const Style = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height 100%;
  padding: 0 14px;
  border-radius: 4px;
  background: ${Color.thirdColor};
  .label {
    margin-right: 15px;
  }
  .node {
    text-transform: uppercase;
  }
  .value {
    color: ${Color.whiteColor};
  }
  .green {
    color: ${Color.greenColor};
  }
  .red {
    color: ${Color.redColor};
  }
  .label.status {
    display: inline-flex;
  }
  .label.status .value {
    display: inline-flex;
    align-items: center;
  }
  @keyframes pulse-animation {
    0% { -webkit-transform: scale(1); }
    25% { -webkit-transform: scale(1); }
    50% { -webkit-transform: scale(1.2) }
    75% { -webkit-transform: scale(1); }
    100% { -webkit-transform: scale(1); }
  }
  .indicator {
    margin: 0 5px;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .indicator.online {
    background: ${Color.greenColor};
    animation: pulse-animation 2s infinite linear;
  }
  .indicator.offline {
    background: ${Color.redColor};
  }
`

SummaryBar.propTypes = {
  node: PropTypes.string.isRequired,
  state: PropTypes.shape(),
  loading: PropTypes.bool,
}

SummaryBar.defaultProps = {
  state: null,
  loading: false,
}

export default SummaryBar
