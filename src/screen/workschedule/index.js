import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  FormControl, ButtonToolbar, Button, Glyphicon, ButtonGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactTable from 'react-table';
import * as API from '../../API';
import NavigationBar from '../../components/NavigationBar';


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

class WorkSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      pageSize: 10,
      searchKey: '',
      map: {},
      selectAll: 0,
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
      accessor: 'customerName',
      Header: 'Tên Khách Hàng'
    }, {
      accessor: 'phone',
      Header: 'Số Điện Thoại'
    }, {
      accessor: 'location',
      Header: 'Đia chỉ tổ chức'
    }, {
      id: 'saleGbrown',
      accessor: p => this.renderSale(p),
      Header: 'Nhân viên Sale',
    },
    {
      id: 'saleGbrown',
      accessor: p => this.renderSalePhone(p),
      Header: 'Số điện thoại Sale',
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

  renderSale = (p) => {
    const { user } = this.props;
    const sale = user.data.filter(e => e._id === p.saleGbrown)[0];
    return sale ? sale.firstname : '';
  }

  renderSalePhone = (p) => {
    const { user } = this.props;
    const sale = user.data.filter(e => e._id === p.saleGbrown)[0];
    return sale ? sale.email : '';
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
      value, pageSize, searchKey, selectAll
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

export default connect(mapStateToProps, null)(WorkSchedule);
