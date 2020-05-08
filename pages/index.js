// index.js

import Head from 'next/head'
import { connect } from 'react-redux'
import WelcomeBanner from '../components/UI/WelcomeBanner'
import NewsFeed from '../components/NewsFeed/NewsFeed'
import mainHomeStyles from '../styles/mainHome.module.css'

const MainHome = (props) => {

  return (
    <div>
      
      <Head>
        <title>Nutrition+ | Stay strong, stay healthy</title>
        <link rel="icon" href="/favicon2.ico" />
      </Head>
      <WelcomeBanner className={mainHomeStyles.banner}/>
      
      <main className={mainHomeStyles.mainBody}>
        <NewsFeed />
      </main>

      <footer className={mainHomeStyles.footer}>
      Copyright © 2020 BCIT CST Group 32. All rights reserved.
        {/* <a
          href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright © 2020 BCIT CST Group 32. All rights reserved.
        </a> */}
      </footer>
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