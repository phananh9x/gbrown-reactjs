import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { show } = this.props;
    return (
      <div style={{ width: '100%' }}>
        {show
          && (
            <Navbar className="navbar-fixed-top">
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">Dashboard</a>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
                <NavItem
                  eventKey={1}
                  href="/"
                >
                  Danh sách đơn hàng
                </NavItem>
                <NavItem
                  eventKey={1}
                  href="/login"
                >
                  Đăng nhập
              </Nav>
            </Navbar>
          )}
      </div>
    );
  }
}
