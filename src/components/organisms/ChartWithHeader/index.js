import React, { useEffect }from "react";
import styled, { withTheme } from "styled-components/macro";
import { makeStyles } from "@material-ui/core/styles"

import {
  Grid,
  Paper as MuiPaper,
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
  Divider as MuiDivider, 
  AppBar
} from "@material-ui/core";


import { spacing } from "@material-ui/system";

import { TVChartContainer } from "../../molecules/TVChartContainer/index";
import ChartHeader from "../../molecules/ChartHeader/index";

// Redux Components
import PropTypes from "prop-types"
import { connect } from "react-redux"

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Spacer = styled.div`
  flex: 1 1 100%;
`;


const useStyles = makeStyles((theme) => ({
    cardOuter:{
        padding: "3%",
        paddingTop: "1%",
        borderRadius: "1%",
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.alt,
        opacity: '1',
        borderStyle: 'solid',
        borderWidth: "2px",
    }
  }));

const DynamicChartWithHeader = props => {
    const classes = useStyles();

  return (
    <Grid container xs={12} spacing={2} component={Paper} className={classes.cardOuter}>
        <Grid item xs={6}>
            <ChartHeader/>
        </Grid>
        <Grid item xs={12}>
            <TVChartContainer chartName={"dynamicChart"} height={"400px"}/>
        </Grid>
    </Grid>
  )
}
// Component Properties
DynamicChartWithHeader.propTypes = {}

// Component State
function DynamicChartWithHeaderState(state) {
  return {}
}
export default connect(DynamicChartWithHeaderState)(DynamicChartWithHeader)
