import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Typography, Box, Badge } from "@material-ui/core"
import Switch from "@material-ui/core/Switch"
import { AttachMoney } from "@material-ui/icons"
import { useToken } from "../../../contexts/tokenContext"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    // justifyContent: "end",
    alignItems: "center",
    // backgroundColor: theme.pallete.secondary,
  },
  chartContainer: {
    marginTop: "1em",
  },
  infoBox: {
    paddingLeft: "1em",
    paddingRight: "1em",
  },
  infoLabel: {
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: "150%",
    margin: 5,
  },
  percentChangeNegative: {
    fontSize: "150%",
    margin: 5,
    color: "red",
  },
  percentChangePositive: {
    fontSize: "150%",
    margin: 5,
    color: "green",
  },
  priceValue: {
    fontSize: "150%",
    margin: 5,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
}))

function formatPercent(percent) {
  const percentStr = String(percent)
  const formatedPercent = percentStr.slice(0, 4) + "%"
  return formatedPercent
}

function formatNumber(number) {
  if (number == undefined) return null

  var formattedNumber
  if (number >= 1000000) {
    const num = number / 1000000
    const numberStr = String(num)
    formattedNumber = numberStr.slice(0, 4) + "M"
  } else if (number >= 1000000000) {
    const num = number / 1000000000
    const numberStr = String(num)
    formattedNumber = numberStr.slice(0, 4) + "B"
  } else {
    const numberStr = String(number)
    formattedNumber = numberStr.slice(0, 13)
  }
  return formattedNumber
}

const Price = (props) => {
  const classes = useStyles()
  const price = formatNumber(props.price)
  const percentChange = formatPercent(props.percentChange)

  return (
    <Box className={classes.infoBox}>
      <span className={classes.infoLabel}>{props.name}</span>
      <div className={classes.flex}>
        <div className={classes.flex}>
          <AttachMoney></AttachMoney>
          <h4 className={classes.infoValue}>
            {price ? price : "No Data Available"}
          </h4>
        </div>
        {/* {parseFloat(percentChange) < 0 ? (
          <h4 className={classes.percentChangeNegative}>{percentChange}</h4>
        ) : (
          <h4 className={classes.percentChangePositive}>{percentChange}</h4>
        )} */}
      </div>
    </Box>
  )
}

const Volume = (props) => {
  const classes = useStyles()
  const volume = formatNumber(props.volume)

  return (
    <Box className={classes.infoBox}>
      <span className={classes.infoLabel}>Day Volume</span>
      <div className={classes.flex}>
        <AttachMoney></AttachMoney>
        <h4 className={classes.infoValue}>
          {volume ? volume : "No Data Available"}
        </h4>
      </div>
    </Box>
  )
}

export default function TVChartHeader(props) {
  const classes = useStyles()
  const tokenContext = useToken()

  return (
    <>
      <Box className={classes.root}>
        <Price
          name={props.name}
          percentChange={props.percentChange}
          price={props.currentPrice}
        />
        <Volume volume={props.volume} />
        {/* <Box className={classes.infoBox} style={{ marginLeft: "auto" }}>
          <span className={classes.infoLabel}>
            WEBTRAFFIC OVERLOAD, MAY ENCOUNTER TECH DIFFICULTIES
          </span>
          <p>Thanks for bearing with us :)</p>
        </Box> */}
      </Box>
    </>
  )
}
