import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import React from "react";


import Signup from "../containers/signup"
import Dashboard from "../containers/userdashboard"
import Login from "../containers/signin";

import { useGlobalState } from "../context/globalContext.js";
import Signin from "../containers/signin";

export default function AppRouter() {

  const globalState = useGlobalState()

  // console.log("user is = > ", globalState.user);

  return (
    <div>
      <div>
        {JSON.stringify(globalState)};
      </div>
      <Router>
      

        {(globalState.loginStatus === false) ?
          <>
            <Route exact={true} path="/">
              <Signin />
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>
            {/* <Route path="/forget_password">
            <ForgetPassword />
          </Route> */}

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </>
          : null}

        {/* private routes */}

        {(globalState.loginStatus === true) ?

          <>
            <Route exact path="/">
              <Dashboard />
            </Route>

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </>
          : null}
      </Router >
    </div>
  );
}
