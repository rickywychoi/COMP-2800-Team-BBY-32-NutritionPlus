import firebase from 'firebase'
import firebaseConfig from '../firebaseConfig'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import GroceryStores from '../containers/GroceryStores'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import { Button, Table } from 'react-bootstrap'
import buttonStyles from '../styles/buttons.module.css'
import orderStyles from '../styles/MyOrder.module.css'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const MyOrder = (props) => {
  const router = useRouter()
  const myCart = props.myCart

  const goBack = () => {
    router.push("/mycart") 
  }

  const confirmOrder = () => {
    if (myCart.length > 0) {
      confirm("Confirm to proceed?")
      props.onConfirm()

      // send to firebase
      let order, orderHistory
      if (props.currentUser) {
        db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
          orderHistory = userInfo.data().orderHistory
          order = {
            cart: myCart,
            storeToVisit: props.storeToVisit,
            orderedAt: new Date()
          }
          orderHistory.unshift(order)
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
    props.currentUser
      ?
    <div className={orderStyles.mainBody}>
       <Button variant="secondary" className={buttonStyles.button} onClick={goBack}>Back to My Cart</Button>
       <div className={orderStyles.contents}>
        <h2>Review &amp; Pay</h2>
        <div className={orderStyles.table}>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {
                myCart.length > 0
                  ?
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
                  <td colSpan="2" align="center" style={{padding: "1rem 0"}}>You have no items to order.<br/>Please check your cart.</td>
                </tr>
              }
            </tbody>
          </Table>
        </div>
        {
          myCart.length > 0
            ?
          <div>
            <GroceryStores />
            <div className={orderStyles.confirmButtonWrapper}>
              <Button variant="success" className={buttonStyles.button} onClick={confirmOrder}>Confirm</Button>
            </div>
          </div>
            :
          null
        }
       </div>
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

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    myCart: state.myCart,
    storeToVisit: state.storeToVisit
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onConfirm: () => dispatch({type: actions.EMPTYMYCART})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder)