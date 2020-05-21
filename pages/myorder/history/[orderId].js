/**
 * Provides information about an order that's been placed with groceries the
 * users have selected. Uses React Bootstrap Button and Table for the respective
 * buttons and table designs.
 * 
 * Uses MediaQuery component from react-responsive.
 * @see https://www.npmjs.com/package/react-responsive
 * 
 * Button
 * @see https://react-bootstrap.github.io/components/buttons/
 * 
 * Table
 * @see https://react-bootstrap.github.io/components/table/
 */

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

// firebase settings
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
  const [orderedAt, setOrderedAt] = useState("")
  
  useEffect(() => {
    // if the user is signed in
    if (props.currentUser) {

      // gets order history of the user from firebase
      db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
        let orderHistory = userInfo.data().orderHistory

        // sorts orders
        orderHistory.forEach(order => {
          if (order.orderedAt.toMillis() == router.query.orderId) {
            setMyCart(sortArrayDesc(order.cart))
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
        <h3 className="header">
          Order made at {orderedAt ? <DateFormatter date={orderedAt.toDate()}/> : null}
        </h3>

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

        {/* Nutrition composition chart */}
        <Chart rawCart={rawCart} />
      </div>

      {/* Stylesheet for this page */}
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