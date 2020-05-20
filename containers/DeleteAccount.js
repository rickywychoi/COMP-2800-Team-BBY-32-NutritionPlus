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
  const [password, setPassword] = useState("")

  const handleNameChange = e => {
    e.preventDefault()
    setUserName(e.target.value)
  }

  const handlePasswordChange = e => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  const deleteAccount = e => {
    e.preventDefault()
    if (confirm("This action cannot be undone.\nAre you sure to delete your account?")) {
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
      <Form>
        <Form.Group controlId="deleteAccountName">
          <Form.Label>Enter your name and password to proceed to <span style={{color: "red"}}>delete</span> your account.</Form.Label>
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
        <Button disabled={props.currentUser.displayName.localeCompare(userName) != 0 || !password} variant="danger" onClick={deleteAccount}>Delete your account</Button>
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