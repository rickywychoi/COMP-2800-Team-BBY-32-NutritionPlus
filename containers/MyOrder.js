import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import GroceryStores from '../containers/GroceryStores'
import DateFormatter from '../components/DateFormatter/DateFormatter'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import { Button, Table } from 'react-bootstrap'
import buttonStyles from '../styles/buttons.module.css'
import orderStyles from '../styles/MyOrder.module.css'

const MyOrder = (props) => {
  const router = useRouter()
  const myCart = props.myCart

  console.log(myCart)

  const goBack = () => {
    router.push("/mycart") 
  }

  const confirmOrder = () => {
    if (myCart.length > 0) {
      confirm("Confirm to proceed?")
      props.onConfirm()
      router.push("/?ordercomplete=true")
    } else {
      alert("Your order doesn't contain anything.\nPlease visit your My Cart.")
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
                        <p className={orderStyles.itemName}>
                          {item.description}
                          {item.brandOwner ? " - " + item.brandOwner : null}
                        </p>
                      </td>
                      <td>
                        <p className={orderStyles.quantity}>{item.quantity}</p>
                      </td>
                      <td className={orderStyles.date}><DateFormatter date={item.itemAddedAt.toDate()}/></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
        <GroceryStores />
        <div className={orderStyles.confirmButtonWrapper}>
          <Button variant="success" className={buttonStyles.button} onClick={confirmOrder}>Confirm</Button>
        </div>
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
    myCart: state.myCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onConfirm: () => dispatch({type: actions.EMPTYMYCART})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder)