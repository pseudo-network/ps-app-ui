import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import PSCard from "../PSCard"
import { List, ListItem, ListItemText, ListSubheader } from "@material-ui/core"
import PSLink from "../../atoms/PSLink"
import { CheckBox, Info, InfoOutlined, ListAlt } from "@material-ui/icons"
import { useToken } from "../../../contexts/tokenContext"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({}))

export default function TokenDetailCard(props) {
  const classes = useStyles()
  const tokenContext = useToken()

  return (
    <PSCard
      title={"Relevant Links"}
      avatar={<ListAlt />}
      content={
        <>
          <List dense={true}>
            <ListSubheader>BscScan</ListSubheader>
            <ListItem>
              <ListItemText
                primary={
                  <PSLink
                    text={`${tokenContext.symbol} Transactions`}
                    url={`https://bscscan.com/token/${tokenContext.address}`}
                  />
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <PSLink
                    text={`${tokenContext.symbol} Contract`}
                    url={`https://bscscan.com/address/${tokenContext.address}#code`}
                  />
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <PSLink
                    text={`${tokenContext.symbol} Holders`}
                    url={`https://bscscan.com/token/${tokenContext.address}#balances`}
                  />
                }
              />
            </ListItem>
            <ListSubheader>Bitquery</ListSubheader>{" "}
            <ListItem>
              <ListItemText
                primary={
                  <PSLink
                    text={`${tokenContext.symbol} Explorer`}
                    url={`https://explorer.bitquery.io/bsc/token/${tokenContext.address}`}
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
