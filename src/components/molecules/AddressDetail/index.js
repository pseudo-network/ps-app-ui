// React Components and Hooks
import React from "react"

// Material UI Components
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.pallete.secondary,
  },
}))

const AddressDetail = (props) => {
  const classes = useStyles()

  /*
    ON RENDER FUNCTION/ MOUNT COMPENENT
  */
  return <>hi!</>
}

export default AddressDetail
