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
  /* constructor(props) {
    super(props);
    props.getRecentTransactions();
  } */

  useEffect(() => {
    if (!props.cryptos.isLoading) {
      props.getRecentTransactions()
    }
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
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
          {!props.cryptos.isLoading &&
            props.cryptos.transactions.map((transaction, index) => {
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

/*
MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
      isCurrency: PropTypes.bool,
      isTxId: PropTypes.bool,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};
const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

const sample = [
  ['Buy', 817119855, 4.83, 0.000000005907, '11:28:26', '0x773ed89a61705aa029d9b22981b4c01891e4019e9956acad20e468152592310b'],
  ['Buy', 3889702061, 22.96, 0.000000005900, '11:21:53', '0x5577eb4dc5e181c0d1b46cd6c42bcdb1f4a3a1adf9e0bd62e311d4386a4916db'],
  ['Buy', 1988093083, 11.06, 0.000000005558, '11:20:26', '0x949500856c22b6cdbda5238fdbf603962cd038143b19bfc617f1a372f600f9eb'],
  ['Sell', 24595564924, 144.68, 0.000000005883, '10:39:50', '0xb0b089d3d78a2f400a5bd72a0b1bda6a27a9d6eecf2854385bf968bbd5e91dd7'],
  ['Sell', 1428515236, 8.4, 0.000000005888, '10:39:29', '0x81fdd774951390c7baa323d2c3383e637d223d118b3d0ce8ed2698c1f9838023'],
];

function createData(id, buySell, tokens, price, pricePerToken, time, txId) {
  return { id, buySell, tokens, price, pricePerToken, time, txId };
}

const rows = [];

const price = transactionProvider.getTransaction().then(data => data)
//  console.log(price)

for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

const TransactionHistoryPage = props => {
  if (props.user.isLoading){
  }
return (
    <Paper style={{ height: 400, width: '100%' }}>

    </Paper>)
} */
// Component Properties
TransactionTable.propTypes = {
  user: PropTypes.object.isRequired,
  cryptos: PropTypes.object.isRequired,
  getRecentTransactions: PropTypes.func.isRequired,
}

// Component State
function TransactionTableState(state) {
  return {
    user: state.user,
    cryptos: state.cryptos,
  }
}

export default connect(TransactionTableState, { getRecentTransactions })(
  TransactionTable
)
