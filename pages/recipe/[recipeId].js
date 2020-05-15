import Link from 'next/link'
import { connect } from 'react-redux'
import firebase from 'firebase'
import firebaseConfig from '../../firebaseConfig'
import { Table, Accordion, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import {  EDAMAM_RECIPE_APP_ID, EDAMAM_RECIPE_APP_KEY } from '../../apiKey'
import RecipeChart from '../../containers/Chart/RecipeChart'
import RecipeStyles from '../../styles/RecipeDetails.module.css'

if (!firebase.apps.length) {    // if firebase not initialized
  firebase.initializeApp(firebaseConfig)
}
let db = firebase.firestore()

const RecipeDetails = (props) => {
  // to get width of table
  const tableRef = useRef(null)
  let tableWidth
  if (tableRef.current) {
    tableWidth = tableRef.current.clientWidth
  }

  const router = useRouter()
  const str = router.asPath
  const idJimmy = str.substring(56)
  const id = router.query.recipeId
  
  const url = `https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${id}&app_id=${EDAMAM_RECIPE_APP_ID}&app_key=${EDAMAM_RECIPE_APP_KEY}`
  
  const [result, setResult] = useState({})
  const [ing, setIng] = useState([])
  const [nutrients, setNutrients] = useState([])
  const [additionalNutrients, setAdditionalNutrients] = useState([])
  const [details, setDetails] = useState({})
  const [calories, setCalories] = useState({})
  const [myRecipes, setMyRecipes] = useState([])
  const [userDailyValue, setUserDailyValue] = useState([])
  const [rawCart, setRawCart] = useState([])

  // useEffect(()=>{
  //   axios.get(url).then(res => {
  //     setResult(res.data[0])
  //     setIng(res.data[0].ingredientLines)
  //     setNutrients(res.data[0].totalNutrients)
  //   })
  // }, [])

  // returns information to create nutrition facts label
  useEffect(()=>{
    // retrieve daily value of the user
    if (props.currentUser) {
      let userDV = []
      db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
        console.log(userInfo.data().healthInfo.dailyValue)
        userInfo.data().healthInfo.dailyValue.forEach(nut => {
          userDV.push(nut)
        })
        setUserDailyValue(userDV)
        console.log("Getting User Daily Value Success")
      }).catch(error => {
        console.log(error)
      })
    }

    // return nutrient data
    axios.get(url).then(res => {
        console.log("43", res.data)
        console.log(res.data[0])
        // console.log(res.data[0].totalNutrients)
        setDetails(res.data)    // api data for firestore
        setResult(res.data[0])  // recipe data
        setIng(res.data[0].ingredientLines)
        // setNutrients(res.data[0].totalNutrients)

        // number of calories (rounded)
        // let temp = []
        let sortedNutrients = []
        let extraNutrients = []
        let cal = Math.ceil(res.data[0].calories)
        let noServings = res.data[0].yield
        let calServing = Math.ceil(cal / noServings)
        let nutId = 1

        setCalories({
          id: nutId,
          amount: cal,
          unit: 'kcal',
          group: 'calories',
          calPerServing: calServing
        })
        // navigates through nutrients in recipe
        let index = res.data[0].totalNutrients
        console.log("69", index)
        // console.log(index.CA.label)
        let dailyValues = []
        Object.values(index).forEach(nut => {
          // console.log(nut)
          // temp.push(nut)
          if (nut.label.localeCompare("Fat") == 0
            || nut.label.localeCompare("Saturated") == 0
            || nut.label.localeCompare("Trans") == 0
            || nut.label.localeCompare("Cholesterol") == 0
            || nut.label.localeCompare("Sodium") == 0
            || nut.label.localeCompare("Carbs") == 0
            || nut.label.localeCompare("Fiber") == 0
            || nut.label.localeCompare("Sugars") == 0
            || nut.label.localeCompare("Protein") == 0){
              sortedNutrients.push({
                id: nut.label, 
                amount: nut.quantity,
                name: nut.label,
                unitName: nut.unit,
                isExist: true,
                group: "getLessOf"
              })
          } else if (nut.label.localeCompare("Vitamin D") == 0
                  || nut.label.localeCompare("Calcium") == 0
                  || nut.label.localeCompare("Iron") == 0
                  || nut.label.localeCompare("Potassium") == 0){
                    sortedNutrients.push({
                      id: nut.label,
                      amount: nut.quantity,
                      name: nut.label,
                      unitName: nut.unit,
                      isExist: true,
                      group: "getMoreOf"
                    })
          } else if (nut.label.localeCompare("Vitamin A") == 0
                  || nut.label.localeCompare("Vitamin C") == 0
                  || nut.label.localeCompare("Thiamin (B1)") == 0
                  || nut.label.localeCompare("Riboflavin (B2)") == 0
                  || nut.label.localeCompare("Niacin (B3)") == 0
                  || nut.label.localeCompare("Vitamin B6") == 0
                  || nut.label.localeCompare("Folate equivalent (total)") == 0
                  || nut.label.localeCompare("Vitamin B12") == 0
                  || nut.label.localeCompare("Magnesium") == 0
                  || nut.label.localeCompare("Zinc") == 0
                  || nut.label.localeCompare("Phosphorus") == 0){
                    extraNutrients.push({
                      id: nut.label,
                      amount: nut.quantity,
                      name: nut.label,
                      unitName: nut.unit,
                      isExist: true,
                      group: "additional"
                    })
                  }

          // change each id corresponding to id from daily value
          sortedNutrients.forEach(nut => {
            if (nut.name.localeCompare("Fat") == 0)
              nut.id = "1"
            else if (nut.name.localeCompare("Saturated") == 0)
              nut.id = "2"
            else if (nut.name.localeCompare("Fiber") == 0)
              nut.id = "3"
            else if (nut.name.localeCompare("Sugars") == 0)
              nut.id = "4"
            else if (nut.name.localeCompare("Cholesterol") == 0)
              nut.id = "5"
            else if (nut.name.localeCompare("Sodium") == 0)
              nut.id = "6"
            else if (nut.name.localeCompare("Potassium") == 0)
              nut.id = "7"
            else if (nut.name.localeCompare("Calcium") == 0)
              nut.id = "8"
            else if (nut.name.localeCompare("Iron") == 0)
              nut.id = "9"
            else if (nut.name.localeCompare("Vitamin A") == 0)
              nut.id = "10"
            else if (nut.name.localeCompare("Vitamin C") == 0)
              nut.id = "11"
            else if (nut.name.localeCompare("Vitamin D") == 0)
              nut.id = "12"
            else if (nut.name.localeCompare("Vitamin E") == 0)
              nut.id = "13"
            else if (nut.name.localeCompare("Vitamin K (phylloquinone)") == 0)
              nut.id = "14"
            else if (nut.name.localeCompare("Thiamin (B1)") == 0)
              nut.id = "15"
            else if (nut.name.localeCompare("Riboflavin (B2)") == 0)
              nut.id = "16"
            else if (nut.name.localeCompare("Niacin (B3)") == 0)
              nut.id = "17"
            else if (nut.name.localeCompare("Vitamin B6") == 0)
              nut.id = "18"
            else if (nut.name.localeCompare("Folate equivalent, total") == 0)
              nut.id = "19"
            else if (nut.name.localeCompare("Vitamin B12") == 0)
              nut.id = "20"
            else if (nut.name.toLowerCase().includes("chlori"))
              nut.id = "21"
            else if (nut.name.toLowerCase().includes("biotin"))
              nut.id = "22"
            else if (nut.name.localeCompare("Pantothenic acid") == 0)
              nut.id = "23"
            else if (nut.name.localeCompare("Phosphorus") == 0)
              nut.id = "24"
            else if (nut.name.localeCompare("Iodine, I") == 0)
              nut.id = "25"
            else if (nut.name.localeCompare("Magnesium") == 0)
              nut.id = "26"
            else if (nut.name.localeCompare("Zinc") == 0)
              nut.id = "27"
            else if (nut.name.localeCompare("Selenium, Se") == 0)
              nut.id = "28"
            else if (nut.name.localeCompare("Copper, Cu") == 0)
              nut.id = "29"
            else if (nut.name.localeCompare("Manganese, Mn") == 0)
              nut.id = "30"
            else if (nut.name.toLowerCase().includes("chromium"))
              nut.id = "31"
            else if (nut.name.localeCompare("Molybdenum, Mo") == 0)
              nut.id = "32"
            else if (nut.name.toLowerCase().includes("chlori"))
              nut.id = "33"
          })

          // change each id corresponding to id from daily value
          extraNutrients.forEach(nut => {
            if (nut.name.localeCompare("Fat") == 0)
              nut.id = "1"
            else if (nut.name.localeCompare("Saturated" == 0) == 0)
              nut.id = "2"
            else if (nut.name.localeCompare("Fiber") == 0)
              nut.id = "3"
            else if (nut.name.localeCompare("Sugars") == 0)
              nut.id = "4"
            else if (nut.name.localeCompare("Cholesterol") == 0)
              nut.id = "5"
            else if (nut.name.localeCompare("Sodium") == 0)
              nut.id = "6"
            else if (nut.name.localeCompare("Potassium") == 0)
              nut.id = "7"
            else if (nut.name.localeCompare("Calcium") == 0)
              nut.id = "8"
            else if (nut.name.localeCompare("Iron") == 0)
              nut.id = "9"
            else if (nut.name.localeCompare("Vitamin A") == 0)
              nut.id = "10"
            else if (nut.name.localeCompare("Vitamin C") == 0)
              nut.id = "11"
            else if (nut.name.localeCompare("Vitamin D") == 0)
              nut.id = "12"
            else if (nut.name.localeCompare("Vitamin E") == 0)
              nut.id = "13"
            else if (nut.name.localeCompare("Vitamin K (phylloquinone)") == 0)
              nut.id = "14"
            else if (nut.name.localeCompare("Thiamin (B1)") == 0)
              nut.id = "15"
            else if (nut.name.localeCompare("Riboflavin (B2)") == 0)
              nut.id = "16"
            else if (nut.name.localeCompare("Niacin (B3)") == 0)
              nut.id = "17"
            else if (nut.name.localeCompare("Vitamin B6") == 0)
              nut.id = "18"
            else if (nut.name.localeCompare("Folate equivalent (total)") == 0)
              nut.id = "19"
            else if (nut.name.localeCompare("Vitamin B12") == 0)
              nut.id = "20"
            else if (nut.name.toLowerCase().includes("chlori"))
              nut.id = "21"
            else if (nut.name.toLowerCase().includes("biotin"))
              nut.id = "22"
            else if (nut.name.localeCompare("Pantothenic acid") == 0)
              nut.id = "23"
            else if (nut.name.localeCompare("Phosphorus") == 0)
              nut.id = "24"
            else if (nut.name.localeCompare("Iodine, I") == 0)
              nut.id = "25"
            else if (nut.name.localeCompare("Magnesium") == 0)
              nut.id = "26"
            else if (nut.name.localeCompare("Zinc") == 0)
              nut.id = "27"
            else if (nut.name.localeCompare("Selenium, Se") == 0)
              nut.id = "28"
            else if (nut.name.localeCompare("Copper, Cu") == 0)
              nut.id = "29"
            else if (nut.name.localeCompare("Manganese, Mn") == 0)
              nut.id = "30"
            else if (nut.name.toLowerCase().includes("chromium"))
              nut.id = "31"
            else if (nut.name.localeCompare("Molybdenum, Mo") == 0)
              nut.id = "32"
            else if (nut.name.toLowerCase().includes("chlori"))
              nut.id = "33"
          })
        })
        setNutrients(sortedNutrients)
        setAdditionalNutrients(extraNutrients)  
        setMyRecipes(nutrients)
        setMyRecipes(...additionalNutrients)             
        })  
   }, [])


  useEffect(() => {
    if (props.currentUser) {
      db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
        // console.log(userInfo.data().recipes)
        setRawCart(userInfo.data().recipes)
      })
    }
  }, [])
  
  console.log(rawCart)

  // sends recipe to user's info in firebase
  const sendUserHistory = () => {
    if (props.currentUser){   // if user signed in
      db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
        console.log(userInfo.data().recipes)

        let recipes = []
        let recipesWithoutDate = {}
        recipes.push(...userInfo.data().recipes)

        Object.assign(recipesWithoutDate, result)
        recipesWithoutDate.addedAt = new Date()

        recipes.push(recipesWithoutDate)
        db.collection('users').doc(props.currentUser.uid).update({
          recipes : recipes
        })
        // console.log(Object.values(details).slice(0))

        // let todayMeals = {}
        // let date = {itemAddedAt: new Date()}
        // Object.assign(todayMeals, date)
        // Object.assign(todayMeals, userInfo.data())   // firestore data
        // todayMeals.recipes = [...Object.values(details).slice(0)]
        // console.log(todayMeals)

        // // .then(
        // //   router.push("/myhistory")
        // // ).catch(err => console.log(err))
      }).catch(err => console.log(err))
    }
  }
  
  console.log(nutrients)
  console.log(additionalNutrients)
  console.log(myRecipes)
  return (
    <div className={RecipeStyles.body}>
        {
          props.currentUser
            ?
          (<Button variant="success"
           onClick={sendUserHistory}
           className = {RecipeStyles.send}>Add to myMeals</Button>)
            :
          null
        }
        <img src={result.image} className={RecipeStyles.img} />
        <br />
        <h3><i>{result.label}</i></h3>
        <br />
        <h4>Calories: {calories.amount} {calories.unit}</h4>
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
                <div>
                    <div className = {RecipeStyles.tableWrapper}>
                        <table className = {RecipeStyles.table}>
                          <thead className = {RecipeStyles.thead}>
                            <tr className = {RecipeStyles.trow}>
                              <th className = {RecipeStyles.subHead}>Nutrition Facts</th>
                              <th></th>
                            </tr>
                            <tr>
                              <th className = {RecipeStyles.subHead}><strong>Servings: </strong>N/A</th>
                              <th></th>
                            </tr>
                          </thead>
                           <tbody className = {RecipeStyles.tbody}>      
                            <tr>
                              <td className = {RecipeStyles.subHead}>Amount per serving</td>
                              <td></td>
                            </tr>
                            <tr className = {RecipeStyles.nutrient}>
                              <td className = {RecipeStyles.caloriesTitle}>Calories</td>
                              <td className = {RecipeStyles.calories}><strong>{calories.calPerServing}</strong></td>
                            </tr>
                            <tr className = {RecipeStyles.nutrient}>
                              <td></td>
                              <td className = {RecipeStyles.header}>% Daily Value*</td>
                            </tr>                     
                            {
                              nutrients.map(nut => {
                                return (
                                  nut.group.localeCompare("getLessOf") == 0
                                  ?
                                  <tr key = {nut.id}
                                  className = {RecipeStyles.nutrient}>
                                    <td>
                                      <div>
                                        <strong className = {RecipeStyles.name}>{nut.name}</strong>  
                                        <strong className = {RecipeStyles.amount}>{Math.ceil(nut.amount)} {nut.unitName}</strong>
                                      </div>
                                    </td>
                                    <td className = {RecipeStyles.daily}>
                                      {
                                        nut.name.localeCompare("Protein") === 0 || nut.name.localeCompare("Sugars, total including NLEA") === 0
                                          ?
                                        ""
                                          :
                                        userDailyValue.map(dv => {
                                          if (dv.id.localeCompare(nut.id) === 0) {
                                            return Math.ceil(nut.amount / dv.value) + "%"
                                          }
                                        })
                                      }
                                    </td>
                                  </tr>
                                  : null
                                )
                              })  
                            }
                          </tbody>  
                          <tfoot>
                            {
                                nutrients.map(nut => {
                                  return (
                                    nut.group.localeCompare("getMoreOf") == 0
                                    ?
                                    <tr key = {nut.id}
                                    className = {RecipeStyles.nutrient}>
                                      <td>
                                        <div>
                                          <strong className = {RecipeStyles.name}>{nut.name}</strong>  
                                          <strong className = {RecipeStyles.amount}>{Math.ceil(nut.amount)} {nut.unitName}</strong>
                                        </div>
                                      </td>
                                      <td className = {RecipeStyles.daily}>
                                        {
                                          userDailyValue.map(dv => {
                                            if (dv.id.localeCompare(nut.id) === 0) {
                                              return Math.ceil(nut.amount / dv.value) + "%"
                                            }
                                          })
                                        }
                                      </td>
                                    </tr>
                                    : null
                                  )
                                })
                              }
                          </tfoot>
                        </table>
                        {
                        additionalNutrients === null || additionalNutrients.length == 0 
                          ?
                        null  
                          :
                        (
                          <Accordion style={{width: `${tableWidth}px`, margin: "0 auto"}} defaultActiveKey="0">
                          <Card>
                            <Card.Header>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Additional nutrients
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                              <Card.Body style={{padding: "0"}}>
                              <table className={RecipeStyles.table2} >
                                <tbody className={RecipeStyles.tbody}>
                                  {
                                    additionalNutrients.map(nut => {
                                      return (
                                        nut.group.localeCompare("additional") == 0
                                          ?
                                          <tr key={nut.id}
                                          className = {RecipeStyles.nutrient}>
                                            <td>
                                              <div>
                                                <strong className = {RecipeStyles.name}>{nut.name}</strong>
                                                <strong className = {RecipeStyles.amount}>{nut.amount}{nut.unitName}</strong>
                                              </div>
                                            </td>
                                            <td className = {RecipeStyles.daily}>
                                              {
                                                userDailyValue.map(dv => {
                                                  if (dv.id.localeCompare(nut.id) === 0) {
                                                    return Math.ceil(nut.amount / dv.value) + "%"
                                                  }
                                                })
                                              }
                                            </td>
                                        </tr>
                                          :
                                        null
                                      )
                                    })
                                  }
                                  <tr>
                                    <td className = {RecipeStyles.dv}>*The % Daily Value (DV) tells you how much a nutrient in a food serving contributes to a daily diet. It is calculated using your required energy intake.</td>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </table>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                          </Accordion>
                        )
                      }

                      <p>g = Grams; mg = Milligrams; µg = Micrograms</p>
                    </div>              
                </div>
            </Accordion.Collapse>                             
        </Accordion>
        <br />
        <RecipeChart rawCart = {rawCart} />
        <Link href={router.query.prevPage}><a>Back to Search</a></Link>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    recipes: state.recipes
  }
}

export default connect(mapStateToProps)(RecipeDetails)