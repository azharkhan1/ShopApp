import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import React, { useContext } from "react";


import Signup from "../containers/signup"
import Dashboard from "../containers/userdashboard"
import Login from "../containers/signin";

import { GlobalStateProvider, useGlobalState, useGlobalStateUpdate } from "../context/globalContext.js";
import Signin from "../containers/signin";

export default function AppRouter() {

  const globalState = useGlobalState()
  const setGlobalState = useGlobalStateUpdate()

  // const themeStyles = {
  //   backgroundColor: globalState.darkTheme ? "#333" : "#ccc",
  //   color: globalState.darkTheme ? "#ccc" : "#333",
  //   padding: "2rem",
  // }
  // const navStyles = {
  //   display: "inline",
  //   border: globalState.darkTheme ? "1px solid white" : "1px solid black",
  //   padding: "5px",
  //   marginLeft: "5px"
  // }
  console.log("user is = > ", globalState.user);
  return (
    <div>
      <div>
        {JSON.stringify(globalState)};
      </div>
      <Router>


        <Route path="/" component={Dashboard} />
        {/* <Route exact path="/"> <Signin /> </Route> */}



        <Route path="/signup">
          <Signup />
        </Route>


        <Route path="/dashboard">
          <Dashboard />
        </Route>

      </Router >
    </div>
  );
}
