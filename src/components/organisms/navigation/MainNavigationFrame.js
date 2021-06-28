//React Components and Hooks
import React, { useState, useRef, useEffect, withStyles } from "react"
import { withRouter } from "react-router-dom"

// Redux Components
import PropTypes from "prop-types"
import { connect } from "react-redux"

//Material UI Components
import { makeStyles, useTheme } from "@material-ui/core/styles"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import Collapse from "@material-ui/core/Collapse"
import Drawer from "@material-ui/core/Drawer"
import clsx from "clsx"
import CssBaseline from "@material-ui/core/CssBaseline"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import List from "@material-ui/core/List"
import IconButton from "@material-ui/core/IconButton"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import NightsStayIcon from '@material-ui/icons/NightsStay';
import TimelineIcon from '@material-ui/icons/Timeline';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import ExploreIcon from '@material-ui/icons/Explore';


const drawerWidth = 240

function ListItemObject(Title, IconName, Location, isDisabled = false) {
  return {
    title: Title,
    icon: IconName,
    path: Location,
    isDisabled: isDisabled,
  }
}

function ParentListItemObject (Title, IconName, clickMethod, isOpen, Children = []) {
  return {
    "title": Title,
    "icon": IconName,
    "clickMethod": clickMethod,
    "isOpen": isOpen,
    "children": Children
  };
}

function ChildListItemObject (Title, Location, isDisabled = false) {
  return {
    "title": Title,
    "path": Location,
    "isDisabled": isDisabled,
  };
}


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
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
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const NavigationPanel = props => {
  
    
    // Example Parent List Item Necessary additions
    /*
    const [dansListOpen, setDansListOpen] = React.useState(false);
    const handleDansListClick = () => {
      setDansListOpen(!dansListOpen);
    };*/
  

    // Where all the possible navigation locations and thier icons and titles are stored
    const navItems = [
      ListItemObject("Dashboard", <HomeOutlinedIcon />, "/dashboard"),
      ListItemObject("Safemoon Tracker", <NightsStayIcon />, "/"),
      ListItemObject("Coin Researcher",<TimelineIcon />,"/coin-research", true),
      ListItemObject("Dans Test Page",<FolderOpenIcon />,"/dans-page"),
    ]
  
    const parentNavItems = [
    // Example Parent List Item
    /*ParentListItemObject("More Jazz", <ExploreIcon/>, handleDansListClick, dansListOpen,
    [
      ChildListItemObject("Anotha One", "/dans-page"),
      ChildListItemObject("Anotha Two", "/dans-page"),
    ])*/
  ]

    
  /*
   HELPER FUNCTIONS
  */
  // Generating and managing function for nav list items:
  const NavListItem = ({ navItem, key }) => {
    // Boolean checking if that list item is the current path
    var isSelected = navItem.path == props.location.pathname
    return (
      <>
        {navItem.isDisabled ? ( // if the nav list item is disabled:
          <ListItem id={key}>
            <ListItemIcon>{navItem.icon}</ListItemIcon>
            <ListItemText primary={navItem.title} secondary={"Coming Soon!"} />
          </ListItem>
        ) : (
          <ListItem
            button
            onClick={e => props.history.push(`${navItem.path}`)}
            id={key}
            selected={isSelected}
          >
            <ListItemIcon>{navItem.icon}</ListItemIcon>
            <ListItemText primary={navItem.title} />
          </ListItem>
        )}
      </>
    )
  }

  const ChildNavListItem = ({ navItem, key }) => {
    // Boolean checking if that list item is the current path
    var isSelected = navItem.path == props.location.pathname
    return (
      <ListItem
        button
        onClick={e => props.history.push(`${navItem.path}`)}
        id={navItem.path + "NavListChildItem" + key}
        selected={isSelected}
        className={classes.nested}
      >
        <ListItemText primary={navItem.title} />
      </ListItem>
    )
  }

  const ParentNavListItems = ({ navItem, key }) => {
    // Boolean checking if that list item is the current path
    var isSelected = navItem.path == props.location.pathname
    return (
      <>
        <ListItem button onClick={navItem.clickMethod}>
          <ListItemIcon>{navItem.icon}</ListItemIcon>
          <ListItemText primary={navItem.title} />
          {navItem.isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={navItem.isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {navItem.children.map((item, index) => (
              <ChildNavListItem button navItem={item} key={index} />
            ))}
          </List>
        </Collapse>
      </>
    )
  }
  /*
    END HELPER FUNCTIONS
  */


  const classes = useStyles()

  /*
    ON RENDER FUNCTION/ MOUNT COMPENENT
  */
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            PseudoNetwork
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          {/* Navigation List */}
          <List>
            {navItems.map((item, key) => {
              //console.log("NavListItem" + key);
              return (
                <NavListItem
                  navItem={item}
                  id={item.path + "NavListItem" + key}
                />
              )
            })}
            <Divider/>
            {
            parentNavItems.map((item, key) => {
              //console.log("NavListParentItem" + key);
              return (
                <ParentNavListItems
                  button
                  navItem={item}
                  id={item.path + "NavListParentItem" + key}
                />
              )
            })
            }
          </List>
        </div>
      </Drawer>
      <Divider />
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  )
}

// Component Properties
NavigationPanel.propTypes = {}

// Component State
function NavigationPanelState(state) {
  return {}
}
export default connect(NavigationPanelState)(withRouter(NavigationPanel))
