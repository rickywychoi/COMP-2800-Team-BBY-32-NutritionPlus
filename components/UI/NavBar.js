import { useRef, useEffect } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import n from '../../styles/NavBar.module.css'

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
        <Navbar bg="dark" variant="dark" className = { n.nav }>
            <Navbar.Brand href="/">Nutrition+</Navbar.Brand>
                <Nav>
                    <Nav.Link href="#table">Nutrition Table</Nav.Link>
                    <Nav.Link href="#intake" >Your Intake</Nav.Link>
                    <Nav.Link href="#Stores">Stores</Nav.Link>
                    <Nav.Link href="#community">Community</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
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
                                    <Link href="/mycart"><a className={n.myCart}>My Cart</a></Link>
                                    <button onClick={signout} className={n.signoutButton}>Sign out</button>
                                </div>
                            )
                        }
                    </Navbar.Text>
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