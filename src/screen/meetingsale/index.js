import React, { Component } from 'react';
import {
  Button, Jumbotron, Modal, Glyphicon
} from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactTable from 'react-table';
import { Input } from 'antd';
import * as API from '../../API';
import NavigationBar from '../../components/NavigationBar';
import { chatPurchaseAction } from '../../redux/actions/chatAction';
import {
  WORK_MANAGER, MODAL,
  PROGRESS,
  BUTTON
} from '../../constants/string';

const { Search } = Input;


const renderProgress = (props) => {
  const { original } = props;
  const checklist = [
    {
      name: PROGRESS.caring,
      checked: original.chamSoc
    },
    {
      name: PROGRESS.sale_meeting,
      checked: original.hopSale
    },
    {
      name: PROGRESS.scheduling,
      checked: original.chiaViec
    },
    {
      name: PROGRESS.ordering,
      checked: original.chotDon
    },
    {
      name: PROGRESS.ekipmeeting,
      checked: original.hopEkip
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {
        checklist.map((e, i) => (
          <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 5 }} key={parseInt(i.toString())}>
            {e.checked
              ? (
                <button className="btn-success" type="button">
                  <Glyphicon color="green" glyph="glyphicon glyphicon-ok" />
                </button>
              ) : (
                <button className="btn-danger" type="button">
                  <Glyphicon color="red" glyph="glyphicon glyphicon-remove" />
                </button>
              )
            }
            <div style={{ marginLeft: 5 }}>
              {e.name}
            </div>
          </div>
        ))
      }

    </div>
  );
};


const renderCell = (props) => {
  const { original } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button bsStyle="primary" id="purchase_info">
        Chi tiết
      </Button>
      <Button
        // disabled={original.chiaViec}
        bsStyle={original.hopSale ? 'success' : 'danger'}
        bsSize="xsmall"
        style={{ marginTop: 5 }}
        id="confirm_meeting_sale"
      >
        {original.hopSale ? BUTTON.sale_met : BUTTON.not_sale_meeting}
      </Button>
    </div>
  );
};

class MeetingSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      pageSize: 10,
      map: {},
      selectAll: 0,
      showConfirm: false,
    };
    this.valueForSave = {};
    this.modal = {};
    this.purchaseChatId = null;
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
      id: 'customerName',
      accessor: p => this.renderCustomer(p),
      Header: 'Khách Hàng',
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
      maxWidth: 500,
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
      width: 150,
      Header: 'Tiến độ',
      Cell: p => renderProgress(p),
    },
    {
      width: 110,
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
        <div style={{ fontWeight: 'bold' }}>Sự kiện</div>
        <div>{p.eventName}</div>
        <div style={{ fontWeight: 'bold', marginTop: 5 }}>Khách hàng</div>
        <div>{p.customerName}</div>
        <div>{p.phone}</div>
        <div style={{ fontWeight: 'bold', marginTop: 5 }}>Địa chỉ tổ chức</div>
        <div>{p.location}</div>
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
    p.chat.forEach((e, i) => {
      try {
        const messageObject = JSON.parse(e.message);
        const staffs = [];

        if (messageObject.staffs) {
          messageObject.staffs.forEach((s, k) => {
            staffs.push(<div style={{}}>{`${(k + 1)}. ${s.firstname}`}</div>);
          });
        }

        list.push(
          <div style={{ marginTop: 5 }} key={parseInt(i.toString())}>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
              {messageObject.prefix && <div style={{ fontWeight: 'bold' }}>{`[${messageObject.prefix}] `}</div>}
              <div style={{ fontWeight: 'bold' }}>{`${e.user.firstname}: `}</div>
              <div style={{}}>{messageObject.message}</div>
            </div>
            {e.category && e.category.length > 0 && <div style={{}}>{`Hạng mục: ${e.category}`}</div>}
            {messageObject.lead && <div style={{}}>{`Nhân viên thực hiện: ${messageObject.lead}`}</div>}
            {messageObject.staffs && messageObject.staffs.length > 0
              && <div style={{}}>Nhân viên làm cùng </div>}
            {staffs}
            <div>{moment(e.created).format('DD-MM-YYYY HH:mm:ss')}</div>
          </div>
        );
      } catch (error) {
        list.push(
          <div style={{ marginTop: 5 }} key={parseInt(i.toString())}>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <div style={{ fontWeight: 'bold' }}>{`${e.user.firstname}: `}</div>
              <div style={{ width: 100 }}>{e.message}</div>
            </div>
            <div>{moment(e.created).format('DD-MM-YYYY HH:mm:ss')}</div>
          </div>
        );
      }
    });
    list.push(<Search
      key={p.chat.length}
      style={{ marginTop: '10px' }}
      placeholder="Nhập gì đó ở đây..."
      enterButton="GỬI"
      size="small"
      onSearch={(val) => {
        const { dispathChatPurchase } = this.props;
        this.purchaseChatId = p.purchaseId;
        const message = {
          message: val,
          prefix: null,
          lead: null,
          staffs: []
        };
        dispathChatPurchase({
          message: JSON.stringify(message),
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
    const { user, chat } = nextProps;
    const { value } = this.state;
    const date = moment(new Date().setDate(new Date().getDate() + 5)).toDate();
    if (user.success && value.length === 0 && !this.loadList) {
      this.loadList = true;
      API.getAllPurchaseFilterByDate({ date }).then((data) => {
        if (data.success) {
          this.setState({ value: data.results });
        }
      });
    }
    if (!chat.fecthing && chat.success) {
      const listPurchase = JSON.parse(JSON.stringify(value));
      listPurchase.forEach((e) => {
        if (this.purchaseChatId === null) {
          try {
            const messageObject = JSON.parse(chat.data.message);
            if (e.purchaseId === messageObject.purchaseId) {
              e.chat.push(chat.data);
              this.setState({ value: listPurchase });
            }
          } catch (x) {
            console.log(x);
          }
        } else if (e.purchaseId === this.purchaseChatId) {
          e.chat.push(chat.data);
          this.setState({ value: listPurchase });
          this.purchaseChatId = null;
        }
      });
    }
  }

  componentDidMount() {
    const { user } = this.props;
    const { value } = this.state;
    const date = moment(new Date().setDate(new Date().getDate() + 5)).toDate();
    if (user.success && value.length === 0 && !this.loadList) {
      this.loadList = true;
      API.getAllPurchaseFilterByDate({ date }).then((data) => {
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


  confirmSchedule = () => {
    this.valueForSave.hopSale = true;
    API.updatePurchase(this.valueForSave, this.valueForSave.purchaseId).then(() => {
      const { value } = this.state;
      const newValue = JSON.parse(JSON.stringify(value));
      newValue.forEach((e) => {
        if (e.purchaseId === this.valueForSave.purchaseId) {
          e.hopSale = true;
          const { dispathChatPurchase } = this.props;
          /**
           * also send message to CHAT when you update schedule
           * save the key for pushing to chat array correctly
           */
          this.purchaseChatId = this.valueForSave.purchaseId;
          const message = {
            message: WORK_MANAGER.meeting_sale_completed,
            prefix: WORK_MANAGER.prefix,
            lead: null,
            staffs: []
          };
          dispathChatPurchase({
            message: JSON.stringify(message),
            category: '',
            purchaseId: this.valueForSave.purchaseId
          });
        }
      });
      this.setState({ value: newValue });
    });
  }

  render() {
    const {
      value, pageSize, showConfirm
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
              {`Hôm nay là ngày ${this.toDay}, Quản lý khối sản xuất đang xem toàn bộ những đơn hàng diễn ra vào ngày ${this.filterDay}. Những đơn hàng này cần phải được họp với Sale ngay trong ngày hôm nay.`}
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
                if (e.target.id === 'purchase_info') {
                  history.push({
                    pathname: `/purchase/${rowInfo.original.purchaseId}`,
                  });
                } else if (e.target.id === 'confirm_meeting_sale') {
                  if (!rowInfo.original.hopSale) {
                    if (!rowInfo.original.chamSoc) {
                      this.modal = {
                        title: MODAL.require_care_customer_title,
                        body: MODAL.require_care_customer_body,
                        accept: MODAL.button_close,
                        key: MODAL.key_close
                      };
                      this.valueForSave = rowInfo.original;
                      this.setState({ showConfirm: true });
                    } else if (rowInfo.original.chamSoc) {
                      this.modal = {
                        title: MODAL.salemeeting_complete_title,
                        body: MODAL.salemeeting_complete_body,
                        cancel: MODAL.button_cancel,
                        accept: MODAL.button_accept,
                        key: e.target.id
                      };
                      this.valueForSave = rowInfo.original;
                      this.setState({ showConfirm: true });
                    }
                  }
                }
              }
            })}
          />
          {showConfirm
            && (
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>{this.modal.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.modal.body}</Modal.Body>
                <Modal.Footer>
                  {this.modal.cancel
                    && (
                      <Button onClick={() => this.setState({ showConfirm: false })}>
                        {this.modal.cancel}
                      </Button>
                    )
                  }
                  <Button
                    bsStyle="primary"
                    onClick={() => {
                      if (this.modal.key === 'confirm_schedule') {
                        this.setState({ showConfirm: false }, () => this.confirmSchedule());
                      } else if (this.modal.key === MODAL.key_close) {
                        this.setState({ showConfirm: false });
                      }
                    }}
                  >
                    {this.modal.accept}
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            )
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.userReducer,
  login: state.login,
  chat: state.chatPurchaseReducer
});

const mapDispathToProps = dispath => ({
  dispathChatPurchase: data => dispath(chatPurchaseAction(data))
});

export default connect(mapStateToProps, mapDispathToProps)(MeetingSale);
