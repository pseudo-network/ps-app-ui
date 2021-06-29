const api_root = "http://api.pseudonetwork.net:3444"
// const api_root = "http://localhost:3444"
const transaction = {}

export default {
  transaction: transaction,

  getTransaction: async function () {
    let response = await fetch(`${api_root}/transaction`)
    let data = await response.json()

    if (data && data.length > 0) {
      let price = data.map(d => d.tradeAmount)
      let time = data.map(d => d.timeInterval.second)
      let hash = data.map(d => d.transaction.hash)
      let buyCurrency = data.map(d => d.buyCurrency)
      let buyAmount = data.map(d => d.buyAmount)
      let sellCurrency = data.map(d => d.sellCurrency)
      let sellAmount = data.map(d => d.sellAmount)
      return {
        price,
        time,
        hash,
        buyCurrency,
        buyAmount,
        sellCurrency,
        sellAmount,
      }
    }
  },
}
