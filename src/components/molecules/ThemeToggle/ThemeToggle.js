// React Components and Hooks
import React from "react"

// Material UI Components
import { makeStyles } from "@material-ui/core/styles"
import { IconButton, Box } from "@material-ui/core"
import { WbSunny, NightsStay } from "@material-ui/icons"
import { useAppTheme } from "../../../contexts/appThemeContext"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
  },
  selected: {
    color: theme.highlight,
  },
  unselectedLight: {
    color: "lightgray",
  },
  unselectedDark: {
    color: "gray",
  },
}))

const ThemeToggle = (props) => {
  const classes = useStyles()
  const appThemeContext = useAppTheme()

  return (
    <Box className={classes.root}>
      <IconButton
        className={
          appThemeContext.darkMode ? classes.unselectedDark : classes.selected
        }
        aria-label="menu"
        onClick={() => {
          appThemeContext.setDarkMode(false)
        }}
      >
        <WbSunny />
      </IconButton>
      <IconButton
        className={
          !appThemeContext.darkMode ? classes.unselectedLight : classes.selected
        }
        aria-label="menu"
        onClick={() => {
          appThemeContext.setDarkMode(true)
        }}
      >
        <NightsStay />
      </IconButton>
    </Box>
  )
}

export default ThemeToggle
