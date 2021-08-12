import * as React from "react"
import { widget } from "../../../charting_library/charting_library"
import Datafeed from "./api"
import { useRef, useEffect } from "react"
import { useAppTheme } from "../../../contexts/appThemeContext"

export default function TVChart(props) {
  const tv = useRef(null)
  const appThemeContext = useAppTheme()
  const widgetOptions = {
    theme: appThemeContext.darkMode ? "Dark" : "Light",
    symbol: props.symbol || "UNKNOWN",
    height: props.height || "calc(100vh - 444px)",
    container_id: props.chartName || "Coin-Chart",
    library_path: "/charting_library/",
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    datafeed: Datafeed,
    autosize: true,
    studies_overrides: {},
    overrides: {
      "mainSeriesProperties.showCountdown": true,
      "paneProperties.background": "#131722",
      "paneProperties.vertGridProperties.color": "#363c4e",
      "paneProperties.horzGridProperties.color": "#363c4e",
      "symbolWatermarkProperties.transparency": 90,
      "scalesProperties.textColor": "#AAA",
      "mainSeriesProperties.candleStyle.wickUpColor": "#336854",
      "mainSeriesProperties.candleStyle.wickDownColor": "#7f323f",
    },
    debug: false,
    interval: "60",
    time_frames: [
      { text: "1d", resolution: "1d", description: "1 day" },
      { text: "1w", resolution: "1w", description: "1 week" },
      { text: "1M", resolution: "1M", description: "1 month" },
    ],
    // new
    time_frame: "1h",
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
    ],
    enabled_features: [
      "hide_left_toolbar_by_default",
      "pricescale_unit",
      "pricescale_currency",
      "chart_property_page_right_margin_editor",
      "low_density_bars",
      "no_min_chart_width",
    ],
  }

  useEffect(() => {
    if (tv.current) tv.current.remove()
    tv.current = new widget(widgetOptions)
  }, [props.symbol, appThemeContext.darkMode])

  return (
    <div
      style={{
        height: widgetOptions.height,
      }}
      id={props.chartName || "Coin-Chart"}
    />
  )
}
