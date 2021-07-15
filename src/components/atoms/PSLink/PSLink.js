// React Components and Hooks
import React from "react"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    cursor: "pointer",
  },
}))

const PSLink = (props) => {
  const classes = useStyles()

  /*
    ON RENDER FUNCTION/ MOUNT COMPENENT
  */
  return (
    <>
      <a
        className={classes.root}
        color="inherit"
        href={props.url}
        onClick={props.onClick}
      >
        {props.text}
      </a>
    </>
  )
}

export default PSLink
