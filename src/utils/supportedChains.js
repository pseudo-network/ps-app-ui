export const binance = {
  id: 1,
  label: "Binance (BSC)",
  route: "bsc",
  enabled: true,
  nativeTVSymbol: "BINANCEUS:BNBUSD",
}

export const ethereum = {
  id: 2,
  label: "Ethereum",
  route: "ethereum",
  enabled: false,
  nativeTVSymbol: "",
}

export const cardano = {
  id: 3,
  label: "Cardano",
  route: "cardano",
  enabled: true,
  nativeTVSymbol: "BITFINEX:ADAUSD",
}

export const solana = {
  id: 4,
  label: "Solana",
  route: "solana",
  enabled: false,
  nativeTVSymbol: "",
}

export const supportedChains = [binance, cardano, ethereum, solana]
