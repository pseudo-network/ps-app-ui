var rp = require("request-promise").defaults({ json: true })

// todo: should come from .env
const api_root = "http://localhost:3444"
const history = {}

export default {
  history: history,

  getBars: function (symbolInfo, resolution, from, to, first, limit) {
    console.log("=-=-=-=-=-")
    console.log(symbolInfo)
    const url = `${api_root}/history?from=${from}&to=${to}&resolution=${resolution}`

    return rp({
      url: `${url}`,
      // qs,`
    }).then(data => {
      console.log({ data })
      if (data.Response && data.Response === "Error") {
        console.log("CryptoCompare API error:", data.Message)
        return []
      }

      // todo: revise to check for errors
      if (data.length > 0) {
        var bars = []
        bars = data.map(res => {
          // todo: remove outliers

          return {
            time: res.unixTimeMS,
            low: res.low,
            high: res.high,
            open: res.open,
            close: res.close,
            volume: res.tradeAmount,
          }
        })

        if (first) {
          var lastBar = bars[bars.length - 1]
          history[symbolInfo.name] = { lastBar: lastBar }
        }

        return bars
      } else {
        return []
      }
    })
  },
}
