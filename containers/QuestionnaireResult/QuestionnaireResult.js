/**
 * Returns the recommended amount of nutrients for user after filling out 
 * questionnaire.
 * 
 * Uses React Bootstrap Accordion, Card, Button, and Table to display
 * results of Questionnaire.
 * 
 * Accordion
 * @see https://react-bootstrap.github.io/components/accordion/
 * 
 * Card
 * @see https://react-bootstrap.github.io/components/cards/
 * 
 * Button
 * @see https://react-bootstrap.github.io/components/buttons/
 * 
 * Table
 * @see https://react-bootstrap.github.io/components/table/
 */

import resultStyles from '../../styles/QuestionnaireResult.module.css'
import Link from 'next/link'
import firebase from 'firebase'
import firebaseConfig from '../../firebaseConfig'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { Accordion, Card, Button, Table } from 'react-bootstrap'
import data from './dailyValue.json'

// firebase settings
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const QuestionnaireResult = (props) => {
  const router = useRouter()

  // to see if the user is an infant
  const [isInfants, setInfants] = useState(false)
  // to see if the user is a children
  const [isChildren, setChildren] = useState(false)
  // to see if the user is an adult
  const [isAdults, setAdults] = useState(false)
  
  const user = props.userInfo

  useEffect(() => {

    // depends on the user's age
    if (user.age < 1)
      setInfants(true)
    else if (user.age >= 1 && user.age < 4)
      setChildren(true)
    else if (user.age >= 4)
      setAdults(true)
    
    // pushes daily value of nutrients in an empty array
    const numRegex = /[0-9.]/g
    if (props.currentUser) {
      let dv = []
      if (user.age < 1) {   // if infant
        data.infants.macronutrientsSodium.forEach(nut => {
          dv.push({
            name: nut.name,
            value: parseFloat(nut.value),
            id: nut.id,
            group: "macronutrientsSodium",
            unit: nut.value.replace(numRegex, '')
          })
        })
        data.infants.vitaminMineral.forEach(nut => {
          dv.push({
            name: nut.name,
            value: parseFloat(nut.value),
            id: nut.id,
            group: "vitaminMineral",
            unit: nut.value.replace(numRegex, '')
          })
        })
      } else if (user.age >= 1 && user.age < 4) {   // if child
        data.children.macronutrientsSodium.forEach(nut => {
          dv.push({
            name: nut.name,
            value: parseFloat(nut.value),
            id: nut.id,
            group: "macronutrientsSodium",
            unit: nut.value.replace(numRegex, '')
          })
        })
        data.children.vitaminMineral.forEach(nut => {
          dv.push({
            name: nut.name,
            value: parseFloat(nut.value),
            id: nut.id,
            group: "vitaminMineral",
            unit: nut.value.replace(numRegex, '')
          })
        })
      } else if (user.age >= 4) {   // if adult
        data.adults.macronutrientsSodium.forEach(nut => {
          dv.push({
            name: nut.name,
            value:parseFloat(nut.value),
            id: nut.id,
            group: "macronutrientsSodium",
            unit: nut.value.replace(numRegex, '')
          })
        })
        data.adults.vitaminMineral.forEach(nut => {
          dv.push({
            name: nut.name,
            value: parseFloat(nut.value),
            id: nut.id,
            group: "vitaminMineral",
            unit: nut.value.replace(numRegex, '')
          })
        })
      }

      // updates Firebase with the daily values returned by questionnaire
      db.collection('users').doc(props.currentUser.uid).update({
        healthInfo: {
          dailyValue: dv,
          eer: user.eer
        }
      }).then(() => {
        console.log("User Daily Value Save Success")
      }).catch(err => {
        console.log(err)
      })
    }
  })

  // redirects to home
  const goHome = () => {
    router.push("/")
  }

  // redirects to recipe search page
  const goRecipe = () => {
    router.push("/recipe")
  }

  return (
    <>
      <div className={resultStyles.body}>
        <h3>Your average dietary energy intake is <i>{user.eer}</i> kcal/day.</h3>

        {/* Accordion component from react-bootstrap */}
        <Accordion defaultActiveKey="0" className="mt-4">

          {/* Card component from react-bootstrap */}
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1" className={resultStyles.accordionButton}>
                Click to see your Daily Values
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div className={resultStyles.dvResult}>
                  <div className={resultStyles.informationMsg}>
                    <p>
                      Click each nutrient to see some information - provided by <a href="https://www.webmd.com/" target="_blank">WebMD</a>.
                    </p>
                  </div>
                  <h2 className={resultStyles.dailyValueTitle}>Part 1 – Daily values for macronutrients and sodium</h2>
                  {
                    // if the user is an infant - part 1: macronutrientsSodium
                    isInfants
                    ?
                    <div>
                      {
                        // Table component from react-bootstrap
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nutrient</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              // Loops through macronutrientsSodium of infants section from json data and displays each nutrition item
                              data.infants.macronutrientsSodium.map(nut => {
                                return(
                                  <tr key={nut.name}>
                                    <td><a href={nut.url} target="_blank" className={resultStyles.nut}>{nut.name}</a></td>
                                    <td>{nut.value}</td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </Table>
                      }
                      <p>g = grams; mg = milligrams</p>
                    </div>
                      :
                      null
                    }
                  {
                    // if the user is a child - part 1: macronutrientsSodium
                    isChildren
                    ?
                    <div>
                      {
                        // Table component from react-bootstrap
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nutrient</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              // Loops through macronutrientsSodium of children section from json data and displays each nutrition item
                              data.children.macronutrientsSodium.map(nut => {
                                return(
                                  <tr key={nut.name}>
                                    <td><a href={nut.url} target="_blank" className={resultStyles.nut}>{nut.name}</a></td>
                                    <td>{nut.value}</td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </Table>
                      }
                      <p>g = grams; mg = milligrams</p>
                    </div>
                      :
                      null
                    }
                  {
                    // if the user is an adult - part 1: macronutrientsSodium
                    isAdults
                    ?
                    <div>
                      {
                        // Table component from react-bootstrap
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nutrient</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              // Loops through macronutrientsSodium of adults section from json data and displays each nutrition item
                              data.adults.macronutrientsSodium.map(nut => {
                                return(
                                  <tr key={nut.name}>
                                    <td><a href={nut.url} target="_blank" className={resultStyles.nut}>{nut.name}</a></td>
                                    <td>{nut.value}</td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </Table>
                      }
                      <p>g = grams; mg = milligrams</p>
                    </div>
                      :
                      null
                    }
                  <h2 className={resultStyles.dailyValueTitle2}>Part 2 – Daily values for vitamin and mineral nutrients</h2>
                  {
                    // if the user is an infant - part 2: vitaminMineral
                    isInfants
                    ?
                    <div>
                      {
                        // Table component from react-bootstrap
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nutrient</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              // Loops through vitaminMineral of infants section from json data and displays each nutrition item
                              data.infants.vitaminMineral.map(nut => {
                                return(
                                <tr key={nut.name}>
                                    <td><a href={nut.url} target="_blank" className={resultStyles.nut}>{nut.name}</a></td>
                                    <td>{nut.value}</td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </Table>
                      }
                      <p>mg = milligrams; µg = micrograms</p>
                      <p>DFE = Dietary Folate Equivalents</p>
                      <p>Calculations for vitamins are set out in Section D.01.003 of the Food and Drug Regulations.</p>
                    </div>
                      :
                      null
                    }
                  {
                    // if the user is a children - part 2: vitaminMineral
                    isChildren
                    ?
                    <div>
                      {
                        // Table component from react-bootstrap
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nutrient</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              // Loops through vitaminMineral of children section from json data and displays each nutrition item
                              data.children.vitaminMineral.map(nut => {
                                return(
                                  <tr key={nut.name}>
                                    <td><a href={nut.url} target="_blank" className={resultStyles.nut}>{nut.name}</a></td>
                                    <td>{nut.value}</td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </Table>
                      }
                      <p>mg = milligrams; µg = micrograms</p>
                      <p>DFE = Dietary Folate Equivalents</p>
                      <p>Calculations for vitamins are set out in Section D.01.003 of the Food and Drug Regulations.</p>
                    </div>
                      :
                      null
                    }
                  {
                    // if the user is an adult - part 2: vitaminMineral
                    isAdults
                    ?
                    <div>
                      {
                        // Table component from react-bootstrap
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nutrient</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              // Loops through vitaminMineral of adults section from json data and displays each nutrition item
                              data.adults.vitaminMineral.map(nut => {
                                return(
                                  <tr key={nut.name}>
                                    <td><a href={nut.url} target="_blank" className={resultStyles.nut}>{nut.name}</a></td>
                                    <td>{nut.value}</td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </Table>
                      }
                      <p>mg = milligrams; µg = micrograms</p>
                      <p>DFE = Dietary Folate Equivalents</p>
                      <p>Calculations for vitamins are set out in Section D.01.003 of the Food and Drug Regulations.</p>
                    </div>
                      :
                    null
                  }
                  <div className={resultStyles.informationMsg}>
                    <p>
                      Table of Daily Values retrieved from <a href="https://www.canada.ca/en/health-canada/services/technical-documents-labelling-requirements/table-daily-values/nutrition-labelling.html#p1" target="_blank">Gov. of Canada</a>.
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <br />
        <div className = {resultStyles.nav}>
          <Button
            variant = "secondary"
            className = {resultStyles.btnHome}
            onClick = {goHome}>Back to Home</Button>
          <Button
            variant = "secondary"
            className = {resultStyles.btnMenu}
            onClick = {goRecipe}>Evaluate Your Meal</Button>
        </div>
      </div>
    </>
  )
}

// contains the application's state - the current user object
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(QuestionnaireResult)