import React, { useEffect } from "react"
import NavFrame from "../../components/templates/NavFrame"
import TVChartNative from "../../components/molecules/TVChartNative"
import { Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import TVChartHeader from "../../components/molecules/TVChartHeader"

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    width: "100%",
    height: "calc(100vh - 444px) !important",
  },
}))

export default function Cardano(props) {
  const classes = useStyles()

  return (
    <NavFrame page={"Chart"}>
      {/* <TVChartHeader
        name={"Cardano"}
        volume={100}
        currentPrice={1000}
        symbol={"ADA"}
      /> */}
      <Box className={classes.chartContainer}>
        <TVChartNative />
      </Box>
    </NavFrame>
  )
}
