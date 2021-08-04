import stream from "./stream"
const rp = require("request-promise").defaults({ json: true })
const supportedResolutions = ['1','5','15','30', '60','1D', '1W', '1M']
const math = require("mathjs")
import {
  API_BASE_URL,
  BUSD_ADDRESS,
  WBNB_ADDRESS,
} from "../../../../core/environments"

const config = {
  supported_resolutions: supportedResolutions,
  supports_search: false,
}

const history = {}
const OUTLIER_THRESHOLD = 3

function getSymbols(userInput) {
  const url = `${API_BASE_URL}?search_query=${userInput.toLowerCase()}`
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

  getBars: function (symbolInfo, resolution, from, to, first, limit) {
    const splitData = symbolInfo.ticker.split(":")
    console.log(symbolInfo)

    const url = `${API_BASE_URL}/cryptos/${symbolInfo.exchange}/bars?from=${from}&to=${to}&resolution=${resolution}&quote_currency=${splitData[3]}`

    return rp({
      url: `${url}`,
    })
      .then((data) => {
        if (data.Response && data.Response === "Error") {
          console.log("CryptoCompare API error:", data.Message)
          return []
        }
        if (data && data.length > 0) {
          const lows = data.map((d) => d.low)
          const highs = data.map((d) => d.high)
          const opens = data.map((d) => d.open)
          const closes = data.map((d) => d.close)
          const outlierIndexes = findOutliersInArray(lows).concat(
            findOutliersInArray(highs),
            findOutliersInArray(opens),
            findOutliersInArray(closes)
          )
          data = data.filter(function (value, index) {
            return outlierIndexes.indexOf(index) == -1
          })
          if (first) {
            const lastBar = data[data.length - 1]
            history[symbolInfo.name] = { lastBar: lastBar }
          }
          return data
        } else {
          return []
        }
      })
      .catch((e) => {
        console.log("there was an error fetching bars:", e)
        return []
      })
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
      session: "24x7",
      timezone: "Etc/UTC",
      ticker: symbolTicker,
      exchange: splitData[2],
      pricescale: 1000000000000,
      has_intraday: true,
      intraday_multipliers: ['120'],
      supported_resolution: supportedResolutions,
      // new
      volume_precision: 1,
      data_status: "streaming",
      has_empty_bars: true,
      has_weekly_and_monthly: false,
      //newer
      disable_resolution_rebuild:false,
      has_daily: false
    }
    setTimeout(function () {
      onSymbolResolvedCallback(symbolStub)
    }, 0)
  },
  getBars: function (
    symbolInfo,
    resolution,
    call,
    onHistoryCallback,
    onErrorCallback
  ) {
    console.log(`get bars from ${call.from} to ${call.to}`)
    historyProvider
      .getBars(
        symbolInfo,
        resolution,
        call.from,
        call.to,
        call.firstDataRequest
      )
      .then((bars) => {
        if (bars.length > 0) {
          onHistoryCallback(bars, { noData: false })
        } else {
          onHistoryCallback(bars, { noData: true })
        }
      })
      .catch((err) => {
        console.log({ err })
      })
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
