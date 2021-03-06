/**
 * My Order page to checkout items from My Cart and select stores for items.
 * 
 * Uses React Bootstrap Table for table design and Button for buttons.
 * 
 * Table
 * @see https://react-bootstrap.github.io/components/table/
 * 
 * Button
 * @see https://react-bootstrap.github.io/components/buttons/
 * 
 * Uses React Icons to help customize design of buttons.
 * 
 * MdArrowBack from Material Design Icons library
 * @see http://google.github.io/material-design-icons/
 */

import firebase from 'firebase'
import firebaseConfig from '../firebaseConfig'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import GroceryStores from '../containers/GroceryStores'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import { Button, Table } from 'react-bootstrap'
import { MdArrowBack } from 'react-icons/md'
import buttonStyles from '../styles/buttons.module.css'
import orderStyles from '../styles/MyOrder.module.css'

// firebase settings
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const MyOrder = (props) => {
  const router = useRouter()
  const myCart = props.myCart

  // routes back to My Cart
  const goBack = () => {
    router.push("/mycart") 
  }

  const confirmOrder = () => {
    
    // if there is item(s) to make an order
    if (myCart.length > 0) {
      confirm("Confirm to proceed?")
      props.onConfirm()

      // sends to firebase
      let order, orderHistory

      // if the user is signed in
      if (props.currentUser) {

        // fetches order history of user from firebase
        db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
          orderHistory = userInfo.data().orderHistory
          order = {
            cart: myCart,
            orderedAt: new Date()
          }
          orderHistory.unshift(order)

          // updates the order history to firebase
          db.collection('users').doc(props.currentUser.uid).update({
            cart: [],
            orderHistory: orderHistory
          })
        }).catch(err => console.log(err))
      }
      router.push("/?ordercomplete=true")
    }
  }

  return (
    // if the user is signed in
    props.currentUser
      ?
    <div className={orderStyles.mainBody}>
       <Button variant="secondary" className={buttonStyles.button} onClick={goBack}><span><MdArrowBack /> My Cart</span></Button>
       <div className={orderStyles.contents}>
        <h2>Review &amp; Pay</h2>
        <div className={orderStyles.table}>

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
                // if there's an item in myCart
                myCart.length > 0
                  ?
                // Loops through myCart array and displays each item
                myCart.map(item => {
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
                  :
                <tr>
                  <td colSpan="2" align="center" style={{padding: "1rem 0"}}>You need to checkout from your cart.<br/>Please check your cart.</td>
                </tr>
              }
            </tbody>
          </Table>
        </div>
        {
          // if there's an item in myCart
          myCart.length > 0
            ?
          <div>

            {/* GroceryStores component that shows list of grocery stores, and the map that shows nearby stores */}
            <GroceryStores />
            <div className={orderStyles.confirmButtonWrapper}>
              <Button variant="success" className={buttonStyles.button} onClick={confirmOrder}>Confirm</Button>
            </div>
          </div>
            :
          null
        }
       </div>

       {/* Stylesheet for each table row */}
       <style jsx>{`
        td {
          vertical-align: middle;
          padding: 0.2rem 0.5rem;
      `}</style>
    </div>
      :
    <ErrorPage />
  )
}

// contains the application's state - the current user object and the user's cart
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    myCart: state.myCart
  }
}

// contains the dispatch action to empty user's cart in the application's state
const mapDispatchToProps = dispatch => {
  return {
    onConfirm: () => dispatch({type: actions.EMPTYMYCART})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder)