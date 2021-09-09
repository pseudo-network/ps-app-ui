import * as React from "react"
import { widget } from "../../../charting_library/charting_library"
import Datafeed from "./api"
import { useRef, useEffect } from "react"
import { useAppTheme } from "../../../contexts/appThemeContext"
import { dark } from "@material-ui/core/styles/createPalette"

const darkThemePath = "/../src/components/molecules/TVChart/themes/dark.css"
const lightThemePath = "/../src/components/molecules/TVChart/themes/light.css"

export default function TVChart(props) {
  const tv = useRef(null)
  const appThemeContext = useAppTheme()

  // todo: clean up
  const chartTheme = {
    customCssPath:
      appThemeContext.darkMode == 1 ? darkThemePath : lightThemePath,
    backgroundColor: appThemeContext.darkMode == 1 ? "#0D111B" : "#fff",
    textColor: appThemeContext.darkMode == 1 ? "#c5cbce" : "#0D111B",
    dividerColor:
      appThemeContext.darkMode == 1
        ? "rgba(197, 203, 206, .12)"
        : "rgba(0, 0, 0, 0.12)",
    lineColor:
      appThemeContext.darkMode == 1
        ? "rgba(197, 203, 206, .05)"
        : "rgba(0, 0, 0, 0.05)",
  }

  const widgetOptions = {
    // theme: appThemeContext.darkMode ? "Dark" : "Light",
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
    debug: false,
    interval: "5",
    time_frames: [
      { text: "1d", resolution: "1", description: "1 day" },
      { text: "1w", resolution: "15", description: "1 week" },
      { text: "1m", resolution: "120", description: "1 month" },
    ],
    timeframe: "1M",
    custom_css_url: dark.css,
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
    overrides: {
      // "mainSeriesProperties.candleStyle.upColor": "#30d158",
      // "mainSeriesProperties.candleStyle.downColor": "#ff375f",
      // "mainSeriesProperties.candleStyle.wickUpColor": "#30d158",
      // "mainSeriesProperties.candleStyle.wickDownColor": "#ff375f",
      "mainSeriesProperties.candleStyle.drawBorder": false,
      "mainSeriesProperties.showCountdown": true,
      "paneProperties.background": chartTheme.backgroundColor,
      "paneProperties.secondaryBackground": chartTheme.backgroundColor,
      "paneProperties.vertGridProperties.color": chartTheme.lineColor,
      "paneProperties.horzGridProperties.color": chartTheme.lineColor,
      "scalesProperties.backgroundColor": chartTheme.backgroundColor,
      "scalesProperties.textColor": chartTheme.textColor,
      "scalesProperties.lineColor": chartTheme.dividerColor,
      "symbolWatermarkProperties.color": "#fff",
    },
    studies_overrides: {
      // "volume.volume.color.0": "#ff375f",
      // "volume.volume.color.1": "#30d158",
    },
    loading_screen: {
      backgroundColor: chartTheme.backgroundColor,
    },
    toolbar_bg: chartTheme.backgroundColor,
    toolbar_color: chartTheme.textColor,
  }

  useEffect(() => {
    if (tv.current) tv.current.remove()
    tv.current = new widget(widgetOptions)
  }, [props.symbol, appThemeContext.darkMode])

  return (
    <div
      style={{
        background: chartTheme.backgroundColor,
        height: widgetOptions.height,
        borderRadius: "0.5rem",
      }}
      id={props.chartName || "Coin-Chart"}
    />
  )
}
