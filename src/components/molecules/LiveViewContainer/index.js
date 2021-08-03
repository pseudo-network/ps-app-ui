import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import TableCell from "@material-ui/core/TableCell"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import {useCrypto} from "../../../contexts/cryptoContext"

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0 !important" : undefined,
    },
  },
  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
})

const TransactionTable = (props) => {
  const cryptoContext = useCrypto();

  useEffect(() => {
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Buy Currency</TableCell>
            <TableCell>Buy Amount:</TableCell>
            <TableCell>Sell Currency</TableCell>
            <TableCell>Sell Amount</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!cryptoContext.infoIsLoading&&cryptoContext.transactions.length > 0&&
            cryptoContext.transactions.map((transaction, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{transaction.buyCurrency.symbol}</TableCell>
                  <TableCell>{transaction.buyAmount}</TableCell>
                  <TableCell>{transaction.sellCurrency.symbol}</TableCell>
                  <TableCell>{transaction.sellAmount}</TableCell>
                  <TableCell>{transaction.timeInterval.second}</TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


export default TransactionTable
