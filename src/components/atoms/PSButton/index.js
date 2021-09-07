// React Components and Hooks
import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(131, 106, 255, 0.25)",
    border: "1px solid #836AFF",
    padding: ".66em",
  },
  text: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "16ch",
    color: "#A694FE",
    fontWeight: 600,
    textTransform: "none",
  },
}))

const PSButton = (props) => {
  const classes = useStyles()

  /*
    ON RENDER FUNCTION/ MOUNT COMPENENT
  */
  return (
    <>
      <Button className={classes.root} onClick={props.onClick}>
        <div className={classes.text}>{props.text}</div>
      </Button>
    </>
  )
}

export default PSButton
