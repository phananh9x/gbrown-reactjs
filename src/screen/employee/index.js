import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  FormControl, ButtonToolbar, Button, Glyphicon, ButtonGroup,
  DropdownButton, MenuItem,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactTable from 'react-table';
import { DatePicker } from 'antd';
import * as API from '../../API';
import NavigationBar from '../../components/NavigationBar';
import { requestUserList } from '../../redux/actions/userAction';
import { Select } from 'antd';
import { updateProfile } from '../../redux/actions/login';

const status = [
  { id: 1, name: 'Đơn Hàng Mới' },
  { id: 2, name: 'Đã Gọi' },
  { id: 3, name: 'Đang Chăm Sóc' },
  { id: 4, name: 'Đã Huỷ Bỏ' },
  { id: 5, name: 'Đã Kí Hợp Đồng' },
];

const Option = Select.Option;

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
      searchKey: '',
    };
    this.renderCell = this.renderCell.bind(this)

    this.columns = [ {
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
  
  handleChange =(original, value) => {

  }

  renderCell = (props) => {
    console.log(props)
    const { original } = props;
    // const { value } = this.state;
    return (
      <Select
        showSearch
        value={original && original.role && original.role.name || ''}
        style={{ width: 200 }}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={(value) => this.handleChange(original, value)}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        <Option value="5ba5a5902c920e304c392546">ADMIN</Option>
        <Option value="5ba5a5af2c920e304c392547">NHÂN VIÊN SẢN XUẤT</Option>
        <Option value="5ba5a5c62c920e304c392548">SALE</Option>
        <Option value="5ba5a5e12c920e304c392549">KHÁC</Option>

      </Select>
    )
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

  componentWillReceiveProps(nextProps) {
    const { login, user } = nextProps;
    if (login.success) {
      this.getUserList();
    }

    if (user.success) {
      this.setState({
        value: user.data
      })
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

  onSearch = (e) => {
    this.setState({ searchKey: e.target.value });
  }

  handleChangeDate = (date) => {
    console.log(date);
  }

  render() {
    const {
      value, pageSize, searchKey, selectAll, staffFilter, statusFilter
    } = this.state;

    const {
      history, user
    } = this.props;

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
            data={value}
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
  dispathUpdateProfile: data => dispath(updateProfile(data))
});

export default connect(mapStateToProps, mapDispathToProps)(EmployeeList);
