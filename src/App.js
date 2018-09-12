import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import NavigationBar from './components/NavigationBar';

class App extends Component {
  componentDidMount() {
    const { dispathNavBar } = this.props;
    switch (window.location.pathname) {
      case '/login':
        dispathNavBar(false);
        break;
      case '/':
        dispathNavBar(true);
        break;
      case '/main':
        dispathNavBar(true);
        break;
      default:
        break;
    }
  }

  render() {
    const { navBar } = this.props;

    return (
      <div className="App">
        <NavigationBar
          show={navBar.showNavbar}
        />
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
  dispathNavBar: show => dispath(showNavBar(show))
});

export default connect(mapStateToProps, mapDispathToProps)(App);
