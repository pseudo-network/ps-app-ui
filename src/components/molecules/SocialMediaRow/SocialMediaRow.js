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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    // backgroundColor: theme.pallete.secondary,
  },
}))

const AddressDetail = props => {
  const classes = useStyles()

  /*
    ON RENDER FUNCTION/ MOUNT COMPENENT
  */
  return (
    <Box className={classes.root}>
      <IconButton
        aria-label="menu"
        onClick={() => {
          window.location.href = "https://twitter.com/CoinPseudo"
        }}
      >
        <Twitter />
      </IconButton>
      <IconButton
        aria-label="menu"
        onClick={() => {
          window.location.href =
            "https://www.reddit.com/search/?q=PseudoCoinOfficial"
        }}
      >
        <Reddit />
      </IconButton>
      <IconButton
        aria-label="menu"
        onClick={() => {
          window.location.href =
            "https://www.youtube.com/channel/UC3wTWqqyc-OlDMyMajvjyHg"
        }}
      >
        <YouTube />
      </IconButton>
      <IconButton
        aria-label="menu"
        onClick={() => {
          window.location.href = "https://twitter.com/CoinPseudo"
        }}
      >
        <Facebook />
      </IconButton>
    </Box>
  )
}

export default AddressDetail
