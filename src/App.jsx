

//React Components and Hooks
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import CryptoDetail from "./pages/cryptoDetail";


const App = () => {
  return (
    <React.Fragment>
      <Router>
          <Switch>
            <Route path="/" component={CryptoDetail} />
          </Switch>
      </Router>
    </React.Fragment>
  );
};

export default withRouter(App);