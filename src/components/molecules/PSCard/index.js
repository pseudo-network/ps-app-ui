import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { red } from "@material-ui/core/colors"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { Videocam } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: 233,
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
    color: "#fff",
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
