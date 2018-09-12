import React, { Component } from 'react';
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import * as API from '../API';
import '../styles/print.css';

class PrintDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: {
      },
    };
  }

  componentWillMount() {
    const { match } = this.props;
    if (match.params && match.params.purchaseId) {
      // console.log(this.props.match.params.purchaseId)
      API.getPurchaseDetail(match.params.purchaseId).then((data) => {
        // console.log(data.results)
        this.setState({
          value: {
            ...data.results
          }
        });
      });
    }
  }

  componentDidMount() {

  }

  render() {
    const { value } = this.state;
    return (
      <div className="App" ref={el => (this.componentRef = el)}>
        <ReactToPrint
          trigger={() => (
            <button
              type="button"
              style={{ position: 'absolute' }}
              className="btn btn-success"
            >
              In Chi Tiết Hợp Đồng
            </button>
          )
          }
          content={() => this.componentRef}
        />
        <div className="A4 page">
          <div className="section">
            <img
              alt=""
              className="w100"
              src="http://103.7.41.176:3000/images/file-1536241983261-bg1-5858.png"
            />
          </div>
        </div>
        <div className="A4 page">
          <div
            className="section"
            style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', color: 'white'
            }}
          >
            <h3 className="bold">GBROWN FLOWER</h3>
            <h1 className="bold" style={{ fontSize: 60 }}>BẢN MÔ TẢ CHI TIẾT HỢP ĐỒNG</h1>
            <h4>Design by Simon Tứ </h4>
          </div>
        </div>
        {value.category && value.category.map((e, i) => (
          <div className="A4 page" key={parseInt(i.toString())}>
            <div className="section">
              <div className="slide" data-anchor="slide0">
                <div className="cont_fullscreen">
                  <div className="cont_center">
                    <div className="tit_fullscreen">GBROWN FLOWER / SIMONTU</div>
                    <div className="cont_image clearfix">
                      <div className="cont_image_l clearfix">
                        {e.image.length && e.image[0] && (
                          <a href className="autozoom">
                            <img
                              src={e.image[0].url}
                              alt="no_image"
                            />
                          </a>
                        )}
                      </div>
                      <div className="cont_image_r clearfix">
                        {e.image.length && e.image[1] && (
                          <div className="cont_image_br clearfix">
                            <a href className="autozoom">
                              <img src={e.image[1].url} alt="no_image" />
                            </a>
                          </div>
                        )}
                        {e.image.length && e.image[2] && (
                          <div className="cont_image_br clearfix">
                            <a href className="autozoom">
                              <img src={e.image[2].url} alt="no_image" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="cont_footer clearfix">
                    <div className="cont_center clearfix">
                      <div className="cont_footer_l clearfix">
                        <h2 style={{ fontWeight: 'bold' }}>{`${i + 1}. ${e.categoryName || ''}`}</h2>
                        <p>{`Giá tiền: ${e.price || '0'}đ`}</p>
                        <p>
                          Số lượng:
                          {' '}
                          {e.amount || 1}
                        </p>
                      </div>
                      <div className="cont_footer_r clearfix">
                        <h2 style={{ fontWeight: 'bold' }}>MÔ TẢ CHI TIẾT:</h2>
                        <div className="cont_motachitiet clearfix">
                          {e.desciption || ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
        }
        <div className="A4 page">
          <div className="section">
            <div className="cont_fullscreen">
              <div className="cont_center">
                <div className="tit_fullscreen">GBROWN FLOWER / SIMONTU</div>
                <div className="cont_mota">
                  Thân gửi đến Quý khách hàng, ước mong anh chị dành chút thời gian có
                  thể xem qua bảng báo giá này. Và nhờ anh chị xác nhận lại thông tin
                  trên. Chân thành!
                </div>
                <div className="cont_baogia clearfix">
                  <h2>THÔNG TIN BÁO GIÁ</h2>
                  <div className="cont_baogia_main clearfix">
                    <div className="line_baogia">{`Tên khách hàng: ${value.customerName || ''}`}</div>
                    <div className="line_baogia">
                      MSHĐ:
                      {' '}
                      {value.purchaseId || ''}
                    </div>
                    <div className="line_baogia">
                      SĐT:
                      {' '}
                      {value.phone || ''}
                    </div>
                    <div className="line_baogia">
                      Ngày diễn ra tiệc:
                      {' '}
                      {moment(value.startDate).format('DD.MM.YYYY') || ''}
                    </div>
                    <div className="line_baogia">
                      NVKD phụ trách:
                      {' '}
                      {value.saleGbrown.toUpperCase() || ''}
                    </div>
                    <div className="line_baogia">
                      Địa điểm tổ chức:
                      {' '}
                      {value.location || ''}
                    </div>
                  </div>
                </div>
                <div className="tit_center clearfix">ĐẠI DIỆN</div>
                <div className="tit_center clearfix">GBROWN FLOWER</div>
              </div>
              <div className="cont_fo2 clearfix">
                <div className="cont_center clearfix">
                  <ul className="mangxahoi clearfix">
                    <li>
                      <a href="/" target="_blank" title="Mạng xã hội 1">
                        <img
                          src="http://gbrownflowerquanlynoibo.info/upload/hinhanh/icon_1-6704.png"
                          alt="Mạng xã hội 1"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="/" target="_blank" title="Mạng xã hội 2">
                        <img
                          src="http://gbrownflowerquanlynoibo.info/upload/hinhanh/icon_2-2740.png"
                          alt="Mạng xã hội 2"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="/" target="_blank" title="Mạng xã hội 3">
                        <img
                          src="http://gbrownflowerquanlynoibo.info/upload/hinhanh/icon_3-8084.png"
                          alt="Mạng xã hội 3"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="/" target="_blank" title="Mạng xã hội 4">
                        <img
                          src="http://gbrownflowerquanlynoibo.info/upload/hinhanh/icon_4-2977.png"
                          alt="Mạng xã hội 4"
                        />
                      </a>
                    </li>
                  </ul>
                  <div className="tit_fo2">Mọi chi tiết xin liên hệ:</div>
                  <div className="tit_fo3">
                    CÔNG TY TNH TỔ CHỨC SỰ KIỆN VÀ DỊCH VỤ TRANG TRÍ CƯỚI GBROWN
                  </div>
                  <div className="tit_fo2">
                    www.salegbrown.vn | www.gbrownflower.vn | 0902 079 921 - 0942 887
                    200 | www.facebook.com/gbrownflower
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PrintDetail;
