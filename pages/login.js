/* Utilizes Firebase's default login UI to allow a user to login via
email and google. Redirects to landing page upon login.
*/

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
    credentialHelper: 'none',
    // We will display Google and Email as auth providers.
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
              recipes: [],
              orderHistory: []
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
    if (!this.state.isLoaded) {
      return <Spinner />
    }
    if (!this.props.isSignedIn && this.state.isLoaded) {
      return (
        <>
          <div className="mainWrapper">
            <div className="main">
              <h1 className="title" align="center">Nutrition+</h1>
              <p className="sign" align="center">Sign in options:</p>
              <br/>
              <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
              <br/>
              <Link href="/"><a className="back" align="center" >Back to home</a></Link>
            </div>
          </div>
          <style jsx>{`
            .mainWrapper {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 95vh;
            }

            .main {
              background-color: #FBFBFB;
              width: 400px;
              height: 600px;
              border-radius: 1.5em;
              box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
            }

            .title {
              padding-top: 3.3rem;
              color: #212529;
              font-weight: bold;
              font-size: 35px;
            } 

            .sign {
              padding-top: 2rem;
              padding-bottom: 0.5rem;
              font-size: 1.3rem;
            }

            .back {
              display: block;
              font-size: 1.15rem;
              margin: 0 auto;
              margin-top: 1.5rem;          
            }
            
            a {
              text-decoration: none
            }
            
            @media (max-width: 600px) {
              .main {
                  border-radius: 0px;
              }
            }
        
      `}</style>
        </>
      )
    }
    if (this.props.router.query.questionnaire) {
      this.props.router.push('/yourdailyvalue')
    } else {
      this.props.router.push('/')
    }
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