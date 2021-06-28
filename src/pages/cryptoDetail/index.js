import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { TVChartContainer } from "../../components/molecules/TVChartContainer/index"
import DynamicChartWithHeader from "../../components/organisms/ChartWithHeaderAndWidgets/index"
import styled, { withTheme } from "styled-components/macro";

import {
  Grid,
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
  Paper as MuiPaper, 
  AppBar
} from "@material-ui/core";

// Redux Components
import PropTypes from "prop-types"
import { connect } from "react-redux"

import NavFrame from "../../components/organisms/navigation/MainNavigationFrame" // The top navigation bar and side navigation panel

import { spacing } from "@material-ui/system";

const Paper = styled(MuiPaper)(spacing);

const useStyles = makeStyles({
  basePage: {
    padding: '1%',
    margin: '1%',
  },
});

const CryptoDetail = props => {

  const classes = useStyles();

  return (
    <NavFrame page={"CryptoDetail"} xs={12}>
      <Grid container xs={12} spacing={2} className={classes.basePage}>
          <Grid item xs={12}>
              <DynamicChartWithHeader />
          </Grid>
          <Grid item xs={12}>
              <TVChartContainer  chartName={"standardChart"} height={"900px"}/>
          </Grid>
      </Grid>
    </NavFrame>
  )
}
// Component Properties
CryptoDetail.propTypes = {}

// Component State
function CryptoDetailState(state) {
  return {}
}
export default connect(CryptoDetailState)(CryptoDetail)
