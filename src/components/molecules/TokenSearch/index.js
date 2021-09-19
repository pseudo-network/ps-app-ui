import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { useHistory } from "react-router-dom"
import { useToken } from "../../../contexts/tokenContext"
import { binance, cardano } from "../../../utils/supportedChains"
import { useChain } from "../../../contexts/chainContext"

const useStyles = makeStyles((theme) => ({}))

export default function TokenSearch(props) {
  const classes = useStyles()
  const [userInput, setUserInput] = useState()
  const history = useHistory()
  const tokenContext = useToken()
  const chainContext = useChain()

  useEffect(() => {
    if (userInput != "") {
      tokenContext.setSearchQuery(userInput)
    }
  }, [userInput])

  const onFieldChange = (event) => {
    setUserInput(event.target.value)
  }

  const handleSelectOptionClick = (event, value) => {
    if (value && value.address) {
      setUserInput(value.address)
      history.push(`/${chainContext.chain.route}/${value.address}`)
    }
  }

  return (
    <>
      {
        // todo: revise
        chainContext.chain != cardano ? (
          <Autocomplete
            id="combo-box-demo"
            defaultValue={props.address}
            options={tokenContext.tokens}
            getOptionLabel={(option) => {
              if (option && option.name) {
                return option.name + " : " + option.address
              } else {
                return props.address
              }
            }}
            style={{ width: 500 }}
            onChange={handleSelectOptionClick}
            renderInput={(params) => (
              <TextField
                // disabled={chainContext.chain == binance ? false : true} // todo: revise
                {...params}
                variant="outlined"
                onChange={onFieldChange}
                value={userInput}
                placeholder={"search by token address, name, or symbol..."}
              />
            )}
          />
        ) : (
          <Typography>Search Coming Soon</Typography>
        )
      }
    </>
  )
}
