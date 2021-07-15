// React Components and Hooks
import React from "react"

// Material UI Components
import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"

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
  return <Box>Version 0.0.1 - PSHHHHHH</Box>
}

export default AddressDetail
