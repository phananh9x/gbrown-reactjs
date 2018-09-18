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
import * as API from '../API';
import NavigationBar from './NavigationBar';
import { requestUserList } from '../redux/actions/userAction';


const status = [
  { id: 1, name: 'Đơn Hàng Mới' },
  { id: 2, name: 'Đã Gọi' },
  { id: 3, name: 'Đang Chăm Sóc' },
  { id: 4, name: 'Đã Huỷ Bỏ' },
  { id: 5, name: 'Đã Kí Hợp Đồng' },
];

const renderCell = (props) => {
  const { value } = props;
  return (
    <Link to={`/purchase/${value.purchaseId}`}>
      <Button>
        <i className="fa fa-cog" aria-hidden="true" />
      </Button>
    </Link>
  );
};

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


class PurchaseList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: [],
      pageSize: 10,
      searchKey: '',
      map: {},
      selectAll: 0,
      staffFilter: {
        name: 'Tất cả',
        id: 0
      },
      statusFilter: status[0]
    };

    this.columns = [{
      id: 'checkbox',
      accessor: '',
      Cell: p => this.renderCheckBox(p),
      Header: () => this.renderCheckBoxAll(),
      sortable: false,
      width: 45
    }, {
      accessor: 'purchaseId',
      Header: 'MSHĐ',
    }, {
      accessor: 'eventName',
      Header: 'Tên Sự Kiện'
    }, {
      accessor: 'total',
      Header: 'Tổng Tiền'
    }, {
      accessor: 'status',
      Header: 'Trạng Thái'
    }, {
      accessor: 'customerName',
      Header: 'Tên Khách Hàng'
    }, {
      accessor: 'phone',
      Header: 'Số Điện Thoại'
    }, {
      id: 'startDate',
      accessor: d => moment(d.startDate).format('DD-MM-YYYY'),
      Header: 'Ngày Tổ Chức',
    }, {
      id: 'agreementDate',
      accessor: d => moment(d.agreementDate).format('DD-MM-YYYY'),
      Header: 'Ngày Chuẩn Bị',
    }, {
      id: 'setupDate',
      accessor: d => moment(d.setupDate).format('DD-MM-YYYY'),
      Header: 'Ngày Set-up',
    }, {
      accessor: 'purchaseId',
      Header: 'Action',
      Cell: p => renderCell(p),
    }
    ];
  }

  selectStaff = (e) => {
    this.setState({ staffFilter: e });
  }

  renderStaff = (e, i) => {
    return (
      <MenuItem
        onClick={() =>
          this.selectStaff(e)}
        key={i}
      >
        {e.firstname}
      </MenuItem>
    );
  }

  selectStatus = (e) => {
    this.setState({ statusFilter: e });
  }

  renderStatus = (e, i) => (
    <MenuItem
      onClick={() =>
        this.selectStatus(e)}
      key={i}
      value={e.name}
    >
      {e.name}
    </MenuItem>
  )

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
    const { login } = nextProps;
    if (login.success) {
      this.getUserList();
    }
  }

  getUserList = () => {
    const { dispathUserList, user } = this.props;
    if (user.data.length === 0 && !user.fetching) {
      dispathUserList();
    }
  }

  componentDidMount() {
    const { match } = this.props;
    API.getAllPurchase(match.params.purchaseId).then((data) => {
      if (data.success) {
        this.setState({ value: data.results });
      }
    });
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

    console.log(statusFilter);
    return (
      <div className="app">
        <NavigationBar
          menus={menuList}
          show
        />
        <div className="container-fluid" style={{ paddingTop: 70 }}>
          <div
            className="row"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '70px'
            }}
          >

            <div className="col-xs-6">
              <ButtonToolbar>
                <ButtonGroup>
                  <Link to="/main">
                    <Button>
                      <Glyphicon glyph="glyphicon glyphicon-pencil" />
                      {' Thêm'}
                    </Button>
                  </Link>
                  <Button>
                    <Glyphicon glyph="glyphicon glyphicon-refresh" />
                  </Button>
                  {selectAll === 1
                    ? (
                      <Button bsStyle="danger">
                        <Glyphicon glyph="glyphicon glyphicon-trash" />
                      </Button>
                    ) : <div />
                  }
                </ButtonGroup>
              </ButtonToolbar>
            </div>
            <div className="col-xs-1 bold">
              Từ
            </div>
            <div className="col-xs-2">
              <DatePicker
                value={moment()}
                showTime
                format="YYYY-MM-DD"
                placeholder="Từ ngày"
                onChange={e => this.handleChangeDate(new Date(e))}
                onOk={e => this.handleChangeDate(new Date(e))}
              />
            </div>
            <div className="col-xs-1 bold">
              Đến
            </div>
            <div className="col-xs-2">
              <DatePicker
                value={moment()}
                showTime
                format="YYYY-MM-DD"
                placeholder="Đến ngày"
                onChange={e => this.handleChangeDate(new Date(e))}
                onOk={e => this.handleChangeDate(new Date(e))}
              />
            </div>
            <div className="col-xs-2 bold">
              Nhân viên
            </div>
            <div className="col-xs-4">
              <DropdownButton
                title={staffFilter.name}
              >
                {user.success && user.data.map((e, i) => this.renderStaff(e, i))}
              </DropdownButton>
            </div>
            {/* <div className="col-xs-2 bold">
              Nhân viên
            </div> */}
            {/* <div className="col-xs-4">
              <DropdownButton
                title={statusFilter}
              >
                {status.map((e, i) => this.renderStatus(e, i))}
              </DropdownButton>
            </div> */}
            <div className="col-xs-5">
              <FormControl
                type="text"
                value={searchKey}
                placeholder="Mã số hợp đồng"
                onChange={this.onSearch}
              />
            </div>

          </div>
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
                if (e.target.className !== 'print' && e.target.name !== 'checkbox') {
                  history.push({
                    pathname: `/purchase/${rowInfo.original.purchaseId}`,
                  });
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
  dispathUserList: () => dispath(requestUserList())
});

export default connect(mapStateToProps, mapDispathToProps)(PurchaseList);
