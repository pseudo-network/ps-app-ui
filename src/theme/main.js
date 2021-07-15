import React from "react"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#0D111B",
    },
    secondary: {
      main: "#070B15",
    },
    text: {
      primary: "#ACB0BB",
      secondary: "#25272D",
      disabled: "#545761",
    },
    action: {
      active: "#836AFF",
      hover: "#14171F",
      selected: "#25272D",
      disabled: "#0D111B",
      disabledBackground: "#0D111B",
    },
    background: {
      default: "#25272D",
      paper: "#0D111B",
    },
    // divider: {
    //   // main:
    // },
  },

  // light
  // palette: {
  //   type: "light",
  //   primary: {
  //     main: "#fff",
  //   },
  //   secondary: {
  //     main: "#070B15",
  //   },
  //   text: {
  //   },
  //   action: {
  //     active: "#836AFF",
  //     hover: "#14171F",
  //   },
  // },
})

export default function AppThemeProvider(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}
