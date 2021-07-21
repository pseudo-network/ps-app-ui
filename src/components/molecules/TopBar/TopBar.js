import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  InputBase,
  TextField,
} from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import PSButton from "../../atoms/PSButton/PSButton"
import PSLink from "../../atoms/PSLink/PSLink"
import PSDialog from "../PSDialog/PSDialog"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import PSLabel from "../../atoms/PSLabel/PSLabel"
import SearchIcon from "@material-ui/icons/Search"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import { useCryptos } from "../../../contexts/cryptosContext"
import { useWallet } from "../../../contexts/walletContext"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    paddingTop: ".60em",
    paddingBottom: ".60em",
    borderBottom: ".01px solid #545761",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#ACB0BB",
    fontWeight: 600,
  },
  link: {
    paddingLeft: 10,
  },
  balance: {
    marginRight: 10,
  },
  search: {
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
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}))

export default function TopBar(props) {
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [userInput, setUserInput] = useState("")
  const history = useHistory()
  const cryptosContext = useCryptos()
  const walletContext = useWallet()

  useEffect(() => {
    if (userInput != "") {
      cryptosContext.setSearchQuery(userInput)
    }
  }, [userInput])

  const metamask = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" })
    const address = accounts[0]
    walletContext.setAddress(address)
  }

  const handleConnectWalletClick = () => {
    if (typeof window.ethereum !== "undefined") {
      metamask()
    }
  }

  const onFieldChange = (event) => {
    setUserInput(event.target.value)
  }

  const handleSelectOptionClick = (event, value) => {
    if (value && value.address) {
      setUserInput(value.address)
      history.push("/chart/" + value.address)
    }
  }

  const handleOpenDialogClick = () => {
    setDialogOpen(true)
  }

  const handleCloseDialogClick = () => {
    setDialogOpen(false)
  }

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(walletContext.address)
  }

  const handleLogoutOnClick = () => {
    walletContext.setAddress(null)
    setDialogOpen(false)
  }

  const ModalContent = () => {
    return (
      <>
        <h3>{walletContext.address}</h3>
        <Box flexDirection="row">
          <PSLink
            text={"BscScan"}
            url={"https://bscscan.com/address/" + walletContext.address}
          ></PSLink>
          <div>
            <PSLink
              className={classes.link}
              text={
                <>
                  Copy Account Address <FileCopyIcon />
                </>
              }
              onClick={copyAddressToClipboard}
            ></PSLink>
          </div>
          <div>
            <PSButton text={"logout"} onClick={handleLogoutOnClick} />
          </div>
        </Box>
      </>
    )
  }

  return (
    <>
      <AppBar elevation={0} position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pseudonetwork
          </Typography>
          <div className={classes.search}>
            <Autocomplete
              id="combo-box-demo"
              defaultValue={props.address}
              options={cryptosContext.cryptos}
              getOptionLabel={(option) => {
                if (option && option.name) {
                  return option.name + " : " + option.address
                } else {
                  return props.address
                }
              }}
              style={{ width: 500 }}
              onChange={handleSelectOptionClick}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  onChange={onFieldChange}
                  value={userInput}
                />
              )}
            />
          </div>
          <div className={classes.balance}>
            <PSLabel text={walletContext.balance} />
          </div>
          <PSButton
            onClick={
              walletContext.address
                ? handleOpenDialogClick
                : handleConnectWalletClick
            }
            text={
              walletContext.address ? walletContext.address : "Connect Wallet"
            }
          />
        </Toolbar>
      </AppBar>
      <PSDialog
        open={dialogOpen}
        handleClose={handleCloseDialogClick}
        title={"Your Wallet"}
        content={<ModalContent />}
      />
    </>
  )
}
