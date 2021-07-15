// React Components and Hooks
import React from "react"
import { withRouter } from "react-router-dom"

// Redux Components
import { connect } from "react-redux"

// Material UI Components
import { makeStyles } from "@material-ui/core/styles"
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
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined"
import Toolbar from "@material-ui/core/Toolbar"
import NightsStayIcon from "@material-ui/icons/NightsStay"
import TimelineIcon from "@material-ui/icons/Timeline"
import FolderOpenIcon from "@material-ui/icons/FolderOpen"
import TopBar from "../../molecules/TopBar/TopBar"
import SocialMediaRow from "../../molecules/SocialMediaRow/SocialMediaRow"
import Watermark from "../../molecules/Watermark/Watermark"

const drawerWidth = 300

function ListItemObject(Title, IconName, Location, isDisabled = false) {
  return {
    title: Title,
    icon: IconName,
    path: Location,
    isDisabled: isDisabled,
  }
}

function ParentListItemObject(
  Title,
  IconName,
  clickMethod,
  isOpen,
  Children = []
) {
  return {
    title: Title,
    icon: IconName,
    clickMethod: clickMethod,
    isOpen: isOpen,
    children: Children,
  }
}

function ChildListItemObject(Title, Location, isDisabled = false) {
  return {
    title: Title,
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
  // Example Parent List Item Necessary additions
  /*
    const [dansListOpen, setDansListOpen] = React.useState(false);
    const handleDansListClick = () => {
      setDansListOpen(!dansListOpen);
    }; */

  // Where all the possible navigation locations and thier icons and titles are stored
  const navItems = [
    ListItemObject("Dashboard", <HomeOutlinedIcon />, "/dashboard"),
    ListItemObject("Safemoon Tracker", <NightsStayIcon />, "/"),
    ListItemObject("Coin Researcher", <TimelineIcon />, "/coin-research", true),
    ListItemObject("Dans Test Page", <FolderOpenIcon />, "/dans-page"),
    ListItemObject("Ants Test Page", <FolderOpenIcon />, "/ant-page"),
    ListItemObject("Benny Test Page", <FolderOpenIcon />, "/ben-page"),
  ]

  const parentNavItems = [
    // Example Parent List Item
    /* ParentListItemObject("More Jazz", <ExploreIcon/>, handleDansListClick, dansListOpen,
    [
      ChildListItemObject("Anotha One", "/dans-page"),
      ChildListItemObject("Anotha Two", "/dans-page"),
    ]) */
  ]

  /*
   HELPER FUNCTIONS
  */
  // Generating and managing function for nav list items:
  const NavListItem = ({ navItem, key }) => {
    const classes = useStyles()

    // Boolean checking if that list item is the current path
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
    // Boolean checking if that list item is the current path
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
    // Boolean checking if that list item is the current path
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
  /*
    END HELPER FUNCTIONS
  */

  const classes = useStyles()

  const handleConnectWalletClick = () => {
    if (typeof window.ethereum !== "undefined") {
      metamask()
    }
  }

  const metamask = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" })
    const account = accounts[0]
    console.log(account)

    // todo: set state of account address
  }

  /*
    ON RENDER FUNCTION/ MOUNT COMPENENT
  */
  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar className={classes.toolbar} />

        <div className={classes.drawerContainer}>
          {/* Navigation List */}
          <List>
            <h4 className={classes.listHeader}>Pages</h4>
            {navItems.map((item, key) => {
              // console.log("NavListItem" + key);
              return (
                <div className={classes.listItemParent}>
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

// Component Properties
NavFrame.propTypes = {}

// Component State
function NavFrameState(state) {
  return {}
}
export default connect(NavFrameState)(withRouter(NavFrame))
