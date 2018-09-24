/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
// import ReactToPrint from 'react-to-print';
import * as API from '../API';
import '../styles/sharework.css';
import { showNavBar } from '../redux/actions/navBar';
import { requestUserList } from '../redux/actions/userAction';

class ShareWork extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: {
      },
    };
  }

  componentWillMount() {
    const { match, dispathNavBar } = this.props;
    if (match.params && match.params.purchaseId && match.params.categoryIndex) {
      // console.log(this.props.match.params.purchaseId)
      API.getPurchaseDetail(match.params.purchaseId).then((data) => {
        // console.log(data.results)
        this.setState({
          value: {
            ...data.results
          },
          category: {
            ...(data.results && data.results.category
              && data.results.category[match.params.categoryIndex]) || {}
          },
        });
      });
    }
    dispathNavBar(false);
  }

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


  render() {
    const { value, category } = this.state;
    const { user } = this.props;
    console.log(user.data);
    const saleGbrown = value.saleGbrown
      && value.saleGbrown
      && user.data.length
      && user.data.filter(e => e._id === value.saleGbrown)[0].firstname;
    const nvLamCung = category && category.implementationOfficerGroup && category.implementationOfficerGroup.length
      && category.implementationOfficerGroup.map(e => e.firstname).join(', ');
    let image = []
    if (category && category.image && category.image.length) {
      let temp = [];
      let count = 0;
      for (let index = 0; index < category.image.length; index++) {
        temp.push(category.image[index]);
        count++;
        if ((index > 0 && count % 4 === 0) || count === category.image.length) {
          image.push(temp);
          temp = [];
        }
      }
    }
    console.log(image)
    return (
      <div className="App" ref={el => (this.componentRef = el)} style={{ backgroundColor: 'gray' }}>
        {/* <ReactToPrint
          trigger={() => (
            // <button
            //   type="button"
            //   style={{ position: 'absolute' }}
            //   className="btn btn-success"
            // >
            //   {'In Bảng Chia Việc'}
            // </button>
          )
          }
          content={() => this.componentRef}
        /> */}
        <div className="A4 page vertical">
          <div className="vertical" style={{ margin: '0.5cm' }}>
            <div className="row" style={{ border: '1px solid #000', display: 'flex', alignItems: 'center' }}>
              <div className="col-xs-4" style={{ borderRight: '1px solid #000' }}>
                <img src="http://103.7.41.176:3000/images/file-1537360294636-Untitled.png" alt="logo" style={{ margin: '0.2cm' }} />
              </div>
              <div className="col-xs-8" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: '28px' }}>CHIA VIỆC LÀM</div>
                <div>{`Hôm nay: Ngày ${new Date().getDate()} tháng ${new Date().getMonth() + 1} năm ${new Date().getFullYear()}`}</div>
              </div>
            </div>
            <div className="full-height">
              <div className="full-row" style={{ border: '1px solid #000', display: 'flex', alignItems: 'start', marginTop: '0.5cm' }}>
                <div className="col-xs-5 no-float" style={{ borderRight: '1px solid #000' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, fontStyle: 'underline' }}>THÔNG TIN NHÂN SỰ:</div>
                  <div>
                    {'Quản lý:   '}
                    <b>{value.manager}</b>
                  </div>
                  <div>
                    {'Nhân viên thực hiện:    '}
                    <b>{category && category.implementationOfficer && category.implementationOfficer.firstname}</b>
                  </div>
                  <div>
                    {'Nhân viên làm cùng:  '}
                    <b>{nvLamCung}</b>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, fontStyle: 'underline' }}>THÔNG TIN LIÊN HỆ VỚI KHÁCH HÀNG:</div>
                  <div>
                    {'Tên khách hàng:  '}
                    <b>{value.customerName}</b>
                  </div>
                  <div>
                    {'Số điện thoại:   '}
                    <b>{value.phone}</b>
                  </div>
                </div>
                <div className="col-xs-7 no-float">
                  <div style={{ fontSize: 15, fontWeight: 600, fontStyle: 'underline' }}>THÔNG TIN CÔNG VIỆC ĐƯỢC GIAO:</div>
                  <div>
                    {'Tên sự kiện:   '}
                    <b>{value.eventName}</b>
                  </div>
                  <div>
                    {'Tên hạng mục:    '}
                    <b>{category && category.categoryName}</b>
                  </div>
                  <div>
                    {'Kích thước:    '}
                    <b>{category && category.size}</b>
                  </div>
                  <div>
                    {'Số lượng:    '}
                    <b>{(category && category.amount) || 1}</b>
                  </div>
                  <div>
                    {'Yêu cầu của khách hàng và yêu cầu quy chuẩn sản phẩm của công ty:    '}
                    <b>{category && category.proposedPurchase}</b>
                  </div>
                  <div>
                    {'Ngày tổ chức:    '}
                    <b>{value.startDate && moment(new Date(value.startDate)).format('HH:m DD/MM/YYYY')}</b>
                  </div>
                  <div>
                    {'Note chi tiết nhân viên thực hiện:    '}
                    <b>{category && category.noteImplementationOfficer && category.noteImplementationOfficer}</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ border: '1px solid #000', marginTop: '0.5cm', minHeight: '750px', padding: '15px' }}>
              <div className="col-xs-12" style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '28px' }}>HÌNH ẢNH</div>
                <div>
                  {'Địa điểm setup:    '}
                  <b>{value.setupAdress}</b>
                </div>
                <div>
                  {'Ngày setup:    '}
                  <b>{value.setupDate && moment(new Date(value.setupDate)).format('HH:mm DD/MM/YYYY')}</b>
                </div>
              </div>
              <div className="col-xs-12" style={{ flexDirection: 'row', display: 'flex', minHeight: '300px', flexWrap: 'wrap' }}>
                {
                  image.length && image[0].map((e, i) =>
                    <div className="col-xs-6" style={{ marginTop: i >= 2 && '10px' || 0 }}>
                      <img src={e.url} />
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        {image.length > 1 && image.map((e, i) => {
          if (i > 0) {
            return (
              <div className="A4 page vertical">
                <div className="vertical" style={{ margin: '0.5cm' }}>
                  <div className="row" style={{ border: '1px solid #000', marginTop: '0.5cm', minHeight: '750px', padding: '15px' }}>
                    <div className="col-xs-12" style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '28px' }}>HÌNH ẢNH</div>

                    </div>
                    <div className="col-xs-12" style={{ flexDirection: 'row', display: 'flex', minHeight: '300px', flexWrap: 'wrap' }}>
                      {
                        e.map((item, i) =>
                          <div className="col-xs-6" style={{ marginTop: i >= 2 && '10px' || 0 }}>
                            <img src={item.url} />
                          </div>)
                      }
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })}
        <div className="A4 page vertical">
          <div className="vertical" style={{ margin: '0.5cm' }}>
            <div className="full-height" style={{ border: '1px solid #000', marginTop: '0.5cm' }}>
              <div className="full-row">
                <div className="col-xs-6 no-float" style={{ padding: 0, borderRight: '1px solid #000' }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Ngày Chuẩn bị:</div>
                  {category && category.ngayChuanBi && category.ngayChuanBi.length
                    && category.ngayChuanBi.map((e, i) =>
                      <div key={e.id} style={{
                        borderBottom: ((category.ngayChuanBi.length - 1 !== i)
                          && '1px solid #000') || 'none', marginRight: '15px'
                      }}
                      >
                        <div>
                          {`Ngày ${i + 1}:    `}
                          <b>{e.date && moment(new Date(e.date)).format("HH:mm DD/MM/YYYY")}</b>
                        </div>
                        <div>
                          {`Công Việc ${i + 1}:   `}
                          <b>{e.congviec}</b>
                        </div>
                      </div>
                    )}
                </div>
                <div className="col-xs-6 no-float">
                  <div style={{ fontSize: 14, fontWeight: '600' }}>Chat với lãnh đạo khách hàng, sale và nhân viên sản xuất:</div>
                  {
                    category && category.chat && category.chat.length && category.chat.map((e, i) =>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ fontWeight: 500, fontSize: 12, width: '58%' }}><b>{`${e.name} : `}</b>{e.message}</div>
                          <div><b>{e.date}</b></div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>

            <div className="col-xs-12" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px' }}>
              <div style={{ height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Quản lý</div>
                <div><b>{value.manager}</b></div>
              </div>
              <div style={{ height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Nhân Viên Thực Hiện</div>
                <div><b>{category && category.implementationOfficer && category.implementationOfficer.firstname}</b></div>
              </div>
              <div style={{ height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Nhân Viên Làm Cùng</div>
                <div><b>{category && category.implementationOfficer && category.implementationOfficerGroup.length && category.implementationOfficerGroup[0].firstname}</b></div>
              </div>
              <div style={{ height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Sale</div>
                <div><b>{saleGbrown}</b></div>
              </div>
              <div style={{ height: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Giám dốc</div>
                <div><b>Đặng Thanh Tứ</b></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}


const mapStateToProps = state => ({
  navBar: state.navBar,
  user: state.userReducer,
  login: state.login
});
const mapDispathToProps = dispath => ({
  dispathNavBar: show => dispath(showNavBar(show)),
  dispathUserList: () => dispath(requestUserList())
});

export default connect(mapStateToProps, mapDispathToProps)(ShareWork);
