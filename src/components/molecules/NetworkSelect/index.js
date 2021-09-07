import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  Paper,
  MenuItem,
} from "@material-ui/core"
import { useCrypto } from "../../../contexts/cryptoContext"
import { supportedNetworks } from "../../../utils/supportedNetworks"

const useStyles = makeStyles((theme) => ({}))

export default function NetworkSelect(props) {
  const classes = useStyles()
  const cryptoContext = useCrypto()

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
                <MenuList autoFocusItem={networkSelectOpen} id="menu-list-grow">
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
    </>
  )
}
