/**
 * The NavBar used everywhere on the site. Holds redirects for
 * 'Your recommended intake', 'Search an Item', 'Search recipes', and 'About Us'.
 * Additional profile information such as 'My Account', 'My Meals', 'My Cart',
 * and 'Order History'.
 * 
 * Uses React Bootstrap Navbar and Nav to split the Navbar (similar to div), Popover
 * for personal account management, and overlay to display the additional menu.
 * 
 * Navbar, Nav
 * @see https://react-bootstrap.github.io/components/navbar/
 * 
 * Popover
 * @see https://react-bootstrap.github.io/components/overlays/#popovers
 * 
 * Overlay
 * @see https://react-bootstrap.github.io/components/overlays/
 */

import { Component, createRef } from 'react'
import ReactDOM from 'react-dom'
import { Navbar, Nav, Popover, Overlay } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import navbarStyles from '../../styles/NavBar.module.css'

// Wraps the class component to use router hook
const NavBarWithRouter = (props) => {
  const router = useRouter()
  return <NavBar {...props} router={router} />
}

// NavBar component
class NavBar extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showMyAccount: false
    }

    this.signoutRef = createRef();
  }

  componentDidMount() {
    
    // hides signout status with checkmark after 10 seconds of animation
    setTimeout(() => {
      if (this.signoutRef.current !== null) {
        this.signoutRef.current.style.display = "none"
      }
    }, 10000);
  }
  
  render() {

    // routes to login page to sign out
    const signout = () => {
      this.props.router.push("/login?signout=true")
    }

    // toggles my account popup to display and hide
    const toggleMyAccount = () => {
      this.setState(prevState => ({
        showMyAccount: !prevState.showMyAccount
      }))
    }

    // hides my account popup when the hamburger menu is collapsed
    const hideMyAccount = () => {
      this.setState({showMyAccount: false})
    }

    // triggers function that hides my account popup as the path changes
    if (this.props.router.events) {
      this.props.router.events.on('routeChangeComplete', hideMyAccount)
    }

    return (
      <>
        {/* Navbar component from react-bootstrap */}
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
                      
                      {/* Overlay component from react-bootstrap */}
                      <Overlay show={this.state.showMyAccount} placement="bottom" target={ReactDOM.findDOMNode(this.target)}>
                        
                        {/* Popover component from react-bootstrap */}
                        <Popover id="popover-basic">
                          <Popover.Title as="h5" align="center"><Link href="/myaccount"><a className={navbarStyles.yourAccount}>Your Account</a></Link></Popover.Title>
                          <Popover.Content>
                            <ul className={navbarStyles.myAccountList}>
                              <li className={navbarStyles.myAccountListItem}><Link href="/mymeals"><a className={navbarStyles.myAccountListLink}>My Meals</a></Link></li>
                              <li className={navbarStyles.myAccountListItem}><Link href="/mycart"><a className={navbarStyles.myAccountListLink}>My Cart</a></Link></li>
                              <li className={navbarStyles.myAccountListItem}><Link href="/myorder/history"><a className={navbarStyles.myAccountListLink}>Order History</a></Link></li>
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
      </>
    )
  }
}

// contains the application's state - signed-in status and the current user object
const mapStateToProps = state => {
  return {
    isSignedIn: state.isSignedIn,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(NavBarWithRouter)