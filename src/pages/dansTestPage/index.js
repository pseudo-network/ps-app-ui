import React from "react"

import { connect } from "react-redux"
import styled from "styled-components/macro"

import { spacing } from "@material-ui/system"

// import Skeleton from '@material-ui/lab/Skeleton';
import {
  Grid,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Paper as MuiPaper,
} from "@material-ui/core"

import NavFrame from "../../components/organisms/NavFrame/NavFrame" // The top navigation bar and side navigation panel

import { TVChart } from "../../components/molecules/TVChart/index"

const Divider = styled(MuiDivider)(spacing)

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)

const Paper = styled(MuiPaper)(spacing)

const Spacer = styled.div`
  flex: 1 1 100%;
`

const DansPage = (props) => {
  if (props.user.isLoading) {
    return <NavFrame page={"DansTestPage"}>Still Loading!</NavFrame>
  }
  // Page name has to line up with component name on import in app.jsx file
  return (
    <NavFrame page={"DansTestPage"}>
      <Grid container spacing={6}>
        <Grid item xs={6} style={{ background: "orange" }}>
          <TVChart chartName={"Chart1"} height={"300px"} />
        </Grid>
        <Grid item xs={6} style={{ background: "blue" }}>
          <TVChart chartName={"Chart2"} height={"300px"} />
        </Grid>
        <Grid item xs={6} style={{ background: "green" }}>
          <TVChart chartName={"Chart3"} height={"300px"} />
        </Grid>
        <Grid item xs={6} style={{ background: "red" }}>
          <TVChart chartName={"Chart4"} height={"300px"} />
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
