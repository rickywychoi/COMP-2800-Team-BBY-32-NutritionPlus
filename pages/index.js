/**
 * Our landing page.
 * 
 * Includes the welcome banner and a news feed.
 */

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import WelcomeBanner from '../components/UI/WelcomeBanner'
import NewsFeed from '../components/NewsFeed/NewsFeed'
import mainHomeStyles from '../styles/mainHome.module.css'

const MainHome = (props) => {
  const router = useRouter()

  const bannerRef = useRef(null)
  
  useEffect(() => {
    if (router.query.ordercomplete) {
      alert("Your order is successfully made.")
    }
  })
  
  
  return (
    <div>
      <Head>
        <title>Nutrition+ | Stay strong, stay healthy</title>
      </Head>
      <WelcomeBanner className={mainHomeStyles.banner} ref={bannerRef} />
      
      <main className={mainHomeStyles.mainBody}>
        <NewsFeed />
      </main>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.isSignedIn,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(MainHome)