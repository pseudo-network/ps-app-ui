import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { TextField, Typography } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { useHistory } from "react-router-dom"
import { useTokens } from "../../../contexts/tokensContext"
import { useToken } from "../../../contexts/tokenContext"
import { binance } from "../../../utils/supportedChains"

const useStyles = makeStyles((theme) => ({}))

export default function TokenSearch(props) {
  const classes = useStyles()
  const [userInput, setUserInput] = useState()
  const history = useHistory()
  const tokensContext = useTokens()
  const tokenContext = useToken()

  useEffect(() => {
    if (userInput != "") {
      tokensContext.setSearchQuery(userInput)
    }
  }, [userInput])

  const onFieldChange = (event) => {
    setUserInput(event.target.value)
  }

  const handleSelectOptionClick = (event, value) => {
    if (value && value.address) {
      setUserInput(value.address)
      history.push(`/${tokenContext.chain.route}/${value.address}`)
    }
  }

  return (
    <>
      {
        // todo: revise
        tokenContext.chain == binance ? (
          <Autocomplete
            id="combo-box-demo"
            defaultValue={props.address}
            options={tokensContext.tokens}
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
                // disabled={tokensContext.chain == binance ? false : true} // todo: revise
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
