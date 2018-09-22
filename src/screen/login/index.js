import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form, FormGroup, FormControl, Button, Checkbox, HelpBlock,
  InputGroup
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showNavBar } from '../../redux/actions/navBar';
import { loginRequest } from '../../redux/actions/login';
import { Color } from '../../constants/color';

const style = {
  container: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  login: {
    backgroundColor: 'white',
    width: '25%',
    alignSelf: 'center',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '2%',
    paddingBottom: '3%',
    borderRadius: 10,
  },
  logo: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '40%',
    marginBottom: 30
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
    this.error = {
      email: '',
      password: ''
    };
  }

  validateLogin = () => {
    const { dispathLogin, login } = this.props;
    this.error = {
      email: '',
      password: ''
    };
    if (login.fetching) return;
    if (!this.user.email) {
      this.error.email = 'Vui lòng nhập tài khoản';
    } else if (!this.user.password) {
      this.error.password = 'Vui lòng nhập mật khẩu';
    } else {
      dispathLogin(this.user);
    }
  }


  componentWillReceiveProps(nextProps) {
    const { login, history, dispathNavBar } = nextProps;
    if (!login.fetching) {
      if (login.success) {
        dispathNavBar(true);
        history.push({
          pathname: '/',
        });
      }
    }
  }

  onChange = (e) => {
    this.user[e.target.id] = e.target.value;
  }

  loginError = () => {
    const { login } = this.props;
    return login.error.message && !login.fetching ? 'error' : null;
  }

  validateEmail = () => this.error.email || this.loginError();

  validatePassword = () => this.error.password || this.loginError();

  render() {
    const { login } = this.props;
    return (
      <div style={style.container}>
        <Form style={style.login} horizontal>
          <div style={style.logo}>
            <img
              style={{ width: '100%' }}
              src={require('../../assets/logo/gbrown.png')}
              alt="no_image"
            />
          </div>
          <FormGroup
            validationState={this.validateEmail()}
            controlid="formHorizontalEmail"
          >
            <InputGroup>
              <InputGroup.Addon>
                <FontAwesomeIcon icon="user" />
              </InputGroup.Addon>
              <FormControl id="email" type="email" placeholder="Tài khoản" onChange={this.onChange} />
            </InputGroup>
          </FormGroup>
          <FormGroup
            validationState={this.validatePassword()}
            controlid="formHorizontalPassword"
          >
            <InputGroup>
              <InputGroup.Addon>
                <FontAwesomeIcon icon="lock" />
              </InputGroup.Addon>
              <FormControl id="password" type="password" placeholder="Mật khẩu" onChange={this.onChange} />
            </InputGroup>
            <HelpBlock>{login.error.message}</HelpBlock>
          </FormGroup>

          <FormGroup style={{ marginBottom: 0 }}>
            <Checkbox>Lưu mật khẩu</Checkbox>
            <Button
              backgroundcolor={Color.PRIMARY_COLOR}
              style={{ width: '100%', marginTop: 10 }}
              onClick={this.validateLogin}
              className="btn-success"
            >
              {'Đăng nhập'}
            </Button>
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
