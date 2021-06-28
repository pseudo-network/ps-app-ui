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
  Box,
} from "@material-ui/core"
import { Reddit, Twitter, YouTube } from "@material-ui/icons"

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
  return <Box>Version 0.0.1 - PSHHHHHH</Box>
}

export default AddressDetail
