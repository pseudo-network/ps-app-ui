// React Components and Hooks
import React from "react"

// Material UI Components
import { makeStyles } from "@material-ui/core/styles"
import { IconButton, Box } from "@material-ui/core"
import { Reddit, Twitter, YouTube, Facebook } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    // backgroundColor: theme.pallete.secondary,
  },
}))

const AddressDetail = (props) => {
  const classes = useStyles()

  /*
    ON RENDER FUNCTION/ MOUNT COMPENENT
  */
  return (
    <Box className={classes.root}>
      <IconButton
        aria-label="menu"
        onClick={() => {
          window.open("https://twitter.com/CoinPseudo", "_blank")
        }}
      >
        <Twitter />
      </IconButton>
      <IconButton
        aria-label="menu"
        onClick={() => {
          window.open(
            "https://www.reddit.com/search/?q=PseudoCoinOfficial",
            "_blank"
          )
        }}
      >
        <Reddit />
      </IconButton>
      <IconButton
        aria-label="menu"
        onClick={() => {
          window.open(
            "https://www.youtube.com/channel/UC3wTWqqyc-OlDMyMajvjyHg",
            "_blank"
          )
        }}
      >
        <YouTube />
      </IconButton>
      <IconButton
        aria-label="menu"
        onClick={() => {
          window.open("https://twitter.com/CoinPseudo", "_blank")
        }}
      >
        <Facebook />
      </IconButton>
    </Box>
  )
}

export default AddressDetail
