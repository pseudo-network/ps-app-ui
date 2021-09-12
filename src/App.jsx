//React Components and Hooks
import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom"
// import {
//   AppThemeContext,
//   ProvideAppTheme,
//   useAppTheme,
// } from "./contexts/appThemeContext"
import {
  AppThemeContext,
  ProvideAppTheme,
  useAppTheme,
} from "./contexts/appThemeContext"
import DarkTheme from "./themes/dark-theme"
import LightTheme from "./themes/light-theme"
import Chart from "./pages/chart"
import { ThemeProvider } from "@material-ui/core/styles"

// NOTE: This is where new pages are added to the router
const App = () => {
  return (
    <React.Fragment>
      <ProvideAppTheme>
        <AppThemeContext.Consumer>
          {(theme) => (
            <ThemeProvider theme={theme.darkMode == 1 ? DarkTheme : LightTheme}>
              <Router>
                <Switch>
                  <Route path="/:network/:address" component={Chart} />
                  <Route path="/" component={Chart} />
                </Switch>
              </Router>
            </ThemeProvider>
          )}
        </AppThemeContext.Consumer>
      </ProvideAppTheme>
    </React.Fragment>
  )
}

export default withRouter(App)
