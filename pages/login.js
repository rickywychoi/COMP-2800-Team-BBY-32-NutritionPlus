// login.js

import Link from 'next/link'
import { useRouter } from 'next/router'
import loginStyles from '../styles/login.module.css'
// Import FirebaseAuth and firebase.
// import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SignInScreenWithRouter = (props) => {
  const router = useRouter()
  return <SignInScreen {...props} router={router} />
}

class SignInScreen extends React.Component {
  // Configure FirebaseUI.
  uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
      }
    },
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [ 
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '/',
    // Privacy policy url.
    privacyPolicyUrl: '/'
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.props.onSignIn(user)
    )
    if (this.props.router.query.signout) {
      firebase.auth().signOut()
      this.props.router.replace("/")
    }
  }

  render() {
    if (!this.props.isSignedIn) {
      return (
        <div className={loginStyles.main}>
          <h1>Nutrition+</h1>
          <p>Please sign-in:</p>
          <br/>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          <br/>
          <Link href="/"><a>Back to home</a></Link>
        </div>
      )
    }
    this.props.router.replace("/")
    return null
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.isSignedIn,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (user) => dispatch({type: actions.SIGNIN, payload: user})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreenWithRouter)