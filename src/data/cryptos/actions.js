// Imports
import axios from "axios"

const api_root = "http://api.pseudonetwork.net:3444"

export const GET_TRANSACTION_REQUEST = "GET_TRANSACTION_REQUEST"
export const GET_TRANSACTION_RESPONSE = "GET_TRANSACTION_RESPONSE"
export const UPDATE_TRANSACTIONS = "UPDATE_TRANSACTIONS"

export function updateTransactions(res) {
  return { type: UPDATE_TRANSACTIONS, data: res }
}

export function getRecentTransactions(coinAddress, isLoading = true) {
  return (dispatch) => {
    dispatch({
      type: GET_TRANSACTION_REQUEST,
      isLoading,
    })
    const safemoon = "0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3" // temporary
    return axios
      .get(`${api_root}/cryptos/${safemoon}/transactions`)
      .then((res) => {
        dispatch(updateTransactions(res.data))
        dispatch({
          type: GET_TRANSACTION_RESPONSE,
        })
      })
      .catch((e) => {
        // todo: handle error
      })
  }
}

export const GET_INFO_REQUEST = "GET_INFO_REQUEST"
export const GET_INFO_RESPONSE = "GET_INFO_RESPONSE"
export const UPDATE_INFO = "UPDATE_INFO"

export function updateInfo(res) {
  return { type: UPDATE_INFO, data: res }
}

export function getInfo(addr, isLoading = true) {
  return (dispatch) => {
    dispatch({
      type: GET_INFO_REQUEST,
      isLoading,
    })
    const usdc = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
    return axios
      .get(`${api_root}/cryptos/${addr}/info?quote_currency=${usdc}`)
      .then((response) => {
        dispatch(updateInfo(response.data))
        dispatch({
          type: GET_INFO_RESPONSE,
        })
      })
      .catch((e) => {
        // todo: handle error
      })
  }
}

export const GET_REQUEST = "GET_REQUEST"
export const GET_RESPONSE = "GET_RESPONSE"
export const UPDATE = "UPDATE"

export function update(res) {
  return { type: UPDATE, data: res }
}

export function get(searchQuery, isLoading = true) {
  return (dispatch) => {
    dispatch({
      type: GET_REQUEST,
      isLoading,
    })
    return axios
      .get(`${api_root}/cryptos?search_query=${searchQuery}`)
      .then((response) => {
        dispatch(update(response.data))
        dispatch({
          type: GET_RESPONSE,
        })
      })
      .catch((e) => {
        // todo: handle error
      })
  }
}
