import React, { useState, useEffect } from "react"
import TVChartHeader from "../../molecules/TVChartHeader/index"
import TVChart from "../../molecules/TVChart/index"
import { useToken } from "../../../contexts/tokenContext"

// note: can only support one chart instance at a time
export default function TVChartWithHeader(props) {
  const tokenContext = useToken()

  return (
    <>
      <TVChartHeader
        name={tokenContext.name}
        percentChange={tokenContext.percentChange}
        volume={tokenContext.volume}
        currentPrice={tokenContext.currentPrice}
        symbol={tokenContext.tvSymbol}
      />
      <br />
      <TVChart symbol={tokenContext.tvSymbol} />
    </>
  )
}
