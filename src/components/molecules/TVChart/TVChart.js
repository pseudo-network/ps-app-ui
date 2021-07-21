import * as React from "react"
import { widget } from "../../../charting_library/charting_library"
import Datafeed from "./api"
import { useRef, useEffect } from "react"
import { useCrypto } from "../../../contexts/cryptoContext"

export default function TVChart(props) {
  const cryptoContext = useCrypto()
  const tv = useRef(null)

  const widgetOptions = {
    theme: props.theme || "Dark",
    symbol: cryptoContext.tvSymbol || "UNKNOWN",
    interval: "15",
    height: props.height || "calc(100vh - 333px)",
    container_id: props.chartName || "Coin-Chart",
    library_path: "/charting_library/",
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    datafeed: Datafeed,
    autosize: true,
  }

  useEffect(() => {
    if (tv.current) tv.current.remove()

    tv.current = new widget(widgetOptions)
  }, [cryptoContext.tvSymbol])

  return (
    <div
      style={{
        height: widgetOptions.height,
      }}
      id={props.chartName || "Coin-Chart"}
    />
  )
}
