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
  AppBar,
  Tabs,
  Tab,
  Box
} from "@material-ui/core";


import { spacing } from "@material-ui/system";

import { TVChartContainer } from "../../molecules/TVChartContainer/index";
import ChartHeader from "../../molecules/ChartHeader/index";
import ChartVolumes from "../../molecules/ChartVolumes/index";

// Redux Components
import PropTypes from "prop-types"
import { connect } from "react-redux"

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Spacer = styled.div`
  flex: 1 1 100%;
`;

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
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
    
const [value, setValue] = React.useState(0);
const classes = useStyles();

const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container xs={12} spacing={2} component={Paper} className={classes.cardOuter}>
        <Grid item xs={6}>
            <ChartHeader/>
        </Grid>
        <Grid item xs={12}>
            <TVChartContainer chartName={"dynamicChart"} height={"400px"}/>
        </Grid>
        <Grid item xs={12}>
            <AppBar position="static">
                <Tabs value={value} 
                onChange={handleChange} 
                aria-label="Account Management Tabs"
                variant="scrollable"
                scrollButtons="auto">
                    <Tab label="Activity" {...a11yProps(0)} />
                    <Tab label="Info" {...a11yProps(1)} />
                    <Tab label="Forcast" {...a11yProps(2)} />
                </Tabs>
                </AppBar>
            <TabPanel value={value} index={0}>
              <ChartVolumes/>
            </TabPanel> 
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
