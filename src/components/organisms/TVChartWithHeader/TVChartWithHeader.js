import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import CryptoDetailRow from "../../molecules/TVChartHeader/TVChartHeader"
import { TVChart } from "../../molecules/TVChart"
import { useCrypto } from "../../../contexts/cryptoContext"

export default function TVChartWithHeader(props) {
  const cryptoContext = useCrypto()

  return (
    <>
      <CryptoDetailRow
        name={cryptoContext.name}
        percentChange={cryptoContext.percentChange}
        volume={cryptoContext.volume}
        currentPrice={cryptoContext.currentPrice}
      />
      <TVChart usd={true} symbol={cryptoContext.tvSymbol} />
    </>
  )
}
