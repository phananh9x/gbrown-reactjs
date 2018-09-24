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
import {
  faStroopwafel, faUser, faLock, faCheck
} from '@fortawesome/free-solid-svg-icons';
import Purchase from './components/purchase';
import AddPurchase from './components/addpurchase';
import Print from './components/print';
import PrintDetail from './components/printdetail';
import PurchaseList from './components/purchaselist';
import Login from './screen/login';
import { loginRequest } from './redux/actions/login';
import Menu from './components/Menu';
import ShareWork from './components/sharework';
import WorkSchedule from './screen/workschedule';
import { requestUserList } from './redux/actions/userAction';
import { ROLE } from './constants/role';
import MeetingSale from './screen/meetingsale';
import MeetingEkip from './screen/meetingekip';
import Profile from './screen/profile';
import SaleSchedule from './screen/saleschedule';
import EmployeeList from './screen/employee';

library.add(faStroopwafel, faUser, faLock, faCheck);
class App extends Component {
  constructor(props) {
    super(props);
    this.logined = false;
  }

  componentWillReceiveProps(nextProps) {
    const { login, user, dispathUserList } = nextProps;
    if (!login.fetching) {
      if (!login.success) {
        localStorage.removeItem('@user');
      } else if (login.success && !login.fetching && !user.success && !user.fetching) {
        dispathUserList();
      }
    }
  }

  componentWillMount() {
    const {
      login, dispathLogin
    } = this.props;
    if (!login.success && !login.fetching) {
      const localUser = localStorage.getItem('@user');
      if (!this.logined && localUser) {
        dispathLogin(JSON.parse(localUser).data);
        this.logined = true;
      }
    }
  }

  middleWareLogin = (component) => {
    const {
      login,
    } = this.props;

    if (!login.success && !login.data.results) {
      return Login;
    }

    return component;
  }

  render() {
    const { navBar, login } = this.props;
    const { role } = login.data.results ? login.data.results : false;
    console.log(role);

    return (
      <div className="App" id="outer-container">
        <Menu pageWrapId="page-wrap" outerContainerId="outer-container" show={navBar.showNavbar} />
        <main id="page-wrap">
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/"
                component={this.middleWareLogin(role
                  && role.groupId === ROLE.ADMIN ? PurchaseList : WorkSchedule)}
              />
              <Route exact path="/baogia/:purchaseId" component={Print} />
              <Route exact path="/chitiethopdong/:purchaseId" component={PrintDetail} />
              <Route exact path="/main" component={this.middleWareLogin(AddPurchase)} />
              <Route exact path="/purchase/:purchaseId" component={this.middleWareLogin(Purchase)} />
              <Route exact path="/purchase/:purchaseId/chiaviec/:categoryIndex" component={this.middleWareLogin(ShareWork)} />
              <Route exact path="/work/schedule" component={this.middleWareLogin(WorkSchedule)} />
              <Route exact path="/work/meetingsale" component={this.middleWareLogin(MeetingSale)} />
              <Route exact path="/work/meetingekip" component={this.middleWareLogin(MeetingEkip)} />
              <Route exact path="/user/profile" component={this.middleWareLogin(Profile)} />
              <Route exact path="/sale/schedule" component={this.middleWareLogin(SaleSchedule)} />
              <Route exact path="/employee" component={this.middleWareLogin(role
                  && role.groupId === ROLE.ADMIN ? EmployeeList : WorkSchedule)} 
              />
            </Switch>
          </Router>
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  navBar: state.navBar,
  login: state.login,
  user: state.userReducer
});
const mapDispathToProps = dispath => ({
  dispathLogin: data => dispath(loginRequest(data)),
  dispathUserList: () => dispath(requestUserList())
});

export default connect(mapStateToProps, mapDispathToProps)(App);
