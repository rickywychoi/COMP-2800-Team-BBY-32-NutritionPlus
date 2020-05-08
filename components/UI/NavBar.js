import { useRef, useEffect } from 'react'
import { Navbar, Nav,} from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import firebase from 'firebase'
import firebaseConfig from '../../firebaseConfig'
import n from '../../styles/NavBar.module.css'

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

    // const signedIn = () => {
    //     firebase.auth().onAuthStateChanged(function(user) {
    //         if (user) {
    //             console.log("I am signed in")
    //         } else {
    //             console.log("I am signed out")
    //         }
    //     });
    // }

    return (
    <>
<<<<<<< HEAD
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Nutrition+</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
=======
        <Navbar bg="dark" variant="dark" className = { n.nav }>
            {/* <Navbar.Brand href="/">Nutrition+</Navbar.Brand> */}
            <Link href="/"><a>Nutrition+</a></Link>
                <Nav>
>>>>>>> 48a1079d25d2df728564e16bc1e09e550c178ad5
                    <Nav.Link href="/questionnaire" >Your Intake</Nav.Link>
                    <Nav.Link href="/search">Search an Item</Nav.Link>
                    <Nav.Link href="/recipe">Search Recipes</Nav.Link>
                    <Nav.Link href="/aboutus">About Us</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                    <Navbar.Text>
                        {!props.isSignedIn 
                            ? 
                            (   
                                <div className={n.userName}>
                                    <span className={n.signOutMsg} ref={signoutRef}>
                                        <img className={n.checkMark} src="https://img.icons8.com/emoji/48/000000/check-mark-emoji.png"/>
                                        <p className={n.greeting}>Signed out!</p>
                                    </span>
                                    <Link href="/login" ><a className={n.signIn}>Sign in</a></Link>
                                </div>
                            ) 
                            : 
                            (
                                <div className={n.userName}>
                                    <p className={n.greeting}>Hello, {props.currentUser.displayName}</p>
                                    <Link href = "#"><a className={n.myCart}>My List</a></Link>
                                    <Link href="/mycart"><a className={n.myCart}>My Cart</a></Link>
                                    <button onClick={signout} className={n.signoutButton}>Sign out</button>
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