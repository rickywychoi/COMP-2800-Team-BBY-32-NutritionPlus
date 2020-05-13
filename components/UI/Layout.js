import Head from 'next/head'
import NavBar from './NavBar'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon2.ico" />
      </Head>
      <NavBar />
      {children}
    </>
  )
}

export default Layout