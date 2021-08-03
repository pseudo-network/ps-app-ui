import React, { useEffect } from "react"
import NavFrame from "../../components/organisms/NavFrame/NavFrame"
import { useCrypto } from "../../contexts/cryptoContext"
import TVChartWithHeader from "../../components/organisms/TVChartWithHeader/TVChartWithHeader"
import { Box, CircularProgress, Typography, Grid } from "@material-ui/core"
import CryptoDetailCard from "../../components/molecules/CryptoDetailCard/CryptoDetailCard"
import TransactionTable from "../../components/molecules/LiveViewContainer"

export default function Chart(props) {
  const cryptoContext = useCrypto()
  const { address } = props.match.params

  useEffect(() => {
    if (!address || address == "") {
      // todo: get psuedocoin as default
      window.location.href = "/0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3" // todo: unecessarily rerenders the whole page
    } else {
      cryptoContext.setAddress(address)
    }
  }, [address])

  if (cryptoContext.cryptoIsLoading) {
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
      <TVChartWithHeader width={"100%"}/>
      <br />
        <Grid container spacing={3}>
          <Grid container item xs={12}>
            <TransactionTable/>
          </Grid>
        </Grid>
      </NavFrame>
    )
  }
}
