import React from "react"
import { connect } from "react-redux"
import NavFrame from "../../components/organisms/NavFrame/NavFrame"
import TVChartWithHeader from "../../components/organisms/TVChartWithHeader/TVChartWithHeader"
import LiveViewContainer from "../../components/molecules/LiveViewContainer"
import { useParams } from "react-router-dom"
const rp = require("request-promise").defaults({ json: true })

const CryptoDetail = (props) => {
  const [crypto, setCrypto] = React.useState(null)

  // todo: cleanup
  const { address } = props.match.params
  if (!address || address == "") {
    // todo: get psuedocoin as default
    window.location.href = "/0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3" // todo: unecessarily rerenders the whole page
  } else {
    rp({
      url: `http://api.pseudonetwork.net:3444/cryptos?search_query=${address}`,
    })
      .then((res) => {
        if (res.length > 0) {
          setCrypto(res[0])
        } else {
          alert("coin not found")
        }
      })
      .catch((e) => {
        // todo: handle error
        // console.log(e)
      })
  }

  return (
    <NavFrame page={"CryptoDetail"} address={address}>
      {crypto && <TVChartWithHeader crypto={crypto} />}
      <br />
      {/* <LiveViewContainer /> */}
    </NavFrame>
  )
}
// Component Properties
CryptoDetail.propTypes = {}

// Component State
function CryptoDetailState(state) {
  return {
    user: state.user,
    cryptos: state.cryptos,
  }
}
export default connect(CryptoDetailState)(CryptoDetail)
