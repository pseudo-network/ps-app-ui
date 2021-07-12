// Imports
import axios from 'axios';
import { useDispatch } from 'react-redux';
const api_root = "http://34.69.134.192:3444";

export const UPDATE_CURRENCIES = 'UPDATE_CURENCIES';

export const GET_TRANSACTION_REQUEST = 'GET_TRANSACTION_REQUEST';
export const GET_TRANSACTION_RESPONSE = 'GET_TRANSACTION_RESPONSE';
export const UPDATE_TRANSACTIONS = 'UPDATE_TRANSACTIONS';


export const GET_SEARCH_REQUEST = 'GET_SEARCH_REQUEST';
export const GET_SEARCH_RESPONSE = 'GET_SEARCH_RESPONSE';
export const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS';

export function updateTransactions(newTransactions) {
    return {type: UPDATE_TRANSACTIONS,  newTransactions}
}

export function updateSearchResults(results) {
    return {type: UPDATE_SEARCH_RESULTS,  results}
}

export function getTransactions(coinAddress, isLoading=true) {
    return dispatch => {
        // Telling the dispatch we are starting to load this component
        dispatch({
          type: GET_TRANSACTION_REQUEST,
          isLoading
        });
        // Sending the john
        return axios.get(`${api_root}/transaction`).then( response =>{
            // Process Data
            /*response.data.map(item =>  {
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
            });*/
            console.log("response.data");
            console.log(response.data);
            dispatch(updateTransactions(response.data));
            dispatch({
                type: GET_TRANSACTION_RESPONSE
            });
        })
    }
}

export function searchCoins(searchTarget, isLoading=true) {
    var urlEncodedSearchTarget = searchTarget;//encodeURIComponent(myUrl);
    return dispatch => {
        // Telling the dispatch we are starting to load this component
        dispatch({
          type: GET_SEARCH_REQUEST,
          isLoading
        });
        // Sending the john
        return axios.get(`${api_root}/currencies?search_query='` + urlEncodedSearchTarget).then( response =>{
            // Process Data
            console.log("response.data");
            console.log(response.data);
            dispatch(updateSearchResults(response.data));
            dispatch({
                type: GET_SEARCH_RESPONSE
            });
        })
    }
}