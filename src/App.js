import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import 'react-table/react-table.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Purchase from './components/purchase';
import AddPurchase from './components/addpurchase';
import Print from './components/print';
import PrintDetail from './components/printdetail';
import PurchaseList from './components/purchaselist';
import Login from './screen/login';
import { loginRequest } from './redux/actions/login';
import Menu from './components/Menu';

library.add(faStroopwafel, faUser, faLock);
class App extends Component {
  constructor(props) {
    super(props);
    this.logined = false;
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { login } = nextProps;
    if (!login.fetching) {
      if (!login.success) {
        localStorage.removeItem('@user');
      }
    }
  }

  middleWareLogin = (component) => {
    const { login, dispathLogin } = this.props;
    if (!login.success) {
      const user = localStorage.getItem('@user');
      if (!user) {
        return Login;
      }
      if (!this.logined) {
        dispathLogin(JSON.parse(user).data);
        this.logined = true;
      }
    }
    return component;
  }

  render() {
    const { navBar } = this.props;
    console.log(navBar);

    return (
      <div className="App" id="outer-container">
        <Menu pageWrapId="page-wrap" outerContainerId="outer-container" show={navBar.showNavbar} />
        <main id="page-wrap">
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={this.middleWareLogin(PurchaseList)} />
              <Route exact path="/baogia/:purchaseId" component={Print} />
              <Route exact path="/chitiethopdong/:purchaseId" component={PrintDetail} />
              <Route exact path="/main" component={this.middleWareLogin(AddPurchase)} />
              <Route exact path="/purchase/:purchaseId" component={this.middleWareLogin(Purchase)} />
            </Switch>
          </Router>
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  navBar: state.navBar,
  login: state.login
});
const mapDispathToProps = dispath => ({
  dispathLogin: data => dispath(loginRequest(data))
});

export default connect(mapStateToProps, mapDispathToProps)(App);
