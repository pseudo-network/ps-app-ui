import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import PSCard from "../PSCard"
import { List, ListItem, ListItemText, ListSubheader } from "@material-ui/core"
import PSLink from "../../atoms/PSLink"
import { CheckBox, Info, InfoOutlined, ListAlt } from "@material-ui/icons"
import { useToken } from "../../../contexts/tokenContext"
import { Typography } from "@material-ui/core"
import { useChain } from "../../../contexts/chainContext"

const useStyles = makeStyles((theme) => ({}))

export default function TokenDetailCard(props) {
  const classes = useStyles()
  const tokenContext = useToken()
  const chainContext = useChain()

  return (
    <PSCard
      title={"Explore"}
      avatar={<ListAlt />}
      content={
        <>
          <List dense={true}>
            <ListSubheader>Blockchain Explorer</ListSubheader>
            <ListItem>
              <ListItemText
                primary={
                  <PSLink
                    text={`${tokenContext.symbol} Transactions`}
                    url={`${chainContext.chain.blockchainExplorerURL}/token/${tokenContext.address}`}
                  />
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <PSLink
                    text={`${tokenContext.symbol} Contract`}
                    url={`${chainContext.chain.blockchainExplorerURL}/address/${tokenContext.address}#code`}
                  />
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <PSLink
                    text={`${tokenContext.symbol} Holders`}
                    url={`${chainContext.chain.blockchainExplorerURL}/token/${tokenContext.address}#balances`}
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
                    url={`https://explorer.bitquery.io/${chainContext?.chain.route}/token/${tokenContext.address}`}
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
