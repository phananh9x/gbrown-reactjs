import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Checkbox,
  Grid,
  Row,
  Thumbnail,
  Col,
  Image,
  Alert,
  Modal,
  Button
} from 'react-bootstrap'
import ReactToPrint from "react-to-print";
import * as API from '../API';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'
const nhanVien = [{
  name: 'Nguyễn Thị Na',
  phone: '01667183543',
  email: ''
},{
  name: 'TRẦN THỊ YẾN NHI',
  phone: '01636763482',
  email: ''
},{
  name: 'NGUYỄN THỊ BÍCH HỒNG',
  phone: '01662262818',
  email: ''
},{
  name: 'CAO THỊ LIÊN HƯƠNG',
  phone: '0908720570',
  email: ''
},{
  name: 'VÕ THỊ THU HIẾU',
  phone: '01687894341',
  email: ''
},{
  name: 'DƯƠNG QUỐC BẢO',
  phone: '01676567750',
  email: ''
},{
  name: 'LÊ QUỐC BẢO',
  phone: '0968675073',
  email: ''
},{
  name: 'BẠCH THANH QUỐC HƯNG',
  phone: '01647294699',
  email: ''
},{
  name: 'BẠCH THANH QUỐC BỬU',
  phone: '0962362841',
  email: ''
},{
  name: 'NGUYỄN HUỲNH THẢO NGUYÊN',
  phone: '01682192892',
  email: ''
},{
  name: 'NGÔ THỊ THU',
  phone: '01694655380',
  email: ''
},{
  name: 'NGÔ VĂN CHIẾN',
  phone: '01694649446',
  email: ''
},{
  name: 'ĐẶNG HOÀNG TRUNG HIẾU',
  phone: '01689281550',
  email: ''
},{
  name: 'TRẦN THỊ THU THẢO',
  phone: '01299-12879 ',
  email: ''
},{
  name: 'NGUYỄN CỬU QUÝ',
  phone: '0915733607',
  email: ''
},{
  name: 'NGUYỄN VĂN ẨN',
  phone: '01694992535',
  email: ''
},{
  name: 'NGUYỄN NGỌC NON',
  phone: '0898548144',
  email: ''
},{
  name: 'NGUYỄN THANH DUY ',
  phone: '0901916494',
  email: ''
},{
  name: 'NGUYỄN CỬU QUÝ',
  phone: '0915733607',
  email: ''
},{
  name: 'HUỲNH THỊ TRÚC QUYÊN ',
  phone: '0987636964',
  email: ''
},{
  name: 'TRẦN ĐẶNG MINH QUÝ ',
  phone: '0928041332',
  email: ''
},{
  name: 'LÊ THÚY HOA',
  phone: '01677149396',
  email: ''
},{
  name: 'PHAN NHẬT MINH',
  phone: '0901428284',
  email: ''
},{
  name: 'ĐẶNG THANH NAM ',
  phone: '01213638883',
  email: ''
}]
function FieldGroupSelect({ id, label, help, ...props }) {
  return (
    <div controlId={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
      <div className="col-xs-4 app-label">
        <ControlLabel >{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        <FormControl id={id} componentClass="select" placeholder="Chọn">
          <option value="nhanVien1">Đơn hàng mới</option>
          <option value="nhanVien2">Đang chăm sóc</option>
          <option value="nhanVien3">Thành công</option>
          <option value="nhanVien3">Thất bại</option>
        </FormControl>
      </div>
    </div>
  );
}

function FieldGroupSelectNhanVien({ id, label, help, handleChange, ...props }) {
  return (
    <div controlId={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
      <div className="col-xs-4 app-label">
        <ControlLabel >{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        <FormControl id={id} componentClass="select" placeholder="Chọn"  onChange={e => handleChange(id, e.target.value)}>
          {nhanVien.map((e,i) =>
            <option value={e.name}>{e.name}</option>
          )}
        </FormControl>
      </div>
    </div>
  );
}

function ShowMessage({ title, message, button, onClick }) {
  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{message}</Modal.Body>

        <Modal.Footer>
          <Button onClick={onClick}>{button}</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

function FieldCheckBoxWithLabel({ id, label, help, ...props }) {
  return (
    <div controlId={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
      <div className="col-xs-4 app-label">
        <ControlLabel >{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        <Checkbox id={id}></Checkbox>
      </div>
    </div>
  );
}


function FieldCheckBox({ id, label, help, ...props }) {
  return (
    <div>
      <Checkbox id={'vipPurchase'}>Đơn Hàng VIP</Checkbox>
      <Checkbox id={'customerInfoCompleted'}>Hoàn Tất Thông Tin Khách Hàng</Checkbox>
      <Checkbox id={'depositColected'}>Thu Tiền Cọc</Checkbox>
      <Checkbox id={'eventPriceColected'}>Thu Tiền Tiệc</Checkbox>
    </div>
  );
}

function ThongTinHangMuc({ index, value, handleChange, handleChangeFile, ...props }) {
  return (
    <div className="row">
      <div className="col-xs-12">
        <h1>{`THÔNG TIN HẠNG MỤC ${index + 1}`}</h1>
      </div>
      <div className="col-xs-6">
        <FieldGroup
          value={value}
          id="categoryName"
          type="text"
          label="Tên Hạng Mục"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroupFileImage
          label="Hình Ảnh Hạng Mục"
          thongTinHangMuc={index}
          value={value.image}
        />
        <FieldGroupFile
          id="imageCategory"
          type="file"
          label="Thêm Hình Ảnh Hạng Mục"
          thongTinHangMuc={index}
          handleChangeFile={handleChangeFile}
        />
        <FieldGroup
          value={value}
          id="price"
          type="number"
          label="Giá Tiền"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          value={value}
          id="reducedPrice"
          type="number"
          label="Giá Giảm"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          value={value}
          id="cash"
          type="number"
          label="Còn lại"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          value={value}
          id="size"
          type="text"
          label="Kích Thước"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          value={value}
          id="amount"
          type="text"
          label="Số Lượng"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          value={value}
          id="description"
          type="text"
          label="Mô Tả Chi Tiết"
          textArea
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
      </div>
      <div className="col-xs-6">
        <FieldGroup
          value={value}
          id="implementationOfficer"
          type="text"
          label="Nhân Viên Thực Hiện"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          value={value}
          id="customerRequirements"
          type="text"
          label="Yêu Cầu Khách Hàng"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          value={value}
          id="proposedPurchase"
          type="text"
          label="Đề Xuất Thu Mua"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          value={value}
          id="employeeComments"
          type="text"
          label="Góp Ý Nhân Viên"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />

        <FieldGroupFile
          id="imageSetup"
          type="file"
          label="Hình Ảnh Không Gian Set-Up"
          thongTinHangMuc={index}
        />
        <FieldGroup
          value={value}
          id="requestSetup"
          type="text"
          label="Yêu Cầu Của Không Gian Set-Up"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          value={value}
          id="relatedMaterials"
          type="text"
          label="Vật Liệu Liên Quan"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          value={value}
          id="customerReviews"
          type="text"
          label="Ý Kiến Khách Hàng"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
      </div>
      {props.phanTichHangMuc && props.phanTichHangMuc.length && props.phanTichHangMuc.map(item => {
        return (<PhanTichHangMuc index={item} />)
      })}
      <div className="col-xs-12">
        {/*<button className="btn btn-primary" onClick={props.onClick.bind(this, index)}>Thêm Phân Tích Hạng Mục</button>*/}
      </div>
    </div>
  )
}

function PhanTichHangMuc({ index, ...props }) {
  return (
    <div className="row">
      <div className="col-xs-2">
      </div>
      <div className="col-xs-10">
        <h3>{`PHÂN TÍCH HẠNG MỤC LIÊN QUAN ${index + 1}`}</h3>
        <div className="col-xs-6">
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Tên Hạng Mục Liên Quan"
          />
          <FieldGroupSelect
            id="formControlsText"
            type="text"
            label="Nhân Viên Thực Hiện"
          />
        </div>
        <div className="col-xs-6">
          <FieldGroup
            id="formControlsEmail"
            type="date"
            label="Thời Gian Yêu Cầu Của CV"
          />
          <FieldGroup
            id="formControlsEmail"
            type="date"
            label="Thời Gian Dự Kiến Đặt Đơn Hàng"
          />
          <FieldGroup
            id="formControlsEmail"
            type="date"
            label="Thời Gian Dự Kiến Bàn Giao"
          />
          <FieldGroup
            id="formControlsEmail"
            type="text"
            label="Địa Điểm Bàn Giao"
          />
          <FieldGroup
            id="formControlsEmail"
            type="text"
            label="Note"
          />
          <FieldGroup
            id="formControlsEmail"
            type="text"
            label="Phản Hồi Công Việc Của Nhân Viên"
          />
          <FieldCheckBoxWithLabel
            id="formControlsEmail"
            type="text"
            label="Báo Cáo Đã Tiếp Nhận Thông Tin"
          />

        </div>
      </div>

    </div>
  )
}

function FieldGroup({ id, label, type, value, help, disabled, textArea, handleChangeFile, handleChange, thongTinHangMuc, ...props }) {
  return (
    <div controlId={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
      <div className="col-xs-4 app-label">
        <ControlLabel >{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        {textArea && 
          <FormControl type={type} value={value[id] && type == 'date' && moment(value[id]).format("YYYY-MM-DD") || value[id] || ''} componentClass="textarea" onChange={e => handleChange(id, e.target.value)}  {...props} />
          || <FormControl type={type} value={value[id] && type == 'date' && moment(value[id]).format("YYYY-MM-DD") || value[id] || ''} onChange={e => handleChangeFile && handleChangeFile(e.target.files) || handleChange(id, e.target.value, thongTinHangMuc)} disabled={disabled ? disabled : false} {...props} />}
      </div>
    </div>
  );
}

function FieldGroupFile({ id, label, help, disabled, textArea, handleChangeFile, thongTinHangMuc, ...props }) {
  return (
    <div controlId={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
      <div className="col-xs-4 app-label">
        <ControlLabel >{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        {thongTinHangMuc === undefined && <FormControl onChange={e => handleChangeFile(e.target.files)} disabled={disabled ? disabled : false} {...props} /> ||
          <FormControl onChange={e => handleChangeFile(e.target.files, thongTinHangMuc)} disabled={disabled ? disabled : false} {...props} />
        }

      </div>
    </div>
  );
}

function FieldGroupFileImage({ label, value, thongTinHangMuc, ...props }) {
  return (
    <div style={{ marginBottom: 10, heigh: '200px' }} className="app-from-group col-xs-12">
      <div className="col-xs-4 app-label">
        <ControlLabel >{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        {
          value.map((e, i) => (
            <Col xs={6} key={i}>
              <Thumbnail href={e.url} target='blank' src={e.url} alt="242x200" />
            </Col>))
        }
      </div>
    </div>
  );
}
class AddPurchase extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: {
        image: [],
        phoneSaleGbrown: nhanVien[0].phone
      },
      thongTinHangMuc: [],
      phanTichHangMuc: {},
      save: false,
      purchaseId: this.props.match.params.purchaseId
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.addThongTinHangMuc = this.addThongTinHangMuc.bind(this);
    this.addPhanTichHangMuc = this.addPhanTichHangMuc.bind(this);
    this.savePurchase = this.savePurchase.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.match.params.purchaseId)
    if (this.state.purchaseId) {
      API.getPurchaseDetail(this.props.match.params.purchaseId).then(data => {
        // console.log(data.results)
        this.setState({
          value: {
            ...data.results
          },
          thongTinHangMuc: data.results.category
        })
      })
    }
  }

  savePurchase() {
    API.savePurchase(this.state.value).then(e => {
      this.setState({
        save: true
      })
    })
  }

  handleChange(key, value, thongTinHangMuc) {
    if (thongTinHangMuc !== undefined) {
      if (key === 'saleGbrown') {
        let phoneSaleGbrown = nhanVien.filter(e => e.name === value)[0].phone;
        this.setState({
          value: {
            ...this.state.value,
            phoneSaleGbrown: phoneSaleGbrown,
            [key] : value
          }
        })
      }else {
        /**
         * validate if number
         */
        if (key === 'phoneSaleGbrown' || key === 'phone' || key === 'total' || key === 'deposit') {
          const re = /^[0-9\b]+$/;
          if (value == '' || re.test(value)) {
            this.state.thongTinHangMuc[thongTinHangMuc][key] = value;
          }
        } else {
          this.state.thongTinHangMuc[thongTinHangMuc][key] = value;
        }
        if ((key === 'price' || key === 'reducedPrice') && this.state.thongTinHangMuc[thongTinHangMuc].price) {
          this.state.thongTinHangMuc[thongTinHangMuc].cash = this.state.thongTinHangMuc[thongTinHangMuc].price - (this.state.thongTinHangMuc[thongTinHangMuc].reducedPrice &&  this.state.thongTinHangMuc[thongTinHangMuc].reducedPrice || 0)
        }
        this.setState({
          value: {
            ...this.state.value,
            category: this.state.thongTinHangMuc
          }
        })
      }
    } else {
      if (key === 'saleGbrown') {
        let phoneSaleGbrown = nhanVien.filter(e => e.name === value)[0].phone;
        this.setState({
          value: {
            ...this.state.value,
            phoneSaleGbrown: phoneSaleGbrown,
            [key] : value
          }
        })
      }else {
        this.setState({
          value: {
            ...this.state.value,
            [key]: value
          }
        })
      }
    }
  }
  handleChangeFile(value, thongTinHangMuc) {
    let formdata = new FormData();
    formdata.append("file", value[0]);
    API.upload(formdata).then(data => {
      var url = { url: API.server + data.results.path };
      console.log('thongTinHangMuc', thongTinHangMuc === undefined, thongTinHangMuc)
      if (thongTinHangMuc === undefined) {
        this.state.value.image.push(url);
        this.setState(this.state);
      } else {
        this.state.thongTinHangMuc[thongTinHangMuc].image.push(url);
        this.setState({
          value: {
            ...this.state.value,
            category: this.state.thongTinHangMuc
          }
        })
      }
    })
  }

  addThongTinHangMuc() {
    this.state.phanTichHangMuc[this.state.thongTinHangMuc.length] = []
    this.state.thongTinHangMuc.push({ image: [] });
    this.setState(this.state)
  }

  addPhanTichHangMuc(index) {
    this.state.phanTichHangMuc[index].push({})
    this.setState(this.state)
  }


  render() {
    const { thongTinHangMuc, phanTichHangMuc, save, value, purchaseId } = this.state

    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-8">
              <h1>THÔNG TIN ĐƠN HÀNG</h1>
            </div>
            <div className="col-xs-4">
              {
                purchaseId &&
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '70px'
                }}>
                  <Link to="/main"><button class="btn btn-primary">Thêm Đơn Hàng</button></Link>
                  <Link to={`/print/${purchaseId}`}><button class="btn btn-success">In báo Giá</button></Link>
                </div>
              }

            </div>
            <div className="col-xs-6">
              <FieldGroup
                value={value}
                id="purchaseId"
                type="text"
                label="Mã"
                disabled
              />
              <FieldGroup
                value={value}
                id="eventName"
                type="text"
                label="Tên Sự Kiên"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="customerName"
                type="text"
                label="Tên Khách Hàng"
                handleChange={this.handleChange}
              />
              <FieldGroup
                inputType="number"
                value={value}
                id="phone"
                type="number"
                label="Số Điện Thoại"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="startDate"
                type="date"
                label="Ngày tổ chức"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="location"
                type="text"
                label="Địa Điểm Tổ Chức"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="colorTone"
                type="text"
                label="Tone Màu"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="total"
                type="number"
                label="Tổng tiền"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="manager"
                type="text"
                label="Quản Lý"
                handleChange={this.handleChange}
              />
              <FieldGroupFileImage
                label="Hình Ảnh"
                value={this.state.value.image && this.state.value.image.length && this.state.value.image || []}
              />
              <FieldGroupFile
                id="image"
                type="file"
                label="Thêm Hình Ảnh"
                handleChangeFile={this.handleChangeFile}
              />
            </div>
            <div className="col-xs-6">
              <FieldGroup
                value={value}
                id="agreementDate"
                type="date"
                label="Ngày Chuẩn Bị"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="customerAddress"
                type="text"
                label="Địa Chỉ Khách Hàng"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="email"
                type="email"
                label="Email Khách Hàng"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="setupDate"
                type="date"
                label="Ngày Set-Up"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="setupAdress"
                type="text"
                label="Địa Điểm Set-Up"
                handleChange={this.handleChange}
              />
              <FieldGroupSelectNhanVien
                value={value}
                id="saleGbrown"
                type="text"
                label="Nhân Viên Thực Hiện"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="phoneSaleGbrown"
                type="number"
                label="SĐT Nhân Viên"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="emailSaleGbrown"
                type="email"
                label="Email Nhân Viên"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="material"
                type="text"
                label="Chất Liệu"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="deposit"
                type="number"
                label="Đặt Cọc"
                handleChange={this.handleChange}
              />
              <FieldGroupSelect
                value={value}
                id="status"
                type="text"
                label="Trạng thái"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="acceptanceDate"
                type="date"
                label="Ngày Nghiệm Thu"
                disabled
              />
              <FieldGroup
                value={value}
                id="description"
                type="text"
                label="Mô tả"
                textArea
                handleChange={this.handleChange}
              />
            </div>

          </div>
          <div className="col-xs-12">
            <button className="btn btn-primary" onClick={this.addThongTinHangMuc}>Thêm Hạng Mục</button>
          </div>

          {thongTinHangMuc.map((item, index) => {
            return (<ThongTinHangMuc value={item} index={index} onClick={this.addPhanTichHangMuc.bind(this, item)} handleChange={this.handleChange} handleChangeFile={this.handleChangeFile} phanTichHangMuc={phanTichHangMuc[item]} />)
          })}
          <div className="col-xs-12 content-center">
            <FieldCheckBox />
            <button className="btn btn-primary w10" onClick={this.savePurchase}>Lưu Đơn Hàng</button>
          </div>
        </div>
        {save && <ShowMessage
          onClick={() => {
            //reload to refresh field data
            window.location.reload();
            this.setState({ save: false });
          }}
          title="Thông báo"
          message="Tạo đơn hàng thành công"
          button="Đóng lại" />}
      </div>
    );
  }
}

export default withRouter(AddPurchase);
