import { createMuiTheme } from "@material-ui/core/styles"

const DarkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#0D111B",
    },
    secondary: {
      main: "#070B15",
    },
    success: {
      main: "#51A39A",
    },
    danger: {
      main: "#51A39A",
    },
    text: {
      primary: "#ACB0BB",
      secondary: "#25272D",
      disabled: "#545761",
      psPurple: "#836AFF",
    },
    action: {
      active: "#836AFF",
      hover: "#14171F",
      selected: "#25272D",
      disabled: "#0D111B",
      disabledBackground: "#0D111B",
    },
    background: {
      default: "#151c2c",
      paper: "#0D111B",
      psLightPurple: "#836aff",
    },
    typography: {
      bold: "Now-Bold, Arial",
      light: "Now-Bold, Arial",
      regular: "Poppins, Arial",
    },
  },
  overrides: {
    MuiCardHeader: {
      title: {
        color: "#ACB0BB",
      },
      root: {
        color: "#ACB0BB",
      },
    },
    MuiListSubheader: {
      title: {
        color: "#ACB0BB",
      },
      root: {
        color: "#ACB0BB",
      },
    },
    MuiButton: {
      root: {
        color: "#fff",
      },
    },
  },
})

export default DarkTheme
