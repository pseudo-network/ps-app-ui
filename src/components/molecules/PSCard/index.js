import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // minHeight: 233,
    color: theme.palette.secondary,
  },
  media: {
    width: "100%",
    height: "100%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    color: "#836AFF",
  },
  title: {
    color: theme.palette.secondary,
    display: "flex",
  },
  cardContent: {
    paddingTop: 0,
  },
}))

export default function PSCard(props) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      {props.title && (
        <CardHeader
          avatar={
            props.avatar && <div className={classes.avatar}>{props.avatar}</div>
          }
          className={classes.title}
          title={props.title}
          subheader={props.subheader}
        />
      )}
      {props.content && (
        <CardContent className={classes.cardContent}>
          {props.content}
        </CardContent>
      )}
    </Card>
  )
}
