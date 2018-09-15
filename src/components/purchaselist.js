import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactTable from 'react-table';
import * as API from '../API';
import NavigationBar from './NavigationBar';

const renderCell = (props) => {
  const { value } = props;
  return <Link to={`/print/${value}`}><span className="print">In Báo Giá</span></Link>;
};

const columns = [{
  accessor: 'purchaseId',
  Header: 'Mã Đơn Đặt Sự Kiện'
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
  Cell: props => renderCell(props),
}];

class PurchaseList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: [],
      pageSize: 10
    };
  }

  componentDidMount() {
    const { match } = this.props;
    API.getAllPurchase(match.params.purchaseId).then((data) => {
      if (data.success) {
        this.setState({ value: data.results });
      }
    });
  }

  render() {
    const { value, pageSize } = this.state;
    const { history } = this.props;

    return (
      <div className="app">
        <NavigationBar
          show
        />
        <div className="container-fluid" style={{ paddingTop: 50 }}>
          <div className="row">
            <div className="col-xs-8">
              <h1>DANH SÁCH ĐƠN ĐẶT HÀNG</h1>
            </div>
            <div
              className="col-xs-4"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70px'
              }}
            >
              <Link to="/main"><button type="button" className="btn btn-primary">Thêm Đơn Hàng</button></Link>
            </div>
          </div>
          <ReactTable
            data={value}
            defaultPageSize={10}
            columns={columns}
            pageSize={pageSize}
            getTrProps={(state, rowInfo, column, instance) => ({
              onClick: (e) => {
                console.log(column);
                console.log(instance);
                if (e.target.className !== 'print') {
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
