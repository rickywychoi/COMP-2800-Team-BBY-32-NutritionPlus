// GroceryStores.js

import axios from 'axios'
import { useState } from 'react'
//import Link from 'next/link'
//import MediaQuery from 'react-responsive'
import { Table, Form } from 'react-bootstrap'
import groceryStoresStyles from '../styles/GroceryStores.module.css' //replace with your Grocerystores.css
import { connect } from 'react-redux'
import * as actions from '../store/actions'

const GroceryStores = (props) => {
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
      option: "pickup only"
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
            <option disabled value="">Which store would you visit for these items?</option>
            <option value="costco">Costco</option>
            <option value="saveOnFoods">Save-On-Foods</option>
            <option value="walmart">Walmart</option>
            <option value="iga">IGA</option>
            <option value="hmart">H-Mart</option>
            <option value="tnt">T&amp;T Supermarket</option>
            <option value="noFrills">No Frills</option>
            <option value="superstore">Real Canadian Superstore</option>
          </Form.Control>
        </Form.Group>
      </div>
      <Table striped border hover>
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

      <h4>See Nearby Stores</h4>
      <div className={groceryStoresStyles.mapContainer}>
        <img src="https://via.placeholder.com/400"></img>
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