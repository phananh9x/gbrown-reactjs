import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { showNavBar } from '../../redux/actions/navBar';

class NavigationBar extends Component {
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
            <Navbar fixedTop className="navbar-fixed-top">
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
                  onClick={() => {
                    localStorage.removeItem('@user');
                  }}
                  eventKey={1}
                  href="/login"
                >
                  Đăng xuất
                </NavItem>
              </Nav>
            </Navbar>
          )}
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

export default connect(mapStateToProps, mapDispathToProps)(NavigationBar);
