import NavBar from './NavBar/NavBar'
import WelcomeBanner from './WelcomeBanner/WelcomeBanner'

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