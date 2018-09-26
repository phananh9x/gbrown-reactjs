import React, { Component } from 'react';
import {
  Navbar, NavItem, NavDropdown, MenuItem, Nav
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { showNavBar } from '../../redux/actions/navBar';
import { loginLogout } from '../../redux/actions/login';
import { Color } from '../../constants/color';
import { ROLE } from '../../constants/role';

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

  groupTitle = (role) => {
    if (role.groupId === ROLE.ADMIN) {
      return 'GBrown';
    } if (role.groupId === ROLE.WORK_MANAGER) {
      return 'Nhắc nhở công việc';
    } if (role.groupId === ROLE.SALE) {
      return 'Công việc của Sale';
    }
    return '';
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

    const { role } = login.data.results ? login.data.results : false;
    const displayName = login.data.results ? login.data.results.firstname : '';
    const displayRoleName = role ? role.name : '';
    return (
      <div style={{ width: '100%' }}>
        {show
          && (
            <Navbar fixedTop className="navbar-fixed-top">
              <Navbar.Collapse>

                {/* <NavItem
                    onClick={() => {
                      dispathNavBar(!navBar.showNavbar);
                    }}
                    eventKey={1}
                  >
                    {'Menu'}
                  </NavItem>
                  {menuArray} */}
                <Navbar.Brand>
                  {role && <a href="#home">{this.groupTitle(role)}</a>}
                </Navbar.Brand>


                {role && role.groupId === ROLE.ADMIN
                  && (
                    <Nav>
                      <NavItem>
                        <Link to="/">
                          Danh sách PO
                        </Link>
                      </NavItem>
                      <NavDropdown title="Nhân viên Sale" id="basic-nav-dropdown">
                        <NavItem>
                          <Link to="/sale/schedule">
                            Chăm sóc khách hàng
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link to="/sale/ordering">
                            Chốt đơn hàng
                          </Link>
                        </NavItem>
                      </NavDropdown>
                      <NavDropdown title="Quản lý sản xuất" id="basic-nav-dropdown">
                        <NavItem>
                          <Link to="/work/schedule">
                            Chia việc nhân viên
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link to="/work/meetingsale">
                            Lịch họp với Sale
                          </Link>
                        </NavItem>
                        <NavItem>
                          <Link to="/work/meetingekip">
                            Lịch họp với Ekip
                          </Link>
                        </NavItem>
                      </NavDropdown>
                      <NavItem>
                        <Link to="/employee">
                          Danh sách nhân viên
                        </Link>
                      </NavItem>
                    </Nav>
                  )
                }

                {role && role.groupId === ROLE.SALE
                  && (
                    <Nav>
                      <NavItem>
                        <Link to="/">
                          Danh sách PO
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Link to="/sale/schedule">
                          Chăm sóc khách hàng
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Link to="/sale/ordering">
                          Chốt đơn hàng
                        </Link>
                      </NavItem>
                    </Nav>
                  )
                }


                {role && role.groupId === ROLE.WORK_MANAGER
                  && (
                    <Nav>
                      <NavItem>
                        <Link to="/work/schedule">
                          Chia việc nhân viên
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Link to="/work/meetingsale">
                          Lịch họp với Sale
                        </Link>
                      </NavItem>
                      <NavItem>
                        <Link to="/work/meetingekip">
                          Lịch họp với Ekip
                        </Link>
                      </NavItem>
                    </Nav>
                  )
                }


                <Nav pullRight>
                  <NavDropdown title="Liên kết Web" id="basic-nav-dropdown">
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
                  <NavDropdown eventKey={3} title={`${displayRoleName} ${displayName}`} id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>
                      <Link to="/user/profile">
                        Thông tin cá nhân
                      </Link>
                    </MenuItem>
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
  login: state.login,
});
const mapDispathToProps = dispath => ({
  dispathNavBar: show => dispath(showNavBar(show)),
  dispathLogout: () => dispath(loginLogout())
});

export default connect(mapStateToProps, mapDispathToProps)(NavigationBar);
