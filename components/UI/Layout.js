import NavBar from './NavBar'
import WelcomeBanner from './WelcomeBanner'

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <WelcomeBanner />
      {children}
    </>
  )
}

export default Layout