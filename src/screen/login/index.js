import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Form, FormGroup, Col, FormControl, ControlLabel, Button, Checkbox
} from 'react-bootstrap';
import { showNavBar } from '../../redux/actions/navBar';
import { loginRequest } from '../../redux/actions/login';

const style = {
  container: {
    width: '100%',
    backgroundColor: 'black',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    backgroundColor: 'white',
    width: '30%',
    alignSelf: 'center',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '2%',
    paddingBottom: '3%',
    borderRadius: 10,
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.user = {
      email: '',
      password: ''
    };
  }


  validateLogin = () => {
    if (!this.user.email) {
      //
    } else if (!this.user.password) {
      //
    } else {
      //
      const { dispathLogin } = this.props;
      dispathLogin(this.user);
    }
  }

  onChange = (e) => {
    this.user[e.target.id] = e.target.value;
  }

  render() {
    return (
      <div style={style.container}>
        <Form style={style.login} horizontal>
          <FormGroup controlid="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={3}>
              Tài khoản
            </Col>
            <Col sm={9}>
              <FormControl id="email" type="email" placeholder="Tài khoản" onChange={this.onChange} />
            </Col>
          </FormGroup>

          <FormGroup controlid="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={3}>
              Mật khẩu
            </Col>
            <Col sm={9}>
              <FormControl id="password" type="password" placeholder="Mật khẩu" onChange={this.onChange} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={3} />
            <Col sm={5}>
              <Checkbox>Lưu mật khẩu</Checkbox>
            </Col>
            <Col sm={3}>
              <Button
                onClick={this.validateLogin}
                className="btn-primary"
              >
                Đăng nhập
              </Button>
            </Col>
          </FormGroup>
        </Form>
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
  dispathLogin: data => dispath(loginRequest(data))
});


export default connect(mapStateToProps, mapDispathToProps)(Login);
