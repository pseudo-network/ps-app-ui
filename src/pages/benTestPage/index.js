import React from "react"
import { connect } from "react-redux"
import NavFrame from "../../components/organisms/NavFrame/NavFrame" // The top navigation bar and side navigation panel
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';

const styles = (theme) => ({
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    table: {
      // temporary right-to-left patch, waiting for
      // https://github.com/bvaughn/react-virtualized/issues/454
      '& .ReactVirtualized__Table__headerRow': {
        flip: false,
        paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
      },
    },
    tableRow: {
      cursor: 'pointer',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: 'initial',
    },
  });

  class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
      headerHeight: 48,
      rowHeight: 48,
    };
  
    getRowClassName = ({ index }) => {
      const { classes, onRowClick } = this.props;
  
      return clsx(classes.tableRow, classes.flexContainer, {
        [classes.tableRowHover]: index !== -1 && onRowClick != null,
      });
    };
  
    cellRenderer = ({ cellData, columnIndex }) => {
      const { columns, classes, rowHeight, onRowClick } = this.props;
      const isNumeric = (columnIndex != null && columns[columnIndex].numeric) || false;
      const isCurrency = (columnIndex != null && columns[columnIndex].isCurrency) || false;
      const isTxId = (columnIndex != null && columns[columnIndex].isTxId) || false;
      console.log('isNumeric', isNumeric, 'isCurrency', isCurrency, 'isTxId', isTxId)
      return (
        <TableCell
          component="div"
          className={clsx(classes.tableCell, classes.flexContainer, {
            [classes.noClick]: onRowClick == null,
          })}
          variant="body"
          style={{ height: rowHeight }}
          align={isNumeric ? 'right' : 'left'}
        >
          { isNumeric ? isCurrency : `$${cellData.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 20 })}` ? cellData.toLocaleString() : isTxId ? <a target="_blank" rel="noreferrer" href="https://bscscan.com/tx/0xe2b5b3fba1ce7ad3fe51c6c4322be32e33ec1c0c407d41892ea2035a102ca4b2">0xe2b5</a> : cellData}
        </TableCell>
      );
    };
  
    headerRenderer = ({ label, columnIndex }) => {
      const { headerHeight, columns, classes } = this.props;
  
      return (
        <TableCell
          component="div"
          className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
          variant="head"
          style={{ height: headerHeight }}
          align={columns[columnIndex].numeric || false ? 'right' : 'left'}
        >
          <span>{label}</span>
        </TableCell>
      );
    };
  
    render() {
      const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
      return (
        <AutoSizer>
          {({ height, width }) => (
            <Table
              height={height}
              width={width}
              rowHeight={rowHeight}
              gridStyle={{
                direction: 'inherit',
              }}
              headerHeight={headerHeight}
              className={classes.table}
              {...tableProps}
              rowClassName={this.getRowClassName}
            >
              {columns.map(({ dataKey, ...other }, index) => {
                return (
                  <Column
                    key={dataKey}
                    headerRenderer={(headerProps) =>
                      this.headerRenderer({
                        ...headerProps,
                        columnIndex: index,
                      })
                    }
                    className={classes.flexContainer}
                    cellRenderer={this.cellRenderer}
                    dataKey={dataKey}
                    // format={console.log(this)}
                    {...other}
                  />
                );
              })}
            </Table>
          )}
        </AutoSizer>
      );
    }
  }
  
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
    ['Buy', 3889702061, 22.96, 0.000000005900, '11:21:53', '0x473b'],
    ['Buy', 1988093083, 11.06, 0.000000005558, '11:20:26', '0xa69e'],
    ['Sell', 24595564924, 144.68, 0.000000005883, '10:39:50', '0x9d24'],
    ['Sell', 1428515236, 8.4, 0.000000005888, '10:39:29', '0x0d75'],
  ];
  
  function createData(id, buySell, tokens, price, pricePerToken, time, txId) {
    return { id, buySell, tokens, price, pricePerToken, time, txId };
  }
  
  const rows = [];
  
  for (let i = 0; i < 200; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData(i, ...randomSelection));
  }

const BenPage = props => {
    if (props.user.isLoading){
        return <NavFrame page={"BenTestPage"}>Still Loading!</NavFrame>
    }
    // Page name has to line up with component name on import in app.jsx file
  return (
  <NavFrame page={"BenTestPage"}>
        <Paper style={{ height: 400, width: '100%' }}>
        <VirtualizedTable
          rowCount={rows.length}
          rowGetter={({ index }) => rows[index]}
          columns={[
            {
              width: 120,
              label: 'Buy/Sell',
              dataKey: 'buySell',
            },
            {
              width: 120,
              label: 'Tokens',
              dataKey: 'tokens',
              numeric: true,
            },
            {
              width: 120,
              label: 'Price',
              dataKey: 'price',
              numeric: true,
              isCurrency: true,
            //   valueFormatter: (value) => {
            //     alert(value)
            //     const valueFormatted = column.format(value);
            //     return `$ ${valueFormatted}` },
            },
            {
              width: 140,
              label: 'Price/Token',
              dataKey: 'pricePerToken',
              numeric: true,
              isCurrency: true,
            },
            {
              width: 120,
              label: 'Time',
              dataKey: 'time',
            },
            {
              width: 120,
              label: 'Tx Id',
              dataKey: 'txId',
              isTxId: true
            },
          ]}
        />
      </Paper>
    </NavFrame>)
}
// Component Properties
BenPage.propTypes = {}

// Component State
function BenPageState(state) {
  return {
      user: state.user
  }
}

export default connect(BenPageState)(BenPage)
