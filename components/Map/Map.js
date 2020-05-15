import React, { Component } from 'react';
import { GOOGLE_MAP_API_KEY } from '../../apiKey' // 引入 API key
import GoogleMapReact from 'google-map-react';
import { useState, useEffect} from 'react'



// const MyPositionMarker = ({ text }) => <div>{text}</div>;
const MyPositionMarker = ({ icon }) => <img style={{ height: '40px', width: '40px' }} src={icon} />

const Marker = props => (
  <React.Fragment>
    <div>
      <img style={{ height: '40px', width: '40px' }} src={props.icon} />
      <div>{props.text}</div>
   </div>
    {/* Below is info window component
    {props.show && (
      <div
        style={{
          width: 100,
          height: 100
        }}
      >
      {props.phone}
      
      </div>
    )} */}
  </React.Fragment>
)
// const SearchType = ({ text, type }) => {
//   return <input type="button" value={text} name={type} />
// }


const SimpleMap = (props) => {

  
  // User Location
  const [myPosition, setMyPosition] = useState({
    lat: props.lat,
    lng: props.lng
  })

  const [mapApiLoaded, setMapApiLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState(null)
  const [mapApi, setMapApi] = useState(null)
  const [places, setPlaces] = useState([])
  const [searchType, setSearchType] = useState('grocery_or_supermarket')
  // const [show,setShow] = useState(false)

  

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


  // const onChildClick = (key, childProps) => {
  //   setShow(!show)
  // }

  return (
    <div className="mainBody">
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
        // onChildClick={onChildClick}
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
            // show={show}
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


// SimpleMap.defaultProps = {
//   center: {
//     lat: 49,
//     lng: -123
//   },
//   zoom: 14
// };


export default SimpleMap

