import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormControl, ControlLabel, FormGroup, Alert
} from 'react-bootstrap';
import { Select } from 'antd';
import NavigationBar from '../../components/NavigationBar';
import { userRoleAction } from '../../redux/actions/roleAction';
import { registerUserAction } from '../../redux/actions/userAction';

const { Option } = Select;

const Field = ({
  id, label, handleChange, disabled, props, defaultValue, type, value
}) =>
  (
    <div
      controlId={id}
      style={{ marginBottom: 10 }}
      className="app-from-group col-xs-12"
    >
      <div
        className="col-xs-4 app-label"
      >
        <ControlLabel>{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        <FormControl
          type={type || 'text'}
          defaultValue={defaultValue || ''}
          onChange={e => handleChange(id, e.target.value)}
          disabled={disabled || false}
          value={value}
          {...props}
        />
      </div>
    </div>
  );

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        role: '',
        firstname: '',
        phone: '',
        email: '',
        repassword: '',
        password: ''
      },
      registerDone: false
    };
    this.errorMessage = '';
  }

  componentWillMount() {
    const { dispathUserRole } = this.props;
    dispathUserRole();
  }

  validatePassword = () => {
    const { data } = this.state;
    return data.password && data.repassword && data.password !== data.repassword ? 'error' : null;
  }


  handleChange = (e, v) => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        [e]: v
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    const { data } = this.state;
    if (!user.fetching && user.success && data.password) {
      this.setState({
        data: JSON.parse(JSON.stringify(
          {
            role: '',
            firstname: '',
            phone: '',
            email: '',
            password: '',
            repassword: ''
          }
        )),
        registerDone: true
      });

      setTimeout(() => {
        this.setState({ registerDone: false });
      }, 1000);
    }
  }


  addEmployee = () => {
    const { dispathRegisterUser } = this.props;
    const { data } = this.state;
    if (data.email.length === 0) {
      this.setState({ registerDone: true });
      setTimeout(() => {
        this.setState({ registerDone: false });
      }, 1000);
      this.errorMessage = 'Vui lòng điền tên đăng nhập';
      return;
    }
    if (data.password.length === 0 || data.repassword.length === 0) {
      this.setState({ registerDone: true });
      setTimeout(() => {
        this.setState({ registerDone: false });
      }, 1000);
      this.errorMessage = 'Vui lòng điền mật khẩu';
      return;
    }

    if (data.role.length === 0) {
      this.setState({ registerDone: true });
      setTimeout(() => {
        this.setState({ registerDone: false });
      }, 1000);
      this.errorMessage = 'Vui lòng cấp quyền cho người dùng';
      return;
    }

    dispathRegisterUser(data);
  }

  render() {
    const { role } = this.props;
    const { data, registerDone } = this.state;

    return (
      <div className="App">
        <NavigationBar
          menus={[]}
          show
        />
        <div className="container-fluid" style={{ paddingTop: 80 }}>
          <Alert bsStyle={`success ${!registerDone ? 'hide' : ''} fixed`}>
            <strong>{this.errorMessage}</strong>
          </Alert>
          <div className="col-xs-6">
            <h3 style={{ textAlign: 'center' }}>
              Thông tin cá nhân
            </h3>
            <Field
              value={data.firstname}
              id="firstname"
              label="Tên nhân viên"
              handleChange={this.handleChange}
            />
            <Field
              value={data.phone}
              id="phone"
              label="Số điện thoai"
              handleChange={this.handleChange}
            />

            <div
              style={{ marginBottom: 10 }}
              className="app-from-group col-xs-12"
            >
              <div
                className="col-xs-4 app-label"
              >
                <ControlLabel>Chức vụ</ControlLabel>
              </div>
              <div className="col-xs-8">
                <Select
                  showSearch
                  value={(data.role && role.data.filter(e => e._id === data.role)[0].name) || ''}
                  style={{ width: 200 }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={e => this.handleChange('role', e)}
                  filterOption={(input, option) => option.props.children
                    .toLowerCase().indexOf(input.toLowerCase())
                    >= 0
                  }
                >
                  {role.data.map((r, i) => (
                    <Option key={parseInt(i)} value={r._id}>{r.name}</Option>
                  ))}
                </Select>
              </div>
            </div>

          </div>
          <div className="col-xs-6">
            <h3 style={{ textAlign: 'center' }}>
              Thông tin tài khoản
            </h3>
            <Field
              value={data.email}
              id="email"
              label="Tên đăng nhập"
              handleChange={this.handleChange}
            />
            <FormGroup validationState={this.validatePassword()}>
              <Field
                value={data.password}
                type="password"
                id="password"
                label="Mật khẩu"
                handleChange={this.handleChange}
              />
              <Field
                value={data.repassword}
                type="password"
                id="repassword"
                label="Nhập lại Mật khẩu"
                handleChange={this.handleChange}
              />
            </FormGroup>

          </div>
          <div className="col-xs-12 content-center" style={{ marginTop: 50 }}>
            <button type="button" className="btn btn-primary w10" onClick={this.addEmployee}>Thêm nhân viên</button>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  role: state.roleReducer,
  user: state.userReducer,
});

const mapDispathToProps = dispath => ({
  dispathUserRole: () => dispath(userRoleAction()),
  dispathRegisterUser: data => dispath(registerUserAction(data))
});

export default connect(mapStateToProps, mapDispathToProps)(AddEmployee);
