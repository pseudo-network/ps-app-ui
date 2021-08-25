import * as Bitquery from "../../../../clients/bitquery"
import axios from "axios"
import { CHARTDATA_BASE_URL } from "../../../../core/environments"

const rp = require("request-promise").defaults({ json: true })
const supportedResolutions = ["1", "5", "15", "30", "60", "1D", "1W", "1M"]
const UNIX_TIME_ERROR_YEAR = "1970"

const config = {
  supported_resolutions: supportedResolutions,
  supports_search: false,
}

export default {
  onReady: (cb) => {
    // console.log("=====onReady running")
    setTimeout(() => cb(config), 0)
  },

  resolveSymbol: (
    symbolTicker,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    // expects a symbolInfo object in response
    const splitData = symbolTicker.split(":")
    const symbolStub = {
      name: splitData[0],
      description: splitData[1],
      type: "crypto",
      supported_resolution: supportedResolutions,
      currency_code: "USD",
      original_currency_code: "USD",
      currency_codes: ["USD", "BNB"],
      ticker: symbolTicker,
      session: "24x7",
      timezone: "Etc/UTC",
      minmov: 1,
      pricescale: 1000000000,
      has_intraday: true,
      intraday_multipliers: ["1", "5", "15", "30", "60", "1440"],
      has_weekly_and_monthly: false,
      volume_precision: 1,
      data_status: "streaming",
      // has_empty_bars: true,
    }
    setTimeout(function () {
      onSymbolResolvedCallback(symbolStub)
    }, 0)
  },

  getBars: async (
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback,
    onErrorCallback
  ) => {
    const splitData = symbolInfo.ticker.split(":")
    const baseCurrency = splitData[2]
    const quoteCurrency = splitData[3]
    var { from, to, countBack, firstDataRequest } = periodParams
    var limit = 10000

    if (resolution === "1D") {
      resolution = 1440
    }

    console.log("FIRST REQUEST", firstDataRequest)

    if (firstDataRequest) {
      limit = 5000
      from = null
      to = null
    } else {
      limit = 10000
    }

    var url = `${CHARTDATA_BASE_URL}/cryptos/${baseCurrency}/bars?since=${from}&till=${to}&interval=${resolution}&quote_currency=${quoteCurrency}&limit=${limit}`

    let bars = []

    try {
      const response = await axios.get(url)
      if (response.data.length > 0) {
        bars = response.data.reverse() // this is necessary because bitquery returns bars descending
      } else {
        bars = []
      }
    } catch (err) {
      bars = []
    }

    // IMPORTANT: this prevents the chart from overloading our backend in the instance
    // of a request loop
    setTimeout(() => {
      if (bars.length > 0) {
        onHistoryCallback(bars, { noData: false, nextTime: bars[0].time })
      } else {
        onHistoryCallback(bars, { noData: true })
      }
    }, 5000) // we should lower this interval at some point
  },

  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    // stream.subscribeBars(
    //   symbolInfo,
    //   resolution,
    //   onRealtimeCallback,
    //   subscribeUID,
    //   onResetCacheNeededCallback
    // )
  },

  unsubscribeBars: (subscriberUID) => {
    // stream.unsubscribeBars(subscriberUID)
  },
}
