import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CircleCrossChess from './views/CircleCrossChess'
import Home from './views/Home'
function App() {
  return (
    <Router>
      <Switch>
          <Route path="/CircleCrossChess">
            <CircleCrossChess />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
