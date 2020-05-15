import { useRef, useEffect, useState, Component, createRef } from 'react'
import ReactDOM from 'react-dom'
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

const NavBarWithRouter = (props) => {
    const router = useRouter()
    return <NavBar {...props} router={router} />
}

class NavBar extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {show: false};
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
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="mr-auto">
                        <Link href="/yourdailyvalue" ><a className={navbarStyles.link}>Your Intake</a></Link>
                        <Link href="/search"><a className={navbarStyles.link}>Search an Item</a></Link>
                        <Link href="/recipe"><a className={navbarStyles.link}>Search Recipes</a></Link>
                        <Link href="/aboutus"><a className={navbarStyles.link}>About Us</a></Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Navbar.Text className={navbarStyles.userNameWrapper}>
                            {!this.props.isSignedIn 
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
                                        {/* <OverlayTrigger trigger="click" placement="bottom" overlay={popover}> */}
                                        <a id="myAccountPopover" ref={() => { this.target = a; }} onClick={() => this.setState({show: false})} className={navbarStyles.myAccount}>My Account</a>
                                        <Overlay show={this.state.show} placement="bottom" target={ReactDOM.findDOMNode(this.target)}>
                                            <Popover id="popover-basic">
                                                <Popover.Title as="h5" align="center"><Link href="/myaccount"><a className={navbarStyles.yourAccount}>Your Account</a></Link></Popover.Title>
                                                <Popover.Content>
                                                    <ul className={navbarStyles.myAccountList}>
                                                        <li className={navbarStyles.myAccountListItem}><Link href="/mymeals"><a className={navbarStyles.myAccountListLink}>My Meals</a></Link></li>
                                                        <li className={navbarStyles.myAccountListItem}><Link href="/mycart"><a className={navbarStyles.myAccountListLink}>My Cart</a></Link></li>
                                                        <li className={navbarStyles.myAccountListItem}><Link href="/myorder"><a className={navbarStyles.myAccountListLink}>My Order</a></Link></li>
                                                        <li className={navbarStyles.myAccountListItem}><Link href="/myorder/history"><a className={navbarStyles.myAccountListLink}>Order History</a></Link></li>
                                                    </ul>
                                                </Popover.Content>
                                            </Popover>
                                        </Overlay>
                                        {/* </OverlayTrigger> */}
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

// const NavBar = (props) => {
//     const router = useRouter()
//     const [show, setShow] = useState(false)
    
//     // ref for my account popup
//     const myAccountRef = useRef(null)

//     // Apply css on signout message
//     const signoutRef = useRef(null)
    
//     useEffect(() => {
//         setShow(false)
//         // Hides signout message after 10s (10000ms)
//         setTimeout(() => {
//             if (signoutRef.current !== null) {
//                 signoutRef.current.style.display = "none"
//             }
//         }, 10000);
//     })

//     const signout = e => {
//         e.preventDefault()
//         router.push("/login?signout=true")
//     }

//     const hidePopover = () => {
//         console.log("hide!")
//         setShow(prevState => !prevState)
//     }

    // const popover = (
    //     <Overlay show={show} target={myAccountRef}>
    //         <Popover id="popover-basic">
    //             <Popover.Title as="h5" align="center"><Link href="/myaccount"><a className={navbarStyles.yourAccount}>Your Account</a></Link></Popover.Title>
    //             <Popover.Content>
    //                 <ul className={navbarStyles.myAccountList}>
    //                     <li className={navbarStyles.myAccountListItem}><Link href = "/mymeals"><a className={navbarStyles.myAccountListLink}>My Meals</a></Link></li>
    //                     <li className={navbarStyles.myAccountListItem}><Link href="/mycart"><a className={navbarStyles.myAccountListLink}>My Cart</a></Link></li>
    //                     <li className={navbarStyles.myAccountListItem}><Link href="/myorder"><a className={navbarStyles.myAccountListLink}>My Order</a></Link></li>
    //                     <li className={navbarStyles.myAccountListItem}><Link href="/myorder/history"><a className={navbarStyles.myAccountListLink}>Order History</a></Link></li>
    //                 </ul>
    //             </Popover.Content>
    //         </Popover>
    //     </Overlay>
    // );

//     return (
//     <>
//         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//             <Link href="/">
//                 <a className={navbarStyles.appTitleLink}>
//                     <span className={navbarStyles.appTitle}>
//                         <img className={navbarStyles.appIcon} src="./favicon2.ico" alt="nutrition_plus_icon"/>
//                         Nutrition+
//                     </span>
//                 </a>
//             </Link>
//             <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={hidePopover} />
//             <Navbar.Collapse id="responsive-navbar-nav" >
//                 <Nav className="mr-auto">
//                     <Link href="/yourdailyvalue" ><a className={navbarStyles.link}>Your Intake</a></Link>
//                     <Link href="/search"><a className={navbarStyles.link}>Search an Item</a></Link>
//                     <Link href="/recipe"><a className={navbarStyles.link}>Search Recipes</a></Link>
//                     <Link href="/aboutus"><a className={navbarStyles.link}>About Us</a></Link>
//                 </Nav>
//                 <Nav className="justify-content-end">
//                     <Navbar.Text className={navbarStyles.userNameWrapper}>
//                         {!props.isSignedIn 
//                             ? 
//                             (   
//                                 <div className={navbarStyles.userName}>
//                                     <span className={navbarStyles.signOutMsg} ref={signoutRef}>
//                                         <span className={navbarStyles.greeting}>
//                                             <img className={navbarStyles.checkMark} src="https://img.icons8.com/emoji/48/000000/check-mark-emoji.png"/>
//                                             <p className={navbarStyles.signOutText}>Signed out!</p>
//                                         </span>
//                                     </span>
//                                     <Link href="/login" ><a className={navbarStyles.signIn}>Sign in</a></Link>
//                                 </div>
//                             ) 
//                             : 
//                             (
//                                 <div className={navbarStyles.userName}>
//                                     <span className={navbarStyles.greeting}>
//                                         <p className={navbarStyles.signOutText}>Hello, {props.currentUser.displayName}</p>
//                                     </span>
//                                     {/* <OverlayTrigger trigger="click" placement="bottom" overlay={popover}> */}
//                                     <a ref={myAccountRef} onClick={() => {setShow(prevState => !prevState)}} className={navbarStyles.myAccount}>My Account</a>
//                                     {/* </OverlayTrigger> */}
//                                     <button onClick={signout} className={navbarStyles.signoutButton}>Sign out</button>
//                                 </div>
//                             )
//                         }
//                     </Navbar.Text>
//                 </Nav>
//             </Navbar.Collapse>
//         </Navbar>
//     </>
//     );
// }

const mapStateToProps = state => {
    return {
      isSignedIn: state.isSignedIn,
      currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(NavBarWithRouter)