/**
 * Top-level app.
 * @see https://nextjs.org/docs/advanced-features/custom-app
 *
 * Uses Redux to manage information of currently signed-in user in the app.
 * @see https://redux.js.org/introduction/getting-started
 */

import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import Layout from '../components/UI/Layout'
import { useRouter } from 'next/router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import withRedux, { createWrapper } from 'next-redux-wrapper'
import { devToolsEnhancer } from 'redux-devtools-extension'
import reducer from '../store/reducer'

const makeStore = () => createStore(reducer, devToolsEnhancer())
const wrapper = createWrapper(makeStore)

export async function getInitialProps ({ Component, ctx }) {
  return {
    pageProps: {
      // Call page-level getInitialProps
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
    }
  }
}

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  return router.pathname.localeCompare('/login') == 0 ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(App)
