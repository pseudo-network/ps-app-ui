import * as React from "react"
import { useRef, useEffect } from "react"
import { useAppTheme } from "../../../contexts/appThemeContext"
import useScript from "../../../hooks/useScript"

export default function TVChartNative(props) {
  const tv = useRef(null)
  const appThemeContext = useAppTheme()
  useScript("https://s3.tradingview.com/tv.js")

  const widgetOptions = {
    theme: appThemeContext.darkMode == 1 ? "Dark" : "Light",
    symbol: props.symbol || "BITFINEX:ADAUSD",
    height: "100%",
    width: "100%",
    container_id: props.chartName || "native-chart",
    interval: "5",
    timezone: "Etc/UTC",
    style: "1",
    locale: "en",
    toolbar_bg: "#f1f3f6",
    enable_publishing: false,
    allow_symbol_change: true,
    time_frames: [
      { text: "1d", resolution: "1", description: "1 day" },
      { text: "1w", resolution: "15", description: "1 week" },
      { text: "1m", resolution: "120", description: "1 month" },
    ],
    disabled_features: [
      "header_symbol_search",
      "popup_hints",
      "header_saveload",
      "display_market_status",
      "save_shortcut",
      "show_object_tree",
      "symbol_info",
      "main_series_scale_menu",
      "scales_context_menu",
      "border_around_the_chart",
      "header_undo_redo",
      "go_to_date",
      "header_compare",
    ],
    enabled_features: [
      "hide_left_toolbar_by_default",
      "pricescale_currency",
      "disable_resolution_rebuild",
    ],
    minmov: 0.25,
  }

  setTimeout(() => {
    new TradingView.widget(widgetOptions)
  }, 500)

  return (
    <div
      style={{
        height: "100%",
        width: widgetOptions.width,
      }}
      id={widgetOptions.container_id}
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
