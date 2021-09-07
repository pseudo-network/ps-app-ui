// React Components and Hooks
import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3px",
  },
  text: {
    display: "flex",
    alignItems: "center",
    textTransform: "none",
    fontSize: "small",
  },
  icon: {
    marginLeft: "3px",
  },
}))

const PSTextButton = (props) => {
  const classes = useStyles()

  /*
    ON RENDER FUNCTION/ MOUNT COMPENENT
  */
  return (
    <>
      <Button
        className={classes.root}
        onClick={props.onClick}
        startIcon={props.icon}
      >
        <div className={classes.text}>
          {props.text}
          {/* <div className={classes.icon}>{props.icon ?? props.icon}</div> */}
        </div>
      </Button>
    </>
  )
}

export default PSTextButton
