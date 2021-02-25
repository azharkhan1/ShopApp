import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import React from "react";

// Importing containers
import Signup from "../containers/signup"
import Dashboard from "../containers/userdashboard"
import AdminDashboard from "../containers/vendordashboard";
import Signin from "../containers/signin";
import ForgetPassword from "../containers/forget-password";



import { useGlobalState } from "../context/globalContext.js";

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
            <Route path="/forget-password">
            <ForgetPassword />
          </Route>

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
