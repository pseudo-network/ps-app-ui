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
import { Reddit, Twitter, YouTube, Facebook } from "@material-ui/icons"
import { TVChart } from "../../molecules/TVChart"
import Switch from "@material-ui/core/Switch"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    // backgroundColor: theme.pallete.secondary,
  },
}))

const TVChartWithHeader = props => {
  const classes = useStyles()

  /*
    ON RENDER FUNCTION/ MOUNT COMPENENT
  */
  return (
    <>
      <Box className={classes.root}>
        <Typography>USD</Typography>
        <Switch
          defaultChecked
          color="default"
          inputProps={{ "aria-label": "checkbox with default color" }}
        />
        <Typography>BNB</Typography>
      </Box>
      <TVChart />
    </>
  )
}

export default TVChartWithHeader
