import { Navbar, Nav } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import n from './NavBar.module.css'

const NavBar = (props) => {
    const router = useRouter()

    const signout = (e) => {
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
                            (<Link href="/login" ><a id="signIn">Sign in</a></Link>) 
                            : 
                            (<button onClick={signout} className={n.signoutButton}>Sign out</button>)
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