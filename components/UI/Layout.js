import Head from 'next/head'
import NavBar from './NavBar'
import mainHomeStyles from '../../styles/mainHome.module.css'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon2.ico" />
      </Head>
      {/* <div className={mainHomeStyles.main}> */}
      <NavBar />
      {children}
      {/* </div> */}
      {/* <footer className={mainHomeStyles.footer}>
        Copyright © 2020 BCIT CST Group 32. All rights reserved.
        <a
          href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright © 2020 BCIT CST Group 32. All rights reserved.
        </a>
      </footer> */}
    </>
  )
}

export default Layout