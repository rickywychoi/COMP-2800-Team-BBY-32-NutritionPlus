// index.js

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'

const Home = (props) => {
  const router = useRouter()

  const signout = (e) => {
    e.preventDefault()
    router.push("/login?signout=true")
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://github.com/rickywychoi/BBY-32-Nutrition-Plus" target="_blank">Nutrition+!</a>
        </h1>
        <br/>
        <h2>
          <b>This is [dev] branch.</b>
        </h2>
        <br/>
        {!props.isSignedIn 
          ? 
            (<Link href="/login"><a id="signIn">Sign in</a></Link>) 
          : 
            (
              <div>
                <p>Hello, {props.currentUser.displayName}!</p>
                <button onClick={signout}>Sign out</button>
              </div>
            )
        }
      </main>

      <footer>
        <a
          href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        a#signIn {
          font-size: 1.5rem;
        }

        a#signIn:hover {
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.isSignedIn,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Home)