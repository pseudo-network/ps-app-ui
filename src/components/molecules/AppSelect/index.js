import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  Popover,
  Grid,
} from "@material-ui/core"
import {
  CHART_URL,
  LANDING_URL,
  WEB_APP_URL,
  BLOG_URL,
} from "../../../core/environments"
import {
  CallToAction,
  InsertChart,
  LibraryBooks,
  MenuOpen,
  Web,
} from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    fontFamily: theme.typography.regular,
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    marginLeft: "1.2em",
  },
  title: {
    marginLeft: 13,
  },
  link: {
    paddingLeft: 10,
  },
  balance: {
    marginRight: 10,
  },
  logo: {
    cursor: "pointer",
  },
  popover: {
    width: 299,
    padding: "1.2em",
  },
  appSelection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: "pointer",
  },
  appSelectionLogo: {
    display: "flex",
    justifyContent: "center",
    color: "#836AFF",
    fontSize: "15px",
  },
  appSelectionText: {
    display: "flex",
    justifyContent: "center",
    margin: ".6em",
  },
}))

export default function AppSelect(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleAppMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleAppMenuClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <>
      <img
        className={classes.logo}
        src={"/imgs/ps-logo.png"}
        width={40}
        height={40}
        onClick={handleAppMenuClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleAppMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid container className={classes.popover}>
          <Grid item xs={4}>
            <Box
              className={classes.appSelection}
              onClick={() => {
                window.location = LANDING_URL
              }}
            >
              <div className={classes.appSelectionLogo}>
                <CallToAction fontSize="large" />
              </div>
              <p className={classes.appSelectionText}> Landing </p>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              className={classes.appSelection}
              onClick={() => {
                window.location = WEB_APP_URL
              }}
            >
              <div className={classes.appSelectionLogo}>
                <Web fontSize="large" />
              </div>
              <p className={classes.appSelectionText}> Web App </p>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              className={classes.appSelection}
              onClick={() => {
                window.location = CHART_URL
              }}
            >
              <div className={classes.appSelectionLogo}>
                <InsertChart fontSize="large" />
              </div>
              <p className={classes.appSelectionText}> Charts </p>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              className={classes.appSelection}
              onClick={() => {
                window.location = BLOG_URL
              }}
            >
              <div className={classes.appSelectionLogo}>
                <LibraryBooks fontSize="large" />
              </div>
              <p className={classes.appSelectionText}> Blog </p>
            </Box>
          </Grid>
        </Grid>
      </Popover>
      <Typography variant="h6" className={classes.title}>
        Charts
      </Typography>
    </>
  )
}
