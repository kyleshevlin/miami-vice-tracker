import React from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import ErrorBoundary from './ErrorBoundary'
import ItemsContainer from '../containers/ItemsContainer'

const App = () => (
  <Provider store={store}>
    <div>
      <ErrorBoundary message="Something went terribly wrong with the application. Sorry! ¯\_(ツ)_/¯">
        <h1>Miami Vice Tracker</h1>
        <ItemsContainer />
      </ErrorBoundary>
    </div>
  </Provider>
)

export default App
