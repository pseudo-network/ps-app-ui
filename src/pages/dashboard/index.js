import React from "react"

// Redux Components
import PropTypes from "prop-types"
import { connect } from "react-redux"

import NavFrame from "../../components/organisms/navigation/MainNavigationFrame" // The top navigation bar and side navigation panel

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


const Dashboard = (props) => {
    const classes = useStyles();
  
    return (
      <NavFrame page={"Dashboard"}>
            YO!
      </NavFrame>
    );
  }
// Component Properties
Dashboard.propTypes = {}

// Component State
function DashboardState(state) {
  return {}
}
export default connect(DashboardState)(Dashboard)
