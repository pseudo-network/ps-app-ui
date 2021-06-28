//React Components and Hooks
import React, { useState, useRef, useEffect, withStyles } from "react"

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
}))

const AddressDetail = props => {
  const classes = useStyles()

  /*
    ON RENDER FUNCTION/ MOUNT COMPENENT
  */
  return <>hi!</>
}

export default AddressDetail
