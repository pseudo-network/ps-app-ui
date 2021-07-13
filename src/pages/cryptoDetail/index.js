import React from "react"
import { makeStyles } from "@material-ui/core/styles"

// Redux Components
import PropTypes from "prop-types"
import { connect } from "react-redux"

import NavFrame from "../../components/organisms/NavFrame/NavFrame" // The top navigation bar and side navigation panel
import TVChartWithHeader from "../../components/organisms/TVChartWithHeader/TVChartWithHeader"
import LiveViewContainer from "../../components/molecules/LiveViewContainer"

const CryptoDetail = props => {
  return (
    <NavFrame page={"CryptoDetail"}>
      <TVChartWithHeader />
      <br />
      <LiveViewContainer />
    </NavFrame>
  )
}
// Component Properties
CryptoDetail.propTypes = {}

// Component State
function CryptoDetailState(state) {
  return {}
}
export default connect(CryptoDetailState)(CryptoDetail)
