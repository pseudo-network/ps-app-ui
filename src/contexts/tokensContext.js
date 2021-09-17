import React, { useContext, createContext, useState, useEffect } from "react"
import useSWR from "swr"
import { fetcher } from "../utils/utils"
import { CHARTDATA_BASE_URL } from "../core/environments"

const tokensContext = createContext()

export function useTokens() {
  return useContext(tokensContext)
}

export function ProvideTokens({ children }) {
  const tokens = useProvideTokens()
  return (
    <tokensContext.Provider value={tokens}>{children}</tokensContext.Provider>
  )
}

function useProvideTokens() {
  const [tokens, setTokens] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  const { data: tokensData, isValidating } = useSWR(
    `${CHARTDATA_BASE_URL}/cryptos?search_query=${searchQuery}`,
    fetcher
  )

  useEffect(() => {
    if (tokensData && !isValidating) {
      setTokens((arr) => [...arr, ...tokensData])
    }
  }, [tokensData])

  useEffect(() => {
    if (tokensData && !isValidating) {
      setTokens((arr) => [...arr, ...tokensData])
    }
  }, [searchQuery])

  // const findAddressByNFTId = (id) => {
  //   return Tokens.find((nft) => nft._id === parseInt(id))
  // }

  return {
    tokens: tokens,
    // findAddressByNFTId,
    isValidating,
    setSearchQuery,
  }
}
