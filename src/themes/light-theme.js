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
      // disabled: "#545761",
    },
    action: {
      active: "#836AFF",
      // hover: "#14171F",
      // selected: "#25272D",
      // disabled: "#0D111B",
      // disabledBackground: "#0D111B",
    },
    background: {
      // default: "#151c2c",
      // paper: "#0D111B",
    },
    typography: {
      bold: "Now-Bold, Arial",
      light: "Now-Bold, Arial",
      regular: "Poppins, Arial",
    },
  },
})

export default LightTheme
