// todo: move to db
export const ethereum = {
  id: 1,
  label: "Ethereum",
  route: "ethereum",
  enabled: true,
  tvSymbol: "BITFINEX:ETHUSD",
  usdTokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  infoCard: {
    title: "Welcome to PseudoCoin Ethereum Charting",
    description:
      "Here, you search for just about any token with liquidity in UniSwap. Track recent trends with our charts, watch realtime transactions in our Transaction Table and check out important info in our Explore section. Stay tuned for more updates as we release them often.",
  },
  blockchainExplorerURL: "https://etherscan.io/",
}

export const binance = {
  id: 2,
  label: "Binance (BSC)",
  route: "bsc",
  enabled: true,
  tvSymbol: "BINANCEUS:BNBUSD",
  usdTokenAddress: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
  infoCard: {
    title: "Welcome to PseudoCoin Binance (BSC) Charting",
    description:
      "Here, you can check out our charts for just about any token with liquidity in PancakeSwap. Track recent trends with our charts, watch realtime transactions in our Transaction Table and check out important info in our Explore section. Stay tuned for more updates as we release them often.",
  },
  blockchainExplorerURL: "https://www.bscscan.com/",
}

export const cardano = {
  id: 3,
  label: "Cardano",
  route: "cardano",
  enabled: true,
  tvSymbol: "BITFINEX:ADAUSD",
  usdTokenAddress: "",
  infoCard: {
    title: "Welcome to PseudoCoin Cardano Charting",
    description:
      "Coming Soon! Here, you'll be able to search for just about any token on the Cardano blockchain platform. Track recent trends with our charts, watch realtime transactions in our Transaction Table and check out important info in our Explore section. We'll be releasing a ton of updates over the next couple of weeks as the Cardano ecosystem develops.",
    other:
      "Feel free to check out some tokens on Ethereum or Binance while you wait. Just click the Chain Select dropdown in the topbar.",
  },
  blockchainExplorerURL: "",
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
