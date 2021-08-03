import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import PSCard from "../PSCard/PSCard"
import { List, ListItem, ListItemText } from "@material-ui/core"
import PSLink from "../../atoms/PSLink/PSLink"
import { Info, InfoOutlined } from "@material-ui/icons"
import { useCrypto } from "../../../contexts/cryptoContext"

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
    backgroundColor: "#836AFF",
  },
  title: {
    color: "#fff",
  },
}))

export default function CryptoDetailCard(props) {
  const classes = useStyles()
  const cryptoContext = useCrypto()

  return (
    <PSCard
      title={"Links"}
      avatar={<Info />}
      content={
        <>
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary={
                  <PSLink
                    text={"Search on CoinMarketCap"}
                    url={
                      "https://coinmarketcap.com/currencies/" +
                      cryptoContext.name
                    }
                  />
                }
              />
            </ListItem>
          </List>
        </>
      }
    />
  )
}
