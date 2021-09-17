import React, { useEffect } from "react"
import NavFrame from "../../components/templates/NavFrame"
import { useToken } from "../../contexts/tokenContext"
import TVChartWithHeader from "../../components/organisms/TVChartWithHeader"
import { Box, CircularProgress, Typography, Grid } from "@material-ui/core"
import TokenDetailCard from "../../components/molecules/TokenDetailCard"
import TokenTradesTable from "../../components/molecules/TokenTradesTable"
import { PSEUDOCOIN_ADDRESS } from "../../core/environments"
import { binance } from "../../utils/supportedChains"

export default function Chart(props) {
  const tokenContext = useToken()
  const { address } = props.match.params

  useEffect(() => {
    if (!address || address == "") {
      window.location.href = `/${binance.route}/${PSEUDOCOIN_ADDRESS}`
    } else {
      tokenContext.setAddress(address)
    }
  }, [address])

  if (tokenContext.infoIsLoading) {
    return (
      <Box
        display={"flex"}
        style={{
          backgroundColor: "#25272c",
          color: "#fff",
          width: "100vw",
          height: "100vh",
        }}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <div>
          <img height={333} width={333} src={"/gifs/ps.gif"} />
        </div>
      </Box>
    )
  } else {
    return (
      <NavFrame page={"Chart"} address={address}>
        <TVChartWithHeader width={"100%"} />
        <br />
        <Grid container spacing={3}>
          <Grid container item sm={12} md={9} lg={9}>
            <TokenTradesTable />
          </Grid>
          <Grid container item sm={12} md={3} lg={3}>
            <TokenDetailCard />
          </Grid>
        </Grid>
      </NavFrame>
    )
  }
}
