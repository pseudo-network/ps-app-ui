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
  Popover,
  Grid,
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  Paper,
  MenuItem,
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
import { Link } from "react-router-dom"
import {
  CHART_URL,
  LANDING_URL,
  WEB_APP_URL,
  BLOG_URL,
} from "../../../core/environments"
import {
  CallToAction,
  InsertChart,
  LibraryBooks,
  MenuOpen,
  Web,
} from "@material-ui/icons"
import { useCrypto } from "../../../contexts/cryptoContext"
import { supportedNetworks } from "../../../utils/supportedNetworks"

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
    margin: theme.spacing(2),
  },
  titleContainer: {
    fontFamily: theme.typography.regular,
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    marginLeft: "1.2em",
  },
  title: {
    marginLeft: 13,
  },
  link: {
    paddingLeft: 10,
  },
  balance: {
    marginRight: 10,
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
  logo: {
    cursor: "pointer",
  },
  popover: {
    width: 299,
    padding: "1.2em",
  },
  appSelection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: "pointer",
  },
  appSelectionLogo: {
    display: "flex",
    justifyContent: "center",
    color: "#836AFF",
    fontSize: "15px",
  },
  appSelectionText: {
    display: "flex",
    justifyContent: "center",
    margin: ".6em",
  },
}))

export default function TopBar(props) {
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [userInput, setUserInput] = useState("")
  const history = useHistory()
  const cryptosContext = useCryptos()
  const cryptoContext = useCrypto()
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
      history.push("/" + value.address)
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
          <br />
          <div>
            <PSButton text={"logout"} onClick={handleLogoutOnClick} />
          </div>
        </Box>
      </>
    )
  }

  // side nav
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleAppMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleAppMenuClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  const handleSideNavButtonClick = () => {
    props.setOpen(!props.open)
  }

  // network select
  const [networkSelectOpen, setNetworkSelectOpen] = React.useState(false)
  const networkSelectAnchorRef = React.useRef(null)

  const handleToggleNetworkPopover = () => {
    setNetworkSelectOpen((prevOpen) => !prevOpen)
  }

  const handleCloseNetworkPopover = () => {
    setNetworkSelectOpen(false)
  }

  const handleSelectNetworkClick = (network) => {
    cryptoContext.setNetwork(network)
    handleCloseNetworkPopover()
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(networkSelectOpen)
  React.useEffect(() => {
    if (prevOpen.current === true && networkSelectOpen === false) {
      networkSelectAnchorRef.current.focus()
    }

    prevOpen.current = networkSelectOpen
  }, [networkSelectOpen])

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
          <Box className={classes.titleContainer}>
            <img
              className={classes.logo}
              src={"/imgs/ps-logo.png"}
              width={40}
              height={40}
              onClick={handleAppMenuClick}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleAppMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Grid container className={classes.popover}>
                <Grid item xs={4}>
                  <Box
                    className={classes.appSelection}
                    onClick={() => {
                      window.location = LANDING_URL
                    }}
                  >
                    <div className={classes.appSelectionLogo}>
                      <CallToAction fontSize="large" />
                    </div>
                    <p className={classes.appSelectionText}> Landing </p>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    className={classes.appSelection}
                    onClick={() => {
                      window.location = WEB_APP_URL
                    }}
                  >
                    <div className={classes.appSelectionLogo}>
                      <Web fontSize="large" />
                    </div>
                    <p className={classes.appSelectionText}> Web App </p>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    className={classes.appSelection}
                    onClick={() => {
                      window.location = CHART_URL
                    }}
                  >
                    <div className={classes.appSelectionLogo}>
                      <InsertChart fontSize="large" />
                    </div>
                    <p className={classes.appSelectionText}> Charts </p>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    className={classes.appSelection}
                    onClick={() => {
                      window.location = BLOG_URL
                    }}
                  >
                    <div className={classes.appSelectionLogo}>
                      <LibraryBooks fontSize="large" />
                    </div>
                    <p className={classes.appSelectionText}> Blog </p>
                  </Box>
                </Grid>
              </Grid>
            </Popover>
            <Typography variant="h6" className={classes.title}>
              Charts
            </Typography>
          </Box>

          <div className={classes.networkSelectContainer}>
            <Button
              ref={networkSelectAnchorRef}
              aria-controls={networkSelectOpen ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggleNetworkPopover}
            >
              {cryptoContext.network.label}
            </Button>
            <Popper
              open={networkSelectOpen}
              anchorEl={networkSelectAnchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseNetworkPopover}>
                      <MenuList
                        autoFocusItem={networkSelectOpen}
                        id="menu-list-grow"
                      >
                        {supportedNetworks.map((n) => (
                          <MenuItem
                            disabled={!n.enabled}
                            onClick={() => {
                              handleSelectNetworkClick(n)
                            }}
                          >
                            {n.enabled ? n.label : n.label}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          <div className={classes.searchContainer}>
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
          {/* <div className={classes.balance}>
            <PSLabel text={walletContext.balance} />
          </div> */}
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
