
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import "./styles/app.sass";

import { useActiveWeb3React, useEagerConnect } from "./hooks";

import Page from "./components/Page";
import About from "./pages/About";

function App() {
  const dispatch = useDispatch()

  useEagerConnect()
    
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => (<Page><About /></Page>)} />
        {/* <Redirect to="/" /> */}
      </Switch>
    </Router>
  );
}

export default App;
