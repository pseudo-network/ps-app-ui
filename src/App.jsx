

//React Components and Hooks
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

// Page imports
import CryptoDetail from "./pages/cryptoDetail";
import Dashboard from "./pages/dashboard";
import DansTestPage from "./pages/dansTestPage";
import AntTestPage from "./pages/antTestPage";

// NOTE: This is where new pages are added to the router
const App = () => {
  return (
    <React.Fragment>
      <Router>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/dans-page" component={DansTestPage} />
            <Route path="/ant-page" component={AntTestPage} />
            <Route path="/" component={CryptoDetail} />
          </Switch>
      </Router>
    </React.Fragment>
  );
};

export default withRouter(App);