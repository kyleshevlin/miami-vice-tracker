import React from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import ItemsContainer from '../containers/ItemsContainer'

const App = () => (
  <Provider store={store}>
    <div>
      <h1>Vice Consumption</h1>
      <ItemsContainer />
    </div>
  </Provider>
)

export default App
