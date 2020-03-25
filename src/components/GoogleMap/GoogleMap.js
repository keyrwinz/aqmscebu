import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import nodes from './AqmsNodes'
import nodeIcon from '../../assets/images/node.svg'

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [
      {
        color: '#202c3e',
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [
      {
        gamma: 0.01,
      },
      {
        lightness: 20,
      },
      {
        weight: '1.39',
      },
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        weight: '0.96',
      },
      {
        saturation: '9',
      },
      {
        visibility: 'on',
      },
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        lightness: 30,
      },
      {
        saturation: '9',
      },
      {
        color: '#29446b',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        saturation: 20,
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        lightness: 20,
      },
      {
        saturation: -20,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        lightness: 10,
      },
      {
        saturation: -30,
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#193a55',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        saturation: 25,
      },
      {
        lightness: 25,
      },
      {
        weight: '0.01',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        lightness: -20,
      },
    ],
  },
]

const Map = ({ nodeSelectFunc }) => {
  const [selectedNode, setSelectedNode] = useState(null)

  return (
    <GoogleMap
      defaultZoom={nodes.zoom}
      defaultCenter={nodes.center}
      defaultOptions={{ styles: mapStyles }}
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

export default Map
