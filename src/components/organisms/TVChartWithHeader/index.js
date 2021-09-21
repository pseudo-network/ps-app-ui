import React, { useState, useEffect } from "react"
import TVChartHeader from "../../molecules/TVChartHeader/index"
import TVChart from "../../molecules/TVChart/index"
import { useToken } from "../../../contexts/tokenContext"

// note: can only support one chart instance at a time
export default function TVChartWithHeader(props) {
  return (
    <>
      <TVChartHeader
        name={props.name}
        percentChange={props.percentChange}
        volume={props.volume}
        currentPrice={props.currentPrice}
        symbol={props.tvSymbol}
      />
      <br />
      <TVChart symbol={props.tvSymbol} theme={props.theme} />
    </>
  )
}
