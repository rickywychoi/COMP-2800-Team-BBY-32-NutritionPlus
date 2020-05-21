/**
 * Deletes the user's account.
 * Uses React Bootstrap Form to create the form to delete the account,
 * and Button to delete the account.
 * 
 * Form
 * @see https://react-bootstrap.github.io/components/forms/
 * 
 * Button
 * @see https://react-bootstrap.github.io/components/buttons/
 */

import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import firebase from 'firebase'
import firebaseConfig from '../firebaseConfig'

// firebase settings
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

let db = firebase.firestore()

const DeleteAccount = (props) => {
  const router = useRouter()

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  // sets the state of username as user types into input field
  const handleNameChange = e => {
    e.preventDefault()
    setUserName(e.target.value)
  }
  
  // sets the state of password as user types into input field
  const handlePasswordChange = e => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  // deletes current account from firebase
  const deleteAccount = e => {
    e.preventDefault()

    if (confirm("This action cannot be undone.\nAre you sure to delete your account?")) {

      // if the user is signed in
      if (props.currentUser) {
        db.collection('users').doc(props.currentUser.uid).delete().then(() => {
          console.log("Successfully deleted data from database")
          var user = firebase.auth().currentUser;
          console.log(user)
          var credential = firebase.auth.EmailAuthProvider.credential(
            user.email, 
            password
          );
          
          // Prompt the user to re-provide their sign-in credentials
          user.reauthenticateWithCredential(credential).then(() => {
            
            // User re-authenticated. Delete user from authentication.
            user.delete().then(() => {
              window.location.replace("/")
            }).catch(err => console.log(err));
          }).catch(err => {

            // if the user inputs password incorrectly
            alert("Your given password is incorrect.\nPlease try again.")
          });
        }).catch(err => console.log(err))
      }
    }
  }

  return (
    <div style={{textAlign: "center", marginTop: "3rem"}}>
      <hr/>
      <h3>If you wish to delete your account,</h3>

      {/* Form component from react-bootstrap */}
      <Form>
        <Form.Group controlId="deleteAccountName">
          <Form.Label className="formLabel">Enter your name and password to proceed to <span style={{color: "red"}}>delete</span> your account.</Form.Label>
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
        <Form.Group controlId="deleteAccountPassword">
          <Form.Control 
            required
            type="password" 
            placeholder="Your password"
            className="form"
            onChange={handlePasswordChange} />
          <Form.Control.Feedback type="invalid">
            Please enter your password for this account.
          </Form.Control.Feedback>
        </Form.Group>
        <Button 
          disabled={props.currentUser.displayName.localeCompare(userName) != 0 || !password} 
          variant="danger"
          className="mt-3"
          onClick={deleteAccount}
        >
          Delete your account
        </Button>
      </Form>

      {/* Stylesheet for elements in this page */}
      <style>{`
        h3 {
          margin-bottom: 1.5rem;
        }

        .form {
          width: 30%;
          margin: 0 auto;
        }

        .formLabel {
          margin-bottom: 1.5rem;
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

// contains the application's state - the current user object
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(DeleteAccount)