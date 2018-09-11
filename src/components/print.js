import React, { Component } from 'react';
import * as API from '../API';
import moment from 'moment';
import ReactToPrint from "react-to-print";
import '../styles/print.css'

class Print extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: {
      },
    };
  }
  componentWillMount() {
    if (this.props.match.params && this.props.match.params.purchaseId) {
      // console.log(this.props.match.params.purchaseId)
      API.getPurchaseDetail(this.props.match.params.purchaseId).then(data => {
        // console.log(data.results)
        this.setState({
          value: {
            ...data.results
          }
        })
      })
    }
  }

  componentDidMount() {

  }
   render() {
      const { value } = this.state
      return (
          <div className="App" ref={el => (this.componentRef = el)} >
            <ReactToPrint
              trigger={() => <button style={{position: 'absolute'}} class="btn btn-success">In báo Giá</button>}
              content={() => this.componentRef}
            />
              <div className="A4 page">
                <div className="section">
                  <img className="w100" src='http://103.7.41.176:3000/images/file-1536241983261-bg1-5858.png' />
                </div>
              </div>
              <div className="A4 page">
                <div className="section">
                  <img className="w100" src='http://103.7.41.176:3000/images/file-1536242014890-bg2-6055.png' />
                </div>
              </div>
              <div className="A4 page">
                <div className="section">
                  <div className="cont_fullscreen">
                    <div className="cont_center">
                      <div className="section3header clearfix">
                        <div className="section3headerl">
                          <h3>GBROWN FLOWER / SIMONTU</h3>
                          <h2>{`BÁO GIÁ TRỌN GÓI TRANG TRÍ ${value.eventName && value.eventName.toUpperCase() || ''} ${value.customerName && value.customerName.toUpperCase()|| ''} `}</h2>
                        </div>
                        <div className="section3headerr">
                          <div className="section3headerrbox">
                            <div className="section3headerrboxl">
                              <p>NGÀY:</p>
                              <p>MSHĐ:</p>
                            </div>
                            <div className="section3headerrboxr">
                              <p>{moment().format("DD - MM - YYYY")}</p>
                              <p>{value.purchaseId}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="section3body clearfix">
                        <p className="full_line clearfix">{`Kính gửi: ${value.customerName}`}</p>
                        <p className="half_line1 clearfix">{`Tôi tên: ${value.saleGbrown && value.saleGbrown.toUpperCase() || ''}`}</p>
                        <p className="half_line2 clearfix">Thuộc: GBROWN</p>
                        <p className="full_line clearfix">Sau khi thỏa thuận giữa hai bên, tôi xin gửi đến Quý khách hàng bảng báo giá vè dịch vụ như sau:</p>
                        <div className="clear"></div>
                        <div className="section3bodyl clearfix">
                          <h2>THÔNG TIN GBROWN</h2>
                          <div className="cont_mainbodyl clearfix">
                            <div className="line">{`Sale phụ trách: ${value.saleGbrown && value.saleGbrown.toUpperCase()|| ''}`}</div>
                            <div className="line">{`SĐT: ${value.phoneSaleGbrown && value.phoneSaleGbrown  || '0933153999'}`}</div>
                            <div className="line">{`Email: ${value.emailSaleGbrown}`}</div>
                          </div>
                        </div>
                        <div className="section3bodyr clearfix">
                          <h2>THÔNG TIN KHÁCH HÀNG</h2>
                          <div className="cont_mainbodyl clearfix">
                            <div className="line25">{`Sự kiện: ${value.eventName} `}</div>
                            <div className="line25">{`Tên khách: ${value.customerName}`}</div>
                            <div className="line25">{`SĐT: ${value.phone && value.phone || '0933153999'}`}</div>
                            <div className="line25">{`Email: ${value.email}`}</div>
                            <div className="line33">{`Địa chỉ: ${value.customerAddress}`}</div>
                            <div className="line33">{`Tổng giá trị trang trí: ${value.total} VNĐ`}</div>
                            <div className="line33">{`Ngày diễn ra tiệc: ${moment(value.startDate).format("DD.MM.YYYY")}`}</div>
                            <div className="line33">{`Thời gian bàn giao: ${moment(value.agreementDate).format("DD.MM.YYYY")}`}</div>
                            <div className="line33">{`Địa điểm tổ chức: ${value.location}`}</div>
                            <div className="line33">{`Tone màu: ${value.toneColor}`}</div>
                          </div>
                        </div>
                      </div>
                      <div className="section3footer clearfix">
                <p>Hạng mục thống nhất bao gồm</p>
                <table id="customers">
                <tbody>
                <tr>
                    <th width="30">STT</th>
                    <th width="250">HẠNG MỤC</th>
                    <th width="60">SỐ LƯỢNG</th>
                    <th width="100">ĐƠN GIÁ</th>
                    <th width="100">GIÁ GIẢM</th>
                    <th width="100">THÀNH TIỀN</th>
                    <th width="120">KÍCH THƯỚC</th>
                    <th>GHI CHÚ</th>
                </tr>
                {value.category && value.category.map((e,i) => 
                  (<tr>
                      <td align="center">{i+1}</td>
                      <td align="center">{e.categoryName}</td>
                      <td align="center">{e.amount && e.amount || 1}</td>
                      <td align="center">{`${e.price && e.price || 0}đ`}</td>
                      <td align="center">{`${e.reducedPrice && e.reducedPrice || 0}đ`}</td>
                      <td align="center">{`${e.cash && e.cash||0 }đ`}</td>
                      <td align="center">{e.size && e.size || ''}</td>
                      <td align="center">{e.desciption && e.desciption || ''}</td>
                  </tr>)
                )}
                <tr>
                    <td colspan="4" align="center">TỔNG SỐ TIỀN (VNĐ)<br/>{`${value.total}đ` }</td>
                    <td style={{background:'#e1e0e5'}} colspan="3" align="center">(tổng số tiền ghi bằng chữ)<br/>
                                                                          </td>
                </tr>
                    </tbody></table>
                <div className="wrap_titfo clearfix">Bảng Giá trên chưa bao gồm Thuế VAT</div>
                    </div>
                  </div>  
                </div>
              </div>
              </div>
              {value.category && value.category.map((e,i)=> (
                <div className="A4 page" key={i}>
                  <div className="section">
                    <div className="slide" data-anchor="slide0">
                    <div className="cont_fullscreen">
                      <div className="cont_center">
                        <div className="tit_fullscreen">GBROWN FLOWER / SIMONTU</div>
                          <div className="cont_image clearfix">
                            <div className="cont_image_l clearfix">
                              {e.image.length && e.image[0] && <a className="autozoom">
                                <img src={e.image[0].url} alt="no image"/>
                              </a>}
                            </div>
                            <div className="cont_image_r clearfix">
                              {e.image.length && e.image[1] && <div class="cont_image_br clearfix">
                                <a class="autozoom">
                                    <img src={e.image[1].url} alt="no image"/>
                                </a>
                              </div>}
                              {e.image.length && e.image[2] && <div class="cont_image_br clearfix">
                                <a class="autozoom">
                                  <img src={e.image[2].url} alt="no image"/>
                                </a>
                              </div>}
                            </div>
                          </div>
                      </div>
                      <div className="cont_footer clearfix">
                        <div className="cont_center clearfix">
                            <div className="cont_footer_l clearfix">
                                <h2 style={{fontWeight: 'bold'}}>{`${i + 1}. ${e.categoryName} `}</h2>
                                <p>{`Giá tiền: ${e.price}đ`}</p>
                                <p>Số lượng: {e.amount && e.amount || 1}</p>
                            </div>
                            <div className="cont_footer_r clearfix">
                                <h2 style={{fontWeight: 'bold'}}>MÔ TẢ CHI TIẾT:</h2>
                                <div className="cont_motachitiet clearfix">
                                {e.desciption && e.desciption || ''}
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              ))}
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
                          <div className="line_baogia">{`Tên khách hàng: ${value.customerName}`}</div>
                          <div className="line_baogia">MSHĐ: {value.purchaseId}</div>
                          <div className="line_baogia">SĐT: {value.phone}</div>
                          <div className="line_baogia">Ngày diễn ra tiệc: {moment(value.startDate).format("DD.MM.YYYY")}</div>
                          <div className="line_baogia">NVKD phụ trách: {value.saleGbrown&& value.saleGbrown.toUpperCase() || ''}</div>
                          <div className="line_baogia">
                            Địa điểm tổ chức: {value.location}
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
                            <a href="" target="_blank" title="Mạng xã hội 1">
                              <img
                                src="http://gbrownflowerquanlynoibo.info/upload/hinhanh/icon_1-6704.png"
                                alt="Mạng xã hội 1"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="" target="_blank" title="Mạng xã hội 2">
                              <img
                                src="http://gbrownflowerquanlynoibo.info/upload/hinhanh/icon_2-2740.png"
                                alt="Mạng xã hội 2"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="" target="_blank" title="Mạng xã hội 3">
                              <img
                                src="http://gbrownflowerquanlynoibo.info/upload/hinhanh/icon_3-8084.png"
                                alt="Mạng xã hội 3"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="" target="_blank" title="Mạng xã hội 4">
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

export default Print;
