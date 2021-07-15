// Main setup for the store object in our application. This is where all the context esq stuff is imported for centralized use in the application

// Imports
import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// App Imports
import user from '../data/user/state'
import cryptoCurrencies from '../data/cryptoCurrency/state'

// App Reducer
const appReducer = combineReducers({
  user,
  cryptoCurrencies
})

// Root Reducer
export const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }

  return appReducer(state, action)
}

// Load initial state from server side
let initialState
if (typeof window !== 'undefined') {
  initialState = window.__INITIAL_STATE__
  delete window.__INITIAL_STATE__
}

// Store
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)
