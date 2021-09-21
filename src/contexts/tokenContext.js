import React, { useContext, createContext, useState, useEffect } from "react"
import useSWR from "swr"
import { convertExponentialToDecimal, fetcher } from "../utils/utils"
import { CHARTDATA_BASE_URL, WBNB_ADDRESS } from "../core/environments"
import axios from "axios"
import { useChain } from "./chainContext"

const tokenContext = createContext()

export function useToken() {
  return useContext(tokenContext)
}

export function ProvideToken({ children }) {
  const token = useProvideToken()
  return <tokenContext.Provider value={token}>{children}</tokenContext.Provider>
}

function formatTVSymbol(name, symbol, address, quoteCurrency, chainID) {
  return `${name}:${symbol}:${address}:${quoteCurrency}:${chainID}`
}

function getTokenByAddress(address, chainID) {
  return axios
    .get(
      `${CHARTDATA_BASE_URL}/chains/${chainID}/tokens?search_query=${address}`
    )
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

function getTokenInfoByAddress(address, chainID) {
  // let quoteCurrency = busd ? BUSD_ADDRESS : WBNB_ADDRESS
  return axios
    .get(
      `${CHARTDATA_BASE_URL}/chains/${chainID}/tokens/${address}/day-summary`
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

function getTokens(searchQuery) {
  // let quoteCurrency = busd ? BUSD_ADDRESS : WBNB_ADDRESS
  return axios
    .get(`${CHARTDATA_BASE_URL}/chains/2/tokens?search_query=${searchQuery}`)
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

function useProvideToken() {
  const chainContext = useChain()
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
  const [transactions, setTransactions] = useState([])
  const [tokens, setTokens] = useState([])
  const [searchQuery, setSearchQuery] = useState(null)

  const [tokenIsLoading, setTokenIsLoading] = useState(true)
  const [infoIsLoading, setInfoIsLoading] = useState(true)

  const { data: transactionsData, transactionsValidating } = useSWR(
    `${CHARTDATA_BASE_URL}/chains/${chainContext.chain.id}/tokens/${address}/transactions`,
    fetcher,
    { refreshInterval: 10000 }
  )

  useEffect(() => {
    if (searchQuery != null && searchQuery != "") {
      getTokens(searchQuery).then((tokens) => {
        // remove other pseudocoin that we made and abandoned
        if (tokens?.length) {
          const filteredTokens = tokens.filter(function (t) {
            return t.address !== "0x63c14c64aaae6ca2f721e62b14c3bbcee9efcf9d"
          })
          setTokens([...filteredTokens])
        }
      })
    }
  }, [searchQuery])

  useEffect(() => {
    if (transactionsData && !transactionsValidating) {
      setTransactions(transactionsData)
    }
  }, [transactionsData, address])

  useEffect(() => {
    if (address && address != "") {
      setTokenIsLoading(true)
      getTokenByAddress(address, chainContext.chain.id).then((res) => {
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
            chainContext.chain.usdTokenAddress,
            chainContext.chain.id
          )
        )
      })

      setInfoIsLoading(true)
      getTokenInfoByAddress(address, chainContext.chain.id).then((res) => {
        setInfoIsLoading(false)

        if (!res) return
        setCurrentPrice(convertExponentialToDecimal(res.current_price_usd))
        setVolume(res.trade_amount_usd)
        setSupply(res.minted_count)
        setUniqueWalletsCount(res.unique_wallets_count)
        setBurned(res.burned_count)
      })
    }
  }, [address])

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
    tokenIsLoading,
    infoIsLoading,
    transactions,
    uniqueWalletsCount,
    supply,
    burned,
    tokens: tokens,
    // isLoadingTokens,
    setSearchQuery,
  }
}
