import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import Login from './components/screen/login';
import { showNavBar } from './actions/navBar';

class App extends Component {

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  componentDidMount() {
    const { showNavBar } = this.props;
    showNavBar(true);

  }
  render() {
    const { navBar } = this.props;
    console.log(navBar.showNavbar);

    return (
      <div className="App">
        {navBar.showNavbar &&
          <Navbar className="navbar-fixed-top">
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Dashboard</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href="/">
                Danh sách đơn hàng
          </NavItem>
              {/* <NavItem eventKey={2} href="#">
            Link
          </NavItem> */}
            </Nav>
          </Navbar>
        }

        <div style={{ marginTop: navBar.showNavbar ? 50 : 0 }}>
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
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
const mapStateToProps = state => ({
  navBar: state.navBar
});
const mapDispathToProps = dispath => ({
  showNavBar: (show) => dispath(showNavBar(show))
})

export default connect(mapStateToProps, mapDispathToProps)(App);
