import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow,
} from 'react-google-maps'
import { AirMonitoringNodes as nodes } from '../../config'
import mapStyles from './GoogleMapStyle'
import nodeIcon from '../../assets/images/NodeIcon.png'

const Map = ({ nodeSelectFunc }) => {
  const [selectedNode, setSelectedNode] = useState(null)

  return (
    <GoogleMap
      defaultZoom={nodes.zoom}
      defaultCenter={nodes.center}
      defaultOptions={
        {
          styles: mapStyles,
          mapTypeControl: false,
          streetViewControl: false,
        }
      }
    >
      {nodes.nodesLoc.map((node) => (
        <Marker
          key={node.id}
          position={{
            lat: node.lat,
            lng: node.lng,
          }}
          onClick={() => {
            nodeSelectFunc(node.id)
            setSelectedNode(node)
          }}
          icon={{
            url: nodeIcon,
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
      ))}

      {selectedNode && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedNode(null)
          }}
          position={{
            lat: selectedNode.lat,
            lng: selectedNode.lng,
          }}
        >
          <div>
            <h2>{selectedNode.text}</h2>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

Map.propTypes = {
  nodeSelectFunc: PropTypes.func.isRequired,
}

export default withScriptjs(withGoogleMap(Map))
