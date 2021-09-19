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
import { supportedChains } from "../../../utils/supportedChains"
import { useHistory } from "react-router-dom"
import { useChain } from "../../../contexts/chainContext"

const useStyles = makeStyles((theme) => ({
  chainSelectButton: {
    color: theme.palette.text.psPurple,
    padding: ".66em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "16ch",
    fontWeight: 600,
    textTransform: "none",
  },
  chainSelectItem: {
    color: theme.palette.text.psPurple,
    fontWeight: 600,
  },
}))

export default function ChainSelect(props) {
  const classes = useStyles()
  const chainContext = useChain()
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
    chainContext.setChain(chain)
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
        className={classes.chainSelectButton}
        ref={chainSelectAnchorRef}
        aria-controls={chainSelectOpen ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggleChainPopover}
      >
        {chainContext.chain.label}
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
                      className={classes.chainSelectItem}
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
