import React from "react"

// Redux Components
import PropTypes from "prop-types"
import { connect } from "react-redux"

import NavFrame from "../../components/organisms/navigation/MainNavigationFrame" // The top navigation bar and side navigation panel

const Dashboard = props => {
  return <NavFrame page={"CryptoDetail"}>YO!</NavFrame>
}
// Component Properties
Dashboard.propTypes = {}

// Component State
function DashboardState(state) {
  return {}
}
export default connect(DashboardState)(Dashboard)
