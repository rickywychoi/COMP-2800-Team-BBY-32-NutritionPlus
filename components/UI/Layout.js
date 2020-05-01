import WelcomeBanner from './WelcomeBanner/WelcomeBanner'

const Layout = ({ children }) => {
  return (
    <>
      <WelcomeBanner />
      {children}
    </>
  )
}

export default Layout