import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import Collapse from "@material-ui/core/Collapse"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import Toolbar from "@material-ui/core/Toolbar"
import TopBar from "../../molecules/TopBar/TopBar"
import SocialMediaRow from "../../molecules/SocialMediaRow/SocialMediaRow"
import ContactUsButtons from "../../molecules/ContactButtons/index"
import Watermark from "../../molecules/Watermark/Watermark"
import {
  AccountBalance,
  ArrowBack,
  ArrowLeft,
  InsertChart,
  SwapHoriz,
  Web,
} from "@material-ui/icons"
import { alpha, makeStyles } from "@material-ui/core/styles"
import ThemeToggle from "../../molecules/ThemeToggle/ThemeToggle"
import { APP_URL } from "../../../core/environments"

const drawerWidth = 300

function ListItemObject(title, icon, path, isDisabled = false, newTab = false) {
  return {
    title: title,
    icon: icon,
    path: path,
    isDisabled: isDisabled,
    newTab: newTab,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    position: "relative",
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 80,
  },
  listHeader: {
    paddingLeft: "1.5em",
    paddingRight: "1.5em",
    color: "#836AFF",
  },
  listItem: {
    borderRadius: ".5rem",
  },
  listItemParent: {
    paddingLeft: "1.5em",
    paddingRight: "1.5em",
  },
  socialMediaRowParent: {
    paddingLeft: "1.5em",
    paddingRight: "1.5em",
    position: "absolute",
    bottom: 10,
    width: "100%",
    display: "grid",
    justifyContent: "center",
  },
}))

const NavFrame = (props) => {
  const pages = [
    ListItemObject("Chart", <InsertChart />, "/"),
    ListItemObject("Swap", <SwapHoriz />, "/", true),
  ]

  const links = [ListItemObject("Web App", <Web />, APP_URL, false, true)]

  const parentNavItems = []

  const NavListItem = ({ navItem, key }) => {
    const classes = useStyles()
    const isSelected = navItem.path == props.location.pathname

    const navigate = (path, newTab) => {
      newTab ? window.open(path, "_blank") : props.history.push(`${path}`)
    }

    return (
      <>
        {navItem.isDisabled ? ( // if the nav list item is disabled:
          <ListItem id={key} className={classes.listItem} disabled={true}>
            <ListItemIcon>{navItem.icon}</ListItemIcon>
            <ListItemText primary={navItem.title + " (Soon)"} />
          </ListItem>
        ) : (
          <ListItem
            button
            onClick={() => navigate(navItem.path, navItem.newTab)}
            id={key}
            selected={isSelected}
            className={classes.listItem}
          >
            <ListItemIcon>{navItem.icon}</ListItemIcon>
            <ListItemText primary={navItem.title} />
          </ListItem>
        )}
      </>
    )
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar address={props.address} />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar className={classes.toolbar} />
        <div className={classes.drawerContainer}>
          <List>
            <h4 className={classes.listHeader}>Tools</h4>
            {pages.map((item, key) => {
              // console.log("NavListItem" + key);
              return (
                <div key={key} className={classes.listItemParent}>
                  <NavListItem
                    navItem={item}
                    id={item.path + "NavListItem" + key}
                  />
                </div>
              )
            })}
            <h4 className={classes.listHeader}>Links</h4>
            {links.map((item, key) => {
              // console.log("NavListItem" + key);
              return (
                <div key={key} className={classes.listItemParent}>
                  <NavListItem
                    navItem={item}
                    id={item.path + "NavListItem" + key}
                  />
                </div>
              )
            })}
          </List>
          <div className={classes.socialMediaRowParent}>
            {" "}
            {/* <ContactUsButtons/> */}
            <ThemeToggle />
            <SocialMediaRow />
            <br />
            <Watermark />
          </div>
        </div>
      </Drawer>
      <Divider />
      <main className={classes.content}>
        <Toolbar className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  )
}

export default withRouter(NavFrame)
