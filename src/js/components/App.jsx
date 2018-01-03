import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import ErrorBoundary from './ErrorBoundary'
import AuthListener from './AuthListener'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

const App = () => (
  <Provider store={store}>
    <Fragment>
      <ErrorBoundary message="Something went terribly wrong with the application. Sorry! ¯\_(ツ)_/¯">
        <AuthListener />

        <Header />
        <Main />
        <Footer />
      </ErrorBoundary>
    </Fragment>
  </Provider>
)

export default App
