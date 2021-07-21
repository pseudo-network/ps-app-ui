import React, { useContext, createContext, useState, useEffect } from "react"
import useSWR from "swr"
import { fetcher } from "../utils/utils"
import {
  BITQUERY_API_KEY,
  BITQUERY_BASE_URL,
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
  const [balance, setBalance] = useState(null)
  const [address, setAddress] = useState("")

  // todo: cleanup
  const getBalance = (accountAddress) => {
    const currencyAddress = ETHEREUM_ADDRESS
    const qs = `{
      ethereum {
        address(address: {is: "${accountAddress}"}) {
          balances(currency: {in: ["ETH", "${currencyAddress}"]}) {
            currency {
              symbol
            }
            value
          }
        }
      }
    }`

    fetch(BITQUERY_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": BITQUERY_API_KEY,
      },
      body: JSON.stringify({ query: qs }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          const balance = String(
            res?.data?.ethereum?.address[0]?.balances[0]?.value
          )
          setBalance(balance.substring(0, 6))
        }
      })
      .catch((e) => {
        // todo: handle err
        setBalance(null)
      })
  }

  useEffect(() => {
    if (address && address != "") {
      getBalance(address)
    } else {
      setBalance(null)
    }
  }, [address])

  return {
    setAddress,
    balance,
    address,
  }
}
