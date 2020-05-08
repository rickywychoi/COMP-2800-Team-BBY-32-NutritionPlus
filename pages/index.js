// index.js

import Head from 'next/head'
import { connect } from 'react-redux'
import WelcomeBanner from '../components/UI/WelcomeBanner'
import mainHomeStyles from '../styles/mainHome.module.css'

const MainHome = (props) => {

  return (
    <div>
      <Head>
        <title>Nutrition+ | Stay strong, stay healthy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WelcomeBanner />
      <main className={mainHomeStyles.mainBody}>
        <h2>
          <b>This is [dev] branch.</b>
        </h2>
      </main>

      <footer className={mainHomeStyles.footer}>
        <a
          href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          This is footer.
        </a>
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