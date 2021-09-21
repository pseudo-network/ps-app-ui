import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ProvideWallet } from "./contexts/walletContext"
import { ProvideToken } from "./contexts/tokenContext"
import { ProvideChain } from "./contexts/chainContext"

ReactDOM.render(
  <ProvideChain>
    <ProvideToken>
      <ProvideWallet>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProvideWallet>
    </ProvideToken>
  </ProvideChain>,
  document.getElementById("root")
)
