import React, { useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import TableCell from "@material-ui/core/TableCell"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { useCrypto } from "../../../contexts/cryptoContext"
import { makeStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import { Paper, rgbToHex } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    backgroundColor: "rgb(20,23,33)",
  },
  table: {
    height: 333,
    backgroundColor: "rgb(20,23,33)",
  },
}))

const TransactionTable = (props) => {
  const cryptoContext = useCrypto()
  const classes = useStyles()

  useEffect(() => {}, [])

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>Transaction</TableCell>
            <TableCell className={classes.tableHeader}>Amount</TableCell>
            <TableCell className={classes.tableHeader}>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!cryptoContext.infoIsLoading &&
            cryptoContext.transactions.length > 0 &&
            cryptoContext.transactions.map((transaction, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    {transaction.buyCurrency.symbol == cryptoContext.symbol ? (
                      <Chip label="BUY" color="buy" />
                    ) : (
                      <Chip label="SELL" color="sell" />
                    )}
                  </TableCell>
                  <TableCell>
                    {transaction.buyCurrency.symbol == cryptoContext.symbol
                      ? transaction.buyAmount
                      : transaction.sellAmount}
                  </TableCell>
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
