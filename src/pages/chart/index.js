import React, { useEffect, useState } from "react"
import NavFrame from "../../components/templates/NavFrame"
import { useToken } from "../../contexts/tokenContext"
import TVChartWithHeader from "../../components/organisms/TVChartWithHeader"
import { Box, CircularProgress, Typography, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import TokenDetailCard from "../../components/molecules/TokenDetailCard"
import TokenTradesTable from "../../components/molecules/TokenTradesTable"
import TVChartNative from "../../components/molecules/TVChartNative"
import { PSEUDOCOIN_ADDRESS } from "../../core/environments"
import { binance } from "../../utils/supportedChains"
import { useAppTheme } from "../../contexts/appThemeContext"

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    width: "100%",
    height: "calc(100vh - 444px) !important",
  },
}))

export default function Chart(props) {
  const classes = useStyles()
  const tokenContext = useToken()
  const appThemeContext = useAppTheme()
  const [useNativeChart, setUseNativeChart] = useState(false)

  const { address } = props.match.params

  useEffect(() => {
    // todo: revise
    if (!address || address == "" || address == "-") {
      setUseNativeChart(true)
    } else {
      setUseNativeChart(false)
      tokenContext.setAddress(address)
    }
  }, [address])

  if (tokenContext.infoIsLoading && !useNativeChart) {
    return (
      <Box
        display={"flex"}
        style={{
          backgroundColor:
            appThemeContext.darkMode == 1 ? "#25272c" : "#785FFF", // todo: cleanup
          color: "#fff",
          width: "100vw",
          height: "100vh",
        }}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <div>
          <img
            height={333}
            width={333}
            src={
              appThemeContext.darkMode == 1
                ? "/gifs/ps-dark.gif"
                : "/gifs/ps-light.gif"
            }
          />
        </div>
      </Box>
    )
  } else {
    return (
      <NavFrame page={"Chart"} address={address}>
        {useNativeChart ? (
          <Box className={classes.chartContainer}>
            <TVChartNative
              symbol={tokenContext.chain.nativeTVSymbol}
              theme={appThemeContext.darkMode == 1 ? "Dark" : "Light"}
            />
          </Box>
        ) : (
          <>
            <TVChartWithHeader
              name={tokenContext.name}
              percentChange={tokenContext.percentChange}
              volume={tokenContext.volume}
              currentPrice={tokenContext.currentPrice}
              tvSymbol={tokenContext.tvSymbol}
              width={"100%"}
              theme={appThemeContext.darkMode == 1 ? "Dark" : "Light"}
            />
            <br />
            <Grid container spacing={3}>
              <Grid container item sm={12} md={9} lg={9}>
                <TokenTradesTable />
              </Grid>
              <Grid container item sm={12} md={3} lg={3}>
                <TokenDetailCard />
              </Grid>
            </Grid>
          </>
        )}
      </NavFrame>
    )
  }
}

// <TVChartHeader
// name={tokenContext.name}
// percentChange={tokenContext.percentChange}
// volume={tokenContext.volume}
// currentPrice={tokenContext.currentPrice}
// symbol={tokenContext.tvSymbol}
// />
// <br />
// <TVChart tvSymbol={props.tvSymbol} />
