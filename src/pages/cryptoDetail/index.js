import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { TVChartContainer } from "../../components/molecules/TVChartContainer/index"

// Redux Components
import PropTypes from "prop-types"
import { connect } from "react-redux"

import NavFrame from "../../components/organisms/navigation/MainNavigationFrame" // The top navigation bar and side navigation panel

const CryptoDetail = props => {
  return (
    <NavFrame page={"CryptoDetail"}>
      <TVChartContainer />
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
