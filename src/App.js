import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Purchase from './components/purchase'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";

class App extends Component {
   render() {
      return (
          <div className="App">
              <Router>
                <Switch>
                  <Route exact path="/main" component={Purchase} />
                  <Route exact path="/purchase/:purchaseId" component={Purchase} />
                </Switch>
              </Router>
          </div>
      );
  }
}

export default App;
