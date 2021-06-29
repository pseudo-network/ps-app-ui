var rp = require("request-promise").defaults({ json: true })
const math = require("mathjs")

// todo: should come from .env
const api_root = "http://api.pseudonetwork.net:3444"
// const api_root = "http://localhost:3444"
const history = {}
const outlier_threshold = 3

function calcZ(x, mean, std) {
  return (x - mean) / std
}

function findOutliersInArray(arr) {
  const mean = math.mean(arr)
  const std = math.std(arr)

  var outlierIndexes = []
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i]
    const z = math.abs(calcZ(a, mean, std))
    if (z > outlier_threshold) {
      outlierIndexes.push(i)
    }
  }

  return outlierIndexes
}

export default {
  history: history,

  getBars: function (symbolInfo, resolution, from, to, first, limit) {
    const url = `${api_root}/history?from=${from}&to=${to}&resolution=${resolution}`

    return rp({
      url: `${url}`,
      // qs,`
    }).then(data => {
      console.log("transactions returned: ", data.length)

      if (data.Response && data.Response === "Error") {
        console.log("CryptoCompare API error:", data.Message)
        return []
      }

      // todo: revise to check for errors
      if (data && data.length > 0) {
        let lows = data.map(d => d.low)
        let highs = data.map(d => d.high)
        let opens = data.map(d => d.open)
        let closes = data.map(d => d.close)

        let outlierIndexes = findOutliersInArray(lows).concat(
          findOutliersInArray(highs),
          findOutliersInArray(opens),
          findOutliersInArray(closes)
        )

        data = data.filter(function (value, index) {
          return outlierIndexes.indexOf(index) == -1
        })

        let bars = data.map(res => {
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
