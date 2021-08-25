import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ProvideCryptos } from "./contexts/cryptosContext"
import { ProvideWallet } from "./contexts/walletContext"
import { ProvideCrypto } from "./contexts/cryptoContext"

ReactDOM.render(
  <ProvideCryptos>
    <ProvideCrypto>
      <ProvideWallet>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProvideWallet>
    </ProvideCrypto>
  </ProvideCryptos>,
  document.getElementById("root")
)
