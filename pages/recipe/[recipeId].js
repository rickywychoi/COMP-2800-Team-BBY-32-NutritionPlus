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
  const [nutrients, setNutrients] = useState([])
  const [additionalNutrients, setAdditionalNutrients] = useState(null)
  const [details, setDetails] = useState({})
  const [calories, setCalories] = useState({})
  
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
        // console.log(index.CA.label)
        let dailyValues = []
        Object.values(index).slice(1).forEach(nut => {
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
                id: `${++nutId}`, 
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
                      id: `${nutId}`,
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
                      id: ++nutId,
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
            else if (nut.name.localeCompare("Fatty acids, total saturated") == 0)
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
            else if (nut.name.localeCompare("Fatty acids, total saturated" == 0) == 0)
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
  
  // console.log(nutrients)
  // console.log(additionalNutrients)

  // additionalNutrients.forEach(nut => {
  //   console.log(nut.id)
  // })

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
                <div className={RecipeStyles.dvResult}>
                    <div>
                        <table>
                          <thead>
                            <tr>
                              <th>Nutrition Facts</th>
                              <th></th>
                            </tr>
                            <tr>
                              <th><strong>Servings: </strong>N/A</th>
                              <th></th>
                            </tr>
                          </thead>
                           <tbody>      
                            <tr>
                              <td>Amount per serving</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Calories</td>
                              <td><strong>{calories.amount}</strong></td>
                            </tr>                     
                            {
                                additionalNutrients.map(nut => {
                                  return (
                                    nut.group.localeCompare("additional") == 0
                                    ?
                                    <tr key = {nut.id}>
                                      <td>{nut.name}</td>
                                      <td>{Math.ceil(nut.amount)} {nut.unitName}</td>
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
                                    nut.group.localeCompare("getLessOf") == 0
                                    ?
                                    <tr key = {nut.id}>
                                      <td>
                                        <div>
                                          <strong>{nut.name}</strong>  
                                          <strong>{Math.ceil(nut.amount)} {nut.unitName}</strong>
                                        </div>
                                      </td>
                                      <td></td>
                                    </tr>
                                    : null
                                  )
                                })
                              }
                          </tfoot>
                        </table>
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