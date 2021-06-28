

//React Components and Hooks
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

// Main Theme import:
import AppThemeProvider from "./theme/main";

// Page imports
import CryptoDetail from "./pages/cryptoDetail";
import Dashboard from "./pages/dashboard";
import DansTestPage from "./pages/dansTestPage";
import BenTestPage from "./pages/benTestPage";

// NOTE: This is where new pages are added to the router
const App = () => {
  return (
    <React.Fragment>
      <AppThemeProvider>
        <Router>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/dans-page" component={DansTestPage} />
              <Route path="/ben-page" component={BenTestPage} />
              <Route path="/" component={CryptoDetail} />
            </Switch>
        </Router>
      </AppThemeProvider>
    </React.Fragment>
  );
};

export default withRouter(App);