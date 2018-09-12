import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Form, FormGroup, Col, FormControl, ControlLabel, Button, Checkbox
} from 'react-bootstrap';
import { showNavBar } from '../../redux/actions/navBar';

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
    width: '35%',
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
  }

  render() {
    return (
      <Form style={style.container}>
        <Form style={style.login} horizontal>
          <FormGroup controlid="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup controlid="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
            <Col smOffset={2} sm={10}>
              <Button className="btn-primary" type="submit">Sign in</Button>
            </Col>
          </FormGroup>
        </Form>
      </Form>
    );
  }
}


const mapStateToProps = state => ({
  navBar: state.navBar
});
const mapDispathToProps = dispath => ({
  dispathNavBar: show => dispath(showNavBar(show))
});

export default connect(mapStateToProps, mapDispathToProps)(Login);
