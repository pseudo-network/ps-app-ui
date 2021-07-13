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
    //{{base_url}}/currencies/:address/history?to=1623110400&resolution=1D&from=1623110300&base_currency=0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3
    console.log("symbolInfo");
    console.log(symbolInfo);
    const safemoon = "0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3" //temporary
    const usdc = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c" //temporary
    const url = `${api_root}/currencies/${symbolInfo.description}/history?from=${from}&to=${to}&resolution=${resolution}&quote_currency=${usdc}`

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


  searchCustomAPI: function (userInput, exchange, symbolType) {
    //{{base_url}}/currencies/:address/history?to=1623110400&resolution=1D&from=1623110300&base_currency=0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3
    const url = `http://34.69.134.192:3444/currencies?search_query=${userInput}`

    return rp({
      url: `${url}`,
      // qs,`
    }).then(data => {
      var formattedResponse = []
      data.map((item)=>{
        var newFormattedItem = {
          "symbol": item.symbol,
          "full_name": item.name,
          "description": item.symbol,
          "exchange": item.exchange,
          "ticker": item.name + ":" + item.address,
          "type": "crypto",
        }
        formattedResponse.push(newFormattedItem);
      }) 
      return formattedResponse;
    })
  },
}
