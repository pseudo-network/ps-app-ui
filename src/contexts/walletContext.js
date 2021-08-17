import React, { useContext, createContext, useState, useEffect } from "react"
import useSWR from "swr"
import { fetcher } from "../utils/utils"
import {
  BITQUERY_API_KEY,
  BITQUERY_BASE_URL,
  CHARTDATA_BASE_URL,
  ETHEREUM_ADDRESS,
} from "../core/environments"

const walletContext = createContext()

export function useWallet() {
  return useContext(walletContext)
}

export function ProvideWallet({ children }) {
  const wallet = useProvideWallet()
  return (
    <walletContext.Provider value={wallet}>{children}</walletContext.Provider>
  )
}

function useProvideWallet() {
  const [balances, setBalances] = useState([])
  const [address, setAddress] = useState("")

  const { data: balancesData, isValidating } = useSWR(
    `${CHARTDATA_BASE_URL}/wallets/${address}/balances`,
    fetcher,
    1000
  )

  useEffect(() => {
    if (balancesData && balancesData.length > 0 && !isValidating) {
      console.log(balancesData)
      setBalances(balancesData)
    }
  }, [balancesData])

  return {
    setAddress,
    balances,
    address,
  }
}
