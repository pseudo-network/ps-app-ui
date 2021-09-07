import React from "react"
import { connect } from "react-redux"
import NavFrame from "../../components/templates/NavFrame"

const Dashboard = (props) => {
  return <NavFrame page={"Dashboard"}>YO!</NavFrame>
}
// Component Properties
Dashboard.propTypes = {}

// Component State
function DashboardState(state) {
  return {}
}
export default connect(DashboardState)(Dashboard)
