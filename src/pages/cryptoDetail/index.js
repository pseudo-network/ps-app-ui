import React, { useEffect } from "react"
import NavFrame from "../../components/organisms/NavFrame/NavFrame"
import { useCrypto } from "../../contexts/cryptoContext"
import TVChartWithHeader from "../../components/organisms/TVChartWithHeader/TVChartWithHeader"

export default function CryptoDetail(props) {
  const cryptoContext = useCrypto()
  const { address } = props.match.params

  useEffect(() => {
    if (!address || address == "") {
      // todo: get psuedocoin as default
      window.location.href = "/0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3" // todo: unecessarily rerenders the whole page
    } else {
      cryptoContext.setAddress(address)
    }
  }, [address])

  return (
    <NavFrame page={"CryptoDetail"} address={address}>
      {cryptoContext.tvSymbol && <TVChartWithHeader />}
      <br />
      {/* <LiveViewContainer /> */}
    </NavFrame>
  )
}
