import React, { Component } from 'react';
import {
  FormControl, ControlLabel, Checkbox, Thumbnail, Col, Alert
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as API from '../API';
import FieldGroup from './FieldGroup';
import { showNavBar } from '../redux/actions/navBar';
import NavigationBar from './NavigationBar';

const nhanVien = [{
  name: 'Nguyễn Thị Na',
  phone: '01667183543',
  email: ''
}, {
  name: 'TRẦN THỊ YẾN NHI',
  phone: '01636763482',
  email: ''
}, {
  name: 'NGUYỄN THỊ BÍCH HỒNG',
  phone: '01662262818',
  email: ''
}, {
  name: 'CAO THỊ LIÊN HƯƠNG',
  phone: '0908720570',
  email: ''
}, {
  name: 'VÕ THỊ THU HIẾU',
  phone: '01687894341',
  email: ''
}, {
  name: 'DƯƠNG QUỐC BẢO',
  phone: '01676567750',
  email: ''
}, {
  name: 'LÊ QUỐC BẢO',
  phone: '0968675073',
  email: ''
}, {
  name: 'BẠCH THANH QUỐC HƯNG',
  phone: '01647294699',
  email: ''
}, {
  name: 'BẠCH THANH QUỐC BỬU',
  phone: '0962362841',
  email: ''
}, {
  name: 'NGUYỄN HUỲNH THẢO NGUYÊN',
  phone: '01682192892',
  email: ''
}, {
  name: 'NGÔ THỊ THU',
  phone: '01694655380',
  email: ''
}, {
  name: 'NGÔ VĂN CHIẾN',
  phone: '01694649446',
  email: ''
}, {
  name: 'ĐẶNG HOÀNG TRUNG HIẾU',
  phone: '01689281550',
  email: ''
}, {
  name: 'TRẦN THỊ THU THẢO',
  phone: '01299-12879 ',
  email: ''
}, {
  name: 'NGUYỄN CỬU QUÝ',
  phone: '0915733607',
  email: ''
}, {
  name: 'NGUYỄN VĂN ẨN',
  phone: '01694992535',
  email: ''
}, {
  name: 'NGUYỄN NGỌC NON',
  phone: '0898548144',
  email: ''
}, {
  name: 'NGUYỄN THANH DUY ',
  phone: '0901916494',
  email: ''
}, {
  name: 'NGUYỄN CỬU QUÝ',
  phone: '0915733607',
  email: ''
}, {
  name: 'HUỲNH THỊ TRÚC QUYÊN ',
  phone: '0987636964',
  email: ''
}, {
  name: 'TRẦN ĐẶNG MINH QUÝ ',
  phone: '0928041332',
  email: ''
}, {
  name: 'LÊ THÚY HOA',
  phone: '01677149396',
  email: ''
}, {
  name: 'PHAN NHẬT MINH',
  phone: '0901428284',
  email: ''
}, {
  name: 'ĐẶNG THANH NAM ',
  phone: '01213638883',
  email: ''
}];

const status = {
  s1: 'Đơng hàng mới',
  s2: 'Đang chăm sóc',
  s3: 'Thành công',
  s4: 'Thất bại',
};


function FieldGroupSelect({
  id, label, handleChange, value
}) {
  return (
    <div controlid={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
      <div className="col-xs-4 app-label">
        <ControlLabel>{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        <FormControl
          id={id}
          componentClass="select"
          placeholder="Chọn"
          value={(value && value.status) || 'ĐƠN HÀNG MỚI'}
          onChange={(e) => {
            if (handleChange) {
              handleChange(id, e.target.value);
            }
          }}
        >
          <option value="Đơng hàng mới">{status.s1}</option>
          <option value="Đang chăm sóc">{status.s2}</option>
          <option value="Thành công">{status.s3}</option>
          <option value="Thất bại">{status.s4}</option>
        </FormControl>
      </div>
    </div>
  );
}

function FieldGroupSelectNhanVien({
  id, label, handleChange, value
}) {
  return (
    <div controlid={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
      <div className="col-xs-4 app-label">
        <ControlLabel>{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        <FormControl id={id} componentClass="select" placeholder="Chọn" value={(value && value.saleGbrown) || ''} onChange={e => handleChange(id, e.target.value)}>
          {nhanVien.map((e, i) => (
            <option key={parseInt(i.toString())} value={e.name}>
              {e.name}
            </option>
          ))}
        </FormControl>
      </div>
    </div>
  );
}

function FieldCheckBoxWithLabel({ id, label }) {
  return (
    <div controlid={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
      <div className="col-xs-4 app-label">
        <ControlLabel>{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        <Checkbox id={id} />
      </div>
    </div>
  );
}


function FieldCheckBox() {
  return (
    <div>
      <Checkbox id="vipPurchase">Đơn Hàng VIP</Checkbox>
      <Checkbox id="customerInfoCompleted">Hoàn Tất Thông Tin Khách Hàng</Checkbox>
      <Checkbox id="depositColected">Thu Tiền Cọc</Checkbox>
      <Checkbox id="eventPriceColected">Thu Tiền Tiệc</Checkbox>
    </div>
  );
}

function ThongTinHangMuc({
  index, value, handleChange, handleChangeFile, phanTichHangMuc
}) {
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
      {phanTichHangMuc && phanTichHangMuc.map((item, k) => (
        <PhanTichHangMuc index={item} key={parseInt(k.toString())} />))}
    </div>
  );
}

function PhanTichHangMuc({ index }) {
  return (
    <div className="row">
      <div className="col-xs-2" />
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
  );
}

function FieldGroupFile({
  id, label, help, disabled, textArea, handleChangeFile, thongTinHangMuc, ...props
}) {
  return (
    <div controlid={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
      <div className="col-xs-4 app-label">
        <ControlLabel>{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        {thongTinHangMuc === undefined
          ? (
            <FormControl
              onChange={e => handleChangeFile(e.target.files)}
              disabled={disabled || false}
              {...props}
            />
          )
          : (
            <FormControl
              onChange={e => handleChangeFile(e.target.files, thongTinHangMuc)}
              disabled={disabled || false}
              {...props}
            />
          )
        }

      </div>
    </div>
  );
}

function FieldGroupFileImage({ label, value }) {
  return (
    <div style={{ marginBottom: 10, heigh: '200px' }} className="app-from-group col-xs-12">
      <div className="col-xs-4 app-label">
        <ControlLabel>{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        {
          value.map((e, i) => (
            <Col xs={6} key={parseInt(i.toString())}>
              <Thumbnail href={e.url} target="blank" src={e.url} alt="242x200" />
            </Col>))
        }
      </div>
    </div>
  );
}
class Purchase extends Component {
  constructor(props, context) {
    super(props, context);
    const { match } = this.props;
    this.state = {
      value: {
        image: [],
      },
      thongTinHangMuc: [],
      phanTichHangMuc: {},
      save: false,
      purchaseId: match.params.purchaseId
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.addThongTinHangMuc = this.addThongTinHangMuc.bind(this);
    this.addPhanTichHangMuc = this.addPhanTichHangMuc.bind(this);
    this.savePurchase = this.savePurchase.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { purchaseId } = this.state;
    // console.log(this.props.match.params.purchaseId)
    if (purchaseId) {
      API.getPurchaseDetail(match.params.purchaseId).then((data) => {
        if (data.success) {
          this.setState({
            value: {
              ...data.results
            },
            thongTinHangMuc: data.results.category
          });
        }
      });
    }
  }

  savePurchase() {
    const { value, purchaseId } = this.state;
    API.updatePurchase(value, purchaseId).then(() => {
      this.setState({
        save: true
      });
      setTimeout(() => {
        this.setState({
          save: false
        });
        // this.props.history.push(`/purchase/${e.results.purchaseId}`);
      }, 2000);
    });
  }

  handleChange(key, valuek, thongTinHangMuclk) {
    const { value, thongTinHangMuc } = this.state;
    if (thongTinHangMuclk !== undefined) {
      if (key === 'saleGbrown') {
        const phoneSaleGbrown = nhanVien.filter(e => e.name === valuek)[0].phone;
        this.setState({
          value: {
            ...value,
            phoneSaleGbrown,
            [key]: valuek
          }
        });
      } else {
        /**
         * validate if number
         */
        this.validateData(key, thongTinHangMuc, thongTinHangMuclk, valuek, value);
      }
    } else if (key === 'saleGbrown') {
      const phoneSaleGbrown = nhanVien.filter(e => e.name === valuek)[0].phone;
      this.setState({
        value: {
          ...value,
          phoneSaleGbrown,
          [key]: valuek
        }
      });
    } else {
      this.setState({
        value: {
          ...value,
          [key]: valuek
        }
      });
    }
  }

  validateData(key, thongTinHangMuc, thongTinHangMuclk, valuek, value) {
    if (key === 'description-hangmuc') {
      thongTinHangMuc[thongTinHangMuclk].description = valuek;
      this.setState({
        value: {
          ...value,
          category: thongTinHangMuc
        }
      });
    } else {
      if (key === 'phoneSaleGbrown' || key === 'phone' || key === 'total' || key === 'deposit') {
        const re = /^[0-9\b]+$/;
        if (valuek === '' || re.test(valuek)) {
          thongTinHangMuc[thongTinHangMuclk][key] = valuek;
        }
      } else {
        thongTinHangMuc[thongTinHangMuclk][key] = valuek;
      }
      if ((key === 'price' || key === 'reducedPrice') && thongTinHangMuc[thongTinHangMuclk].price) {
        const { price } = thongTinHangMuc[thongTinHangMuclk];
        const { reducedPrice } = thongTinHangMuc[thongTinHangMuclk];
        thongTinHangMuc[thongTinHangMuclk].cash = price - (reducedPrice || 0);
      }
      this.setState({
        value: {
          ...value,
          category: thongTinHangMuc
        }
      });
    }
  }

  handleChangeFile(values, thongTinHangMuclk) {
    const formdata = new FormData();
    const { value, thongTinHangMuc } = this.state;
    formdata.append('file', values[0]);
    API.upload(formdata).then((data) => {
      const url = { url: API.server + data.results.path };

      if (thongTinHangMuclk === undefined) {
        value.image.push(url);
        this.setState({ value });
      } else {
        thongTinHangMuc[thongTinHangMuclk].image.push(url);
        this.setState({
          value: {
            ...value,
            category: thongTinHangMuc
          }
        });
      }
    });
  }

  addThongTinHangMuc = () => {
    const { thongTinHangMuc, phanTichHangMuc } = this.state;
    phanTichHangMuc[thongTinHangMuc.length] = [];
    thongTinHangMuc.push({ image: [] });
    this.setState({ phanTichHangMuc, thongTinHangMuc });
  }

  addPhanTichHangMuc = (index) => {
    const { phanTichHangMuc } = this.state;
    phanTichHangMuc[index].push({});
    this.setState({ phanTichHangMuc });
  }


  render() {
    const {
      thongTinHangMuc, phanTichHangMuc, save, value, purchaseId
    } = this.state;
    return (
      <div className="App">
        <Alert bsStyle={`success ${!save ? 'hide' : ''} fixed`}>
          <strong>Cập nhật thông tin đơn hàng thành Công!</strong>
        </Alert>
        <NavigationBar
          show
        />
        <div className="container-fluid" style={{ paddingTop: 50 }}>
          <div className="row">
            <div className="col-xs-6">
              <h1>THÔNG TIN ĐƠN HÀNG</h1>
            </div>
            <div className="col-xs-6">
              {
                purchaseId
                && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70px'
                  }}
                  >
                    <Link to="/main"><button type="button" className="btn btn-primary">Thêm Đơn Hàng</button></Link>
                    <Link to={`/baogia/${purchaseId}`}><button type="button" className="btn btn-success">In báo Giá</button></Link>
                    <Link to={`/chitiethopdong/${purchaseId}`}><button type="button" className="btn btn-success">In Chi Tiết Hợp Đồng</button></Link>
                    <button type="button" className="btn btn-success" onClick={() => window.open(`${API.server}purchase/${purchaseId}/hopdong`, '_blank')}>In Hợp Đồng</button>
                    <button type="button" className="btn btn-success" onClick={() => window.open(`${API.server}purchase/${purchaseId}/bangiaotiencoc   `, '_blank')}>In Bàn Giao Tiền Cọc</button>
                  </div>
                )
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
                id="agreementCode"
                type="text"
                label="Mã Hợp Đồng"
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
                value={value}
                id="phone"
                type="text"
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
                type="text"
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
                value={value.image || []}
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
                type="Number"
                label="Sđt Nhân Viên"
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
                type="text"
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
            <button type="button" className="btn btn-primary" onClick={this.addThongTinHangMuc}>Thêm Hạng Mục</button>
          </div>

          {thongTinHangMuc.map((item, index) => (
            <ThongTinHangMuc
              key={parseInt(index.toString())}
              value={item}
              index={index}
              onClick={this.addPhanTichHangMuc}
              handleChange={this.handleChange}
              handleChangeFile={this.handleChangeFile}
              phanTichHangMuc={phanTichHangMuc[item]}
            />))}
          <div className="col-xs-12 content-center">
            <FieldCheckBox />
            <button type="button" className="btn btn-success w10" onClick={this.savePurchase}>Cập Nhập Đơn Hàng</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  navBar: state.navBar
});
const mapDispathToProps = dispath => ({
  dispathNavBar: show => dispath(showNavBar(show))
});

export default connect(mapStateToProps, mapDispathToProps)(withRouter(Purchase));
