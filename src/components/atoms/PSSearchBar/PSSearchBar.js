import React , { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from "@material-ui/system";
import PropTypes from 'prop-types';

import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import styled from "styled-components/macro"
import { withStyles } from '@material-ui/core/styles';
import {getTransactions, searchCoins} from "../../../data/cryptoCurrency/actions"
import {
    Checkbox, Grid, 
    ButtonGroup, IconButton, Link, Breadcrumbs as MuiBreadcrumbs, Divider as MuiDivider,Paper as MuiPaper, Table, TableBody, TableContainer, TableCell,
    TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Tooltip, Typography, FormControlLabel, Switch, Menu, MenuItem, TextField as MuiTextField, Button as MuiButton,
     InputLabel, Select, Input, 
    Card as MuiCard,
    CardContent,
    FormControl as MuiFormControl,
    CircularProgress as MuiCircularProgress,
  } from "@material-ui/core";
  import Popover from '@material-ui/core/Popover';
import SearchIcon from '@material-ui/icons/Search';

import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import Collapse from "@material-ui/core/Collapse"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined"
import NightsStayIcon from "@material-ui/icons/NightsStay"
import TimelineIcon from "@material-ui/icons/Timeline"
import FolderOpenIcon from "@material-ui/icons/FolderOpen"
import TopBar from "../../molecules/TopBar/TopBar"
import SocialMediaRow from "../../molecules/SocialMediaRow/SocialMediaRow"
import Watermark from "../../molecules/Watermark/Watermark"

const useStyles = makeStyles((theme) => ({
    defaultSearchStyling: {
        backgroundColor: theme.palette.grey[900],
        borderColor: "#836AFF",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: "8px",
        color: "#836AFF",
        margin: "0px",
        paddingTop: "0px",
        paddingBottom: "0px",
    },
    baseStyling: {
        paddingRight: "1em"
    }
  }));
  

  const FormControl = styled(MuiFormControl)(spacing);
  const TextField = styled(MuiTextField)(spacing);

const SearchBar = (props) => {
    const [SearchResultOpen, setSearchResultOpen] = React.useState(false);
    const classes = useStyles();

    const CurrentLookupTypeButton = () =>{
        return (
        <IconButton style={{padding: "0px"}}>
        { props.Icon || <SearchIcon mr={2} fontSize="small" /> }
        </IconButton>
        );
    }

    const handleSearchTargetBoxOpen = (event) =>{
        setSearchResultOpen(true);
    }
    const handleSearchTargetBoxClose = () =>{
        setSearchResultOpen(false);
    }

   // Default placeholder if an onsearch isnt passed
    const defaultHandleSearchTargetChange = (event) =>{
        if (event.target.value != ""){
            if (!SearchResultOpen){
                handleSearchTargetBoxOpen(event);
            }
            props.searchCoins(event.target.value);
        }
        else {
            if (SearchResultOpen){
                handleSearchTargetBoxClose();
            }
        }
    }

    return (
    <Grid xs={4} s={4} className={classes.baseStyling}>
        <TextField
            className={classes.defaultSearchStyling}

            variant="outlined"
            id={"searchTarget"}
            type={"text"}
            onChange={defaultHandleSearchTargetChange}
            autoFocus={"autofocus"} 
            placeholder={"Search Coins"}
            name={"searchTarget"}
            size={"small"}
            fullWidth
            autoComplete='off'
            defaultValue={props.defaultValue || ""}
            InputProps={{ 
                endAdornment: <CurrentLookupTypeButton /> 
            }}
            >
        </TextField>
        {SearchResultOpen ? <ExpandLess /> : <ExpandMore />}
        <Collapse in={SearchResultOpen}>
          <List component="div" disablePadding>
            {props.cryptoCurrencies.searchResults.map((item, key) => {
                return (
                    <>
                    <ListItem
                        button
                        onClick={e => props.history.push(``)}
                    >
                        <ListItemText component={"h3"} primary={item.name} secondary={item.network} />
                    </ListItem>
                    </>
                )
            })}
          </List>
        </Collapse>

        {/*
        <Popover 
            id="searchbarPopup"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={SearchResultOpen}
            anchorEl={anchorEl}
            onClose={handleSearchTargetBoxClose}
            >
            <Typography>item.name</Typography>
            <Typography>item.network</Typography>
            <Typography>item.name</Typography>
            <Typography>item.network</Typography>
            <Typography>item.name</Typography>
            <Typography>item.network</Typography>
            
        </Popover>*/}
    </Grid>
    );
}


// Component Properties
SearchBar.propTypes = {
    cryptoCurrencies: PropTypes.object.isRequired,
    searchCoins: PropTypes.func.isRequired
}

// Component State
function SearchBarState(state) {
  return {
    cryptoCurrencies: state.cryptoCurrencies
  }
}
export default connect(SearchBarState, {searchCoins})(withRouter(SearchBar))


