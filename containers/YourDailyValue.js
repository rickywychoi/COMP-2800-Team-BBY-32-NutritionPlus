/**
 * Your daily values calculated from user input. 
 * 
 * Uses React Bootstrap Table for simple table design.
 * 
 * Table
 * @see https://react-bootstrap.github.io/components/table/
 */


import resultStyles from '../styles/QuestionnaireResult.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import firebase from 'firebase'
import firebaseConfig from '../firebaseConfig'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import Spinner from '../components/UI/Spinner'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const YourDailyValue = (props) => {
  const router = useRouter()
  // loading
  const [isLoaded, setLoaded] = useState(false)
  // daily value of the user
  const [dailyValue, setDailyValue] = useState([])
  // estimated energy requirement (kcal) of the user
  const [eer, setEER] = useState(0)

  useEffect(() => {

    // if the user is signed in
    if (props.currentUser) {

      // gets details of health info of the user from firebase
      db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
        if (userInfo.data().healthInfo.dailyValue.length === 0 || userInfo.data().healthInfo === undefined) {
          router.push("/questionnaire?firsttime=true")
        } else {
          setDailyValue(userInfo.data().healthInfo.dailyValue)
          setEER(userInfo.data().healthInfo.eer)
        }
      })
    }

    // 0.5 seconds of loading
    setTimeout(() => {
      setLoaded(true)
    }, 500)
  }, [])

  // if the user is signed in, daily value is fetched, and the page is loaded
  if (props.currentUser && dailyValue.length > 0 && isLoaded) {
    return (
      <div className={resultStyles.body}>
        <h3>Your average dietary energy intake is <i>{eer}</i> kcal/day.</h3>
        <br />
        <div className={resultStyles.dvResult}>
          <div className={resultStyles.informationMsg}>
            <p>&nbsp;</p>
          </div>
          <h2 className={resultStyles.dailyValueTitle}>Part 1 – Daily values for macronutrients and sodium</h2>
          <div>

            {/* Table component from react-bootstrap */}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nutrient</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {
                  dailyValue.map(nut => {
                    if (nut.group.localeCompare("macronutrientsSodium") == 0) {
                      return(
                        <tr key={nut.name}>
                          <td><a href={nut.url} target="_blank" className={resultStyles.nut}>{nut.name}</a></td>
                          <td>{nut.value} {nut.unit}</td>
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

              {/* Table component from react-bootstrap */}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nutrient</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dailyValue.map(nut => {
                      if (nut.group.localeCompare("vitaminMineral") == 0) {
                        return(
                          <tr key={nut.name}>
                            <td><a href={nut.url} target="_blank" className={resultStyles.nut}>{nut.name}</a></td>
                            <td>{nut.value} {nut.unit}</td>
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
  }
  return (
    // if the page is loaded
    isLoaded
      ?
    <div className={resultStyles.noValueYet}>
      <h3>We don't have your daily value results yet.</h3>
      <p>Or, you might have done questionnaire already, but you are currently not signed in.</p>
      <button className={resultStyles.getYourResultButton} onClick={() => router.push("/login?questionnaire=true")}>Sign in and go get your result.</button>
    </div>
      :
    <Spinner />
  )
}

// contains the application's state - the current user object
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(YourDailyValue)