const api_root = "https://api.pseudocoin.app/v1"
const transaction = {}

export default {
  transaction: transaction,

  getTransaction: async function () {
    const safemoon = "0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3" // temporary
    const response = await fetch(`${api_root}/cryptos/${safemoon}/transactions`)
    const data = await response.json()

    if (data && data.length > 0) {
      const price = data.map((d) => d.tradeAmount)
      const time = data.map((d) => d.timeInterval.second)
      const hash = data.map((d) => d.transaction.hash)
      const buyCurrency = data.map((d) => d.buyCurrency)
      const buyAmount = data.map((d) => d.buyAmount)
      const sellCurrency = data.map((d) => d.sellCurrency)
      const sellAmount = data.map((d) => d.sellAmount)
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
