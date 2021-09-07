import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import PSCard from "../PSCard"
import { List, ListItem, ListItemText } from "@material-ui/core"
import PSLink from "../../atoms/PSLink"
import { CheckBox, Info, InfoOutlined, ListAlt } from "@material-ui/icons"
import { useCrypto } from "../../../contexts/cryptoContext"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({}))

export default function CryptoDetailCard(props) {
  const classes = useStyles()
  const cryptoContext = useCrypto()

  return (
    <PSCard
      title={"Relevant Links"}
      avatar={<ListAlt />}
      content={
        <>
          <List dense={true}>
            <Typography>BscScan</Typography>

            <ListItem>
              <ListItemText
                primary={
                  <PSLink
                    text={`${cryptoContext.symbol} Transactions`}
                    url={`https://bscscan.com/token/${cryptoContext.address}`}
                  />
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <PSLink
                    text={`${cryptoContext.symbol} Contract`}
                    url={`https://bscscan.com/address/${cryptoContext.address}#code`}
                  />
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <PSLink
                    text={`${cryptoContext.symbol} Holders`}
                    url={`https://bscscan.com/token/${cryptoContext.address}#balances`}
                  />
                }
              />
            </ListItem>
            <Typography>Bitquery</Typography>
            <ListItem>
              <ListItemText
                primary={
                  <PSLink
                    text={`${cryptoContext.symbol} Explorer`}
                    url={`https://explorer.bitquery.io/bsc/token/${cryptoContext.address}`}
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
