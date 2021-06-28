import React from 'react';
import { createMuiTheme, rgbToHex } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      // Purple and green play nicely together.
      main: '#161616',
      //main: purple[900],
      //main: grey[500],
    },
    secondary: {
      main: purple[800],
      alt: grey[850],
    },
  },
});

export default function AppThemeProvider(props) {
  return (
    <ThemeProvider theme={theme}>
        {props.children}
    </ThemeProvider>
  );
}