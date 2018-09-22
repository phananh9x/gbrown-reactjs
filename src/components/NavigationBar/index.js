import React, { Component } from 'react';
import {
  Navbar, NavItem, NavDropdown, MenuItem, Nav
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
      show, login, menus
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
                  {/* <NavItem
                    onClick={() => {
                      dispathNavBar(!navBar.showNavbar);
                    }}
                    eventKey={1}
                  >
                    {'Menu'}
                  </NavItem>
                  {menuArray} */}
                  <NavItem>
                    <Link to="/">
                      <p>
                        {'Danh sách PO'}
                      </p>
                    </Link>
                  </NavItem>
                </Nav>

                <Nav pullRight>
                  <NavDropdown title="Liên kết Web">
                    <MenuItem
                      eventKey={3.1}
                      onClick={() => {
                        window.open('http://quanli.salegbrown.vn', '_blank');
                      }}
                    >
                      Phần Mềm Quản lý Hệ Thống
                    </MenuItem>

                    <MenuItem
                      eventKey={3.2}
                      onClick={() => {
                        window.open('http://kichbanct.gbrownflower.com', '_blank');
                      }}
                    >
                      Phần Mềm Kịch Bản Và Báo Giá
                    </MenuItem>
                    <MenuItem
                      eventKey={3.3}
                      onClick={() => {
                        window.open('http://gbrownflower.com/admin', '_blank');
                      }}
                    >
                      Phần Mềm Gbrown Photo
                    </MenuItem>
                    <MenuItem
                      eventKey={3.4}
                      onClick={() => {
                        window.open('http://work.gbrownflower.com', '_blank');
                      }}
                    >
                      Phần Mềm Chia Việc
                    </MenuItem>
                  </NavDropdown>
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
