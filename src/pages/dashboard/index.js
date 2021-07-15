import React from 'react'

import { connect } from 'react-redux'

import NavFrame from '../../components/organisms/NavFrame/NavFrame' // The top navigation bar and side navigation panel

const Dashboard = props => {
  return <NavFrame page={'Dashboard'}>YO!</NavFrame>
}
// Component Properties
Dashboard.propTypes = {}

// Component State
function DashboardState (state) {
  return {}
}
export default connect(DashboardState)(Dashboard)
