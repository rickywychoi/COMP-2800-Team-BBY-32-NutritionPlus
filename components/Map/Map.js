/**
 * Google Maps API to show nearby grocery stores to order from when user
 * checks out an order.
 */

import React, { Component } from 'react';
import { GOOGLE_MAP_API_KEY } from '../../apiKey' // API key
import GoogleMapReact from 'google-map-react';
import { useState, useEffect} from 'react'

// User position icon
const MyPositionMarker = ({ icon }) => <img style={{ height: '40px', width: '40px' }} src={icon} />

// Grocery store icon and name
const Marker = props => (
  <React.Fragment>
    <div>
      <img style={{ height: '40px', width: '40px' }} src={props.icon} />
      <div>{props.text}</div>
   </div>
  </React.Fragment>
)

// Initiate the map with props
const SimpleMap = (props) => {
  // User Location
  const [myPosition, setMyPosition] = useState({
    lat: props.lat,
    lng: props.lng
  })

  // Make state for following variables
  const [mapApiLoaded, setMapApiLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)
  const [places, setPlaces] = useState([])
  const [searchType, setSearchType] = useState('grocery_or_supermarket')  

  // Loading map
  const apiHasLoaded = (map, maps) => {
    setMapInstance(map)
    setMapApi(maps)
    setMapApiLoaded(true)
  };

  // Keep user location at the center of the map
  const handleCenterChange = () => {
    if(mapApiLoaded) {
      setMyPosition({
        
        lat: mapInstance.center.lat(),
        lng: mapInstance.center.lng()
      })
    }
  }

  // Find Grocery locations
  const findLocation = () => {
    if(mapApiLoaded) {
      const service = new mapApi.places.PlacesService(mapInstance)
  
      const request = {
        location: myPosition,
        radius: 1000,
        type: ['grocery_or_supermarket']
      };
  
      service.nearbySearch(request, (results, status) => {
        if(status === mapApi.places.PlacesServiceStatus.OK) {
          setPlaces(results) 
        }
      })
    }
  }

  // state changing for find grocery location and display markers
  useEffect(() => {
    findLocation()
  },[mapApiLoaded,searchType, myPosition])

  return (
    <div className="mainBody">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: GOOGLE_MAP_API_KEY,
          libraries:['places'] 
        }}
        center={myPosition}
        zoom={16}
        onBoundsChange={handleCenterChange}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
      >
        <MyPositionMarker
          lat={myPosition.lat}
          lng={myPosition.lng}
          icon="./images/person.png"
        />

        
        {places.map(item=>(
          <Marker
            icon="./images/shopping.png"
            key={item.id}
            lat={item.geometry.location.lat()}
            lng={item.geometry.location.lng()}
            text={item.name}
            placeId={item.place_id}
          />
        ))}
      </GoogleMapReact>
      <style>{`
        .mainBody {
          height: 85vh;
          width: 100%;
        }

        @media (max-width: 499px) {
          .mainBody {
            height: 40vh;
          }
        } 
      `}</style>
    </div>
  );
}

export default SimpleMap

