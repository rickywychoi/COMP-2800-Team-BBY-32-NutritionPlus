/**
 * A list of grocery stores from which you can order your groceries.
 * Grocery store data is static. Each store has its own url to redirect.
 * 
 * Uses React Bootstrap Form to create the form and a drop-down menu to 
 * select stores. Table is used to hold grocery store data. Dropdown &
 * DropdownButton to show list of myCart food items
 * 
 * Table
 * @see https://react-bootstrap.github.io/components/table/
 * 
 * Form
 * @see https://react-bootstrap.github.io/components/forms/
 * 
 * Dropdown
 * @see https://react-bootstrap.github.io/components/dropdowns/
 */


import { Table, DropdownButton, Dropdown } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import groceryStoresStyles from '../styles/GroceryStores.module.css' //replace with your Grocerystores.css
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import Map from '../components/Map/Map'
import { useState, useEffect} from 'react'

const GroceryStores = (props) => {
  
  const [lat, setLat] = useState()
  const [lng, setLng] = useState()
  
  const myCart = props.myCart

  // contains information of each store
  const stores = [
    {
      id: 1,
      name: "Costco",
      url: "https://www.costco.ca/grocery-household.html",
      option: "7-10 day delivery",
      search: "https://www.costco.ca/grocery-household.html?dept=Grocery&keyword=[item]",
      searchDelimiter: "+"
    },
    {
      id: 2,
      name: "Save-On-Foods",
      url: "https://shop.saveonfoods.com/store/D28B1082/?NoStoreTracking=true&_ga=2.85212121.1797111341.1589214006-1345666087.1589214006/#/locator?queries=fq%3DMwgService%253AShop2GroPickup%26take%3D999%26_%3D1589215309953%26skip%3D0%26region%3DBC",
      option: "pickup/delivery",
      search: "https://shop.saveonfoods.com/store/4D301125?FulfillmentSignal=pickup#/search/[item]",
      searchDelimiter: "%20"
    },
    {
      id: 3,
      name: "Walmart",
      url: "https://www.walmart.ca/en/grocery/N-117",
      option: "time-slotted delivery",
      search: "https://www.walmart.ca/search/[item]/N-117",
      searchDelimiter: "%20"
    },
    {
      id: 4,
      name: "IGA",
      url: "https://shop.igabc.com/",
      option: "pickup only",
      search: "https://shop.igabc.com/vancouver_robson#/search?q=[item]",
      searchDelimiter: "%20"
    },
    {
      id: 5,
      name: "H-Mart",
      url: "https://hmartpickup.ca/",
      option: "pickup only",
      search: "https://coq.hmartpickup.ca/?s=[item]&post_type=product",
      searchDelimiter: "+"
    },
    {
      id: 6,
      name: "T&T Supermarket",
      url: "https://www.tntsupermarket.com/",
      option: "pickup only",
      search: "https://www.tntsupermarket.com/catalogsearch/result/?q=[item]",
      searchDelimiter: "+"
    },
    {
      id: 7,
      name: "No Frills",
      url: "https://www.nofrills.ca/",
      option: "pickup only",
      search: "https://www.nofrills.ca/search?search-bar=[item]",
      searchDelimiter: "%20"
    },
    {
      id: 8,
      name: "Real Canadian Superstore",
      url: "https://www.realcanadiansuperstore.ca/",
      option: "pickup/delivery",
      search: "https://www.realcanadiansuperstore.ca/search?search-bar=[item]",
      searchDelimiter: "%20"
    }
  ]

  useEffect(()=>{
    
    // for google maps
    if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(showPosition);
  },[])

  //show current location of user
  const showPosition = (position) =>{
    setLat(position.coords.latitude)
    setLng(position.coords.longitude)
  }

  //changes food item query to encodedURI for href to external website
  const handleStoreSearch = (url, delimiter, item) => {
    let query = encodeURIComponent(item).replace(/%20/g, delimiter)
    let result = url.replace("[item]", query)
  
    return result
  }

  return (
    
    <div className={groceryStoresStyles.main}>
      <div className={groceryStoresStyles.header}>
        <h4 style={{marginBottom: "1rem"}}>Grocery Stores</h4>
      </div>

      {/* Media Query for min-device-width: 500px */}
      <MediaQuery minDeviceWidth={500}>
      {/* Table component from react-bootstrap */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Delivery Option</th>
            <th>Find Item on Store Website</th>
          </tr>
       </thead>
       <tbody>
          {
          //Loops through stores array and shows each grocery store information
          stores.map(store => {
           return (
              <tr key={store.id}>
                  <td><a href={store.url} target="_blank" className={groceryStoresStyles.stores} title={`Go to: ${store.url}`}>{store.name}</a></td>
                  <td>{store.option}</td>
                  <td>

                    {/* Dropdown component from react-bootstrap */}
                    <DropdownButton alignRight variant="outline-secondary" title="Select an Item">
                      <Dropdown.Header><i>Find on {store.name} Website</i></Dropdown.Header>
                      {
                        //Loops through myCart array and shows each item as a search query to grocery store websites
                        myCart.map(item => {
                          return(
                            <Dropdown.Item
                            key={handleStoreSearch(store.search, store.searchDelimiiter, item.description)}
                              href={handleStoreSearch(store.search, store.searchDelimiter, item.description)}
                              target="_blank"
                              rel="noopener"
                              className={groceryStoresStyles.stores}
                              title={`Go to: ${handleStoreSearch(store.search, store.searchDelimiter, item.description)}`}
                              >
                              {item.description}
                            </Dropdown.Item>
                          )
                        })
                      }
                    </DropdownButton>                   
                  </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      </MediaQuery>

      {/* Media Query for max-device-width: 499px */}
      <MediaQuery maxDeviceWidth={499}>
      {/* Table component from react-bootstrap */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Store Details</th>
            <th>Find Item on Store Website</th>
          </tr>
       </thead>
       <tbody>
          {
          //Loops through stores array and shows each grocery store information
          stores.map(store => {
            return (
              <tr key={store.id}>
                  <td>
                    <a href={store.url} target="_blank" className={groceryStoresStyles.stores} title={`Go to: ${store.url}`}>{store.name}</a>
                    <br/>
                    <i>({store.option})</i>
                  </td>
                  <td>

                    {/* Dropdown component from react-bootstrap */}
                    <DropdownButton alignRight variant="outline-secondary" title="Select an Item">
                      <Dropdown.Header><i>Find on {store.name} Website</i></Dropdown.Header>
                      {
                        //Loops through myCart array and shows each item as a search query to grocery store websites
                        myCart.map(item => {
                          return(
                            <Dropdown.Item
                              key={handleStoreSearch(store.search, store.searchDelimiiter, item.description)}
                              href={handleStoreSearch(store.search, store.searchDelimiter, item.description)}
                              target="_blank"
                              rel="noopener"
                              className={groceryStoresStyles.stores}
                              title={`Go to: ${handleStoreSearch(store.search, store.searchDelimiter, item.description)}`}
                            >
                              {item.description}
                            </Dropdown.Item>
                          )
                        })
                      }
                    </DropdownButton>                   
                  </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      </MediaQuery>

      {/*Google Maps Container */}
      <h4 style={{margin: "1.5rem 0 1rem 0"}}>See Nearby Stores</h4>
      <div className={groceryStoresStyles.mapContainer}>
        { lat&&lng ?
        
        <Map lat={lat} lng={lng}/>
        :null
        }
      </div>

      {/* Stylesheet for each table row */}
      <style jsx>{`
        td {
          vertical-align: middle;
          padding: 0.4rem 0.5rem;
      `}</style>
    </div>
  )
}

// contains the application's state - the current user object and the user's cart
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    myCart: state.myCart
  }
}

export default connect(mapStateToProps)(GroceryStores);