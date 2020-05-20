// Deletes the user's account.
// Uses React Bootstrap Form to create the form to delete the account,
// and Button to delete the account.

import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import firebase from 'firebase'
import firebaseConfig from '../firebaseConfig'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

let db = firebase.firestore()

const DeleteAccount = (props) => {
  const router = useRouter()
  const [userName, setUserName] = useState("")

  const handleNameChange = e => {
    e.preventDefault()
    setUserName(e.target.value)
  }

  const deleteAccount = e => {
    e.preventDefault()
    if (confirm("This action cannot be undone.\nAre you sure to delete your account?")) {
      var user = firebase.auth().currentUser;

      user.delete().then(() => {
        router.replace("/")
      }).catch(err => console.log(err));
    }
  }

  return (
    <div style={{textAlign: "center", marginTop: "3rem"}}>
      <hr/>
      <h3>If you wish to delete your account,</h3>
      <Form>
        <Form.Group controlId="deleteAccount">
          <Form.Label>Enter your name to proceed to <span style={{color: "red"}}>delete</span> your account.</Form.Label>
          <Form.Control 
            required
            type="text" 
            placeholder="Your name"
            className="form"
            onChange={handleNameChange} />
          <Form.Control.Feedback type="invalid">
            Please enter your name.
          </Form.Control.Feedback>
        </Form.Group>
        <Button disabled={props.currentUser.displayName.localeCompare(userName) != 0} variant="danger" onClick={deleteAccount}>Delete your account</Button>
      </Form>
      <style>{`
        h3 {
          margin-bottom: 1.5rem;
        }

        .form {
          width: 30%;
          margin: 0 auto;
        }
        
        @media (max-width: 499px) {
          .form {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(DeleteAccount)