import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { loadState, saveState } from './localStorage'
import reducer from './reducers'

const store = createStore(
  reducer,
  loadState(),
  composeWithDevTools(applyMiddleware(thunk))
)

store.subscribe(() => {
  saveState(store.getState())
})

export default store
