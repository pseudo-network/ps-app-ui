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
    color: "white",
    cursor: "pointer",
  },
}))

const PSLink = props => {
  const classes = useStyles()

  /*
    ON RENDER FUNCTION/ MOUNT COMPENENT
  */
  return (
    <>
      <a
        className={classes.root}
        color="inherit"
        href={props.url}
        onClick={props.onClick}
      >
        {props.text}
      </a>
    </>
  )
}

export default PSLink
