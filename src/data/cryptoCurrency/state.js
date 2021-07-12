// App Imports
import {  
    UPDATE_CURRENCIES,
    GET_TRANSACTION_REQUEST,
    GET_TRANSACTION_RESPONSE,
    UPDATE_TRANSACTIONS,
    GET_SEARCH_REQUEST,
    GET_SEARCH_RESPONSE,
    UPDATE_SEARCH_RESULTS
} from './actions';



// Initial State
export const currenciesInitialState = {
  error: null,
  isLoading: false,
  currencySymbol: "POOCOIN",
  transactionData: [],
  searchResults: []
}



// State
export default (state = currenciesInitialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENCIES:
      return {
        ...state
      }
      case UPDATE_SEARCH_RESULTS:
        return {
          ...state,
          searchResults: action.results
        }
      case GET_SEARCH_REQUEST:
        return {
          ...state,
          isLoading: action.isLoading
        }
      case GET_SEARCH_RESPONSE:
        return {
          ...state,
          isLoading: false
        }
    case UPDATE_TRANSACTIONS:
      let transactions = state.transactionData.concat(action.newTransactions)
      return {
        ...state,
        transactionData: transactions
      }
    case GET_TRANSACTION_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case GET_TRANSACTION_RESPONSE:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}