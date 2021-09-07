import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#ACB0BB",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      textDecorationLine: "underline",
    },
  },
  icon: {
    marginLeft: "3px",
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
        style={{ color: props.color, display: "flex", alignItems: "center" }}
      >
        {props.text}
        <div className={classes.icon}>{props.icon ?? props.icon}</div>
      </a>
    </>
  )
}

export default PSLink
