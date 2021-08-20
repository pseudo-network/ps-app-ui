import stream from "./stream"
import * as Bitquery from "./bitquery"
import axios from "axios"
import {
  CHARTDATA_BASE_URL,
  BUSD_ADDRESS,
  WBNB_ADDRESS,
} from "../../../../core/environments"

const rp = require("request-promise").defaults({ json: true })
const supportedResolutions = ["1", "5", "15", "30", "60", "1D", "1W", "1M"]
const math = require("mathjs")

const config = {
  supported_resolutions: supportedResolutions,
  supports_search: false,
}

const history = {}
const OUTLIER_THRESHOLD = 2

function getSymbols(userInput) {
  const url = `${CHARTDATA_BASE_URL}?search_query=${userInput.toLowerCase()}`
  return rp({
    url: `${url}`,
  })
    .then((data) => {
      return data
    })
    .catch((e) => {
      console.log(e)
      return []
    })
}

function calcZ(x, mean, std) {
  return (x - mean) / std
}

function findOutliersInArray(arr) {
  const mean = math.mean(arr)
  const std = math.std(arr)
  const outlierIndexes = []
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i]
    const z = math.abs(calcZ(a, mean, std))
    if (z > OUTLIER_THRESHOLD) {
      outlierIndexes.push(i)
    }
  }

  return outlierIndexes
}

const historyProvider = {
  history: history,

  getBars: async (symbolInfo, resolution, from, to, first, limit) => {
    const splitData = symbolInfo.ticker.split(":")
    console.log(symbolInfo)

    const url = `${CHARTDATA_BASE_URL}/cryptos/${symbolInfo.exchange}/bars?from=${from}&to=${to}&resolution=${resolution}&quote_currency=${splitData[3]}`

    try {
      if (resolution === "1D") {
        resolution = 1440
      }
      const response2 = await axios.post(Bitquery.endpoint, {
        query: Bitquery.GET_COIN_BARS,
        variables: {
          from: new Date("2021-06-20T07:23:21.000Z").toISOString(),
          to: new Date("2021-06-23T15:23:21.000Z").toISOString(),
          interval: Number(resolution),
          tokenAddress: symbolInfo.exchange,
        },
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "BQYug1u2azt1EzuPggXfnhdhzFObRW0g",
        },
      })

      console.log(response2.data.data.ethereum.dexTrades[0].high)

      const bars = response2.data.data.ethereum.dexTrades.map((el) => ({
        time: new Date(el.timeInterval.minute).getTime(), // date string in api response
        low: el.low,
        high: el.high,
        open: Number(el.open),
        close: Number(el.close),
        volume: el.volume,
      }))

      if (bars.length) {
        onHistoryCallback(bars, { noData: false })
      } else {
        onHistoryCallback(bars, { noData: true })
      }
    } catch (err) {
      console.log({ err })
      // onErrorCallback(err)
    }

    // return rp({
    //   url: `${url}`,
    // })
    //   .then((data) => {
    //     if (data.Response && data.Response === "Error") {
    //       console.log("CryptoCompare API error:", data.Message)
    //       return []
    //     }
    //     if (data && data.length > 0) {
    //       const lows = data.map((d) => d.low)
    //       const highs = data.map((d) => d.high)
    //       const opens = data.map((d) => d.open)
    //       const closes = data.map((d) => d.close)
    //       const outlierIndexes = findOutliersInArray(lows).concat(
    //         findOutliersInArray(highs),
    //         findOutliersInArray(opens),
    //         findOutliersInArray(closes)
    //       )
    //       data = data.filter(function (value, index) {
    //         return outlierIndexes.indexOf(index) == -1
    //       })
    //       if (first) {
    //         const lastBar = data[data.length - 1]
    //         history[symbolInfo.name] = { lastBar: lastBar }
    //       }
    //       return data
    //     } else {
    //       return []
    //     }
    //   })
    //   .catch((e) => {
    //     console.log("there was an error fetching bars:", e)
    //     return []
    //   })
  },
}

export default {
  onReady: (cb) => {
    console.log("=====onReady running")
    setTimeout(() => cb(config), 0)
  },

  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    console.log("====Search Symbols running")
    getSymbols(userInput).then((res) => {
      if (res && res.length > 0) {
        const searchresults = res.map((item) => {
          return {
            symbol: item.name,
            full_name: item.name,
            description: item.symbol,
            exchange: item.exchange,
            ticker: item.name + ":" + item.symbol + ":" + item.address, // a concatenated string of needed fields
            type: item.address,
          }
        })
        onResultReadyCallback(searchresults)
      } else {
        onResultReadyCallback([])
      }
    })
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
      // potentially new
      ticker: symbolTicker,
      session: "24x7",
      timezone: "Etc/UTC",
      minmov: 1,
      pricescale: 1000000000,
      has_intraday: true,
      intraday_multipliers: ["1", "5", "15", "30", "60"],
      // has_empty_bars: true,
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
    call,
    onHistoryCallback,
    onErrorCallback
  ) => {
    var bars = []
    try {
      if (resolution === "1D") {
        resolution = 1440
      }
      const response2 = await axios.post(Bitquery.endpoint, {
        query: Bitquery.GET_COIN_BARS,
        variables: {
          from: new Date(call.from).toISOString(),
          to: new Date(call.to).toISOString(),
          interval: Number(resolution),
          address: "0x503b9bd8d0259e569e1ffdc7ced2e3a26198c0ff",
        },
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "BQYug1u2azt1EzuPggXfnhdhzFObRW0g",
        },
      })

      bars = response2.data.data.ethereum.dexTrades.map((el) => ({
        time: new Date(el.timeInterval.minute).getTime(),
        low: el.low,
        high: el.high,
        open: Number(el.open),
        close: Number(el.close),
        volume: el.volume,
      }))

      if (bars.length) {
        onHistoryCallback(bars, { noData: false })
      } else {
        onHistoryCallback(bars, { noData: true })
      }
    } catch (err) {
      console.log({ err })
      // onErrorCallback(err)
      onHistoryCallback(bars, { noData: true })
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
