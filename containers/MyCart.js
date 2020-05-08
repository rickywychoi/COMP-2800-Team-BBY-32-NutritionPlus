// MyCart.js

import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import firebase from 'firebase'
import firebaseConfig from '../firebaseConfig'
import { connect } from 'react-redux'
import { Button, Table } from 'react-bootstrap'
import DateFormatter from '../components/DateFormatter/DateFormatter'
import cartStyles from '../styles/MyCart.module.css'
import listStyles from '../styles/SearchList.module.css'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const MyCart = (props) => {
  const router = useRouter()
  const [myCart, setMyCart] = useState([])
  
  useEffect(() => {
    // router.push("/login?mycartrefresh=true")
    if (props.currentUser) {
      // get quantity of each item
      const getQuantity = (arr) => {
        console.log("sorted")
        let result = []
        let visited = []
        for (let i = 0; i < arr.length - 1; i++) {
          let qty = 1
          for (let j = i + 1; j < arr.length; j++) {
            if(arr[i]['fdcId'] === arr[j]['fdcId']) {
              qty++
            }
          }
          
          let foodItem = {
            quantity: qty,
            ...arr[i]
          }
          if (!visited.includes(arr[i]['fdcId'])) {
            result.push(foodItem)
          }
          visited.push(arr[i]['fdcId'])
        }
        return result
      }

      db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
        let newArray = []
        console.log(userInfo.data())
        // newArray.push(...userInfo.data().cart)
        
        setMyCart(getQuantity(userInfo.data().cart))
      })
    }
  }, [])
  
  const goBack = () => {
    router.replace("/search")
  }


  const incrementQuantity = () => {
    console.log("added 1")
  }
  
  const decrementQuantity = () => {
    console.log("removed 1")
  }

  console.log("myCart", myCart)

  return (
    <div className={cartStyles.mainBody}>
      <Button variant="secondary" onClick={goBack}>Back to Search</Button>
      <div>
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
                      <Button variant="outline-danger" onClick={decrementQuantity} className={cartStyles.decrement}>-</Button>
                      <p className={cartStyles.quantity}>{item.quantity}</p>
                      <Button variant="outline-primary" onClick={incrementQuantity} className={cartStyles.increment}>+</Button>
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
      <style jsx>{`
        td {
          vertical-align: middle
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(MyCart)