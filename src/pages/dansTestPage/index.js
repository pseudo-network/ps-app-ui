import React from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
// Redux Components
import PropTypes from "prop-types"

import { connect } from "react-redux"
import styled from "styled-components/macro"

import { spacing } from "@material-ui/system"
//import Skeleton from '@material-ui/lab/Skeleton';
import EditIcon from "@material-ui/icons/Edit"
import {
  Checkbox,
  Grid,
  IconButton,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  FormControlLabel,
  Switch,
  Menu,
  MenuItem,
  TextField,
  Button as MuiButton,
  FormControl,
  InputLabel,
  Select,
  Input,
} from "@material-ui/core"

import NavFrame from "../../components/organisms/NavFrame/NavFrame" // The top navigation bar and side navigation panel

import { TVChartContainer } from "../../components/molecules/TVChartContainer/index"

const Divider = styled(MuiDivider)(spacing)

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)

const Paper = styled(MuiPaper)(spacing)

const Spacer = styled.div`
  flex: 1 1 100%;
`

const DansPage = props => {
  if (props.user.isLoading) {
    return <NavFrame page={"DansTestPage"}>Still Loading!</NavFrame>
  }
  // Page name has to line up with component name on import in app.jsx file
  return (
    <NavFrame page={"DansTestPage"}>
      <Grid container spacing={6}>
        <Grid item xs={6} style={{ background: "orange" }}>
          <TVChartContainer chartName={"Chart1"} height={"300px"} />
        </Grid>
        <Grid item xs={6} style={{ background: "blue" }}>
          <TVChartContainer chartName={"Chart2"} height={"300px"} />
        </Grid>
        <Grid item xs={6} style={{ background: "green" }}>
          <TVChartContainer chartName={"Chart3"} height={"300px"} />
        </Grid>
        <Grid item xs={6} style={{ background: "red" }}>
          <TVChartContainer chartName={"Chart4"} height={"300px"} />
        </Grid>
      </Grid>
    </NavFrame>
  )
}
// Component Properties
DansPage.propTypes = {}

// Component State
function DansPageState(state) {
  return {
    user: state.user,
  }
}
export default connect(DansPageState)(DansPage)
