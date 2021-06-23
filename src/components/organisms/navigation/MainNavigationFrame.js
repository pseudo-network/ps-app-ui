//React Components and Hooks
import React, { useState, useRef, useEffect, withStyles } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
  useLocation,
  withRouter
} from "react-router-dom";

// Redux Components
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//Material UI Components
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//Material UI Icons
import ComputerIcon from '@material-ui/icons/Computer';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PowerOffOutlinedIcon from '@material-ui/icons/PowerOffOutlined';
import ReceiptIcon from '@material-ui/icons/Receipt';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeWork from '@material-ui/icons/HomeWork';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import PermMediaOutlinedIcon from '@material-ui/icons/PermMediaOutlined';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';



const drawerWidth = 240;

function ListItemObject (Title, IconName, Location, isDisabled=false) {
  return {
    "title": Title,
    "icon": IconName,
    "path": Location,
    "isDisabled": isDisabled
  };
}

function ParentListItemObject (Title, IconName, clickMethod, isOpen, Children = [], isDisabled=false) {
  return {
    "title": Title,
    "icon": IconName,
    "clickMethod": clickMethod,
    "isOpen": isOpen,
    "children": Children,
    "isDisabled": isDisabled
  };
}

function ChildListItemObject (Title, Location, isDisabled=false) {
  return {
    "title": Title,
    "path": Location,
    "isDisabled": isDisabled
  };
}

// Nav list styles:
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    paddingTop: 50
  },
}));


const NavigationPanel = (props)=> {
     // Where all the possible navigation locations and thier icons and titles are stored
     const navItems = [
      ListItemObject("Dashboard", <HomeOutlinedIcon/>, "/dashboard"),
      ListItemObject("Safemoon Tracker", <HomeOutlinedIcon/>, "/"),
      ListItemObject("Coin Researcher", <HomeOutlinedIcon/>, "/coin-research", true),
    ]

    const parentNavItems = [];




    // Generating and managing function for nav list items:
    const NavListItem = (({ navItem, key }) => {
      // Boolean checking if that list item is the current path
      var isSelected = (navItem.path == props.location.pathname);
        return (
          <>
            {navItem.isDisabled? // if the nav list item is disabled:
                <ListItem id={key}>
                  <ListItemIcon>
                  {navItem.icon}
                </ListItemIcon>
                <ListItemText primary={navItem.title} secondary={"Coming Soon!"} />
              </ListItem>
              :
              <ListItem button onClick={(e)=>props.history.push(`${navItem.path}`)} id={key} selected={isSelected}>
                <ListItemIcon>
                {navItem.icon}
              </ListItemIcon>
              <ListItemText primary={navItem.title} />
            </ListItem>
            }
          </>
        )
    });

    const ChildNavListItem = (({ navItem, key }) => {
      // Boolean checking if that list item is the current path
      var isSelected = (navItem.path == props.location.pathname);
        return (
        <ListItem button onClick={(e)=>props.history.push(`${navItem.path}`)} id={navItem.path + "NavListChildItem" + key} selected={isSelected} className={classes.nested}>
          <ListItemText primary={navItem.title} />
        </ListItem>
        )
    });


    const ParentNavListItems = (({ navItem, key, }) => {
      // Boolean checking if that list item is the current path
      var isSelected = (navItem.path == props.location.pathname);
        return (
          <>
          <ListItem button onClick={navItem.clickMethod}>
            <ListItemIcon>
              {navItem.icon}
            </ListItemIcon>
              <ListItemText primary={navItem.title} />
              {navItem.isOpen ? <ExpandLess/>: <ExpandMore />}
          </ListItem>
          <Collapse in={navItem.isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {navItem.children.map((item, index) => (
              <ChildNavListItem button navItem={item} key={index}/>
            ))}
            </List>
          </Collapse>
          </>
        )
    });
    const classes = useStyles();

    return(
        <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.appBar}>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h4">
                Pseudocoin
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.drawerContainer}>
            <List>
            {parentNavItems.map((item, key) => {
                  //console.log("NavListParentItem" + key);
                return(
                <ParentNavListItems button navItem={item} id={item.path + "NavListParentItem" + key}/>
                );
              })
              }
              {navItems.map((item, key) => {
                //console.log("NavListItem" + key);
                return(
                  <NavListItem navItem={item} id={item.path + "NavListItem" + key}/>
                  );
                })
              }
            </List>
            </div>
        </Drawer>
        <Divider/>
            <main className={classes.content}>
                <Box m={5} ml={8}>
                  {props.children}
                </Box>
            </main>
        </div>
      );
}



// Component Properties
NavigationPanel.propTypes = {}

// Component State
function NavigationPanelState(state) {
  return {
  }
}
export default connect(NavigationPanelState)(withRouter(NavigationPanel));