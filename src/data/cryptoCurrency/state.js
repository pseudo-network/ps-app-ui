// App Imports
import {
  UPDATE_CURRENCIES,
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_RESPONSE,
  UPDATE_TRANSACTIONS,
} from "./actions"

// Initial State
export const currenciesInitialState = {
  error: null,
  isLoading: false,
  currencySymbol: "POOCOIN",
  transactionData: [],
}

// State
export default (state = currenciesInitialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENCIES:
      return {
        ...state,
      }
    case UPDATE_TRANSACTIONS:
      const transactions = state.transactionData.concat(action.newTransactions)
      return {
        ...state,
        transactionData: transactions,
      }
    case GET_TRANSACTION_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case GET_TRANSACTION_RESPONSE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
