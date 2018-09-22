import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Jumbotron
} from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactTable from 'react-table';
import { Input } from 'antd';
import * as API from '../../API';
import NavigationBar from '../../components/NavigationBar';
import { chatPurchaseAction } from '../../redux/actions/chatAction';

const { Search } = Input;

const renderCell = (props) => {
  const { value } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button bsStyle="primary" id="schedule">
        <Link to={`/purchase/${value.purchaseId}`} style={{ color: 'white' }}>
          Chia việc
        </Link>
      </Button>
      <Button bsStyle="danger" bsSize="xsmall" style={{ marginTop: 5 }} id="state">
        <Link to={`/purchase/${value.purchaseId}`} style={{ color: 'white' }}>
          Chưa chia việc
        </Link>
      </Button>
    </div>
  );
};

class WorkSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      pageSize: 10,
      map: {},
      selectAll: 0,
    };
    this.toDay = moment(new Date()).format('DD/MM/YYYY');
    this.filterDay = moment(new Date().setDate(new Date().getDate() + 5)).format('DD/MM/YYYY');
    this.columns = [{
      id: 'checkbox',
      accessor: '',
      Cell: p => this.renderCheckBox(p),
      Header: () => this.renderCheckBoxAll(),
      sortable: false,
      width: 30
    }, {
      accessor: 'purchaseId',
      Header: 'MSHĐ',
      width: 55,
    }, {
      accessor: 'eventName',
      Header: 'Tên Sự Kiện',
      width: 120
    }, {
      id: 'customerName',
      accessor: p => this.renderCustomer(p),
      Header: 'Khách Hàng',
      width: 150,
    }, {
      accessor: 'location',
      Header: 'Đia chỉ tổ chức',
      width: 200,
    }, {
      id: 'saleGbrown',
      accessor: p => this.renderSale(p),
      Header: 'Nhân viên Sale',
      width: 130
    }, {
      id: 'chat',
      accessor: p => this.renderChatList(p),
      Header: 'Chat',
    }, {
      id: 'startDate',
      accessor: d => this.renderDate(d.startDate),
      Header: 'Ngày Tổ Chức',
      width: 90
    }, {
      id: 'agreementDate',
      accessor: d => this.renderDate(d.agreementDate),
      Header: 'Ngày Chuẩn Bị',
      width: 100
    }, {
      id: 'setupDate',
      accessor: d => this.renderDate(d.setupDate),
      Header: 'Ngày Set-up',
      width: 90
    }, {
      width: 100,
      accessor: 'purchaseId',
      Header: 'Action',
      Cell: p => renderCell(p),
    }
    ];
  }

  renderSale = (p) => {
    const { user } = this.props;
    const sale = user.data.filter(e => e._id === p.saleGbrown)[0];
    const render = (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>{sale && sale.firstname}</div>
        <div>{sale && sale.email}</div>
      </div>
    );
    return sale ? render : '';
  }

  renderCustomer = (p) => {
    const render = (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>{p.customerName}</div>
        <div>{p.phone}</div>
      </div>
    );
    return render;
  }


  renderDate = (d) => {
    const render = (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>{moment(d).format('DD-MM-YYYY')}</div>
        <div>{moment(d).format('HH:mm')}</div>
      </div>
    );
    return render;
  }

  renderChatList = (p) => {
    const list = [];
    console.log(p);
    p.chat.forEach((e, i) => {
      list.push(
        <div style={{ marginTop: 5 }} key={parseInt(i.toString())}>
          <div style={{ flexDirection: 'row', display: 'flex' }}>
            <div style={{ fontWeight: 'bold' }}>{`${e.user.firstname}: `}</div>
            <div>{e.message}</div>
          </div>
          <div>{moment(e.created).format('DD-MM-YYYY HH:mm:ss')}</div>
        </div>
      );
    });
    list.push(<Search
      key={p.chat.length}
      style={{ marginTop: '10px' }}
      placeholder="Nhập gì đó ở đây..."
      enterButton="GỬI"
      size="small"
      onChange={e => console.log(e.target.value)}
      onSearch={(val) => {
        const { dispathChatPurchase } = this.props;
        dispathChatPurchase({
          message: val,
          category: '',
          purchaseId: p.purchaseId
        });
      }}
    />);
    return list;
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
    const { match, user } = nextProps;
    const { value } = this.state;
    if (user.success && value.length === 0) {
      API.getAllPurchase(match.params.purchaseId).then((data) => {
        if (data.success) {
          this.setState({ value: data.results });
        }
      });
    }
  }

  componentDidMount() {
    const { match, user } = this.props;
    const { value } = this.state;
    if (user.success && value.length === 0) {
      API.getAllPurchase(match.params.purchaseId).then((data) => {
        if (data.success) {
          console.log(data.results);
          this.setState({ value: data.results });
        }
      });
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

  render() {
    const {
      value, pageSize
    } = this.state;
    const {
      history
    } = this.props;

    return (
      <div className="app">
        <NavigationBar
          show
        />
        <div className="container-fluid" style={{ paddingTop: 70 }}>
          <Jumbotron>
            <h3>Nhắc nhở công việc trong ngày dành cho khối sản xuất</h3>
            <p>
              {`Hôm nay là ngày ${this.toDay}, Quản lý khối sản xuất đang xem toàn bộ những đơn hàng diễn ra vào ngày ${this.filterDay}`}
            </p>
          </Jumbotron>

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
                if (e.target.id === 'schedule') {
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
  dispathChatPurchase: data => dispath(chatPurchaseAction(data))
});

export default connect(mapStateToProps, mapDispathToProps)(WorkSchedule);
