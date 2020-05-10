import { useRef, useEffect } from 'react'
import { Navbar, Nav,} from 'react-bootstrap'
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
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link href="/questionnaire" ><a className={navbarStyles.link}>Your Intake</a></Link>
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
                                    <Link href = "#"><a className={navbarStyles.myCart}>My List</a></Link>
                                    <Link href="/mycart"><a className={navbarStyles.myCart}>My Cart</a></Link>
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