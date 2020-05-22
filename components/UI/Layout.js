/**
 * Basic container for the entire app.
 * 
 * Includes NavBar and the footer with SocialMedia share icons.
 */

import Head from 'next/head'
import NavBar from './NavBar'
import mainHomeStyles from '../../styles/mainHome.module.css'
import SocialMedia from '../SocialMedia/SocialMedia'

const Layout = ({ children }) => {
  return (
    <div className={mainHomeStyles.container}>

      {/* Equivalent to head in html, includes icon and viewport settings */}
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon2.ico" />
      </Head>
      <div className={mainHomeStyles.wrap}> 
      
      {/* NavBar from react-bootstrap */}
      <NavBar />
      {children}
      </div>
      
      <footer className={mainHomeStyles.footer}>
        <div>
          <SocialMedia />
        </div>
        <br/>
        <p>Copyright © 2020 BCIT CST Group 32. All rights reserved.</p>
      </footer>
    </div>
  
  )
}

export default Layout