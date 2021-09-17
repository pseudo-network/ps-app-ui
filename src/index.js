import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ProvideTokens } from "./contexts/tokensContext"
import { ProvideWallet } from "./contexts/walletContext"
import { ProvideToken } from "./contexts/tokenContext"

ReactDOM.render(
  <ProvideTokens>
    <ProvideToken>
      <ProvideWallet>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProvideWallet>
    </ProvideToken>
  </ProvideTokens>,

  document.getElementById("root")
)
