import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import TableCell from "@material-ui/core/TableCell"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import {
  useToken,
  convertExponentialToDecimal,
} from "../../../contexts/tokenContext"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import { Paper, rgbToHex, Button, Grid, IconButton } from "@material-ui/core"
import moment from "moment"
import SearchIcon from "@material-ui/icons/Search"
import PSLink from "../../atoms/PSLink"
import { useChain } from "../../../contexts/chainContext"
var currencyFormatter = require("currency-formatter")

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    // backgroundColor: "#0D111B",
    padding: "20px",
  },
  table: {
    width: "100%",
    height: 500,
    overflow: "scroll",
    borderRadius: "0.5rem",
  },
}))

const TransactionTable = (props) => {
  const tokenContext = useToken()
  const classes = useStyles()
  const chainContext = useChain()

  useEffect(() => {}, [])

  function toBlockchainExplorer(hash) {
    window.open(`${chainContext?.chain?.blockchainExplorerURL}/tx/${hash}`)
  }
  function numberWithCommas(x) {
    var parts = x.toString().split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.join(".")
  }
  var timezoneOffset = moment().utcOffset()
  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.tableHeader}>
              Transaction
            </TableCell>
            <TableCell className={classes.tableHeader}>Coin Amount</TableCell>
            <TableCell className={classes.tableHeader}>USD</TableCell>
            <TableCell className={classes.tableHeader}>Time</TableCell>
            <TableCell align="center" className={classes.tableHeader}>
              Transaction
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!tokenContext.infoIsLoading &&
            tokenContext.transactions.length > 0 &&
            tokenContext.transactions.map((transaction, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center">
                    {transaction.sellCurrency.symbol == tokenContext.symbol ? (
                      <Chip
                        label="BUY"
                        style={{
                          borderRadius: "0.5rem",
                          color: "white",
                          backgroundColor: "rgb(38, 166, 154)",
                          width: "100px",
                        }}
                      />
                    ) : (
                      <Chip
                        label="SELL"
                        style={{
                          borderRadius: "0.5rem",
                          color: "white",
                          backgroundColor: "rgb(239, 83, 80)",
                          width: "100px",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {transaction.buyCurrency.symbol == tokenContext.symbol
                      ? numberWithCommas(transaction.buyAmount)
                      : numberWithCommas(transaction.sellAmount)}
                    <br />
                    {transaction.buyCurrency.symbol == tokenContext.symbol
                      ? transaction.buyCurrency.symbol
                      : transaction.sellCurrency.symbol}
                  </TableCell>
                  <TableCell>
                    {currencyFormatter.format(transaction.tradeAmount, {
                      code: "USD",
                    })}
                  </TableCell>
                  <TableCell>
                    {moment
                      .utc(transaction.timeInterval.second)
                      .local()
                      .format("dddd, MMMM Do YYYY, h:mm:ss a")}
                  </TableCell>
                  <TableCell align="center">
                    <PSLink
                      color={"#836AFF"}
                      text={
                        <div style={{ display: "flex", minWidth: "100%" }}>
                          <SearchIcon mr={2}></SearchIcon>
                          <a>{transaction.transaction.hash.substring(0, 12)}</a>
                        </div>
                      }
                      onClick={() => {
                        toBlockchainExplorer(transaction.transaction.hash)
                      }}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TransactionTable
