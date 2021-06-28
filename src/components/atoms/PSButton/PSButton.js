//React Components and Hooks
import React, { useState, useRef, useEffect, withStyles } from "react"
import { withRouter } from "react-router-dom"

// Redux Components
import PropTypes from "prop-types"
import { connect } from "react-redux"

//Material UI Components
import { makeStyles, useTheme } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  Button,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.pallete.secondary,
  },
  text: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "20ch",
    color: "#A694FE",
    fontWeight: 600,
    textTransform: "none",
  },
}))

const PSButton = props => {
  const classes = useStyles()

  /*
    ON RENDER FUNCTION/ MOUNT COMPENENT
  */
  return (
    <>
      <Button className={classes.root} onClick={props.onClick}>
        <div className={classes.text}>{props.text}</div>
      </Button>
    </>
  )
}

export default PSButton
