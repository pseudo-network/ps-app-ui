// App Imports
import {
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_RESPONSE,
  UPDATE_TRANSACTIONS,
  GET_INFO_REQUEST,
  GET_INFO_RESPONSE,
  UPDATE_INFO,
  GET_REQUEST,
  GET_RESPONSE,
  UPDATE,
} from "./actions"

// Initial State
export const initialState = {
  error: null,
  isLoading: false,
  transactions: [],
  info: {},
  cryptos: [],
}

// State
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTION_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_TRANSACTION_RESPONSE:
      return {
        ...state,
        isLoading: false,
      }
    case UPDATE_TRANSACTIONS:
      const transactions = state.transactions.concat(action.data)
      return {
        ...state,
        transactions: transactions,
      }
    case GET_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_INFO_RESPONSE:
      return {
        ...state,
        isLoading: false,
      }
    case UPDATE_INFO:
      return {
        ...state,
        info: action.data,
      }
    case GET_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case GET_RESPONSE:
      return {
        ...state,
        isLoading: false,
      }
    case UPDATE:
      return {
        ...state,
        cryptos: action.data,
      }
    default:
      return state
  }
}
