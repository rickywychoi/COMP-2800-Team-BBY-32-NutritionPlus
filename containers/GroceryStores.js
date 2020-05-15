// GroceryStores.js

import axios from 'axios'

//import Link from 'next/link'
//import MediaQuery from 'react-responsive'
import { Table, Form } from 'react-bootstrap'
import groceryStoresStyles from '../styles/GroceryStores.module.css' //replace with your Grocerystores.css
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import Map from '../components/Map/Map'
import { useState, useEffect} from 'react'

import { set } from 'date-fns'


const GroceryStores = (props) => {
  
  const [lat, setLat] = useState()
  const [lng, setLng] = useState()
  
  
  useEffect(()=>{
    if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(showPosition);
      },[])

  const showPosition = (position) =>{
    setLat(position.coords.latitude)
    setLng(position.coords.longitude)
  }

  const stores = [
    {
      id: 1,
      name: "Costco",
      url: "https://www.costco.ca/grocery-household.html",
      option: "7-10 day delivery",
    },
    {
      id: 2,
      name: "Save-On-Foods",
      url: "https://shop.saveonfoods.com/store/D28B1082/?NoStoreTracking=true&_ga=2.85212121.1797111341.1589214006-1345666087.1589214006/#/locator?queries=fq%3DMwgService%253AShop2GroPickup%26take%3D999%26_%3D1589215309953%26skip%3D0%26region%3DBC",
      option: "pickup/delivery" // can improve
    },
    {
      id: 3,
      name: "Walmart",
      url: "https://www.walmart.ca/en/grocery/N-117",
      option: "time-slotted delivery" // can improve
    },
    {
      id: 4,
      name: "IGA",
      url: "https://shop.igabc.com/",
      option: "pickup only"
    },
    {
      id: 5,
      name: "H-Mart",
      url: "https://hmartpickup.ca/",
      option: "pickup only"
    },
    {
      id: 6,
      name: "T&T Supermarket",
      url: "https://www.tntsupermarket.com/",
      option: "out of stock"
    },
    {
      id: 7,
      name: "No Frills",
      url: "https://www.nofrills.ca/",
      option: "pickup only"
    },
    {
      id: 8,
      name: "Real Canadian Superstore",
      url: "https://www.realcanadiansuperstore.ca/",
      option: "pickup/delivery"
    }
  ]

  const handleStoreSelect = e => {
    e.preventDefault()
    props.onSetStore(e.target.value)
  }

  // TODO: insert google maps inside div mapContainer
  return (
    
    <div className={groceryStoresStyles.main}>
      <div className={groceryStoresStyles.header}>
        <h4>Grocery Stores</h4>
        <Form.Group controlId="formBasicGender" className="ml-3">
          <Form.Control required as="select" defaultValue="" onChange={handleStoreSelect}>
            <option disabled value="">Which store would you make an order to?</option>
            <option value="Costco">Costco</option>
            <option value="Save-On-Foods">Save-On-Foods</option>
            <option value="Walmart">Walmart</option>
            <option value="IGA">IGA</option>
            <option value="H-Mart">H-Mart</option>
            <option value="T&amp;T Supermarket">T&amp;T Supermarket</option>
            <option value="No Frills">No Frills</option>
            <option value="Real Canadian Superstore">Real Canadian Superstore</option>
          </Form.Control>
        </Form.Group>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Delivery Option</th>
          </tr>
       </thead>
       <tbody>
          {stores.map(item => {
           return (
              <tr key={item.id}>
                  <td><a href={item.url} target="_blank" className={groceryStoresStyles.stores}>{item.name}</a></td>
                  <td>{item.option}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <h4 style={{margin: "1.5rem 0 1rem 0"}}>See Nearby Stores</h4>
      <div className={groceryStoresStyles.mapContainer}>
        { lat&&lng ?
        
        <Map lat={lat} lng={lng}/>
        :null
        }
      </div>
      <style jsx>{`
        td {
          vertical-align: middle;
          padding: 0.4rem 0.5rem;
      `}</style>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onSetStore: (store) => dispatch({type: actions.SETSTORE, payload: store})
  }
}

export default connect(null, mapDispatchToProps)(GroceryStores);