import { createMuiTheme } from "@material-ui/core/styles"

const LightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#fff",
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
      primary: "#1d1d1f",
      secondary: "#25272D",
      psPurple: "#836AFF",
      // disabled: "#545761",
    },
    action: {
      active: "#836AFF",
    },
    background: {
      psLightPurple: "#836AFF",
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
        color: "#1d1d1f",
      },
      root: {
        color: "#1d1d1f",
      },
    },
    MuiButton: {
      root: {
        color: "#1d1d1f",
      },
    },
  },
})

export default LightTheme
