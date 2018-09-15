import React, { Component } from 'react';
import {
  Navbar, NavItem, NavDropdown, MenuItem, Nav
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { showNavBar } from '../../redux/actions/navBar';
import { loginLogout } from '../../redux/actions/login';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  logout = () => {
    const { dispathLogout } = this.props;
    localStorage.removeItem('@user');
    dispathLogout();
  }

  render() {
    const {
      show, dispathNavBar, navBar, login
    } = this.props;
    console.log();

    return (
      <div style={{ width: '100%' }}>
        {show
          && (
            <Navbar fixedTop className="navbar-fixed-top">
              <Navbar.Collapse>
                <Nav>
                  <NavItem
                    onClick={() => {
                      dispathNavBar(!navBar.showNavbar);
                    }}
                    eventKey={1}
                  >
                    Menu
                  </NavItem>
                  <NavItem
                    eventKey={1}
                    href="/"
                  >
                    Danh sách đơn hàng
                  </NavItem>

                </Nav>
                <Nav pullRight>
                  <NavItem eventKey={1} href="#">
                    Link Right
                  </NavItem>
                  <NavDropdown eventKey={3} title={login.data.data ? login.data.data.email : ''} id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Thông tin</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.2} onClick={this.logout}>Đăng xuất</MenuItem>

                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          )}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  navBar: state.navBar,
  login: state.login
});
const mapDispathToProps = dispath => ({
  dispathNavBar: show => dispath(showNavBar(show)),
  dispathLogout: () => dispath(loginLogout())
});

export default connect(mapStateToProps, mapDispathToProps)(NavigationBar);
