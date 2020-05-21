/**
 * A history of orders the user has made. Has an external link to the
 * store website and shows what items the user made.
 * 
 * Uses bootstrap Table for order table design.
 * 
 * Table
 * @see https://react-bootstrap.github.io/components/table/
 */


import firebase from 'firebase'
import firebaseConfig from '../firebaseConfig'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import DateFormatter from '../components/DateFormatter/DateFormatter'
import orderhistoryStyles from '../styles/OrderHistory.module.css'
import orderStyles from '../styles/MyOrder.module.css'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const OrderHistory = (props) => {
  const [orderHistory, setOrderHistory] = useState([])
  
  useEffect(() => {
    if (props.currentUser) {
      db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
        setOrderHistory(sortArrayDesc(userInfo.data().orderHistory))
      }).catch(err => console.log(err))
    }
  }, [])

  // sort array by date - descending
  const sortArrayDesc = (arr) => {
    return arr.sort((a, b) => b.orderedAt.toDate() - a.orderedAt.toDate())
  }
  
  // sort array by date - ascending
  const sortArrayAsc = (arr) => {
    return arr.sort((a, b) => a.orderedAt.toDate() - b.orderedAt.toDate())
  }

  return (
    // if the user is signed in
    props.currentUser
      ?
    <div className={orderhistoryStyles.mainBody}>
      <div className={orderhistoryStyles.buttonsWrapper}>
        <h3 className={orderhistoryStyles.header}>Your Order History</h3>
      </div>
      <div className={orderhistoryStyles.contents}>
        {
          orderHistory.length > 0
            ?
          orderHistory.map(order => {
            return(
              <div key={order.orderedAt.toMillis()} className={orderhistoryStyles.eachOrder}>
                <h4 className={orderhistoryStyles.dateHeader}><DateFormatter date={order.orderedAt.toDate()} /></h4>
                <Link 
                  href='/myorder/history/[orderId]'
                  as={`/myorder/history/${order.orderedAt.toMillis()}`}
                >
                  <a className={orderhistoryStyles.orderLink}>
                    <div>
                      <p className={orderhistoryStyles.orderedTo}>@{order.storeToVisit}</p>

                      {/* Table component from react-bootstrap */}
                      <Table striped bordered>
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            order.cart.map(item => {
                              return (
                                <tr key={item.fdcId}>
                                  <td>
                                    <p className={orderStyles.itemName}>
                                      {item.description}
                                      {item.brandOwner ? " - " + item.brandOwner : null}
                                    </p>
                                  </td>
                                  <td>
                                    <p className={orderStyles.quantity}>{item.quantity}</p>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    </div>  
                  </a>
                </Link>
              </div>
            )
          })
            :
          <div style={{textAlign: "center", marginTop: "1.5rem"}}>
            <p>You haven't made any orders yet.</p>
            <img className="historyIcon" src="https://img.icons8.com/windows/96/000000/delete-history.png" alt="historyIcon"/>
          </div>
        }
      </div>

      {/* Stylesheet for table and an icon */}
      <style jsx>{`
        th {
          font-size: 0.9rem;
        }
        td {
          vertical-align: middle;
          padding: 0.2rem 0.5rem;
          font-size: 0.9rem;
        }
        .historyIcon {
          margin: 0 auto;
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

export default connect(mapStateToProps)(OrderHistory)