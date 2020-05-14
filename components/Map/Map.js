import React, { Component } from 'react';
import { GOOGLE_MAP_API_KEY } from '../../apiKey' // 引入 API key
import GoogleMapReact from 'google-map-react';
import { useState, useEffect} from 'react'


const MyPositionMarker = ({ text }) => <div>{text}</div>;
const GroceryMarker = ({ icon, text }) => (
  <div>
    <img style={{ height: '30px', width: '30px' }} src={icon} />
    <div>{text}</div>
  </div>
)
// const SearchType = ({ text, type }) => {
//   return <input type="button" value={text} name={type} />
// }

const SimpleMap = (props) => {

  // User Location
  const [myPosition, setMyPosition] = useState({
    lat: 49.2309355,
    lng: -123.0028252
  })

  const [mapApiLoaded, setMapApiLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)
  const [places, setPlaces] = useState([])
  const [searchType, setSearchType] = useState('grocery_or_supermarket')

  

  const apiHasLoaded = (map, maps) => {
    setMapInstance(map)
    setMapApi(maps)
    setMapApiLoaded(true)
  };

  const handleCenterChange = () => {
    if(mapApiLoaded) {
      setMyPosition({
        
        lat: mapInstance.center.lat(),
        lng: mapInstance.center.lng()
      })
    }
  }

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

  // const handleSearchType = e => {
  //   setSearchType(e.target.name)
  //   findLocation() 
  // }

  useEffect(() => {
    findLocation()
  },[mapApiLoaded,searchType, myPosition])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: GOOGLE_MAP_API_KEY,
          libraries:['places'] 
        }}
        center={myPosition}
        zoom={18}
        onBoundsChange={handleCenterChange}
        // defaultCenter={myPosition}
        // defaultZoom={18}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
      >
        <MyPositionMarker
          lat={myPosition.lat}
          lng={myPosition.lng}
          text="My Position"
        />

        
        {places.map(item=>(
          <GroceryMarker
            icon={item.icon}
            key={item.id}
            lat={item.geometry.location.lat()}
            lng={item.geometry.location.lng()}
            text={item.name}
            placeId={item.place_id}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}


// SimpleMap.defaultProps = {
//   center: {
//     lat: 49,
//     lng: -123
//   },
//   zoom: 14
// };


export default SimpleMap

