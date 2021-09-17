export const binance = {
  id: 1,
  label: "Binance (BSC)",
  route: "bsc",
  enabled: true,
}

export const ethereum = {
  id: 2,
  label: "Ethereum",
  route: "ethereum",
  enabled: false,
}

export const cardano = {
  id: 3,
  label: "Cardano",
  route: "cardano",
  enabled: true,
}

export const solana = {
  id: 4,
  label: "Solana",
  route: "solana",
  enabled: false,
}

export const supportedChains = [binance, cardano, ethereum, solana]
