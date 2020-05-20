/* My Meals page to display any recipes that have been added to Firebase.

Uses bootstrap buttons for Button design and Table for table design.
*/

import firebase from 'firebase'
import firebaseConfig from '../firebaseConfig'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import * as actions from '../store/actions'
import GroceryStores from '../containers/GroceryStores'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import { Button, Table } from 'react-bootstrap'
import buttonStyles from '../styles/buttons.module.css'
import DateFormatter from '../components/DateFormatter/DateFormatter'
import RecipeChart from '../containers/Chart/RecipeChart'
import orderStyles from '../styles/MyOrder.module.css'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const MyMeals = (props) => {
  const router = useRouter()
  const [myRecipes, setMyRecipes] = useState([])
  console.log(props)
  const myCart = props.myCart

  const sortArrayDesc = (arr) => {
    return arr.sort((a, b) => b.addedAt.toDate() - a.addedAt.toDate())
  }

  useEffect(() => {
    if (props.currentUser) {
      db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
        let recipes = sortArrayDesc(userInfo.data().recipes)
        console.log(recipes)
        setMyRecipes(recipes)
      })
    }
  }, [])

  // console.log(myRecipes)

  return (
    props.currentUser
      ?
    <div className={orderStyles.mainBody}>
      <div className={orderStyles.contents}>
        <h2>My Meals</h2>
        <div className={orderStyles.table}>
           <Table striped bordered>
             <thead>
              <tr>
                 <th>Meals</th>
                 <th>Date Added</th>
               </tr>
             </thead>
             <tbody>
               {
                 myRecipes.length > 0
                   ?
                 myRecipes.map(item => {
                   return (
                     <tr>
                       <td>
                         <p className={orderStyles.itemName}>
                           {item.label}
                           {item.brandOwner ? " - " + item.brandOwner : null}
                         </p>
                       </td>
                       <td>
                        <p className={orderStyles.quantity}>
                            <DateFormatter date={item.addedAt.toDate()}/>
                        </p>
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
        <RecipeChart rawCart = {myRecipes}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyMeals)