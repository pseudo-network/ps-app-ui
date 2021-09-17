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
import { useToken } from "../../../contexts/tokenContext"
import { supportedChains } from "../../../utils/supportedChains"
import { useHistory } from "react-router"

const useStyles = makeStyles((theme) => ({}))

export default function ChainSelect(props) {
  const classes = useStyles()
  const tokenContext = useToken()
  const history = useHistory()

  // chain select
  const [chainSelectOpen, setChainSelectOpen] = React.useState(false)
  const chainSelectAnchorRef = React.useRef(null)

  const handleToggleChainPopover = () => {
    setChainSelectOpen((prevOpen) => !prevOpen)
  }

  const handleCloseChainPopover = () => {
    setChainSelectOpen(false)
  }

  const handleSelectChainClick = (chain) => {
    tokenContext.setChain(chain)
    history.push(`/${chain.route}`)
    handleCloseChainPopover()
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(chainSelectOpen)
  React.useEffect(() => {
    if (prevOpen.current === true && chainSelectOpen === false) {
      chainSelectAnchorRef.current.focus()
    }

    prevOpen.current = chainSelectOpen
  }, [chainSelectOpen])

  return (
    <>
      <Button
        ref={chainSelectAnchorRef}
        aria-controls={chainSelectOpen ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggleChainPopover}
      >
        {tokenContext.chain.label}
      </Button>
      <Popper
        open={chainSelectOpen}
        anchorEl={chainSelectAnchorRef.current}
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
              <ClickAwayListener onClickAway={handleCloseChainPopover}>
                <MenuList autoFocusItem={chainSelectOpen} id="menu-list-grow">
                  {supportedChains.map((n) => (
                    <MenuItem
                      disabled={!n.enabled}
                      onClick={() => {
                        handleSelectChainClick(n)
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
