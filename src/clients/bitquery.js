export const endpoint = "https://graphql.bitquery.io"

export const GET_COIN_INFO = `
{
  ethereum(network: bsc) {
    dexTrades(
      options: {desc: ["block.height", "transaction.index"], limit: 1}
      exchangeAddress: {is: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"}
      baseCurrency: {is: "0x2170ed0880ac9a755fd29b2688956bd959f933f8"}
      quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}
    ) 
    {
      block {
        height
        timestamp {
          time(format: "%Y-%m-%d %H:%M:%S") 
        }
      }
      transaction {
        index
      }
      baseCurrency {
        name
        symbol
        decimals
      }
      quotePrice
    }
  }
}
`

export const GET_COIN_BARS = `
query ($since: ISO8601DateTime, $till: ISO8601DateTime, $interval: Int, $address: String!) {
  ethereum(network: bsc) {
    dexTrades(
      options: {asc: "timeInterval.minute"}
      date: {since: $since, till: $till}
      exchangeAddress: {is: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"}
      baseCurrency: {is: $address},
      quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"},
      tradeAmountUsd: {gt: 10}
    ) 
    {
      timeInterval {
        minute(count: $interval, format: "%Y-%m-%dT%H:%M:%SZ")  
      }
      volume: quoteAmount
      high: quotePrice(calculate: maximum)
      low: quotePrice(calculate: minimum)
      open: minimum(of: block, get: quote_price)
      close: maximum(of: block, get: quote_price) 
    }
  }
}
`

// query ($network: EthereumNetwork!, $dateFormat: String!, $from: ISO8601DateTime, $till: ISO8601DateTime, $address: String!) {
//     ethereum(network: $network) {
//       smartContractCalls(options: {desc: "date.date"}, date: {since: $from, till: $till}, smartContractAddress: {is: $address}) {
//         date: date {
//           date(format: $dateFormat)
//         }
//         count: count
//         callers: count(uniq: senders)
//         totalGas: gasValue
//       }
//     }
