import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import React from "react";
import Signup from "../containers/signup"
import Dashboard from "../containers/userdashboard"
import { useGlobalState } from "../context/globalContext.js";
import Signin from "../containers/signin";
import AdminDashboard from "../containers/vendordashboard";

export default function AppRouter() {

  const globalState = useGlobalState()

 

  return (
  
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

        {(globalState.roll === "user" && globalState.loginStatus === true) ?

          <>
            <Route exact path="/">
              <Dashboard />
            </Route>

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </>
          : null}

        {(globalState.roll === "admin" && globalState.loginStatus === true) ?

          <>
            <Route exact path="/">
              <AdminDashboard />
            </Route>

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </>
          : null}
      </Router >
      
  );
}
