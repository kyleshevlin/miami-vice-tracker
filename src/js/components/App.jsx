import React from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import ErrorBoundary from './ErrorBoundary'
import AuthListener from './AuthListener'
import Header from './Header'
import AddItem from './AddItem'
import ItemsContainer from '../containers/ItemsContainer'

const App = () => (
  <Provider store={store}>
    <div>
      <ErrorBoundary message="Something went terribly wrong with the application. Sorry! ¯\_(ツ)_/¯">
        <AuthListener />

        <Header />
        <AddItem />
        <ItemsContainer />
      </ErrorBoundary>
    </div>
  </Provider>
)

export default App
