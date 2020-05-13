import Link from 'next/link'
import { connect } from 'react-redux'
import firebase from 'firebase'
import firebaseConfig from '../../firebaseConfig'
import { Table, Accordion, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import {  EDAMAM_RECIPE_APP_ID, EDAMAM_RECIPE_APP_KEY } from '../../apiKey'
import Chart from '../../components/Chart/Chart'
import RecipeStyles from '../../styles/RecipeDetails.module.css'

if (!firebase.apps.length) {    // if firebase not initialized
  firebase.initializeApp(firebaseConfig)
}
let db = firebase.firestore()

const RecipeDetails = (props) => {
  const router = useRouter()
  const str = router.asPath
  const idJimmy = str.substring(56)
  const id = router.query.recipeId
  
  const url = `https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${id}&app_id=${EDAMAM_RECIPE_APP_ID}&app_key=${EDAMAM_RECIPE_APP_KEY}`
  
  const [result, setResult] = useState({})
  const [ing, setIng] = useState([])
  const [nutrients, setNutrients] = useState({})
  const [details, setDetails] = useState({})
  
  // useEffect(()=>{
  //   axios.get(url).then(res => {
  //     setResult(res.data[0])
  //     setIng(res.data[0].ingredientLines)
  //     setNutrients(res.data[0].totalNutrients)
  //   })
  // }, [])

  useEffect(()=>{
    axios.get(url).then(res => {
        // console.log(res.data)
        console.log(res.data[0])
        // console.log(res.data[0].totalNutrients)
        setDetails(res.data)    // api data for firestore
        setResult(res.data[0])  // recipe data
        setIng(res.data[0].ingredientLines)
        setNutrients(res.data[0].totalNutrients)
        let sortedNutrients = []
        let dailyValues = []
        Object.values(nutrients).slice(1).forEach(nut => {
          let myNutrient = nut.label
          if (myNutrient.localeCompare("Calcium") == 0){
            console.log("lame")
          }
        })
        // console.log(nutrients)
        })  
   }, [])

  // const tester = e => {
  //   console.log("this button works")
  // }

  const sendUserHistory = () => {
    if (props.currentUser){   // if user signed in
      db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
        console.log(userInfo.data())
        console.log(Object.values(details).slice(0))

        let todayMeals = {}
        let date = {itemAddedAt: new Date()}
        Object.assign(todayMeals, date)
        Object.assign(todayMeals, userInfo.data())   // firestore data
        todayMeals.recipes = [...Object.values(details).slice(0)]
        console.log(todayMeals)

        db.collection('users').doc(props.currentUser.uid).set(todayMeals)
        // .then(
        //   router.push("/myhistory")
        // ).catch(err => console.log(err))
      }).catch(err => console.log(err))
    }
  }
    
  return (
    <div className={RecipeStyles.body}>
        {
          props.currentUser
            ?
          (<Button variant="success" onClick={sendUserHistory}>Add to myMeals</Button>)
            :
          null
        }
        <img src={result.image} className={RecipeStyles.img} />
        <br />
        <h3><i>{result.label}</i></h3>
        <br />
        <h4>{Math.ceil(result.calories)} Calories</h4>
        <br />
        <h5>Ingredients</h5>
        <ul className={RecipeStyles.list}>
            {ing.map(ing => {
                return (
                    <li key={ing}>{ing}</li>
                 )
            })}
        </ul>
        <br />
        
        <a href = {''+result.url} target="_blank">See Directions</a>

        <Accordion defaultActiveKey="0" className="mt-4">
          
            <Accordion.Toggle as={Button} variant="outline-primary" eventKey="1" className={RecipeStyles.accordionButton}>
                Click to see nutrients composition
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
                <div className={RecipeStyles.dvResult}>
                    <div>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nutrient</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                           <tbody>                           
                            {
                              Object.values(nutrients).slice(1).map(nut => {
                                return (
                                  <tr>
                                    <td>{nut.label}</td>
                                    <td>{Math.ceil(nut.quantity)} {nut.unit}</td>
                                  </tr>
                                )
                              })
                            }

                          </tbody>  
                        </Table>
                      <p>g = Grams; mg = Milligrams; µg = Micrograms</p>
                    </div>              
                </div>
            </Accordion.Collapse>                             
        </Accordion>
        <br />
        <Link href={router.query.prevPage}><a>Back to Search</a></Link>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(RecipeDetails)