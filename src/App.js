import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-table/react-table.css'
import Purchase from './components/purchase'
import AddPurchase from './components/addpurchase'
import Print from './components/print'
import PrintDetail from './components/printdetail'
import PurchaseList from './components/purchaselist'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";
import { Navbar, NavItem, Nav } from 'react-bootstrap'

class App extends Component {
  render() {
    var currentLocation = window.location.pathname
    var showNav = false;
    if (currentLocation.includes('main') || currentLocation.includes('purchase')) {
      showNav = true;
    }

    return (
      <div className="App">

        <Navbar className="navbar-fixed-top" responsive>
          {/* <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Menu</a>
          </Navbar.Brand>
        </Navbar.Header> */}
          <Nav>
            <NavItem eventKey={1} href="/">
              Danh sách đơn hàng
          </NavItem>
            {/* <NavItem eventKey={2} href="#">
            Link
          </NavItem> */}
          </Nav>
        </Navbar>

        <div style={{ marginTop: showNav ? 50 : 0 }}>
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
      </div>
    );
  }
}

export default App;
