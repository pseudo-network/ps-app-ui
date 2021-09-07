import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import { AppBar, Toolbar } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { useHistory } from "react-router-dom"
import { useCryptos } from "../../../contexts/cryptosContext"
import { useWallet } from "../../../contexts/walletContext"
import { useCrypto } from "../../../contexts/cryptoContext"
import Wallet from "../../molecules/Wallet"
import NetworkSelect from "../../molecules/NetworkSelect"
import AppSelect from "../../molecules/AppSelect"
import CryptoSearch from "../../molecules/CryptoSearch"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    paddingTop: ".60em",
    paddingBottom: ".60em",
    borderBottom: ".01px solid #545761",
  },
  menuButton: {
    margin: theme.spacing(2),
  },
  titleContainer: {
    fontFamily: theme.typography.regular,
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    marginLeft: "1.2em",
  },
  networkSelectContainer: {
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
      cryptosContext.setSearchQuery(userInput)
    }
  }, [userInput])

  const handleSideNavButtonClick = () => {
    props.setOpen(!props.open)
  }

  return (
    <>
      <AppBar elevation={0} position="fixed" className={classes.appBar}>
        <Toolbar>
          <div>
            <MenuIcon
              style={{ cursor: "pointer" }}
              onClick={handleSideNavButtonClick}
            />
          </div>
          <div className={classes.titleContainer}>
            <AppSelect />
          </div>

          <div className={classes.networkSelectContainer}>
            <NetworkSelect />
          </div>

          <div className={classes.searchContainer}>
            <CryptoSearch address={props.address} />
          </div>

          <div>
            <Wallet />
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}
