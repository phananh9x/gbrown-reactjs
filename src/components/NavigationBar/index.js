import React, { Component } from 'react';
import {
  Navbar, NavItem, NavDropdown, MenuItem, Nav, Image, Badge
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showNavBar } from '../../redux/actions/navBar';
import { loginLogout } from '../../redux/actions/login';
import { Color } from '../../constants/color';

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
      show, dispathNavBar, navBar, login, menus
    } = this.props;
    const path = window.location.pathname;
    const menuArray = [];
    if (menus) {
      menus.forEach((element, key) => {
        menuArray.push(
          <NavItem
            key={parseInt(key.toString())}
            eventKey={key}
          >
            <Link to={element.path}>
              <div style={{ color: path === element.path ? Color.PRIMARY_COLOR : '#777' }}>{element.name}</div>
            </Link>
          </NavItem>

        );
      });
    }

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
                    {'Menu'}
                  </NavItem>
                  {menuArray}
                </Nav>
                <Nav pullRight>
                  <NavItem onClick={() => {
                    window.open('http://kichbanct.gbrownflower.com', '_blank');
                  }}
                  >
                    <p>
                      {'Phần Mềm Kịch Bản'}
                    </p>
                  </NavItem>
                  <NavItem onClick={() => {
                    window.open('http://work.gbrownflower.com', '_blank');
                  }}
                  >
                    <p>
                      {'Phần Mềm Chia Việc'}
                    </p>
                  </NavItem>
                  <NavItem onClick={() => {
                    window.open('http://quanli.salegbrown.vn', '_blank');
                  }}
                  >
                    <p>
                      {'Phần Mềm Quản lý Hệ Thống'}
                    </p>
                  </NavItem>
                  <NavItem>
                    <p>
                      <Badge> 42 </Badge>
                      {'Thông báo'}
                    </p>
                  </NavItem>
                  <NavItem eventKey={1} href="#">
                    <div style={{ width: 24, height: 24 }}>
                      <Image alt="Avatar" size="small" src={require('../../assets/logo/gbrown.png')} circle />
                    </div>

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
