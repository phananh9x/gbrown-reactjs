import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  FormControl, ButtonToolbar, Button, Glyphicon, ButtonGroup,
} from 'react-bootstrap';
import moment from 'moment';
import ReactTable from 'react-table';
import * as API from '../API';
import NavigationBar from './NavigationBar';


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
      selectAll: 0
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

  render() {
    const {
      value, pageSize, searchKey, selectAll
    } = this.state;
    const {
      history
    } = this.props;
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

            <div className="col-xs-12">
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
                  <Button>
                    <Glyphicon glyph="glyphicon glyphicon-filter" />
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
            <div className="col-xs-10" />
            <div className="col-xs-10">
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

export default PurchaseList;
