import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Grid,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  Paper,
  MenuItem,
  Button,
} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { useCryptos } from "../../../contexts/cryptosContext"
import { useWallet } from "../../../contexts/walletContext"
import { useCrypto } from "../../../contexts/cryptoContext"

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
  balancesButton: {
    backgroundColor: "rgba(131, 106, 255, 0.25)",
    border: "1px solid #836AFF",
    padding: ".66em",
  },
  balancesButtonText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "16ch",
    color: "#A694FE",
    fontWeight: 600,
    textTransform: "none",
  },
  balanceSymbol: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "20ch",
    color: "#A694FE",
    fontWeight: 600,
    textTransform: "none",
  },
  balanceAddress: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "10ch",
    textTransform: "none",
  },
}))

export default function Wallet(props) {
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

  // const ModalContent = () => {
  //   return (
  //     <>
  //       <h3>{walletContext.address}</h3>
  //       <Box flexDirection="row">
  //         <PSLink
  //           text={"BscScan"}
  //           url={"https://bscscan.com/address/" + walletContext.address}
  //         ></PSLink>
  //         <div>
  //           <PSLink
  //             className={classes.link}
  //             text={
  //               <>
  //                 Copy Account Address <FileCopyIcon />
  //               </>
  //             }
  //             onClick={copyAddressToClipboard}
  //           ></PSLink>
  //         </div>
  //         <br />
  //         <div>
  //           <PSButton text={"logout"} onClick={handleLogoutOnClick} />
  //         </div>
  //       </Box>
  //     </>
  //   )
  // }

  // balances
  const [balancesOpen, setBalancesOpen] = React.useState(false)
  const balancesAnchorRef = React.useRef(null)

  const handleToggleBalancesPopover = () => {
    setBalancesOpen((prevOpen) => !prevOpen)
  }

  const handleCloseBalancesPopover = () => {
    setBalancesOpen(false)
  }

  return (
    <>
      <Button
        className={classes.balancesButton}
        ref={balancesAnchorRef}
        aria-controls={balancesOpen ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={
          walletContext.address
            ? handleToggleBalancesPopover
            : handleConnectWalletClick
        }
      >
        <a className={classes.balancesButtonText}>
          {walletContext.address ? walletContext.address : "Connect Wallet"}
        </a>
      </Button>
      <Popper
        open={balancesOpen}
        anchorEl={balancesAnchorRef.current}
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
              <ClickAwayListener onClickAway={handleCloseBalancesPopover}>
                {/* todo: search bar */}

                <MenuList autoFocusItem={balancesOpen} id="menu-list-grow">
                  {walletContext.balances.map((b) => (
                    <MenuItem
                      onClick={() => {
                        // handleSelectNetworkClick(n)
                      }}
                    >
                      <Grid>
                        <Grid container item>
                          <span className={classes.balanceSymbol}>
                            {b.currency.symbol}
                          </span>
                        </Grid>
                        <Grid container item>
                          <span className={classes.balanceAddress}>
                            {" "}
                            {b.currency.address}
                          </span>
                        </Grid>
                        {/* <span className={classes.balanceSymbol}>
                                {b.currency.symbol}
                              </span>
                              <span className={classes.balanceAddress}></span> */}
                      </Grid>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
