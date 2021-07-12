import React , { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from "@material-ui/system";
import PropTypes from 'prop-types';

import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import styled from "styled-components/macro"
import { withStyles } from '@material-ui/core/styles';
import {getTransactions} from "../../../data/cryptoCurrency/actions"
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


export const SearchBar = (props) => {
    const [SearchResultOpen, setSearchResultOpen] = React.useState(false);
    const [SearchTarget, setSearchTarget] = React.useState(false);
    const classes = useStyles();

    const CurrentLookupTypeButton = () =>{
        return (
        <IconButton style={{padding: "0px"}}>
        { props.Icon || <SearchIcon mr={2} fontSize="small" /> }
        </IconButton>
        );
    }

    const handleSearchTargetBoxOpen = () =>{
        setSearchResultOpen(true);
    }
    const handleSearchTargetBoxClose = () =>{
        setSearchResultOpen(false);
    }

   // Default placeholder if an onsearch isnt passed
    const defaultHandleSearchTargetChange = (event) =>{
        if (event.target.value != ""){
            if (!SearchResultOpen){
                handleSearchTargetBoxOpen();
            }

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
            defaultValue={props.defaultValue || ""}
            InputProps={{ endAdornment: <CurrentLookupTypeButton /> }}
            >
        </TextField>
        <Popover 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={SearchResultOpen}
            >
            {props.cryptoCurrency.searchResults.map((item, key) => {
                return (
                    <>
                        <Typography>{item.name}</Typography>
                        <Typography>{item.network}</Typography>
                    </>
                )
            })}
        </Popover>
    </Grid>
    );
}


// Component Properties
SearchBar.propTypes = {
    cryptoCurrency: PropTypes.object.isRequired,
}

// Component State
function SearchBarState(state) {
  return {
    cryptoCurrency: state.cryptoCurrency
  }
}
export default connect(SearchBarState)(withRouter(SearchBar))


