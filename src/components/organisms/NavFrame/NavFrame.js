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
import Watermark from "../../molecules/Watermark/Watermark"
import { InsertChart } from "@material-ui/icons"
import { alpha, makeStyles } from "@material-ui/core/styles"

const drawerWidth = 300

function ListItemObject(Title, IconName, Location, isDisabled = false) {
  return {
    title: Title,
    icon: IconName,
    path: Location,
    isDisabled: isDisabled,
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
  const navItems = [
    ListItemObject("Chart", <InsertChart />, "/"),
    ListItemObject("News", <InsertChart />, "/"),
  ]

  const parentNavItems = []

  const NavListItem = ({ navItem, key }) => {
    const classes = useStyles()
    const isSelected = navItem.path == props.location.pathname
    return (
      <>
        {navItem.isDisabled ? ( // if the nav list item is disabled:
          <ListItem id={key} className={classes.listItem}>
            <ListItemIcon>{navItem.icon}</ListItemIcon>
            <ListItemText primary={navItem.title} secondary={"Coming Soon!"} />
          </ListItem>
        ) : (
          <ListItem
            button
            onClick={(e) => props.history.push(`${navItem.path}`)}
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

  const ChildNavListItem = ({ navItem, key }) => {
    const isSelected = navItem.path == props.location.pathname
    return (
      <ListItem
        button
        onClick={(e) => props.history.push(`${navItem.path}`)}
        id={navItem.path + "NavListChildItem" + key}
        selected={isSelected}
        className={classes.nested}
      >
        <ListItemText primary={navItem.title} />
      </ListItem>
    )
  }

  const ParentNavListItems = ({ navItem, key }) => {
    const isSelected = navItem.path == props.location.pathname
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
            <h4 className={classes.listHeader}>Pages</h4>
            {navItems.map((item, key) => {
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
            {parentNavItems.map((item, key) => {
              // console.log("NavListParentItem" + key);
              return (
                <ParentNavListItems
                  button
                  navItem={item}
                  id={item.path + "NavListParentItem" + key}
                />
              )
            })}
          </List>
          <div className={classes.socialMediaRowParent}>
            {" "}
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
