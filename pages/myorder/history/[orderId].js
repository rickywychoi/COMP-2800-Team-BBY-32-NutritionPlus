// Provides information about an order that's been placed with groceries the
// users have selected. Uses bootstrap's Button and Table for the respective
// buttons and table designs.

import firebase from 'firebase'
import firebaseConfig from '../../../firebaseConfig'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Table } from 'react-bootstrap'
import { MdArrowBack } from 'react-icons/md'
import MediaQuery from 'react-responsive'
import Chart from '../../../containers/Chart/GroceryChart'
import DateFormatter from '../../../components/DateFormatter/DateFormatter'
import cartStyles from '../../../styles/MyCart.module.css'
import listStyles from '../../../styles/SearchList.module.css'
import buttonStyles from '../../../styles/buttons.module.css'
import ErrorPage from '../../../components/ErrorPage/ErrorPage'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const ArchivedOrderDetail = (props) => {
  const router = useRouter()
  // my cart with repeating single items
  const [rawCart, setRawCart] = useState([])
  // my cart with quantity
  const [myCart, setMyCart] = useState([])
  // descending order of date by default
  const [isDesc, setDesc] = useState(true)
  const [store, setStore] = useState("")
  const [storeUrl, setStoreUrl] = useState("")
  const [orderedAt, setOrderedAt] = useState("")

  const storeList = [
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
  
  useEffect(() => {
    if (props.currentUser) {
      db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
        let orderHistory = userInfo.data().orderHistory
        orderHistory.forEach(order => {
          if (order.orderedAt.toMillis() == router.query.orderId) {
            setMyCart(sortArrayDesc(order.cart))
            setStore(order.storeToVisit)
            storeList.forEach(store => {
              if (store.name.localeCompare(order.storeToVisit) == 0) {
                setStoreUrl(store.url)
              }
            })
            setOrderedAt(order.orderedAt)
            let newArray = []
            let itemWithoutQty
            order.cart.forEach(item => {
              let quantity = item.quantity
              itemWithoutQty = {}
              Object.assign(itemWithoutQty, item)
              delete itemWithoutQty.quantity
              console.log(itemWithoutQty)
              for (let i = 0; i < quantity; i++) {
                newArray.push(itemWithoutQty)
              }
              itemWithoutQty = {}
            })
            setRawCart(sortArrayDesc(newArray))
          }
        })
      })
    }
  }, [])
  
  // sort array by date - descending
  const sortArrayDesc = (arr) => {
    return arr.sort((a, b) => b.itemAddedAt.toDate() - a.itemAddedAt.toDate())
  }
  
  // sort array by date - ascending
  const sortArrayAsc = (arr) => {
    return arr.sort((a, b) => a.itemAddedAt.toDate() - b.itemAddedAt.toDate())
  }
  
  return (
    props.currentUser
    ?
    <div className={cartStyles.mainBody}>
      <div className={cartStyles.buttonsWrapper}>
        <Button variant="secondary" className={buttonStyles.button} onClick={() => router.push("/myorder/history")}><span><MdArrowBack /> Order History</span></Button>
      </div>
      <div style={{marginTop: "1rem"}}>
        <h3 className="header">Order made to <a href={storeUrl} target="_blank" className="storeLink">{store}</a></h3>
        {orderedAt ? <p><DateFormatter date={orderedAt.toDate()}/></p> : null}
        {/* Media Query for min-device-width: 500px */}
        <MediaQuery minDeviceWidth={500}>
          <div className={cartStyles.table}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Added at</th>
                </tr>
              </thead>
              <tbody>
                {
                  myCart.map(item => {
                    return (
                      <tr key={item.fdcId}>
                        <td>
                          <Link 
                            href={{pathname: '/search/[fdcId]', query: {itemname: (item.brandOwner ? item.description + " - " + item.brandOwner : item.description)}}} 
                            as={`/search/${item.fdcId}?itemname=${item.brandOwner ? item.description + " - " + item.brandOwner : item.description}`}
                          >
                            <a className={listStyles.itemLink}>
                                  {item.description}
                                  {item.brandOwner ? " - " + item.brandOwner : null}
                            </a>
                          </Link>
                        </td>
                        <td>
                          {Object.getOwnPropertyNames(item).map(property => {
                            if (property.toLowerCase().includes("category")) {
                              if (typeof item[property] == 'string' || item[property] instanceof String) {
                                return item[property]
                              } else if (typeof item[property] == 'object' || item[property] instanceof Object) {
                                let categoryString
                                Object.values(item[property]).forEach(val => {
                                  if (isNaN(parseFloat(val))) {
                                    categoryString = val
                                  }
                                })
                                return categoryString
                              }
                            }
                          })}
                        </td>
                        <td>
                          <span className={cartStyles.quantityButtonWrapper}>
                            <p className={cartStyles.quantity}>{item.quantity}</p>
                          </span>
                        </td>
                        <td className={cartStyles.date}><DateFormatter date={item.itemAddedAt.toDate()}/></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>
        </MediaQuery>

        {/* Media Query for max-device-width: 499px */}
        <MediaQuery maxDeviceWidth={499}>
          <div className={cartStyles.table}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Added at</th>
                </tr>
              </thead>
              <tbody>
                {
                  myCart.map(item => {
                    return (
                      <tr key={item.fdcId}>
                        <td>
                          <Link 
                            href={{pathname: '/search/[fdcId]', query: {itemname: (item.brandOwner ? item.description + " - " + item.brandOwner : item.description)}}} 
                            as={`/search/${item.fdcId}?itemname=${item.brandOwner ? item.description + " - " + item.brandOwner : item.description}`}
                          >
                            <a className={listStyles.itemLink}>
                                  {item.description}
                                  {item.brandOwner ? " - " + item.brandOwner : null}
                            </a>
                          </Link>
                        </td>
                        <td>
                          <span className={cartStyles.quantityButtonWrapper}>
                            <p className={cartStyles.quantity}>{item.quantity}</p>
                          </span>
                        </td>
                        <td className={cartStyles.date}><DateFormatter date={item.itemAddedAt.toDate()}/></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>
        </MediaQuery>
        <Chart rawCart={rawCart} />
      </div>
      <style jsx>{`
        td {
          vertical-align: middle;
          padding: 0.2rem 0.5rem;
        }
        .storeLink:hover {
          text-decoration: none;
        }
        @media (max-width: 499px) {
          .header {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
      :
      <ErrorPage />
      )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(ArchivedOrderDetail)