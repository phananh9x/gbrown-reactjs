import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import './App.css';
import 'react-table/react-table.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Purchase from './components/purchase';
import AddPurchase from './components/addpurchase';
import Print from './components/print';
import PrintDetail from './components/printdetail';
import PurchaseList from './components/purchaselist';

import Login from './screen/login';
import { showNavBar } from './redux/actions/navBar';

import { Link } from 'react-router-dom';

class App extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  componentDidMount() {
    const { dispathNavBar } = this.props;
    dispathNavBar(true);
  }

  render() {
    const { navBar } = this.props;
    console.log(navBar.showNavbar);

    return (
      <div className="App">
        <div style={{ marginTop: navBar.showNavbar ? 50 : 0 }}>
          <Router>
            <div>
            {navBar.showNavbar
            && (
              <Navbar className="navbar-fixed-top">
                <Navbar.Header>
                  <Link to='/'>
                    <Navbar.Brand>
                      <a href="#">Dashboard</a>
                    </Navbar.Brand>
                  </Link>
                </Navbar.Header>
                <Nav>
                  <Link to='/'>
                    <Navbar.Brand>
                      <a href="#">Danh sách đơn hàng</a>
                    </Navbar.Brand>
                  </Link>
                </Nav>
              </Navbar>
            )
          }
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={PurchaseList} />
              <Route exact path="/baogia/:purchaseId" component={Print} />
              <Route exact path="/chitiethopdong/:purchaseId" component={PrintDetail} />
              <Route exact path="/main" component={AddPurchase} />
              <Route exact path="/purchase/:purchaseId" component={Purchase} />
            </Switch>
            </div>
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
  dispathNavBar: show => dispath(showNavBar(show))
});

export default connect(mapStateToProps, mapDispathToProps)(App);
