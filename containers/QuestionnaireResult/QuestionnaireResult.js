// EntryResult.js

import resultStyles from '../../styles/EntryResult.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Accordion, Card, Button, Table } from 'react-bootstrap'
import data from './dailyValue.json'

const QuestionnaireResult = (props) => {
  const [isInfants, setInfants] = useState(false)
  const [isChildren, setChildren] = useState(false)
  const [isAdults, setAdults] = useState(false)
  const user = props.userInfo

  useEffect(() => {
    // get data from JSON file
    if (user.age < 1)
      setInfants(true)
    else if (user.age >= 1 && user.age < 4)
      setChildren(true)
    else if (user.age >= 4)
      setAdults(true)
  })

  return (
    <>
      <div className={resultStyles.body}>
        <h3>Your average dietary energy intake is <i>{user.eer}</i> kcal/day.</h3>
        <br />
        <Link href="/"><a>Back to home</a></Link>
        <Accordion defaultActiveKey="0" className="mt-4">
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
                      Click each of nutrient to see a brief information - provided by <a href="https://www.webmd.com/" target="_blank">WebMD</a>.
                    </p>
                  </div>
                  <h2 className={resultStyles.dailyValueTitle}>Part 1 – Daily values for macronutrients and sodium</h2>
                  {
                    isInfants
                      ?
                    <div>
                      {
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nutrient</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
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
                    isChildren
                      ?
                    <div>
                      {
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nutrient</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
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
                    isAdults
                      ?
                    <div>
                      {
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nutrient</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
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
                    isInfants
                      ?
                    <div>
                      {
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nutrient</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
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
                    isChildren
                      ?
                    <div>
                      {
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nutrient</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
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
                    isAdults
                      ?
                    <div>
                      {
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Nutrient</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
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
      </div>
    </>
  )
}

export default QuestionnaireResult