import React, { useEffect } from "react"
import NavFrame from "../../components/templates/NavFrame"
import { useCrypto } from "../../contexts/cryptoContext"
import TVChartWithHeader from "../../components/organisms/TVChartWithHeader"
import { Box, CircularProgress, Typography, Grid } from "@material-ui/core"
import CryptoDetailCard from "../../components/molecules/CryptoDetailCard"
import CryptoTradesTable from "../../components/molecules/CryptoTradesTable"
import { PSEUDOCOIN_ADDRESS } from "../../core/environments"
import { binance } from "../../utils/supportedNetworks"

export default function Chart(props) {
  const cryptoContext = useCrypto()
  const { address } = props.match.params

  useEffect(() => {
    if (!address || address == "") {
      window.location.href = `/${binance.route}/${PSEUDOCOIN_ADDRESS}`
    } else {
      cryptoContext.setAddress(address)
    }
  }, [address])

  if (cryptoContext.infoIsLoading) {
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
            <CryptoTradesTable />
          </Grid>
          <Grid container item sm={12} md={3} lg={3}>
            <CryptoDetailCard />
          </Grid>
        </Grid>
      </NavFrame>
    )
  }
}
