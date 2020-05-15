import { useState, useEffect } from 'react'
import MediaQuery from 'react-responsive'
import { HorizontalBar } from 'react-chartjs-2'
import 'chartjs-plugin-annotation'
import firebase from 'firebase'
import firebaseConfig from '../../firebaseConfig'
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const RecipeChart = (props) => {
  const [data, setData] = useState({})
  const [amountsPercentage, setAmountsPercentage] = useState([])
  const [dailyValue, setDailyValue] = useState([])
  const [isWeekly, setWeekly] = useState(false)

//   console.log(props)

  // called only when props.rawCart is changed
  useEffect(() => {
    let chartData = {
      labels: null,
      datasets: null
    }

    if (props.currentUser) {
      // change each id corresponding to id from daily value
      if (props.rawCart) {
        db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
          chartData.labels = ['Fat', 'Fatty acids', 'Fibre', 'Sugars', 'Cholesterol', 'Sodium', 'Potassium', 'Calcium', 'Iron', 'Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin E', 'Vitamin K', 'Thiamin', 'Riboflavin', 'Niacin', 'Vitamin B6', 'Folate', 'Vitamin B12', 'Choline', 'Biotin', 'Pantothenate', 'Phosphorous', 'Iodide', 'Magnesium', 'Zinc', 'Selenium', 'Copper', 'Manganese', 'Chromium', 'Molybdenum', 'Chloride']
          setDailyValue(userInfo.data().healthInfo.dailyValue)
          console.log(props.rawCart)
          props.rawCart.forEach(recipe => {
            console.log(recipe)
            console.log(recipe.totalNutrients)
            Object.values(recipe.totalNutrients).forEach(nut => {
              if (nut.label.localeCompare("Fat") == 0)
                nut.id = "1"
              else if (nut.label.localeCompare("Saturated" == 0) == 0)
                nut.id = "2"
              else if (nut.label.localeCompare("Fiber") == 0)
                nut.id = "3"
              else if (nut.label.localeCompare("Sugars") == 0)
                nut.id = "4"
              else if (nut.label.localeCompare("Cholesterol") == 0)
                nut.id = "5"
              else if (nut.label.localeCompare("Sodium") == 0)
                nut.id = "6"
              else if (nut.label.localeCompare("Potassium") == 0)
                nut.id = "7"
              else if (nut.label.localeCompare("Calcium") == 0)
                nut.id = "8"
              else if (nut.label.localeCompare("Iron") == 0)
                nut.id = "9"
              else if (nut.label.localeCompare("Vitamin A") == 0)
                nut.id = "10"
              else if (nut.label.localeCompare("Vitamin C") == 0)
                nut.id = "11"
              else if (nut.label.localeCompare("Vitamin D") == 0)
                nut.id = "12"
              else if (nut.label.localeCompare("Vitamin E") == 0)
                nut.id = "13"
              else if (nut.label.localeCompare("Vitamin K (phylloquinone)") == 0)
                nut.id = "14"
              else if (nut.label.localeCompare("Thiamin (B1)") == 0)
                nut.id = "15"
              else if (nut.label.localeCompare("Riboflavin (B2)") == 0)
                nut.id = "16"
              else if (nut.label.localeCompare("Niacin (B3)") == 0)
                nut.id = "17"
              else if (nut.label.localeCompare("Vitamin B6") == 0)
                nut.id = "18"
              else if (nut.label.localeCompare("Folate equivalent (total)") == 0)
                nut.id = "19"
              else if (nut.label.localeCompare("Vitamin B12") == 0)
                nut.id = "20"
              else if (nut.label.toLowerCase().includes("chlori"))
                nut.id = "21"
              else if (nut.label.toLowerCase().includes("biotin"))
                nut.id = "22"
              else if (nut.label.localeCompare("Pantothenic acid") == 0)
                nut.id = "23"
              else if (nut.label.localeCompare("Phosphorus") == 0)
                nut.id = "24"
              else if (nut.label.localeCompare("Iodine, I") == 0)
                nut.id = "25"
              else if (nut.label.localeCompare("Magnesium") == 0)
                nut.id = "26"
              else if (nut.label.localeCompare("Zinc") == 0)
                nut.id = "27"
              else if (nut.label.localeCompare("Selenium, Se") == 0)
                nut.id = "28"
              else if (nut.label.localeCompare("Copper, Cu") == 0)
                nut.id = "29"
              else if (nut.label.localeCompare("Manganese, Mn") == 0)
                nut.id = "30"
              else if (nut.label.toLowerCase().includes("chromium"))
                nut.id = "31"
              else if (nut.label.localeCompare("Molybdenum, Mo") == 0)
                nut.id = "32"
              else if (nut.label.toLowerCase().includes("chlori"))
                nut.id = "33"
            })
          })
    
          // set initial values for amount of each nutirent(total 33)
          let amountsArray = []
          for (let i = 0; i < 33; i++) {
            amountsArray[i] = 0
          }
    
          // add amount of each nutrient
          props.rawCart.forEach(item => {
            Object.values(item.totalNutrients).forEach(nut => {
              for (let i = 0; i < 33; i++) {
                if (parseInt(nut.id) === i + 1) {
                  amountsArray[i] = amountsArray[i] + nut.quantity
                } 
              }
            })
          })
    
          // calculate percentage of each nutrient
          let percentageArray = []
          dailyValue.forEach(nut => {
            if (isWeekly) {
              // if user set to weekly
              percentageArray[parseInt(nut.id) - 1] = Math.ceil(100 * amountsArray[parseInt(nut.id) - 1] / (nut.value * 7))
            } else {
              // if user set to daily
              percentageArray[parseInt(nut.id) - 1] = Math.ceil(100 * amountsArray[parseInt(nut.id) - 1] / nut.value)
            }
          })
    
          chartData.datasets = [
            {
              label: 'Your Daily Nutrient Intake (%)',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: percentageArray
            }
          ]
    
          setAmountsPercentage(percentageArray)
          setData({...chartData})
        }).catch(err => console.log(err))
      }
    }
  }, [props.rawCart, isWeekly])

  console.log(data)

  const handleToggleChange = e => {
    setWeekly(prevState => !prevState)
  }

  return (
    <div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Form>
          <div style={{display: "flex"}}>
            <p style={{marginRight: "10px"}}>Daily</p>
            <Form.Check 
              type="switch"
              id="custom-switch"
              label=""
              onChange={handleToggleChange}
            />
            <p>Weekly</p>
          </div>
        </Form>
      </div>
      <MediaQuery minDeviceWidth={500}>
        <HorizontalBar 
          data={data}
          options={{
            annotation: {
              annotations: [{
                type: "line",
                mode: "vertical",
                scaleID: "x-axis-0",
                value: 100,
                borderColor: "red",
                label: {
                  content: "Standard",
                  enabled: true,
                  position: "top"
                }
              }]
            }
          }}
        />
      </MediaQuery>
      <MediaQuery maxDeviceWidth={499}>
        <HorizontalBar 
          data={data}
          height={430}
          options={{
            annotation: {
              annotations: [{
                type: "line",
                mode: "vertical",
                scaleID: "x-axis-0",
                value: 100,
                borderColor: "red",
                label: {
                  content: "Standard",
                  enabled: true,
                  position: "top"
                }
              }]
            }
          }}
        />
      </MediaQuery>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(RecipeChart)