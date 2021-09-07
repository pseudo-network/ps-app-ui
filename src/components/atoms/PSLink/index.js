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

  return (
    <>
      <a
        className={classes.root}
        href={props.url}
        target={props.target ? props.target : "_blank"}
        onClick={props.onClick}
        rel="noreferrer"
        style={{ color: props.color }}
      >
        {props.text}
      </a>
    </>
  )
}

export default PSLink
