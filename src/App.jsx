

//React Components and Hooks
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import CryptoDetail from "./pages/cryptoDetail";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    <React.Fragment>
      <Router>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/" component={CryptoDetail} />
          </Switch>
      </Router>
    </React.Fragment>
  );
};

export default withRouter(App);