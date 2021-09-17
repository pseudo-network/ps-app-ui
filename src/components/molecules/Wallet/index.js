import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Popper,
  Grow,
  ClickAwayListener,
  Paper,
  Button,
  ListSubheader,
  ListItem,
  ListItemText,
  List,
  Typography,
} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { useTokens } from "../../../contexts/tokensContext"
import { useWallet } from "../../../contexts/walletContext"
import { useToken } from "../../../contexts/tokenContext"
import { abbreviateAddress, abbreviateBalance } from "../../../utils/utils"
import PSLink from "../../atoms/PSLink"
import PSTextButton from "../../atoms/PSTextButton"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import { Close } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  balancesButton: {
    // backgroundColor: "rgba(131, 106, 255, 0.25)",
    // border: "1px solid #836AFF",
    color: theme.palette.text.psPurple,
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
    color: theme.palette.text.psPurple,
    fontWeight: 600,
    textTransform: "none",
  },
  balanceAddress: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "10ch",
    textTransform: "none",
    color: theme.palette.text.disabled,
  },
  balanceValue: {
    textAlign: "right",
  },
  balance: {
    cursor: "pointer",
    "&:hover": {
      opacity: 0.7,
    },
    display: "flex",
  },
  popover: {
    width: 250,
  },
  subheader: {
    color: "white",
    width: "100%",
  },
  link: {
    color: "#ACB0BB",
  },
  caption: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  holdingsList: {
    marginTop: 13,
    maxHeight: 333,
    overflowY: "scroll",
  },
}))

export default function Wallet(props) {
  const classes = useStyles()
  const [userInput, setUserInput] = useState("")
  const tokensContext = useTokens()
  const walletContext = useWallet()
  const history = useHistory()
  const tokenContext = useToken()

  useEffect(() => {
    if (userInput != "") {
      tokensContext.setSearchQuery(userInput)
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

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(walletContext.address)
  }

  const handleDisconnectClick = () => {
    walletContext.setAddress(null)
    setBalancesOpen(false)
  }

  const [balancesOpen, setBalancesOpen] = React.useState(false)
  const balancesAnchorRef = React.useRef(null)

  const handleToggleBalancesPopover = () => {
    setBalancesOpen((prevOpen) => !prevOpen)
  }

  const handleCloseBalancesPopover = () => {
    setBalancesOpen(false)
  }

  const handleSelectOptionClick = (address) => {
    history.push(`/${tokenContext.chain.route}/${address}`)
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
        className={classes.popover}
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
                <List dense={true} className={classes.root} subheader={<li />}>
                  <li className={classes.listSection}>
                    <ul style={{ padding: 0 }}>
                      <ListSubheader>Profile</ListSubheader>
                      <ListItem>
                        <ListItemText
                          primary={
                            <PSTextButton
                              text="Copy Address"
                              icon={<FileCopyIcon fontSize="small" />}
                              onClick={copyAddressToClipboard}
                            />
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <PSTextButton
                              text={"Disconnect Wallet"}
                              icon={<Close fontSize="small" />}
                              onClick={handleDisconnectClick}
                            />
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <PSLink
                              text={"View on BscScan"}
                              url={
                                "https://bscscan.com/address/" +
                                walletContext.address
                              }
                            ></PSLink>
                          }
                        />
                      </ListItem>
                    </ul>
                  </li>
                  <li>
                    <ul style={{ padding: 0 }}>
                      <ListSubheader>
                        Holdings
                        <br />
                      </ListSubheader>
                      <Typography
                        className={classes.caption}
                        variant="caption"
                        component="p"
                      >
                        (balances may be inaccurate)
                      </Typography>
                      <div className={classes.holdingsList}>
                        {walletContext.balances &&
                        walletContext.balances.length > 0 ? (
                          walletContext.balances.map((b) => (
                            <ListItem
                              className={classes.balance}
                              onClick={() => {
                                handleSelectOptionClick(b.currency.address)
                              }}
                            >
                              <ListItemText
                                onClick={() => {
                                  handleSelectOptionClick(b.currency.address)
                                }}
                                primary={
                                  <a className={classes.balanceSymbol}>
                                    {b.currency.symbol}
                                  </a>
                                }
                                secondary={
                                  <a className={classes.balanceAddress}>
                                    {abbreviateAddress(b.currency.address)}
                                  </a>
                                }
                              />
                              <a className={classes.balanceValue}>
                                {abbreviateBalance(b.value.toString())}
                              </a>
                            </ListItem>
                          ))
                        ) : (
                          <ListItem>
                            <ListItemText primary={<a>No holdings found</a>} />
                          </ListItem>
                        )}
                      </div>
                    </ul>
                  </li>
                </List>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
