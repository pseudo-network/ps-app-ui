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
  const [usd, setUSD] = useState(true)
  const baseCurrencyAddress = "0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3"

  useEffect(() => {
    console.log(usd)
  }, [usd])

  /*
    ON RENDER FUNCTION/ MOUNT COMPENENT
  */
  return (
    <>
      <Box className={classes.root}>
        <Typography>USD</Typography>
        <Switch
          color="default"
          inputProps={{ "aria-label": "checkbox with default color" }}
          onClick={() => {
            setUSD(!usd)
          }}
        />
        <Typography>BNB</Typography>
      </Box>
      <TVChart baseCurrencyAddress={baseCurrencyAddress} usd={usd} />
    </>
  )
}

export default TVChartWithHeader
