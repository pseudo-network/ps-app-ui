// App Imports
import {
  SET_USER,
  UPDATE_USER,
  updateUserLocalStorage
} from './actions'

// Initial State
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State
export default (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        details: action.user,
        error: action.error
      }
    case UPDATE_USER:
      const newUser = Object.assign({}, state.details, action.newData)
      updateUserLocalStorage(newUser)
      return {
        ...state,
        isAuthenticated: !isEmpty(state.details),
        details: newUser
      }
    default:
      return state
  }
}
