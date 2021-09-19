// todo: move to db
export const binance = {
  id: 2,
  label: "Binance (BSC)",
  route: "bsc",
  enabled: true,
  tvSymbol: "BINANCEUS:BNBUSD",
  usdTokenAddress: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
}

export const ethereum = {
  id: 1,
  label: "Ethereum",
  route: "ethereum",
  enabled: true,
  tvSymbol: "BITFINEX:ETHUSD",
  usdTokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
}

export const cardano = {
  id: 3,
  label: "Cardano",
  route: "cardano",
  enabled: true,
  tvSymbol: "BITFINEX:ADAUSD",
  usdTokenAddress: "",
}

export const solana = {
  id: 4,
  label: "Solana",
  route: "solana",
  enabled: false,
  tvSymbol: "",
  usdTokenAddress: "",
}

export const supportedChains = [binance, ethereum, cardano, solana]
