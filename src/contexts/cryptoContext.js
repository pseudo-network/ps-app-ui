import React, { useContext, createContext, useState, useEffect } from "react"
import useSWR from "swr"
import { fetcher } from "../utils/utils"
import {
  CHARTDATA_BASE_URL,
  BUSD,
  BUSD_ADDRESS,
  WBNB_ADDRESS,
} from "../core/environments"
import axios from "axios"

/**
 * Checks if number is in exponential format (eg: 1e-8 for 0.00000001).
 * If it does not, original number is returned.
 * If it does it converts it to string representation of that number
 * which forces it to format 0.00000001
 */
export function convertExponentialToDecimal(exponentialNumber) {
  // sanity check - is it exponential number
  if (exponentialNumber) {
    const str = exponentialNumber.toString()
    if (str.indexOf("e") !== -1) {
      const exponent = parseInt(str.split("-")[1], 10)
      // Unfortunately I can not return 1e-8 as 0.00000001, because even if I call parseFloat() on it,
      // it will still return the exponential representation
      // So I have to use .toFixed()
      const result = exponentialNumber.toFixed(exponent + 2)
      return result
    } else {
      return exponentialNumber
    }
  }
}

const cryptoContext = createContext()

export function useCrypto() {
  return useContext(cryptoContext)
}

export function ProvideCrypto({ children }) {
  const crypto = useProvideCrypto()
  return (
    <cryptoContext.Provider value={crypto}>{children}</cryptoContext.Provider>
  )
}

function formatTVSymbol(name, symbol, address, quoteCurrency) {
  return `${name}:${symbol}:${address}:${quoteCurrency}`
}

function getCryptoByAddress(address, busd) {
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

function getCryptoInfoByAddress(address, busd) {
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

function useProvideCrypto() {
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

  const [cryptoIsLoading, setCryptoIsLoading] = useState(true)
  const [infoIsLoading, setInfoIsLoading] = useState(true)

  const { data: transactionsData, transactionsValidating } = useSWR(
    `${CHARTDATA_BASE_URL}/cryptos/${address}/transactions`,
    fetcher,
    { refreshInterval: 10000 }
  )

  useEffect(() => {
    if (transactionsData && !transactionsValidating) {
      console.log(transactionsData)
      setTransactions(transactionsData)
    }
  }, [transactionsData, address])

  useEffect(() => {
    if (address && address != "") {
      setCryptoIsLoading(true)
      getCryptoByAddress(address, busd).then((res) => {
        setCryptoIsLoading(false)

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
      getCryptoInfoByAddress(address, busd).then((res) => {
        setInfoIsLoading(false)

        if (!res) return
        setCurrentPrice(convertExponentialToDecimal(res.current_price_usd))
        setVolume(res.trade_amount_usd)
        setSupply(res.minted_count)
        setUniqueWalletsCount(res.unique_wallets_count)
        setBurned(res.burned_count)

        console.log(
          "currentPrice",
          convertExponentialToDecimal(res.current_price_usd)
        )
      })
    }
  }, [address, busd])

  // try {
  //   getCryptoTransactionsByAddress(address).then((res) => {
  //     setTransactions(res);
  //   });
  // } catch (e) {
  //    console.log(e);
  // }
  // const interval = setInterval(() => loadTransactionData(), 2000);
  // clearInterval(interval);

  return {
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
    cryptoIsLoading,
    infoIsLoading,
    transactions,
    uniqueWalletsCount,
    supply,
    burned,
  }
}
