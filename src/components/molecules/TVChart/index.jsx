import * as React from "react"
import { widget } from "../../../charting_library/charting_library"
import Datafeed from "./api"
export class TVChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: props.theme || "Dark",
      symbol: props.symbol || "SAFEMOON/WBSC",
      interval: "15",
      height: props.height || "calc(100vh - 80px)",
      containerId: props.chartName || "Coin-Chart",
      libraryPath: "/charting_library/",
      chartsStorageUrl: "https://saveload.tradingview.com",
      chartsStorageApiVersion: "1.1",
      clientId: "tradingview.com",
      userId: "public_user_id",
    }
  }

  tvWidget = null

  componentDidMount() {
    const widgetOptions = {
      theme: this.state.theme,
      symbol: this.state.symbol,
      datafeed: Datafeed,
      interval: this.state.interval,
      container_id: this.state.containerId,
      library_path: this.state.libraryPath,
      locale: "en",
      charts_storage_url: this.state.chartsStorageUrl,
      charts_storage_api_version: this.state.chartsStorageApiVersion,
      client_id: this.state.clientId,
      user_id: this.state.userId,
      autosize: true,
      disabled_features: ["use_localstorage_for_settings"],
    }

    const tvWidget = new widget(widgetOptions)
    this.tvWidget = tvWidget
  }

  render() {
    return (
      <div
        id={this.state.containerId}
        style={{
          height: this.state.height,
        }}
      />
    )
  }
}
