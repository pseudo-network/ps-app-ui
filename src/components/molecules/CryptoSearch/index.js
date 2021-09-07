import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { TextField } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { useHistory } from "react-router-dom"
import { useCryptos } from "../../../contexts/cryptosContext"
import { useCrypto } from "../../../contexts/cryptoContext"

const useStyles = makeStyles((theme) => ({}))

export default function CryptoSearch(props) {
  const classes = useStyles()
  const [userInput, setUserInput] = useState("")
  const history = useHistory()
  const cryptosContext = useCryptos()
  const cryptoContext = useCrypto()

  useEffect(() => {
    if (userInput != "") {
      cryptosContext.setSearchQuery(userInput)
    }
  }, [userInput])

  const onFieldChange = (event) => {
    setUserInput(event.target.value)
  }

  const handleSelectOptionClick = (event, value) => {
    if (value && value.address) {
      setUserInput(value.address)
      history.push(`/${cryptoContext.network.route}/${value.address}`)
    }
  }

  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        defaultValue={props.address}
        options={cryptosContext.cryptos}
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
            {...params}
            variant="outlined"
            onChange={onFieldChange}
            value={userInput}
          />
        )}
      />
    </>
  )
}
