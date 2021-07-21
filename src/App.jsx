//React Components and Hooks
import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom"

// Main Theme import:
import AppThemeProvider from "./theme/main"

// Page imports
import Chart from "./pages/chart"
import Dashboard from "./pages/dashboard"

// NOTE: This is where new pages are added to the router
const App = () => {
  return (
    <React.Fragment>
      <AppThemeProvider>
        <Router>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/:address" component={Chart} />
            <Route path="/" component={Chart} />
          </Switch>
        </Router>
      </AppThemeProvider>
    </React.Fragment>
  )
}

export default withRouter(App)
