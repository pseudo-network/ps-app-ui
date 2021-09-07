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
} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { useCryptos } from "../../../contexts/cryptosContext"
import { useWallet } from "../../../contexts/walletContext"
import { useCrypto } from "../../../contexts/cryptoContext"
import { abbreviateAddress } from "../../../utils/utils"
import PSLink from "../../atoms/PSLink"

const useStyles = makeStyles((theme) => ({
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
    color: "#ACB0BB",
  },
  balance: {
    cursor: "pointer",
  },
  popover: {
    width: 200,
  },
  subheader: {
    color: "white",
  },
  link: {
    color: "#ACB0BB",
  },
}))

export default function Wallet(props) {
  const classes = useStyles()
  const [userInput, setUserInput] = useState("")
  const cryptosContext = useCryptos()
  const walletContext = useWallet()
  const history = useHistory()
  const cryptoContext = useCrypto()

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

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(walletContext.address)
  }

  const handleDisconnectClick = () => {
    walletContext.setAddress(null)
    setDialogOpen(false)
    handleToggleBalancesPopover()
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
    history.push(`/${cryptoContext.network.route}/${address}`)
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
                      <ListSubheader className={classes.subheader}>
                        Profile
                      </ListSubheader>
                      <ListItem>
                        <ListItemText
                          primary={
                            <PSLink
                              text={"BscScan"}
                              url={
                                "https://bscscan.com/address/" +
                                walletContext.address
                              }
                            ></PSLink>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <PSLink
                              text={"Disconnect"}
                              onClick={handleDisconnectClick}
                            ></PSLink>
                          }
                        />
                      </ListItem>
                      <ListSubheader className={classes.subheader}>
                        Holdings
                      </ListSubheader>
                      {walletContext.balances &&
                        walletContext.balances.map((b) => (
                          <ListItem className={classes.balance}>
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
                          </ListItem>
                        ))}
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
