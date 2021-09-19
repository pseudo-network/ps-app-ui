import React, { useContext, createContext, useState, useEffect } from "react"
import { binance, cardano, supportedChains } from "../utils/supportedChains"

const chainContext = createContext()

export function useChain() {
  return useContext(chainContext)
}

export function ProvideChain({ children }) {
  const chain = useProvideChain()
  return <chainContext.Provider value={chain}>{children}</chainContext.Provider>
}

function getChainFromURL() {
  const currentURL = new URL(window.location.href)
  const route = currentURL.pathname.split("/")[1]
  let selectedChain = null

  supportedChains.forEach((chain) => {
    if (chain.route == route) {
      selectedChain = chain
    }
  })

  // default to bsc
  return selectedChain ?? binance
}

function useProvideChain() {
  const [chain, setChain] = useState(getChainFromURL()) // binance is default chain

  useEffect(() => {
    setChain(getChainFromURL())
  }, [chain])

  return {
    chain,
    setChain,
  }
}
