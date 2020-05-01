// EntryUserInput.js

import { useState } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import PopOver from '../../components/UI/PopOver/PopOver'
import entryStyles from './EntryUserInput.module.css'
import * as actions from '../../store/actions'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'

const EntryUserInput = (props) => {
  const router = useRouter()
  const [validated, setValidated] = useState(false);
  const [userInfo, setUserInfo] = useState({
    age: 0,
    gender: "male",
    pregnancy: "",
    lactation: "",
    weight: 0,
    isPounds: false,
    height: 0,
    isInches: false,
    physicalActivity: "",
    eer: 0
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setValidated(true);
  };

  const handleAgeChange = e => {
    setUserInfo({ ...userInfo, age: e.target.value })
  }
  const handleGenderChange = e => {
    setUserInfo({ ...userInfo, gender: e.target.value })
  }
  const handlePregnancyChange = e => {
    setUserInfo({ ...userInfo, pregnancy: e.target.value })
  }
  const handleLactationChange = e => {
    setUserInfo({ ...userInfo, lactation: e.target.value })
  }
  const handleWeightChange = e => {
    setUserInfo({ ...userInfo, weight: e.target.value })
  }
  const handlePoundsChange = e => {
    setUserInfo(prevState => ({
      ...prevState,
      isPounds: !prevState.isPounds
    }))
  }
  const handleHeightChange = e => {
    setUserInfo({ ...userInfo, height: e.target.value })
  }
  const handleInchesChange = e => {
    setUserInfo(prevState => ({
      ...prevState,
      isInches: !prevState.isInches
    }))
  }
  const handleActivityChange = e => {
    setUserInfo({ ...userInfo, physicalActivity: e.target.value })
  }
  
  const showResult = () => {
    console.log("in show result")
    let eer, pa = 0
    let {
      age, 
      gender, 
      pregnancy, 
      lactation, 
      weight,
      isPounds, 
      height, 
      isInches,
      physicalActivity
    } = userInfo

    // unit conversion for weight and height
    if (isPounds) 
      weight *= 0.45359237
    if (isInches)
      height *= 2.54

    // default physical activity coefficients
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
    // physical activity coefficients for boys, girls, men, and wormen
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

    // boys, girls, men, and women
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

    // if a female is a pregnant
    if (gender.localeCompare("female") == 0 && pregnancy.localeCompare("trimester2") == 0)
      eer += 340
    else if (gender.localeCompare("female") == 0 && pregnancy.localeCompare("trimester3") == 0)
      eer += 452
    else if (gender.localeCompare("female") == 0 && lactation.localeCompare("postpartum1") == 0)
      eer = eer + 500 - 170 
    else if (gender.localeCompare("female") == 0 && lactation.localeCompare("postpartum2") == 0)
      eer = eer + 400

    console.log("after calc "+ eer)

    setUserInfo({ ...userInfo, eer: eer, pa: pa })

    if (validated) {
      props.onSubmitEntryUserInput(Math.ceil(eer))
      router.push("/entryuserinput/result")
    }    
  }

  return (
    <div className={entryStyles.body}>
      <h1 className={entryStyles.mainTitle}>We are retrieving some <br/>basic information from you.</h1>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicAge">
          <Form.Label>What is your age?</Form.Label>
          <Form.Control 
            required
            type="number" 
            min="0" 
            max="112" 
            placeholder="Your age (example: 19)"
            onChange={handleAgeChange} />
          <Form.Control.Feedback type="invalid">
            Please enter your age.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicGender">
          <Form.Label>What is your gender?</Form.Label>
          <Form.Control required as="select" defaultValue="Select your gender" onChange={handleGenderChange}>
            <option disabled>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select your age.
          </Form.Control.Feedback>
        </Form.Group>
        {
          userInfo.gender.localeCompare("female") == 0
            ?
          (
            <>
              <hr />
              <div className={entryStyles.pregnantWrapper}>
                <h2 className={entryStyles.pregnantTitle}>If you are pregnant:</h2>
                <Form.Group controlId="formBasicPregnancy">
                  <Form.Label>What stage of pregnancy are you in?</Form.Label>
                  <Form.Control as="select" defaultValue="Select your trimester" onChange={handlePregnancyChange}>
                    <option disabled>Select your trimester</option>
                    <option value="trimester1">Trimester 1 (Week 1 - Week 12)</option>
                    <option value="trimester2">Trimester 2 (Week 13 - Week 28)</option>
                    <option value="trimester3">Trimester 3 (Week 29 - Week 40)</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicLactation">
                  <Form.Label>How long have you been after childbirth? (Lactation)</Form.Label>
                  <Form.Control as="select" defaultValue="Select your period" onChange={handleLactationChange}>
                    <option disabled>Select your period</option>
                    <option value="postpartum1">0-6 months postpartum</option>
                    <option value="postpartum2">7-12 months postpartum</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <hr />
            </>
          )
            :
          null
        }
        <Form.Group controlId="formBasicWeight">
          <Form.Label>What is your weight in <i>{userInfo.isPounds ? `pounds` : `kg`}</i>?</Form.Label>
          <Button 
            onClick={handlePoundsChange}
            className={entryStyles.weightUnitToggle}
            variant={userInfo.isPounds ? `success` : `warning`}
          >
            {userInfo.isPounds ? `kg?` : `pounds?`}
          </Button>
          <Form.Control 
            required
            type="number" 
            min="0" 
            max="1000" 
            placeholder="Your weight (example: 70 kg or 154 lb)"
            onChange={handleWeightChange} />
          <Form.Control.Feedback type="invalid">
            Please enter your weight.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicHeight">
        <Form.Label>What is your height in <i>{userInfo.isInches ? `inches` : `cm`}</i>?</Form.Label>
          <Button 
            onClick={handleInchesChange}
            className={entryStyles.heightUnitToggle}
            variant={userInfo.isInches ? `success` : `warning`}
          >
            {userInfo.isInches ? `cm?` : `inches?`}
          </Button>
          <Form.Control 
            required
            type="number" 
            min="0" 
            max="250" 
            placeholder="Your weight (example: 177 cm or 70 inches)" 
            onChange={handleHeightChange} />
          <Form.Control.Feedback type="invalid">
            Please enter your height.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPhysicalActivity">
          <Form.Label>What is your level of physical activity?</Form.Label>
          <PopOver />
          <Form.Control 
            required
            as="select"
            defaultValue="Choose your level of physical activity" 
            onChange={handleActivityChange}>
            <option disabled>Choose your level of physical activity</option>
            <option value="sedentary">Sedentary</option>
            <option value="lowActive">Low Active</option>
            <option value="active">Active</option>
            <option value="veryActive">Very Active</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select your PAL.
          </Form.Control.Feedback>
        </Form.Group>
        <div className={entryStyles.wrapButton}>
          <Button 
            className="mt-3" 
            variant={!validated ? `primary`: `success`} 
            type="submit" 
            onClick={showResult}
          >
            {!validated ? `Submit` : `Proceed`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitEntryUserInput: (eer) => dispatch({type: actions.SUBMITENTRYUSERINPUT, payload: eer})
  }
}

export default connect(null, mapDispatchToProps)(EntryUserInput)