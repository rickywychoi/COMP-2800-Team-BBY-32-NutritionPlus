// MyCart.js

import firebase from 'firebase'
import firebaseConfig from '../firebaseConfig'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import { Button, Table, DropdownButton, Dropdown, Form } from 'react-bootstrap'
import { FaSearch, FaMinus, FaPlus } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { MdArrowBack } from 'react-icons/md'
import MediaQuery from 'react-responsive'
import GroceryChart from './Chart/GroceryChart'
import DateFormatter from '../components/DateFormatter/DateFormatter'
import cartStyles from '../styles/MyCart.module.css'
import listStyles from '../styles/SearchList.module.css'
import buttonStyles from '../styles/buttons.module.css'
import ErrorPage from '../components/ErrorPage/ErrorPage'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const MyCart = (props) => {
  const router = useRouter()
  // my cart with repeating single items
  const [rawCart, setRawCart] = useState([])
  // my cart with quantity
  const [myCart, setMyCart] = useState([])
  const [isDesc, setDesc] = useState(true)
  
  useEffect(() => {
    if (props.currentUser) {
      db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
        setRawCart(userInfo.data().cart)
        let arrayWithQuantity = getQuantity(userInfo.data().cart)
        setMyCart(sortArrayDesc(arrayWithQuantity))
      })
    }
  }, [])
  
  // get quantity of each item
  const getQuantity = (arr) => {
    let result = []
    let visited = []
    if (arr.length >= 2) {
      let foodItem
      for (let i = 0; i < arr.length - 1; i++) {
        let qty = 1
        for (let j = i + 1; j < arr.length; j++) {
          if(arr[i]['fdcId'] === arr[j]['fdcId']) {
            qty++
          }
        }
        console.log("index", i, "quantity", qty)
        
        foodItem = {
          quantity: qty,
          ...arr[i]
        }
        if (!visited.includes(arr[i]['fdcId'])) {
          result.push(foodItem)
          console.log("pushed!")
        }
        console.log("result", result)
        visited.push(arr[i]['fdcId'])
        console.log("visited", visited)
      }
      // last element of the array
      foodItem = {
        quantity: 1,
        ...arr[arr.length - 1]
      }
      if (!visited.includes(arr[arr.length - 1]['fdcId'])) {
        result.push(foodItem)
        console.log("Last item, here we go! Pushed!")
      }
      // if there is only one item left
    } else if (arr.length === 1) {
      let foodItem = {
        quantity: 1,
        ...arr[0]
      }
      if (!visited.includes(arr[0]['fdcId'])) {
        result.push(foodItem)
      }
      visited.push(arr[0]['fdcId'])
    }
    return result
  }
  
  // sort array by date - descending
  const sortArrayDesc = (arr) => {
    return arr.sort((a, b) => b.itemAddedAt.toDate() - a.itemAddedAt.toDate())
  }
  
  // sort array by date - ascending
  const sortArrayAsc = (arr) => {
    return arr.sort((a, b) => a.itemAddedAt.toDate() - b.itemAddedAt.toDate())
  }
  
  
  const incrementQuantity = (id) => {
    console.log("added 1")
    
    if (props.currentUser) {
      // get previous quantity from item
      let qty = 0
      let itemToAdd = {}
      let newArray = []
      let extractIndex = 0
      newArray.push(...myCart)
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].fdcId === id) {
          extractIndex = i
          Object.assign(itemToAdd, newArray[i])
        }
      }
      // extract that item from array
      newArray.splice(extractIndex, 1)
      console.log(itemToAdd.quantity)
      // increment
      qty = itemToAdd.quantity
      if (itemToAdd.quantity < 99) {
        qty++
        itemToAdd.quantity = qty
        console.log(itemToAdd.quantity)
        newArray.push(itemToAdd)
        
        let cart = []
        newArray.forEach(item => {
          for (let i = 0; i < item.quantity; i++) {
            let itemWithoutQty = {}
            Object.assign(itemWithoutQty, item)
            delete itemWithoutQty.quantity
            cart.push(itemWithoutQty)
          }
        })
        
        db.collection('users').doc(props.currentUser.uid).update({
          cart: cart
        }).then(res => {
          setRawCart(cart)
          console.log("setRawCart", cart)
        }).catch(err => console.log(err))
        
        setRawCart(cart)
        let arrayWithQuantity = getQuantity(cart)
        setMyCart(isDesc ? sortArrayDesc(arrayWithQuantity) : sortArrayAsc(arrayWithQuantity))
      } else {
        alert("Cannot add more than 99 items.")
      }
    }
  }
  
  const decrementQuantity = (id) => {
    console.log("removed 1")
    
    if (props.currentUser) {
      // get previous quantity from item
      let qty = 0
      let itemToAdd = {}
      let newArray = []
      let extractIndex = 0
      newArray.push(...myCart)
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].fdcId === id) {
          extractIndex = i
          Object.assign(itemToAdd, newArray[i])
        }
      }
      // extract that item from array
      newArray.splice(extractIndex, 1)
      console.log(itemToAdd.quantity)
      // decrement
      qty = itemToAdd.quantity
      if (itemToAdd.quantity > 1) {
        decrementProceed(qty, itemToAdd, newArray)
        // when there's only one item left to remove
      } else if (itemToAdd.quantity === 1) {
        if (confirm("Are you sure to remove this item?")) {
          decrementProceed(qty, itemToAdd, newArray)
        }
      }
    }
  }

  const decrementProceed = (qty, itemToAdd, newArray) => {
    qty--
    itemToAdd.quantity = qty
    console.log(itemToAdd.quantity)
    newArray.push(itemToAdd)
    
    let cart = []
    newArray.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        let itemWithoutQty = {}
        Object.assign(itemWithoutQty, item)
        delete itemWithoutQty.quantity
        cart.push(itemWithoutQty)
        console.log("pushed to cart!")
      }
    })
    db.collection('users').doc(props.currentUser.uid).update({
      cart: cart
    }).then(res => {
      setRawCart(cart)
      console.log("setRawCart", cart)
    }).catch(err => console.log(err))
    
    let arrayWithQuantity = getQuantity(cart)
    setMyCart(isDesc ? sortArrayDesc(arrayWithQuantity) : sortArrayAsc(arrayWithQuantity))
  }

  const handleQtyChange = (id, e) => {
    console.log(id)
    console.log(e.target.value)
    if (props.currentUser) {
      // get previous quantity from item
      let qty = 0
      let itemToAdd = {}
      let newArray = []
      let extractIndex = 0
      newArray.push(...myCart)
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].fdcId === id) {
          extractIndex = i
          Object.assign(itemToAdd, newArray[i])
        }
      }
      // extract that item from array
      newArray.splice(extractIndex, 1)
      console.log(itemToAdd.quantity)
      // increment
      if (e.target.value == "" && isNaN(parseInt(e.target.value))) {
        itemToAdd.quantity = ""
        newArray.push(itemToAdd)
        let cart = []
        newArray.forEach(item => {
          for (let i = 0; i < item.quantity; i++) {
            let itemWithoutQty = {}
            Object.assign(itemWithoutQty, item)
            delete itemWithoutQty.quantity
            cart.push(itemWithoutQty)
          }
        })
        setRawCart(cart)
        // let arrayWithQuantity = getQuantity(cart)
        setMyCart(isDesc ? sortArrayDesc(newArray) : sortArrayAsc(newArray))
        console.log(myCart)
        return
      } else if (itemToAdd.quantity < 100 && parseInt(e.target.value) < 100) {
        itemToAdd.quantity = parseInt(e.target.value)
        console.log(itemToAdd.quantity)
        newArray.push(itemToAdd)
        
        let cart = []
        newArray.forEach(item => {
          for (let i = 0; i < item.quantity; i++) {
            let itemWithoutQty = {}
            Object.assign(itemWithoutQty, item)
            delete itemWithoutQty.quantity
            cart.push(itemWithoutQty)
          }
        })
        
        db.collection('users').doc(props.currentUser.uid).update({
          cart: cart
        }).then(res => {
          setRawCart(cart)
          console.log("setRawCart", cart)
        }).catch(err => console.log(err))
        
        setRawCart(cart)
        let arrayWithQuantity = getQuantity(cart)
        setMyCart(isDesc ? sortArrayDesc(arrayWithQuantity) : sortArrayAsc(arrayWithQuantity))
      } else {
        alert("Cannot add more than 99 items.")
      }
    }
  }

  const deleteItem = (id) => {
    console.log("delete", id)
    if (props.currentUser) {
      if (confirm("Are you sure to remove this item?")) {
        // get previous quantity from item
        let itemToAdd = {}
        let newArray = []
        let extractIndex = 0
        newArray.push(...myCart)
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i].fdcId === id) {
            extractIndex = i
            Object.assign(itemToAdd, newArray[i])
          }
        }
        // extract that item from array
        newArray.splice(extractIndex, 1)
        console.log(itemToAdd.quantity)
        // change this item's quantity to zero
        itemToAdd.quantity = 0
        console.log(itemToAdd.quantity)
        // add to array
        newArray.push(itemToAdd)
        
        let cart = []
        newArray.forEach(item => {
          for (let i = 0; i < item.quantity; i++) {
            let itemWithoutQty = {}
            Object.assign(itemWithoutQty, item)
            delete itemWithoutQty.quantity
            cart.push(itemWithoutQty)
          }
        })
        
        db.collection('users').doc(props.currentUser.uid).update({
          cart: cart
        }).then(res => {
          setRawCart(cart)
          console.log("setRawCart", cart)
        }).catch(err => console.log(err))
        
        setRawCart(cart)
        let arrayWithQuantity = getQuantity(cart)
        setMyCart(isDesc ? sortArrayDesc(arrayWithQuantity) : sortArrayAsc(arrayWithQuantity))
      }
    }
  }

  const toMyOrder = () => {
    props.onCheckout(myCart)
    router.push("/myorder")
  }
  
  return (
    props.currentUser
    ?
    <div className={cartStyles.mainBody}>
      <div className={cartStyles.buttonsWrapper}>
        <Button variant="secondary" className={buttonStyles.button} onClick={() => router.push("/search")}><span><MdArrowBack /> Search Item</span></Button>
        {
          myCart.length > 0
            ?
            <div>
            <DropdownButton alignRight variant="outline-success" className={buttonStyles.button} title={<span><FaSearch /> Recipes</span>}>
              {
                myCart.map(item => {
                  return(
                    <Dropdown.Item>
                      <Link
                        href={{ pathname:"/recipe?item=[item]" }}
                        as={`/recipe?item=${item.description}`}
                      >
                        {item.description}
                      </Link>
                    </Dropdown.Item>
                  )
                })
              }
            </DropdownButton>
          </div>
            :
          null
        }
      </div>
      
      {/* Media Query for min-device-width: 500px */}
      <MediaQuery minDeviceWidth={500}>
        <div className={cartStyles.table}>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Added at</th>
                <th></th>
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
                          <Button variant="outline-danger" onClick={() => {decrementQuantity(item.fdcId)}} className={cartStyles.decrement}>-</Button>
                          <Form.Control className={cartStyles.quantityInput} size="sm" type="number" value={item.quantity} onChange={(e) => handleQtyChange(item.fdcId, e)} />
                          <Button variant="outline-primary" onClick={() => {incrementQuantity(item.fdcId)}} className={cartStyles.increment}>+</Button>
                        </span>
                      </td>
                      <td className={cartStyles.date}><DateFormatter date={item.itemAddedAt.toDate()}/></td>
                      <td align="center"><Button variant="outline-danger" className={cartStyles.deleteItem} onClick={() => {deleteItem(item.fdcId)}}><AiFillDelete /></Button></td>
                    </tr>
                  )
                })
                  :
                  <tr>
                  <td colSpan="5" align="center" style={{padding: "1rem 0"}}>Your cart is empty.</td>
                </tr>
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
                <th></th>
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
                          <Button variant="outline-danger" onClick={() => {decrementQuantity(item.fdcId)}} className={cartStyles.decrement}>-</Button>
                          <Form.Control className={cartStyles.quantityInput} size="sm" type="number" value={item.quantity} onChange={(e) => handleQtyChange(item.fdcId, e)} />
                          <Button variant="outline-primary" onClick={() => {incrementQuantity(item.fdcId)}} className={cartStyles.increment}>+</Button>
                        </span>
                      </td>
                      <td className={cartStyles.date}><DateFormatter date={item.itemAddedAt.toDate()}/></td>
                      <td align="center"><Button variant="outline-danger" className={cartStyles.deleteItem} onClick={() => {deleteItem(item.fdcId)}}><AiFillDelete /></Button></td>
                    </tr>
                  )
                })
                  :
                <tr>
                  <td colSpan="4" align="center" style={{padding: "1rem 0"}}>Your cart is empty.</td>
                </tr>
              }
            </tbody>
          </Table>
        </div>
      </MediaQuery>
      {
        myCart.length > 0
          ?
        <div>
          <div className={cartStyles.checkoutWrapper}>
            <Button variant="primary" className={buttonStyles.button} onClick={toMyOrder}>Checkout</Button>
          </div>
          <br></br>
          <GroceryChart rawCart={rawCart} />
        </div>
          :
        null
      }
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
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckout: (cart) => dispatch({type: actions.SENDMYCART, payload: cart})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCart)