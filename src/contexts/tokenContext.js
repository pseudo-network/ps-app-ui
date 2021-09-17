import React, { useContext, createContext, useState, useEffect } from "react"
import useSWR from "swr"
import { convertExponentialToDecimal, fetcher } from "../utils/utils"
import {
  CHARTDATA_BASE_URL,
  BUSD,
  BUSD_ADDRESS,
  WBNB_ADDRESS,
} from "../core/environments"
import axios from "axios"
import { binance, cardano } from "../utils/supportedChains"
import { useHistory } from "react-router-dom"

const tokenContext = createContext()

export function useToken() {
  return useContext(tokenContext)
}

export function ProvideToken({ children }) {
  const token = useProvideToken()
  return <tokenContext.Provider value={token}>{children}</tokenContext.Provider>
}

function formatTVSymbol(name, symbol, address, quoteCurrency) {
  return `${name}:${symbol}:${address}:${quoteCurrency}`
}

function getTokenByAddress(address, busd) {
  return axios
    .get(`${CHARTDATA_BASE_URL}/cryptos?search_query=${address}`)
    .then((res) => {
      if (res.data.length > 0) {
        return res.data[0]
      } else {
        return null
      }
    })
    .catch((e) => {
      // console.log(e)
      return e
      // todo: handle error
    })
}

function getTokenInfoByAddress(address, busd) {
  // let quoteCurrency = busd ? BUSD_ADDRESS : WBNB_ADDRESS
  return axios
    .get(
      `${CHARTDATA_BASE_URL}/cryptos/${address}/day-summary?quote_currency=${WBNB_ADDRESS}`
    )
    .then((res) => {
      if (res.data) {
        return res.data
      } else {
        return null
      }
    })
    .catch((e) => {
      // console.log(e)
      console.log("error", e)
      return e
      // todo: handle error
    })
}

// todo: revise
function getChainFromURL() {
  const currentURL = new URL(window.location.href)

  if (currentURL.pathname.includes(binance.route)) {
    return binance
  } else if (currentURL.pathname.includes(cardano.route)) {
    return cardano
  } else {
    return binance
  }
}

function useProvideToken() {
  const [chain, setChain] = useState(getChainFromURL()) // binance is default chain
  const [address, setAddress] = useState(null)
  const [name, setName] = useState(null)
  const [symbol, setSymbol] = useState(null)
  const [tvSymbol, setTVSymbol] = useState(null)
  const [beginningPrice, setBeginningPrice] = useState(null)
  const [currentPrice, setCurrentPrice] = useState(null)
  const [volume, setVolume] = useState(null)
  const [percentChange, setPercentChange] = useState(null)
  const [supply, setSupply] = useState(null)
  const [burned, setBurned] = useState(null)
  const [uniqueWalletsCount, setUniqueWalletsCount] = useState(null)
  const [busd, setBUSD] = useState(false)
  const [transactions, setTransactions] = useState([])

  const [tokenIsLoading, setTokenIsLoading] = useState(true)
  const [infoIsLoading, setInfoIsLoading] = useState(true)

  const { data: transactionsData, transactionsValidating } = useSWR(
    `${CHARTDATA_BASE_URL}/cryptos/${address}/transactions`,
    fetcher,
    { refreshInterval: 10000 }
  )

  useEffect(() => {
    setChain(getChainFromURL())
  }, [chain])

  useEffect(() => {
    if (transactionsData && !transactionsValidating) {
      // console.log(transactionsData)
      setTransactions(transactionsData)
    }
  }, [transactionsData, address])

  useEffect(() => {
    if (address && address != "") {
      setTokenIsLoading(true)
      getTokenByAddress(address, busd).then((res) => {
        setTokenIsLoading(false)

        if (!res) return
        setName(res.name)
        setSymbol(res.symbol)
        setAddress(res.address)
        setTVSymbol(
          formatTVSymbol(
            res.name,
            res.symbol,
            res.address,
            busd ? BUSD_ADDRESS : WBNB_ADDRESS
          )
        )
      })

      setInfoIsLoading(true)
      getTokenInfoByAddress(address, busd).then((res) => {
        setInfoIsLoading(false)

        if (!res) return
        setCurrentPrice(convertExponentialToDecimal(res.current_price_usd))
        setVolume(res.trade_amount_usd)
        setSupply(res.minted_count)
        setUniqueWalletsCount(res.unique_wallets_count)
        setBurned(res.burned_count)

        // console.log(
        //   "currentPrice",
        //   convertExponentialToDecimal(res.current_price_usd)
        // )
      })
    }
  }, [address, busd])

  // try {
  //   getTokenTransactionsByAddress(address).then((res) => {
  //     setTransactions(res);
  //   });
  // } catch (e) {
  //    console.log(e);
  // }
  // const interval = setInterval(() => loadTransactionData(), 2000);
  // clearInterval(interval);

  return {
    chain,
    setChain,
    address,
    setAddress,
    name,
    symbol,
    tvSymbol,
    percentChange,
    beginningPrice,
    currentPrice,
    volume,
    setBUSD,
    busd,
    tokenIsLoading,
    infoIsLoading,
    transactions,
    uniqueWalletsCount,
    supply,
    burned,
  }
}
