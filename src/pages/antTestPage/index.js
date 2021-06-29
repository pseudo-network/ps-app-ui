import React from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles";
// Redux Components
import PropTypes from "prop-types"

import { connect } from "react-redux"
import styled from "styled-components/macro";

import { spacing } from "@material-ui/system";

import EditIcon from '@material-ui/icons/Edit';
import {
  Checkbox, Grid, IconButton, Link, Breadcrumbs as MuiBreadcrumbs, Divider as MuiDivider,Paper as MuiPaper, TableBody, TableContainer, TableCell,
  TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Tooltip, Typography, FormControlLabel, Switch, Menu, MenuItem, TextField, Button as MuiButton,
  FormControl, InputLabel, Select, Input
} from "@material-ui/core";
import { Column, Table } from 'react-virtualized';

import NavFrame from "../../components/organisms/navigation/MainNavigationFrame"
import LiveViewContainer from "../../components/molecules/LiveViewContainer" 
// import LiveViewData from "../../components/molecules/LiveViewContainer/api/transactionProvider.js"

import { TVChartContainer } from "../../components/molecules/TVChartContainer/index"



const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Spacer = styled.div`
  flex: 1 1 100%;
`;

// Table data as an array of objects
const list = [
    { name: 'Brian Vaughn', description: 'Software engineer' }
    // And so on...
  ];

const AntPage = props => {
    if (props.user.isLoading){
        return <NavFrame page={"AntTestPage"}>Still Loading!</NavFrame>
    }
    // Page name has to line up with component name on import in app.jsx file
  return (
  <NavFrame page={"AntTestPage"}>
    <LiveViewContainer/>
  </NavFrame>)
}
// Component Properties
AntPage.propTypes = {}

// Component State
function AntPageState(state) {
  return {
      user: state.user
  }
}
export default connect(AntPageState)(AntPage)
