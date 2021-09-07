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
    debug: true,
    interval: "5",
    time_frames: [
      { text: "1d", resolution: "60", description: "1 day" },
      { text: "1w", resolution: "120", description: "1 week" },
      { text: "1M", resolution: "120", description: "1 month" },
    ],
    timeframe: "1M",
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
    ],
    enabled_features: [
      "hide_left_toolbar_by_default",
      "pricescale_currency",
      "disable_resolution_rebuild",
    ],
    minmov: 0.25,
    // overrides: {
    //   "mainSeriesProperties.style": 1,
    //   "mainSeriesProperties.showPrevClosePriceLine": true,

    //   // Candles styles
    //   // "mainSeriesProperties.candleStyle.upColor": upColor,
    //   // "mainSeriesProperties.candleStyle.downColor": downColor,
    //   "mainSeriesProperties.candleStyle.drawWick": true,
    //   "mainSeriesProperties.candleStyle.drawBorder": true,
    //   "mainSeriesProperties.candleStyle.borderColor": "none",
    //   // "mainSeriesProperties.candleStyle.borderUpColor": upColor,
    //   // "mainSeriesProperties.candleStyle.borderDownColor": downColor,
    //   // "mainSeriesProperties.candleStyle.wickUpColor": upColor,
    //   // "mainSeriesProperties.candleStyle.wickDownColor": downColor,
    //   "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,

    //   // Hollow Candles styles
    //   // "mainSeriesProperties.hollowCandleStyle.upColor": upColor,
    //   // "mainSeriesProperties.hollowCandleStyle.downColor": downColor,
    //   "mainSeriesProperties.hollowCandleStyle.drawWick": true,
    //   "mainSeriesProperties.hollowCandleStyle.drawBorder": true,
    //   "mainSeriesProperties.hollowCandleStyle.borderColor": "none",
    //   // "mainSeriesProperties.hollowCandleStyle.borderUpColor": upColor,
    //   // "mainSeriesProperties.hollowCandleStyle.borderDownColor": downColor,
    //   // "mainSeriesProperties.hollowCandleStyle.wickUpColor": upColor,
    //   // "mainSeriesProperties.hollowCandleStyle.wickDownColor": downColor,

    //   // Heikin Ashi styles
    //   // "mainSeriesProperties.haStyle.upColor": upColor,
    //   // "mainSeriesProperties.haStyle.downColor": downColor,
    //   "mainSeriesProperties.haStyle.drawWick": true,
    //   "mainSeriesProperties.haStyle.drawBorder": true,
    //   "mainSeriesProperties.haStyle.borderColor": "none",
    //   // "mainSeriesProperties.haStyle.borderUpColor": upColor,
    //   // "mainSeriesProperties.haStyle.borderDownColor": downColor,
    //   // "mainSeriesProperties.haStyle.wickUpColor": upColor,
    //   // "mainSeriesProperties.haStyle.wickDownColor": downColor,
    //   "mainSeriesProperties.haStyle.barColorsOnPrevClose": false,

    //   // Bar styles
    //   // "mainSeriesProperties.barStyle.upColor": upColor,
    //   // "mainSeriesProperties.barStyle.downColor": downColor,
    //   "mainSeriesProperties.barStyle.barColorsOnPrevClose": false,
    //   "mainSeriesProperties.barStyle.dontDrawOpen": false,

    //   // Line styles
    //   // "mainSeriesProperties.lineStyle.color": lineColor,
    //   "mainSeriesProperties.lineStyle.linestyle": 0,
    //   "mainSeriesProperties.lineStyle.linewidth": 2,
    //   "mainSeriesProperties.lineStyle.priceSource": "close",

    //   // // Area styles
    //   // "mainSeriesProperties.areaStyle.color1": areaColor,
    //   // "mainSeriesProperties.areaStyle.color2": lineColor,
    //   // "mainSeriesProperties.areaStyle.linecolor": lineColor,
    //   "mainSeriesProperties.areaStyle.linestyle": 0,
    //   "mainSeriesProperties.areaStyle.linewidth": 2,
    //   "mainSeriesProperties.areaStyle.priceSource": "close",

    //   // Baseline styles
    //   "mainSeriesProperties.baselineStyle.baselineColor": "rgb(117,134,150)",
    //   // "mainSeriesProperties.baselineStyle.topFillColor1": upColor,
    //   // "mainSeriesProperties.baselineStyle.topFillColor2": descendingColor,
    //   // "mainSeriesProperties.baselineStyle.bottomFillColor1": ascendingColor,
    //   // "mainSeriesProperties.baselineStyle.bottomFillColor2": downColor,
    //   // "mainSeriesProperties.baselineStyle.topLineColor": upColor,
    //   // "mainSeriesProperties.baselineStyle.bottomLineColor": downColor,
    //   "mainSeriesProperties.baselineStyle.topLineWidth": 2,
    //   "mainSeriesProperties.baselineStyle.bottomLineWidth": 2,
    //   "mainSeriesProperties.baselineStyle.priceSource": "close",
    //   "mainSeriesProperties.baselineStyle.transparency": 50,
    //   "mainSeriesProperties.baselineStyle.baseLevelPercentage": 50,
    // },
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
