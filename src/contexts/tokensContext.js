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
  const [searchQuery, setSearchQuery] = useState(null)

  const { data: tokensData, isLoadingTokens } = useSWR(
    `${CHARTDATA_BASE_URL}/cryptos?search_query=${
      searchQuery != undefined && searchQuery != null
        ? searchQuery
        : "0x503b9bd8d0259e569e1ffdc7ced2e3a26198c0ff" // pseudocoin address
    }`,
    fetcher
  )

  useEffect(() => {
    if (tokensData && !isLoadingTokens) {
      // remove other pseudocoin that we made and abandoned
      const filteredTokensData = tokensData.filter(function (t) {
        return t.address !== "0x63c14c64aaae6ca2f721e62b14c3bbcee9efcf9d"
      })
      setTokens([...filteredTokensData])
      console.log(tokens)
    }
  }, [tokensData])

  // useEffect(() => {
  //   console.log("here")
  //   if (tokensData && !isValidating) {
  //     // remove other pseudocoin that we made and abandoned
  //     const filteredTokensData = tokensData.filter(function (t) {
  //       return t.address !== "0x63c14c64aaae6ca2f721e62b14c3bbcee9efcf9d"
  //     })
  //     setTokens([...filteredTokensData])
  //   }
  // }, [searchQuery])

  // const findAddressByNFTId = (id) => {
  //   return Tokens.find((nft) => nft._id === parseInt(id))
  // }

  return {
    tokens: tokens,
    // findAddressByNFTId,
    isLoadingTokens,
    setSearchQuery,
  }
}
