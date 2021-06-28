//React Components and Hooks
import React, { useState, useRef, useEffect, withStyles } from "react"
import { withRouter } from "react-router-dom"

// Redux Components
import PropTypes from "prop-types"
import { connect } from "react-redux"

//Material UI Components
import { makeStyles, useTheme } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  Button,
  Grid,
  Box,
} from "@material-ui/core"
import PSButton from "../../atoms/PSButton/PSButton"
import PSLink from "../../atoms/PSLink/PSLink"
import PSDialog from "../PSDialog/PSDialog"
import FileCopyIcon from "@material-ui/icons/FileCopy"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // padding: ".5em",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#ACB0BB",
  },
  link: {
    paddingLeft: 10,
  },
}))

const TopBar = props => {
  const [account, setAccount] = useState(null)
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

  /*
    ON RENDER FUNCTION/ MOUNT COMPENENT
  */
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
            <PSButton
              onClick={handleConnectWalletClick}
              text={"Connect Wallet"}
            ></PSButton>
          ) : (
            <PSButton onClick={handleOpenDialogClick} text={account} />
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
