import * as React from "react"
import { widget } from "../../../charting_library/charting_library"
import { useRef, useEffect } from "react"
import { useAppTheme } from "../../../contexts/appThemeContext"

export default function TVChartNative(props) {
  const tv = useRef(null)
  const appThemeContext = useAppTheme()

  const containerID = "chart"
  const theme = appThemeContext.darkMode == 1 ? "Dark" : "Light"

  const widgetOptions = {
    symbol: "AAPL",
    container_id: containerID,
    datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
      "https://demo_feed.tradingview.com"
    ),
    library_path: "/charting_library/",
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    fullscreen: false,
    autosize: true,
  }

  setTimeout(() => {
    if (tv.current) tv.current.remove()
    tv.current = new widget(widgetOptions)
  }, 1000)

  // useEffect(() => {
  //   if (tv.current) tv.current.remove()
  //   tv.current = new widget(widgetOptions)
  // }, [props.symbol])

  // tv.current?.onChartReady(() => {
  //   tv.current?.changeTheme(theme)
  // })

  return (
    <div
      style={{
        height: 500,
        borderRadius: "0.5rem",
      }}
      id={containerID}
    />
  )
}

// OR EMBED WIDGET
{
  /* 
<!-- TradingView Widget BEGIN -->
  <div class="tradingview-widget-container">
  <div id="tradingview_40e0e"></div>
  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/ADAUSD/?exchange=BITFINEX" rel="noopener" target="_blank"><span class="blue-text">ADAUSD Chart</span></a> by TradingView</div>
  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
  <script type="text/javascript">
  new TradingView.widget(
  {
  "width": 980,
  "height": 610,
  "symbol": "BITFINEX:ADAUSD",
  "interval": "D",
  "timezone": "Etc/UTC",
  "theme": "dark",
  "style": "1",
  "locale": "en",
  "toolbar_bg": "#f1f3f6",
  "enable_publishing": false,
  "allow_symbol_change": true,
  "container_id": "tradingview_40e0e"
}
  );
  </script>
</div>
<!-- TradingView Widget END --> */
}
