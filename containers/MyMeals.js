/**
 * My Meals page to display any recipes that have been added to Firebase.
 * 
 * Uses React Bootstrap Table for table design.
 * 
 * Table
 * @see https://react-bootstrap.github.io/components/table/
 */


import firebase from 'firebase'
import firebaseConfig from '../firebaseConfig'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import * as actions from '../store/actions'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import { Table } from 'react-bootstrap'
import DateFormatter from '../components/DateFormatter/DateFormatter'
import RecipeChart from '../containers/Chart/RecipeChart'
import orderStyles from '../styles/MyOrder.module.css'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const MyMeals = (props) => {
  const [myRecipes, setMyRecipes] = useState([])

  const sortArrayDesc = (arr) => {
    return arr.sort((a, b) => b.addedAt.toDate() - a.addedAt.toDate())
  }

  useEffect(() => {

    // if the user is signed in
    if (props.currentUser) {

      // gets stored recipes of the user from firebase
      db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
        let recipes = sortArrayDesc(userInfo.data().recipes)
        setMyRecipes(recipes)
      })
    }
  }, [])

  return (
    // if the user is signed in
    props.currentUser
      ?
    <div className={orderStyles.mainBody}>
      <div className={orderStyles.contents}>
        <h2>My Meals</h2>
        <div className={orderStyles.table}>

          {/* Table component from react-bootstrap */}
          <Table striped bordered>
            <thead>
              <tr>
                <th>Meals</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {
                // if there's an item in myRecipes
                myRecipes.length > 0
                  ?
                // Loop through myRecipes array and displays each item
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
                  <td colSpan="2" align="center" style={{padding: "1rem 0"}}>You have no meals yet.</td>
                </tr>
              }
            </tbody>
          </Table>
        </div>

        {/* Nutrition composition chart */}
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

// contains the application's state - the current user object
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(MyMeals)