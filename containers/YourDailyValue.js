import resultStyles from '../styles/QuestionnaireResult.module.css'
import Link from 'next/link'
import firebase from 'firebase'
import firebaseConfig from '../firebaseConfig'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Accordion, Card, Button, Table } from 'react-bootstrap'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const YourDailyValue = (props) => {
  const [dailyValue, setDailyValue] = useState([])
  const [eer, setEER] = useState(0)
  useEffect(() => {
    if (props.currentUser) {
      db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
        setDailyValue(userInfo.data().dailyValue)
        setEER(userInfo.data().eer)
      })
    }
  }, [])

  return (
    props.currentUser && dailyValue.length > 0
      ?
    (
      <div className={resultStyles.body}>
        <h3>Your average dietary energy intake is <i>{eer}</i> kcal/day.</h3>
        <br />
        <div className={resultStyles.dvResult}>
          <div className={resultStyles.informationMsg}>
            <p>
              Click each of nutrient to see a brief information - provided by <a href="https://www.webmd.com/" target="_blank">WebMD</a>.
            </p>
          </div>
          <h2 className={resultStyles.dailyValueTitle}>Part 1 – Daily values for macronutrients and sodium</h2>
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
                  dailyValue.forEach(nut => {
                    if (nut.group.localeCompare("macronutrientsSodium") == 0) {
                      return(
                        <tr key={nut.name}>
                          <td><a href={nut.url} target="_blank" className={resultStyles.nut}>{nut.name}</a></td>
                          <td>{nut.value}</td>
                        </tr>
                      )
                    }
                  })
                }
              </tbody>
            </Table>
            <p>g = grams; mg = milligrams</p>
          </div>
          <h2 className={resultStyles.dailyValueTitle2}>Part 2 – Daily values for vitamin and mineral nutrients</h2>
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
                    dailyValue.forEach(nut => {
                      if (nut.group.localeCompare("vitaminMineral") == 0) {
                        return(
                          <tr key={nut.name}>
                            <td><a href={nut.url} target="_blank" className={resultStyles.nut}>{nut.name}</a></td>
                            <td>{nut.value}</td>
                          </tr>
                        )
                      }
                    })
                  }
                </tbody>
              </Table>
            <p>mg = milligrams; µg = micrograms</p>
            <p>DFE = Dietary Folate Equivalents</p>
            <p>Calculations for vitamins are set out in Section D.01.003 of the Food and Drug Regulations.</p>
          </div>
          <div className={resultStyles.informationMsg}>
            <p>
              Table of Daily Values retrieved from <a href="https://www.canada.ca/en/health-canada/services/technical-documents-labelling-requirements/table-daily-values/nutrition-labelling.html#p1" target="_blank">Gov. of Canada</a>.
            </p>
          </div>
        </div>
      </div>
    )
      :
    (
      <div>
        <p>We don't have your daily value results yet.</p>
        <Link href="/login"><a>Sign in and go get your result!</a></Link>
      </div>
    )
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(YourDailyValue)