// React Components and Hooks
import React from "react"

// Material UI Components
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    maxWidth: "8ch",
    color: "#A694FE",
  },
}))

const PSLabel = (props) => {
  const classes = useStyles()

  return (
    <>
      <p className={classes.root}>{props.text}</p>
    </>
  )
}

export default PSLabel
