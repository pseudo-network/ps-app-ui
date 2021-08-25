import React, { useContext, createContext, useState, useEffect } from "react"
import useSWR from "swr"
import { fetcher } from "../utils/utils"
import { CHARTDATA_BASE_URL } from "../core/environments"

const cryptosContext = createContext()

export function useCryptos() {
  return useContext(cryptosContext)
}

export function ProvideCryptos({ children }) {
  const cryptos = useProvideCryptos()
  return (
    <cryptosContext.Provider value={cryptos}>
      {children}
    </cryptosContext.Provider>
  )
}

function useProvideCryptos() {
  const [cryptos, setCryptos] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  const { data: cryptosData, isValidating } = useSWR(
    `${CHARTDATA_BASE_URL}/cryptos?search_query=${searchQuery}`,
    fetcher
  )

  useEffect(() => {
    if (cryptosData && !isValidating) {
      setCryptos((arr) => [...arr, ...cryptosData])
    }
  }, [cryptosData])

  useEffect(() => {
    if (cryptosData && !isValidating) {
      setCryptos((arr) => [...arr, ...cryptosData])
    }
  }, [searchQuery])

  // const findAddressByNFTId = (id) => {
  //   return Cryptos.find((nft) => nft._id === parseInt(id))
  // }

  return {
    cryptos: cryptos,
    // findAddressByNFTId,
    isValidating,
    setSearchQuery,
  }
}
