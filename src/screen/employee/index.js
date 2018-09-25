
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactTable from 'react-table';
import { Select } from 'antd';
import NavigationBar from '../../components/NavigationBar';
import { requestUserList, adminUserProfile } from '../../redux/actions/userAction';

const { Option } = Select;

const menuList = [
  {
    name: 'Danh sách đơn hàng',
    path: '/'
  },
  {
    name: 'Tạo đơn hàng',
    path: '/main'
  }
];


class EmployeeList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: [],
      pageSize: 10,
    };
    this.renderCell = this.renderCell.bind(this);

    this.columns = [{
      width: 50
    }, {
      accessor: 'firstname',
      Header: 'Tên nhân viên'
    }, {
      accessor: 'phone',
      Header: 'Số điện thoại'
    }, {
      accessor: 'email',
      Header: 'Tài khoản đăng nhập'
    }, {
      id: 'created',
      accessor: d => moment(d.startDate).format('DD-MM-YYYY'),
      Header: 'Ngày Tạo',
    }, {
      accessor: '_id',
      Header: 'Chức vụ',
      Cell: p => this.renderCell(p),
    }
    ];
  }

  handleChange = (original, value) => {
    console.log(original, value);
    const { dispathAdminUpdateProfile } = this.props;
    const data = {
      _id: original._id,
      role: value,
    };

    dispathAdminUpdateProfile(data);
  }

  renderCell = (props) => {
    const { original } = props;
    // const { value } = this.state;
    return (
      <Select
        showSearch
        value={(original && original.role && original.role.name) || ''}
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={value => this.handleChange(original, value)}
        filterOption={(input, option) => option.props.children
          .toLowerCase().indexOf(input.toLowerCase())
          >= 0
        }
      >
        <Option value="5ba5a5902c920e304c392546">ADMIN</Option>
        <Option value="5ba5a5c62c920e304c392548">NHÂN VIÊN SẢN XUẤT</Option>
        <Option value="5ba5a5af2c920e304c392547">SALE</Option>
        <Option value="5ba5a5e12c920e304c392549">KHÁC</Option>

      </Select>
    );
  }

  renderCheckBox = (props) => {
    const { value } = props;
    const { map } = this.state;
    return (
      <input
        name="checkbox"
        type="checkbox"
        className="checkbox"
        checked={map[value.purchaseId] === true}
        onChange={() => this.toggleRow(value.purchaseId)}
      />
    );
  };

  renderCheckBoxAll = () => {
    const { selectAll } = this.state;
    return (<input
      name="checkbox"
      type="checkbox"
      className="checkbox"
      checked={selectAll === 1}
      ref={(input) => {
        if (input) {
          input.indeterminate = selectAll === 2;
        }
      }}
      onChange={this.toggleSelectAll}
    />
    );
  };

  componentDidMount() {
    const { login } = this.props;
    if (login.success) {
      this.getUserList();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;

    if (user.success && !user.fetching) {
      this.setState({
        value: user.data
      });
    }
  }

  getUserList = () => {
    const { dispathUserList, user } = this.props;
    if (user.data.length === 0 && !user.fetching) {
      dispathUserList();
    }
  }

  toggleSelectAll = () => {
    const newSelected = {};
    const { value, selectAll } = this.state;
    if (selectAll === 0) {
      if (value) {
        value.forEach((x) => {
          newSelected[x.purchaseId] = true;
        });
      }
    }
    this.setState({
      map: newSelected,
      selectAll: selectAll === 0 ? 1 : 0
    });
  };

  toggleRow = (id) => {
    const { map } = this.state;
    const newSelected = Object.assign({}, map);
    newSelected[id] = !map[id];
    this.setState({ map: newSelected, selectAll: 2 });
  };

  handleChangeDate = (date) => {
    console.log(date);
  }

  render() {
    const {
      pageSize
    } = this.state;

    const { user } = this.props;

    console.log(user);
    return (
      <div className="app">
        <NavigationBar
          menus={menuList}
          show
        />
        <div className="container-fluid" style={{ paddingTop: 70 }}>
          <ReactTable
            showPaginationBottom
            data={user.data}
            columns={this.columns}
            pageSize={pageSize}
            getTrProps={(state, rowInfo) => ({
              onClick: (e) => {
                if (e.target.name === 'checkbox') {
                  this.toggleRow(rowInfo.original.purchaseId);
                }
              }
            })}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.userReducer,
  login: state.login
});
const mapDispathToProps = dispath => ({
  dispathUserList: () => dispath(requestUserList()),
  dispathAdminUpdateProfile: data => dispath(adminUserProfile(data))
});

export default connect(mapStateToProps, mapDispathToProps)(EmployeeList);
