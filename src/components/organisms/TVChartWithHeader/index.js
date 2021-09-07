import React, { useState, useEffect } from "react"
import TVChartHeader from "../../molecules/TVChartHeader/index"
import TVChart from "../../molecules/TVChart/index"
import { useCrypto } from "../../../contexts/cryptoContext"

// note: can only support one chart instance at a time
export default function TVChartWithHeader(props) {
  const cryptoContext = useCrypto()

  return (
    <>
      <TVChartHeader
        name={cryptoContext.name}
        percentChange={cryptoContext.percentChange}
        volume={cryptoContext.volume}
        currentPrice={cryptoContext.currentPrice}
        symbol={cryptoContext.tvSymbol}
      />
      <br />
      <TVChart symbol={cryptoContext.tvSymbol} />
    </>
  )
}
