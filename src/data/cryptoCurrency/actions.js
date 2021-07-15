// Imports
import axios from 'axios'

const api_root = 'http://api.pseudonetwork.net:3444'

export const UPDATE_CURRENCIES = 'UPDATE_CURENCIES'

export const GET_TRANSACTION_REQUEST = 'GET_TRANSACTION_REQUEST'
export const GET_TRANSACTION_RESPONSE = 'GET_TRANSACTION_RESPONSE'
export const UPDATE_TRANSACTIONS = 'UPDATE_TRANSACTIONS'

export function updateTransactions (newTransactions) {
  return { type: UPDATE_TRANSACTIONS, newTransactions }
}

export function getTransactions (coinAddress, isLoading = true) {
  return dispatch => {
    // Telling the dispatch we are starting to load this component
    dispatch({
      type: GET_TRANSACTION_REQUEST,
      isLoading
    })
    // Sending the john
    const safemoon = '0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3' // temporary

    return axios
      .get(`${api_root}/currencies/${safemoon}/transactions`)
      .then(response => {
        // Process Data
        /* response.data.map(item =>  {
                console.log(item);
                /*
                let price = data.map(d => d.tradeAmount)
                let time = data.map(d => d.timeInterval.second)
                let hash = data.map(d => d.transaction.hash)
                let buyCurrency = data.map(d => d.buyCurrency)
                let buyAmount = data.map(d => d.buyAmount)
                let sellCurrency = data.map(d => d.sellCurrency )
                let sellAmount = data.map(d => d.sellAmount)
                return {
                    price,
                    time,
                    hash,
                    buyCurrency,
                    buyAmount,
                    sellCurrency,
                    sellAmount
                }
            }); */
        console.log('response.data')
        console.log(response.data)
        dispatch(updateTransactions(response.data))
        dispatch({
          type: GET_TRANSACTION_RESPONSE
        })
      })
  }
}
