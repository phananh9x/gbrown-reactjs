import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-table/react-table.css'
import Purchase from './components/purchase'
import AddPurchase from './components/AddPurchase'
import Print from './components/print'
import PrintDetail from './components/PrintDetail'
import PurchaseList from './components/PurchaseList'
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
            <Route exact path="/" component={PurchaseList} />
            <Route exact path="/baogia/:purchaseId" component={Print} />
            <Route exact path="/chitiethopdong/:purchaseId" component={PrintDetail} />
            <Route exact path="/main" component={AddPurchase} />
            <Route exact path="/purchase/:purchaseId" component={Purchase} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
