import {
  Paper,
  Avatar as MuiAvatar,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card,
  CardContent,
  Divider as MuiDivider,
  Grid,
  LinearProgress as MuiLinearProgress,
  Typography,
} from "@material-ui/core"

import styled, { withTheme } from "styled-components/macro"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { spacing } from "@material-ui/system"

// Redux Components
import { connect } from "react-redux"
import NavFrame from "../../components/organisms/navigation/MainNavigationFrame" // The top navigation bar and side navigation panel

const drawerWidth = 240

const Divider = styled(MuiDivider)(spacing)

const CryptoDetail = props => {
  return (
    <NavFrame page={"CryptoDetail"}>
      <Grid container spacing={2} xs={12} sm={12} md={12} lg={12}>
        <Grid item>
          <TVChartContainer xs={12} sm={12} md={12} lg={12} />
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
