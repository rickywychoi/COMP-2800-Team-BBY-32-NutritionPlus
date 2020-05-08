// app.js

import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import Layout from '../components/UI/Layout'
import { useRouter } from 'next/router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { devToolsEnhancer } from 'redux-devtools-extension'
import reducer from '../store/reducer'

const makeStore = () => createStore(reducer, devToolsEnhancer())

export async function getStaticProps({ Component, ctx }) {
  return {
    pageProps: {
      // Call page-level getInitialProps
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
    }
  };
}

const App = ({ Component, pageProps, store }) => {
  const router = useRouter()

  return (
    <Provider store={store}>
      {
        router.pathname.localeCompare("/login") == 0
          ?
        <Component {...pageProps} />
          :
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      }
    </Provider>
  )
}

export default withRedux(makeStore)(App)