// EntryUserInput.js

import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import EntryResult from '../EntryResult/EntryResult'

const EntryUserInput = () => {
  const [isSubmitted, setSubmitted] = useState(false)
  const [userInfo, setUserInfo] = useState({
    age: 0,
    gender: "male",
    weight: 0,
    height: 0,
    physicalActivity: "",
    eer: 0
  })

  const handleAgeChange = e => {
    setUserInfo({ ...userInfo, age: e.target.value })
  }
  const handleGenderChange = (e) => {
    setUserInfo({ ...userInfo, gender: e.target.value })
  }
  const handleWeightChange = e => {
    setUserInfo({ ...userInfo, weight: e.target.value })
  }
  const handleHeightChange = e => {
    setUserInfo({ ...userInfo, height: e.target.value })
  }
  const handleActivityChange = e => {
    setUserInfo({ ...userInfo, physicalActivity: e.target.value })
  }
  
  const showResult = () => {
    console.log("in show result")
    let eer, pa = 0
    const {age, gender, weight, height, physicalActivity} = userInfo

    switch (physicalActivity) {
      case "sedentary":
        pa = 1.00
        break;
      case "lowActive":
        pa = 1.13
        break;
      case "active":
        pa = 1.26
        break;
      case "veryActive":
        pa = 1.42
        break;
      default:
        pa = 0
    }

    if (age <= 18 && gender.localeCompare("female") == 0 && pa == 1.13) 
      pa = 1.16
    else if (age > 18 && gender.localeCompare("male") == 0 && pa == 1.13)
      pa = 1.11
    else if (age > 18 && gender.localeCompare("female") == 0 && pa == 1.13)
      pa = 1.12
    else if (age <= 18 && gender.localeCompare("female") == 0 && pa == 1.26)
      pa = 1.31
    else if (age > 18 && gender.localeCompare("male") == 0 && pa == 1.26)
      pa = 1.25
    else if (age > 18 && gender.localeCompare("female") == 0 && pa == 1.26)
      pa = 1.27
    else if (age <= 18 && gender.localeCompare("female") == 0 && pa == 1.42)
      pa = 1.56
    else if (age > 18 && gender.localeCompare("male") == 0 && pa == 1.42)
      pa = 1.48
    else if (age > 18 && gender.localeCompare("female") == 0 && pa == 1.42)
      pa = 1.45

    if (age >= 3 && age <= 8 && gender.localeCompare("male") == 0)
      eer = 88.5 - (61.9 * age) + pa * ((26.7 * weight) + (903 * height / 100)) + 20
    else if (age > 8 && age <= 18 && gender.localeCompare("male") == 0)
      eer = 88.5 - (61.9 * age) + pa * ((26.7 * weight) + (903 * height / 100)) + 25
    else if (age >= 3 && age <= 8 && gender.localeCompare("female") == 0)
      eer = 135.3 - (30.8 * age) + pa * ((10.0 * weight) + (934 * height / 100)) + 20
    else if (age > 8 && age <= 18 && gender.localeCompare("female") == 0)
      eer = 135.3 - (30.8 * age) + pa * ((10.0 * weight) + (934 * height / 100)) + 25
    else if (age > 18 && gender.localeCompare("male") == 0)
      eer = 662 - (9.53 * age) + pa * ((15.91 * weight) + (539.6 * height / 100))
    else if (age > 18 && gender.localeCompare("female") == 0)
      eer = 354 - (6.91 * age) + pa * ((9.36 * weight) + (726 * height / 100))

    console.log("after calc "+ eer)

    setUserInfo({ ...userInfo, eer: eer, pa: pa })
    setSubmitted(true)
  }

  return (
    <>
      <Form>
        <Form.Group controlId="formBasicAge">
          <Form.Label>What is your age?</Form.Label>
          <Form.Control 
            type="number" 
            min="0" 
            max="112" 
            placeholder="Your age (Example: 19)"
            onChange={handleAgeChange} />
        </Form.Group>
        <Form.Group controlId="formBasicGender">
          <Form.Label>What is your gender?</Form.Label>
          <Form.Control as="select" defaultValue="Select your gender" onChange={handleGenderChange}>
            <option disabled>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
        </Form.Group>
        {
          userInfo.gender.localeCompare("female") == 0
            ?
          (
            <>
              <Form.Group controlId="formBasicPregnancy">
                <Form.Label>What stage of pregnancy are you in?</Form.Label>
                <Form.Control as="select" defaultValue="Select your trimester" onChange={handleGenderChange}>
                  <option disabled>Select your trimester</option>
                  <option value="trimester1">Trimester 1 (Week 1 - Week 12)</option>
                  <option value="trimester2">Trimester 2 (Week 13 - Week 28)</option>
                  <option value="trimester3">Trimester 3 (Week 29 - Week 40)</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicLactation">
                <Form.Label>How long have you been after childbirth? (Lactation)</Form.Label>
                <Form.Control as="select" defaultValue="Select your period" onChange={handleGenderChange}>
                  <option disabled>Select your period</option>
                  <option value="postpartum1">0-6 months postpartum</option>
                  <option value="postpartum2">7-12 months postpartum</option>
                </Form.Control>
              </Form.Group>
            </>
          )
            :
          null
        }
        <Form.Group controlId="formBasicWeight">
          <Form.Label>What is your weight?</Form.Label>
          <Form.Control 
            type="number" 
            min="0" 
            max="1000" 
            placeholder="Your weight (Example: 70)"
            onChange={handleWeightChange} />
        </Form.Group>
        <Form.Group controlId="formBasicHeight">
          <Form.Label>What is your height?</Form.Label>
          <Form.Control 
            type="number" 
            min="0" 
            max="250" 
            placeholder="Your weight (Example: 177)" 
            onChange={handleHeightChange} />
        </Form.Group>
        <Form.Group controlId="formBasicPhysicalActivity">
          <Form.Label>What is your level of physical activity?</Form.Label>
          <Form.Control 
            as="select"
            defaultValue="Choose your level of physical activity" 
            onChange={handleActivityChange}>
            <option disabled>Choose your level of physical activity</option>
            <option value="sedentary">Sedentary</option>
            <option value="lowActive">Low Active</option>
            <option value="active">Active</option>
            <option value="veryActive">Very Active</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={showResult}>
          Submit
        </Button>
      </Form>
      {
        isSubmitted
          ?
        <EntryResult eer={Math.ceil(userInfo.eer)} />
          :
        null
      }
    </>
  )
}

export default EntryUserInput