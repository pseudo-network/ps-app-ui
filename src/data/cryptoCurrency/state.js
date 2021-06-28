// App Imports
import {  
    UPDATE_CURRENCIES
} from './actions'

// Initial State
export const currenciesInitialState = {
  error: null,
  isLoading: false,
  data: []
}

// State
export default (state = currenciesInitialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENCIES:
      return {
        ...state
      }
    default:
      return state
  }
}