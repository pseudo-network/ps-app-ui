import React from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles";
// Redux Components
import PropTypes from "prop-types"
import { connect } from "react-redux"

import NavFrame from "../../components/organisms/navigation/MainNavigationFrame" // The top navigation bar and side navigation panel

const Dashboard = props => {
  return <NavFrame page={"Dashboard"}>YO!</NavFrame>
}
// Component Properties
Dashboard.propTypes = {}

// Component State
function DashboardState(state) {
  return {}
}
export default connect(DashboardState)(Dashboard)
