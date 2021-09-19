import React, { useContext, createContext, useState, useEffect } from "react"
import useSWR from "swr"
import { fetcher } from "../utils/utils"
import {
  BITQUERY_API_KEY,
  BITQUERY_BASE_URL,
  CHARTDATA_BASE_URL,
  ETHEREUM_ADDRESS,
} from "../core/environments"
import axios from "axios"
import { useChain } from "./chainContext"

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
  const chainContext = useChain()
  const [balances, setBalances] = useState([])
  const [address, setAddress] = useState("")

  function getBalances(address) {
    return axios
      .get(
        `${CHARTDATA_BASE_URL}/chains/${chainContext.chain.id}/accounts/${address}/balances`
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

  useEffect(() => {
    if (address && address != "") {
      getBalances(address).then((balances) => {
        console.log(balances)
        setBalances(balances)
      })
    } else {
      setBalances(null)
    }
  }, [address])

  return {
    setAddress,
    balances,
    address,
  }
}
