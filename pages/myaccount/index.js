import { useState, useEffect } from 'react'
import DeleteAccount from '../../containers/DeleteAccount'
import accountStyles from '../../styles/AccountPage.module.css'
import firebase from 'firebase'
import firebaseConfig from '../../firebaseConfig'
import { connect } from 'react-redux'
import ErrorPage from '../../components/ErrorPage/ErrorPage'
import DateFormatter from '../../components/DateFormatter/DateFormatter'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

let db = firebase.firestore()

const AccountPage = (props) => {
  const [userName, setUserName] = useState("")
  useEffect(() => {
    if (props.currentUser) {
      db.collection('users').doc(props.currentUser.uid).get().then(userInfo => {
        setUserName(userInfo.data().name)
      })
    }
  }, [])

  if (props.currentUser) {
    console.log(Date.parse(props.currentUser.metadata.creationTime))
  }

  return (
    props.currentUser
      ?
    <div className={accountStyles.mainBody}>
      <div className={accountStyles.contents}>
        <div className="accountPicWrapper">
          {
            props.currentUser.photoURL
              ?
            <img className={accountStyles.userImg} src={props.currentUser.photoURL} alt="user-profile-pic" />
              :
            <img className={accountStyles.userImg} src="/images/account-placeholder.jpg" alt="user-profile-pic" />
          }
        </div>
        <h3>{userName}</h3>
        <p className={accountStyles.userEmail}>{props.currentUser.email}</p>
        <p>Joined Date: <DateFormatter date={Date.parse(props.currentUser.metadata.creationTime)} /></p>

      </div>
      <DeleteAccount />
    </div>
      :
    <ErrorPage />
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(AccountPage)