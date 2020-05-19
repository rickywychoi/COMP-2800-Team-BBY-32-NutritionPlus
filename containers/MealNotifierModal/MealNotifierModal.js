import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const MealNotifierModal = (props) => {
  const [breakfastTime, setBreakfastTime] = useState()

  const onRangeChange = e => {
    e.preventDefault()
    let input = e.target.value

    const hours = Math.floor(input * 5 / 60)
    const minutes = Math.round(input * 5 % 60)
    setBreakfastTime(`${5 + hours} : ${minutes === 0 || minutes === 5 ? "0" + minutes : minutes} a.m.`)
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          What time do you usually eat breakfast?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{padding: "0 1rem"}}>
          <Form>
            <Form.Group controlId="formBasicRangeCustom" align="center">
              <Form.Label 
                className="mb-4" 
                style={{fontSize: "1.7rem"}}
              >
                {breakfastTime ? breakfastTime : <p style={{fontSize: "1rem"}}>Input your time by moving the range bar below.</p>}
              </Form.Label>
              <Form.Control type="range" min="0" max="83" onChange={onRangeChange} custom />
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MealNotifierModal