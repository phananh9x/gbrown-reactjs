import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl, ControlLabel } from 'react-bootstrap';
import NavigationBar from '../../components/NavigationBar';
import { ROLE } from '../../constants/role';
import { updateProfile } from '../../redux/actions/login';


const Field = ({
  id, label, handleChange, disabled, props, defaultValue, type
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
          {...props}
        />
      </div>
    </div>
  );
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.data = {};
  }


  handleChange = (e, v) => {
    this.data[e] = v;
  }

  saveProfile = () => {
    const { dispathUpdateProfile, login } = this.props;
    const newData = Object.assign({}, login.data.results, this.data);
    newData.role = login.data.results.role._id;
    dispathUpdateProfile(newData);
  }

  render() {
    const { login } = this.props;
    const { role } = login.data.results ? login.data.results : false;

    const adminRole = role && role.groupId === ROLE.ADMIN;
    return (
      <div className="App">
        <NavigationBar
          menus={[]}
          show
        />
        <div className="container-fluid" style={{ paddingTop: 80 }}>
          <div className="col-xs-6">
            <h3 style={{ textAlign: 'center' }}>
              Thông tin cá nhân
            </h3>
            <Field
              defaultValue={login.data.results.firstname}
              id="firstname"
              label="Tên nhân viên"
              handleChange={this.handleChange}
            />
            <Field
              defaultValue={login.data.results.phone}
              id="phone"
              label="Số điện thoai"
              handleChange={this.handleChange}
            />
            <Field
              disabled={!adminRole}
              defaultValue={login.data.results.role.name}
              id="role"
              label="Chức vụ"
              handleChange={this.handleChange}
            />


          </div>
          <div className="col-xs-6">
            <h3 style={{ textAlign: 'center' }}>
              Thông tin tài khoản
            </h3>
            <Field
              defaultValue={login.data.results.email}
              disabled
              id="email"
              label="Tên đăng nhập"
              handleChange={this.handleChange}
            />
            <Field
              type="password"
              id="password"
              label="Mật khẩu"
              handleChange={this.handleChange}
            />
            <Field
              type="password"
              id="repassword"
              label="Nhập lại Mật khẩu"
              handleChange={this.handleChange}
            />

          </div>
          <div className="col-xs-12 content-center" style={{ marginTop: 50 }}>
            <button type="button" className="btn btn-primary w10" onClick={this.saveProfile}>Cập nhật thông tin</button>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
});

const mapDispathToProps = dispath => ({
  dispathUpdateProfile: data => dispath(updateProfile(data))
});

export default connect(mapStateToProps, mapDispathToProps)(Profile);
