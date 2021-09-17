import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import { AppBar, Toolbar } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { useHistory } from "react-router-dom"
import { useTokens } from "../../../contexts/tokensContext"
import { useWallet } from "../../../contexts/walletContext"
import { useToken } from "../../../contexts/tokenContext"
import Wallet from "../../molecules/Wallet"
import ChainSelect from "../../molecules/ChainSelect"
import AppSelect from "../../molecules/AppSelect"
import TokenSearch from "../../molecules/TokenSearch"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    paddingTop: ".60em",
    paddingBottom: ".60em",
    borderBottom: `.01px solid ${theme.palette.text.disabled}`,
  },
  menuButton: {
    margin: theme.spacing(2),
  },
  titleContainer: {
    fontFamily: theme.typography.regular,
    alignItems: "center",
    alignContent: "center",
    display: "flex",
  },
  chainSelectContainer: {
    display: "flex",
    margin: "auto",
    flexGrow: 1,
    justifyContent: "center",
  },
  searchContainer: {
    flexGrow: 1,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // marginRight: theme.spacing(2),
    marginRight: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      // marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
}))

export default function TopBar(props) {
  const classes = useStyles()
  const [userInput, setUserInput] = useState("")

  useEffect(() => {
    if (userInput != "") {
      tokensContext.setSearchQuery(userInput)
    }
  }, [userInput])

  const handleSideNavButtonClick = () => {
    props.setOpen(!props.open)
  }

  return (
    <>
      <AppBar elevation={0} position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* <div>
            <MenuIcon
              style={{ cursor: "pointer" }}
              onClick={handleSideNavButtonClick}
            />
          </div> */}
          <div className={classes.titleContainer}>
            <AppSelect />
          </div>

          <div className={classes.chainSelectContainer}>
            <ChainSelect />
          </div>

          <div className={classes.searchContainer}>
            <TokenSearch address={props.address} />
          </div>

          <div>
            <Wallet />
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}
