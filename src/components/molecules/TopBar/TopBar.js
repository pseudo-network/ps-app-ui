// React Components and Hooks
import React, { useState } from "react"
import { withRouter } from "react-router-dom"

// Redux Components
import { connect } from "react-redux"

// Material UI Components
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import { AppBar, Toolbar, Typography, IconButton, Box } from "@material-ui/core"
import PSButton from "../../atoms/PSButton/PSButton"
import PSLink from "../../atoms/PSLink/PSLink"
import PSDialog from "../PSDialog/PSDialog"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import PSLabel from "../../atoms/PSLabel/PSLabel"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
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
}))

const TopBar = (props) => {
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const classes = useStyles()

  const handleConnectWalletClick = () => {
    if (typeof window.ethereum !== "undefined") {
      metamask()
    }
  }

  const handleOpenDialogClick = () => {
    setDialogOpen(true)
  }

  const handleCloseDialogClick = () => {
    setDialogOpen(false)
  }

  const metamask = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" })
    const account = accounts[0]
    setAccount(account)
    getBalance(account)
    // todo: get balance
  }

  const getBalance = (accountAddress) => {
    const currencyAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7"
    const qs = `{
      ethereum {
        address(address: {is: "${accountAddress}"}) {
          balances(currency: {in: ["ETH", "${currencyAddress}"]}) {
            currency {
              symbol
            }
            value
          }
        }
      }
    }`

    fetch("https://graphql.bitquery.io", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "BQYug1u2azt1EzuPggXfnhdhzFObRW0g",
      },
      body: JSON.stringify({ query: qs }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          const balance = String(
            res?.data?.ethereum?.address[0]?.balances[0]?.value
          )
          const balanceShort = balance.substring(0, 6)
          setBalance(balanceShort)
        }
      })
  }

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(account)
  }

  const handleLogoutOnClick = () => {
    setAccount(null)
    setDialogOpen(false)
  }

  const ModalContent = () => {
    return (
      <>
        <h3>{account}</h3>
        <Box flexDirection="row">
          <PSLink
            text={"BscScan"}
            url={"https://bscscan.com/address/" + account}
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
          {!account ? (
            <>
              <PSButton
                onClick={handleConnectWalletClick}
                text={"Connect Wallet"}
              ></PSButton>
            </>
          ) : (
            <>
              <div className={classes.balance}>
                <PSLabel text={balance} />
              </div>
              <PSButton onClick={handleOpenDialogClick} text={account} />
            </>
          )}
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

// Component Properties
TopBar.propTypes = {}

// Component State
function TopBarState(state) {
  return {}
}
export default connect(TopBarState)(withRouter(TopBar))
