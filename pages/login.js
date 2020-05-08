// login.js

import Link from 'next/link'
import { useRouter } from 'next/router'
// Import FirebaseAuth and firebase.
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import Spinner from '../components/UI/Spinner'


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

let db = firebase.firestore()

const SignInScreenWithRouter = (props) => {
  const router = useRouter()
  return <SignInScreen {...props} router={router} />
}

class SignInScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false
    }
  }
  
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
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      // firestore
      if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
          if (!doc.exists) {
            db.collection('users').doc(user.uid).set({
              email: user.email,
              uid: user.uid,
              name: user.displayName,
              healthInfo: {
                dailyValue: [],
                eer: 0
              },
              cart: [],
              recipes: []
            })
          }
        })
      }
      
      // redux
      this.props.onSignIn(user)
      this.setState({ isLoaded: true })
    })
    if (this.props.router.query.signout) {
      firebase.auth().signOut()
      this.props.router.replace("/")
      this.setState({ isLoaded: false })
    }
  }

  render() {
    console.log(this.props)
    if (!this.state.isLoaded) {
      return <Spinner />
    }
    if (!this.props.isSignedIn && this.state.isLoaded) {
      return (
        <div className="main">
          <h1 className="title" align="center">Nutrition+</h1>
          <p className="sign" align="center">Sign in options:</p>
          <br/>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          <br/>
          <Link href="/"><a className="back" align="center" >Back to home</a></Link>

          <style jsx>{`
            .main {
              background-color: #FFFFFF;
              width: 400px;
              height: 600px;
              margin: 1em auto;
              border-radius: 1.5em;
              box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
            }

            .title {
              padding-top: 40px;
              color: lightgreen;
              font-family: 'Ubuntu', sans-serif;
              font-weight: bold;
              font-size: 35px;
            } 


          
            .sign {
                padding-top: 40px;
                color: #8C55AA;
                font-family: 'Ubuntu', sans-serif;
                font-weight: bold;
                font-size: 23px;
            }
            
            .un {
              width: 76%;
              color: rgb(38, 50, 56);
              font-weight: 700;
              font-size: 14px;
              letter-spacing: 1px;
              background: rgba(136, 126, 126, 0.04);
              padding: 10px 20px;
              border: none;
              border-radius: 20px;
              outline: none;
              box-sizing: border-box;
              border: 2px solid rgba(0, 0, 0, 0.02);
              margin-bottom: 50px;
              margin-left: 46px;
              text-align: center;
              margin-bottom: 27px;
              font-family: 'Ubuntu', sans-serif;
            }
            
            form.form1 {
              padding-top: 40px;
            }
            
            .pass {
              width: 76%;
              color: rgb(38, 50, 56);
              font-weight: 700;
              font-size: 14px;
              letter-spacing: 1px;
              background: rgba(136, 126, 126, 0.04);
              padding: 10px 20px;
              border: none;
              border-radius: 20px;
              outline: none;
              box-sizing: border-box;
              border: 2px solid rgba(0, 0, 0, 0.02);
              margin-bottom: 50px;
              margin-left: 46px;
              text-align: center;
              margin-bottom: 27px;
              font-family: 'Ubuntu', sans-serif;
            }
            
          
            .un:focus, .pass:focus {
              border: 2px solid rgba(0, 0, 0, 0.18) !important;
                
            }
            
            .submit {
                cursor: pointer;
                border-radius: 5em;
                color: #fff;
                background: linear-gradient(to right, #9C27B0, #E040FB);
                border: 0;
                padding-left: 40px;
                padding-right: 40px;
                padding-bottom: 10px;
                padding-top: 10px;
                font-family: 'Ubuntu', sans-serif;
                margin: auto;
                font-size: 13px;
                box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
                display:block;
                width:12em;             
            }

            .back {
              cursor: pointer;
              border-radius: 5em;
              color: #fff;
              background: linear-gradient(to right, #9C27B0, #E040FB);
              border: 0;
              padding-left: 40px;
              padding-right: 40px;
              padding-bottom: 10px;
              padding-top: 10px;
              font-family: 'Ubuntu', sans-serif;
              margin: auto;
              font-size: 13px;
              box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
              display:block;
              width:14em;             
          }


            
            .forgot {
                text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
                color: #E1BEE7;
                padding-top: 15px;
            }
            
            a {
                text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
                color: #E1BEE7;
                text-decoration: none
            }
            
            @media (max-width: 600px) {
                .main {
                    border-radius: 0px;
                }
        
      `}</style>
        </div>
      )
    }
    this.props.router.push("/")
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