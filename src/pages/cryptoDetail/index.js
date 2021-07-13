import React from "react"
import { makeStyles } from "@material-ui/core/styles"

// Redux Components
import PropTypes from "prop-types"
import { connect } from "react-redux"

import {
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Button,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
  Link,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import NavFrame from "../../components/organisms/NavFrame/NavFrame" // The top navigation bar and side navigation panel
import TVChartWithHeader from "../../components/organisms/TVChartWithHeader/TVChartWithHeader"
import LiveViewContainer from "../../components/molecules/LiveViewContainer"

const CryptoDetail = props => {
  const [currentChart, setChart] = React.useState("DAN:ROB");
  const onFieldChange = (event)=>{
    console.log("event.target.value");
    console.log(event.target.value);
    setChart(event.target.value);
  }
  return (
    <NavFrame page={"CryptoDetail"}>
      <TextField
        id="testjazz"
        label="Chart"
        type="text"
        fullWidth
        my={2}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onFieldChange}
        name="Chart"
      />
      <TVChartWithHeader symbol={currentChart}/>
      <br />
      <LiveViewContainer />
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
