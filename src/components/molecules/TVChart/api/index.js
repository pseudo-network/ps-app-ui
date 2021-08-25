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
      has_empty_bars: true,
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
    const { from, to, countBack, firstDataRequest } = periodParams

    var url

    console.log("FROM, TO", from, to)

    if (firstDataRequest) {
      console.log("FIRST REQUEST")
      url = `${CHARTDATA_BASE_URL}/cryptos/${baseCurrency}/bars?since=${null}&till=${null}&interval=${resolution}&quote_currency=${quoteCurrency}&limit=${5000}`
    } else {
      url = `${CHARTDATA_BASE_URL}/cryptos/${baseCurrency}/bars?since=${from}&till=${to}&interval=${resolution}&quote_currency=${quoteCurrency}&limit=${10000}`
    }

    console.log("countback", countBack)

    var bars = []
    try {
      // if (resolution === "1D") {
      //   resolution = 1440
      // }

      // const response2 = await axios.post(Bitquery.endpoint, {
      //   query: Bitquery.GET_COIN_BARS,
      //   variables: {
      //     from: new Date(call.from).toISOString(),
      //     to: new Date(call.to).toISOString(),
      //     interval: Number(resolution),
      //     address: baseCurrency,
      //   },
      //   mode: "cors",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "X-API-KEY": "BQYug1u2azt1EzuPggXfnhdhzFObRW0g",
      //   },
      // })

      // console.log(since)
      // console.log(till)
      // console.log(response2)

      // bars = response2.data.data.ethereum.dexTrades.map((el) => ({
      //   time: new Date(el.timeInterval.minute).getTime(),
      //   low: el.low,
      //   high: el.high,
      //   open: Number(el.open),
      //   close: Number(el.close),
      //   volume: el.volume,
      // }))

      // if (bars) {
      //   onHistoryCallback(bars, { noData: false })
      // } else {
      //   onHistoryCallback(bars, { noData: true })
      // }

      const response = await axios.get(url)

      console.log(response)

      if (response.data.length) {
        console.log("RECEIVED BARS", response.data.length)

        bars = response.data.reverse()
        onHistoryCallback(bars, { noData: false })
      } else {
        // throwError
        // console.log("=.==.=.==.=.=.== no bars =.==.=.==.=.=.==.")
        // bars = { s: "error", errmsg: "no bars" }
        onHistoryCallback([], { noData: true })
        // onErrorCallback("")
      }
    } catch (err) {
      // alert("err")
      // console.log({ err })
      // onErrorCallback(err)
      onHistoryCallback([], { noData: true })
    }
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
