import { useRef, useEffect, useState } from 'react'
import { Navbar, Nav, Popover, OverlayTrigger, Button, Overlay } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import firebase from 'firebase'
import firebaseConfig from '../../firebaseConfig'
import navbarStyles from '../../styles/NavBar.module.css'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
let db = firebase.firestore()

const NavBar = (props) => {
    const router = useRouter()
    const [show, setShow] = useState(true)
    
    // Apply css on signout message
    const signoutRef = useRef(null)
    
    useEffect(() => {
        // Hides signout message after 10s (10000ms)
        setTimeout(() => {
            if (signoutRef.current !== null) {
                signoutRef.current.style.display = "none"
            }
        }, 10000);
    })

    const signout = e => {
        e.preventDefault()
        router.push("/login?signout=true")
    }

    const hidePopover = () => {
        console.log("hide!")
        setShow(prevState => !prevState)
    }

    const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h5" align="center">Your Account</Popover.Title>
                <Popover.Content>
                    <ul className={navbarStyles.myAccountList}>
                        <li className={navbarStyles.myAccountListItem}><Link href = "#"><a className={navbarStyles.myAccountListLink}>My List</a></Link></li>
                        <li className={navbarStyles.myAccountListItem}><Link href="/mycart"><a className={navbarStyles.myAccountListLink}>My Cart</a></Link></li>
                        <li className={navbarStyles.myAccountListItem}><Link href="/myorder"><a className={navbarStyles.myAccountListLink}>My Order</a></Link></li>
                        <li className={navbarStyles.myAccountListItem}><Link href="/history"><a className={navbarStyles.myAccountListLink}>Order History</a></Link></li>
                    </ul>
                </Popover.Content>
            </Popover>
    );

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
            <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={hidePopover} />
            <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="mr-auto">
                    <Link href="/yourdailyvalue" ><a className={navbarStyles.link}>Your Intake</a></Link>
                    <Link href="/search"><a className={navbarStyles.link}>Search an Item</a></Link>
                    <Link href="/recipe"><a className={navbarStyles.link}>Search Recipes</a></Link>
                    <Link href="/aboutus"><a className={navbarStyles.link}>About Us</a></Link>
                </Nav>
                <Nav className="justify-content-end">
                    <Navbar.Text className={navbarStyles.userNameWrapper}>
                        {!props.isSignedIn 
                            ? 
                            (   
                                <div className={navbarStyles.userName}>
                                    <span className={navbarStyles.signOutMsg} ref={signoutRef}>
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
                                        <p className={navbarStyles.signOutText}>Hello, {props.currentUser.displayName}</p>
                                    </span>
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                                        <a className={navbarStyles.myAccount}>My Account</a>
                                    </OverlayTrigger>
                                    <button onClick={signout} className={navbarStyles.signoutButton}>Sign out</button>
                                </div>
                            )
                        }
                    </Navbar.Text>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </>
    );
}

const mapStateToProps = state => {
    return {
      isSignedIn: state.isSignedIn,
      currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(NavBar)