import React, { useEffect }from "react";
import styled, { withTheme } from "styled-components/macro";
import { NavLink } from "react-router-dom";

import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Button,
} from "@material-ui/core";

import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Loop as LoopIcon,
  CheckCircle as CheckCircle,
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

//Material UI Components and Functions
import { makeStyles } from "@material-ui/core/styles";


// Redux Components
import PropTypes from "prop-types"
import { connect } from "react-redux"

const useStyles = makeStyles({
    table: {
      backgroundColor: 'transparent'
    },
    tableCell: {
        padding: '2px',
        borderColor: 'transparent'
    },
  });

const ChartVolumes = (props) => {
    const classes = useStyles();
    function createData(name, price, dayChange, dayVolume, liquidity, marketCap) {
        return {name, price, dayChange, dayVolume, liquidity, marketCap};
      }
      
      const rows = [
        createData("SFMN", "$0.907108", "1.85%", "$85,763", "$5,386,220", "$13,384,156"),
      ];
      
    return (
        <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}><Typography variant="a">Symbol</Typography></TableCell>
              <TableCell className={classes.tableCell}><Typography variant="a">Price</Typography></TableCell>
              <TableCell className={classes.tableCell}><Typography variant="a">Day Change</Typography></TableCell>
              <TableCell className={classes.tableCell}><Typography variant="a">Day Volume</Typography></TableCell>
              <TableCell className={classes.tableCell}><Typography variant="a">Liquidity</Typography></TableCell>
              <TableCell className={classes.tableCell}><Typography variant="a">Market Cap</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell className={classes.tableCell}><Typography variant="h5">{row.name}</Typography></TableCell>
                <TableCell className={classes.tableCell}><Typography variant="h5">{row.price}</Typography></TableCell>
                <TableCell className={classes.tableCell}><Typography variant="h5">{row.dayChange}</Typography></TableCell>
                <TableCell className={classes.tableCell}><Typography variant="h5">{row.dayVolume}</Typography></TableCell>
                <TableCell className={classes.tableCell}><Typography variant="h5">{row.liquidity}</Typography></TableCell>
                <TableCell className={classes.tableCell}><Typography variant="h5">{row.marketCap}</Typography></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

// Component Properties
ChartVolumes.propTypes = {}

// Component State
function ChartVolumesState(state) {
  return {}
}
export default connect(ChartVolumesState)(ChartVolumes)