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
import { get } from "../../../data/cryptos/actions"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"

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

const TopBar = (props) => {
  const classes = useStyles()
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [userInput, setUserInput] = useState("")
  const history = useHistory()

  useEffect(() => {
    if (userInput != "") {
      props.get(userInput)
      // console.log("callepd")
    }
  }, [userInput])

  const metamask = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" })
    const account = accounts[0]
    setAccount(account)
    getBalance(account)
  }

  // todo: cleanup
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
      // history.push("/" + value.address)
      setUserInput(value.address)
      window.location.href = "/" + value.address // todo: unecessarily rerenders the whole page
    }
  }

  const handleOpenDialogClick = () => {
    setDialogOpen(true)
  }

  const handleCloseDialogClick = () => {
    setDialogOpen(false)
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
          <div className={classes.search}>
            <Autocomplete
              id="combo-box-demo"
              defaultValue={props.address}
              options={props.cryptos?.cryptos}
              getOptionLabel={(option) => {
                if (option && option.name) {
                  return option.name + ":" + option.address
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
TopBar.propTypes = {
  user: PropTypes.object.isRequired,
  cryptos: PropTypes.object.isRequired,
  get: PropTypes.func.isRequired,
}

// Component State
function TopBarState(state) {
  return {
    user: state.user,
    cryptos: state.cryptos,
  }
}
export default connect(TopBarState, { get })(withRouter(TopBar))
