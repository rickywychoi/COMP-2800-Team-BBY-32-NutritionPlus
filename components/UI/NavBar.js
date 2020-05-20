/* The NavBar used everywhere on the site. Holds redirects for
'Your recommended intake', 'Search an Item', 'Search recipes', and 'About Us'.
Additional profile information such as 'My Account', 'My Meals', 'My Cart',
and 'Order History'.

Uses React Bootstrap Navbar and Nav to split the Navbar (similar to div), Popover
for personal account management, and overlay to display the additional menu.
*/
import { Component, createRef } from 'react'
import ReactDOM from 'react-dom'
import { Navbar, Nav, Popover, Overlay } from 'react-bootstrap'
import Link from 'next/link'
import MealNotifierModal from '../../containers/MealNotifierModal/MealNotifierModal'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import firebase from 'firebase'
import firebaseConfig from '../../firebaseConfig'
import navbarStyles from '../../styles/NavBar.module.css'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const NavBarWithRouter = (props) => {
  const router = useRouter()
  return <NavBar {...props} router={router} />
}

class NavBar extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showMyAccount: false,
      showModal: false
    }

    this.signoutRef = createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.signoutRef.current !== null) {
      this.signoutRef.current.style.display = "none"
      }
    }, 10000);
  }

  render() {
    const signout = e => {
      this.props.router.push("/login?signout=true")
    }

    const toggleMyAccount = () => {
      this.setState(prevState => ({
        showMyAccount: !prevState.showMyAccount
      }))
    }

    const hideMyAccount = () => {
      this.setState({showMyAccount: false})
    }

    const mealNotifierInitialSetting = () => {
      this.setState({showModal: true})
      this.setState({showMyAccount: false})
    }
    
    const mealNotifier = (
      <button className={navbarStyles.mealNotifierButton} onClick={mealNotifierInitialSetting}>Set Up Meal-Notifier</button>
    )

    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Link href="/">
            <a className={navbarStyles.appTitleLink}>
              <span className={navbarStyles.appTitle}>
                <img className={navbarStyles.appIcon} src="./favicon2.ico" alt="nutrition_plus_icon"/>
                Nutrition+
              </span>
            </a>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={hideMyAccount}/>
          <Navbar.Collapse id="responsive-navbar-nav" >
            <Nav className="mr-auto">
              <Link href="/yourdailyvalue" ><a className={navbarStyles.link}>My Recommended Intake</a></Link>
              <Link href="/search"><a className={navbarStyles.link}>Search an Item</a></Link>
              <Link href="/recipe"><a className={navbarStyles.link}>Search Recipes</a></Link>
              <Link href="/aboutus"><a className={navbarStyles.link}>About Us</a></Link>
            </Nav>
            <Nav className="justify-content-end">
              <Navbar.Text className={navbarStyles.userNameWrapper}>
                {
                  !this.props.isSignedIn 
                    ? 
                  (   
                    <div className={navbarStyles.userName}>
                      <span className={navbarStyles.signOutMsg} ref={this.signoutRef}>
                        <span className={navbarStyles.greeting}>
                          <img className={navbarStyles.checkMark} src="https://img.icons8.com/emoji/48/000000/check-mark-emoji.png"/>
                          <p className={navbarStyles.signOutText}>Signed out!</p>
                        </span>
                      </span>
                      <Link href="/login" ><a className={navbarStyles.signIn}>Sign in</a></Link>
                    </div>
                  ) 
                    : 
                  (
                    <div className={navbarStyles.userName}>
                      <span className={navbarStyles.greeting}>
                        <p className={navbarStyles.signOutText}>Hello, {this.props.currentUser.displayName}</p>
                      </span>
                      <a id="myAccountPopover" ref={(a) => { this.target = a; }} onClick={toggleMyAccount} className={navbarStyles.myAccount}>My Account</a>
                      <Overlay show={this.state.showMyAccount} placement="bottom" target={ReactDOM.findDOMNode(this.target)}>
                        <Popover id="popover-basic">
                          <Popover.Title as="h5" align="center"><Link href="/myaccount"><a className={navbarStyles.yourAccount}>Your Account</a></Link></Popover.Title>
                          <Popover.Content>
                            <ul className={navbarStyles.myAccountList}>
                              <li className={navbarStyles.myAccountListItem}><Link href="/mymeals"><a className={navbarStyles.myAccountListLink}>My Meals</a></Link></li>
                              <li className={navbarStyles.myAccountListItem}><Link href="/mycart"><a className={navbarStyles.myAccountListLink}>My Cart</a></Link></li>
                              <li className={navbarStyles.myAccountListItem}><Link href="/myorder/history"><a className={navbarStyles.myAccountListLink}>Order History</a></Link></li>
                              <li className={navbarStyles.myAccountListItem}>{mealNotifier}</li>
                            </ul>
                          </Popover.Content>
                        </Popover>
                      </Overlay>
                      <button onClick={signout} className={navbarStyles.signoutButton}>Sign out</button>
                    </div>
                  )
                }
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <MealNotifierModal 
          show={this.state.showModal}
          onHide={() => this.setState({showModal: false})}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.isSignedIn,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(NavBarWithRouter)