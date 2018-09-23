import React, { Component } from 'react';
import {
  FormControl,
  ControlLabel,
  Checkbox,
  Thumbnail,
  Col,
  Alert
} from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { Input, DatePicker } from 'antd';
import { connect } from 'react-redux';
import * as API from '../API';
import FieldGroupSelect from './FieldGroupSelect';
import FieldGroup from './FieldGroup';
import FieldGroupDate from './FieldGroupDate';
import NavigationBar from './NavigationBar';
import { requestUserList } from '../redux/actions/userAction';
import { chatPurchaseAction } from '../redux/actions/chatAction';
import { SALE } from '../constants/string';

const { TextArea } = Input;

const menuList = [
  {
    name: 'Danh sách đơn hàng',
    path: '/'
  }
];

const status = [
  { id: 1, name: 'Đơn Hàng Mới' },
  { id: 2, name: 'Đã Gọi' },
  { id: 3, name: 'Đang Chăm Sóc' },
  { id: 4, name: 'Đã Huỷ Bỏ' },
  { id: 5, name: 'Đã Kí Hợp Đồng' },
];

const stylesSelected = {
  backgroundColor: 'blue',
  color: 'white'
};

const stylesUnSelected = {
  backgroundColor: 'white',
  color: 'black'
};


function FieldGroupSelectNhanVien({
  id, label, handleChange, userList, thongTinHangMuc, kind = 0, multiple, value, disabled
}) {
  let optionValue = '';
  if (kind === 0 && value.saleGbrown) {
    const saleGbrown = userList.filter(e => e._id === value.saleGbrown)[0];
    optionValue = (saleGbrown !== undefined ? saleGbrown._id : value.saleGbrown._id);
  }

  return (
    <div controlid={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
      <div className="col-xs-4 app-label">
        <ControlLabel>{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        <FormControl
          disabled={disabled}
          multiple={multiple}
          id={id}
          value={optionValue}
          componentClass="select"
          placeholder="Chọn"
          onChange={e => handleChange(id, (userList.filter(s => s._id === e.target.value))[0],
            kind === 0 ? undefined : thongTinHangMuc)}
        >
          {userList.map((e, i) => (
            <option
              style={multiple
                && value.implementationOfficerGroup
                && value.implementationOfficerGroup.filter(s => s._id === e._id)[0]
                ? stylesSelected : stylesUnSelected}
              key={parseInt(i.toString())}
              value={e._id}
            >
              {e.firstname}
            </option>
          ))}
        </FormControl>
      </div>
    </div>
  );
}

// function ShowMessage({
//   title, message, button, onClick
// }) {
//   return (
//     <div className="static-modal">
//       <Modal.Dialog>
//         <Modal.Header>
//           <Modal.Title>{title}</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>{message}</Modal.Body>

//         <Modal.Footer>
//           <Button onClick={onClick}>{button}</Button>
//         </Modal.Footer>
//       </Modal.Dialog>
//     </div>
//   );
// }

function FieldCheckBoxWithLabel({
  id, label
}) {
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


function FieldCheckBox({ onChangeCheckBox, value }) {
  return (
    <div>
      <Checkbox id="vipPurchase" checked={value.vipPurchase} onChange={e => onChangeCheckBox(e.target.id, e.target.checked)}>Đơn Hàng VIP</Checkbox>
      <Checkbox id="customerInfoCompleted" checked={value.customerInfoCompleted} onChange={e => onChangeCheckBox(e.target.id, e.target.checked)}>Hoàn Tất Thông Tin Khách Hàng</Checkbox>
      <Checkbox id="depositColected" checked={value.depositColected} onChange={e => onChangeCheckBox(e.target.id, e.target.checked)}>Đã Thu tiền Cọc</Checkbox>
      <Checkbox id="eventPriceColected" checked={value.eventPriceColected} onChange={e => onChangeCheckBox(e.target.id, e.target.checked)}>Đã thu tiền Tiệc</Checkbox>
    </div>
  );
}

function ThongTinHangMuc({
  index, value, handleChange, handleChangeFile, phanTichHangMuc,
  remove, updatePreparationDay, addNgayChuanBi, userList
}) {
  return (
    <div className="row" style={{ marginTop: 50 }}>
      <div className="col-xs-12">
        <div className="col-xs-10">
          <h1>{`THÔNG TIN HẠNG MỤC ${index + 1}`}</h1>
        </div>
        <div className="col-xs-2">
          <button type="button" className="btn btn-danger" id={index} onClick={e => remove(e.target.id)}>Xóa hạng mục</button>
        </div>
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
          disabled
        />
        <FieldGroup
          value={value}
          id="amount"
          type="number"
          label="Số Lượng"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          valueDefault={(value.cash || 0) * (value.amount || 1)}
          value={value}
          id="totalcash"
          type="number"
          label={`Tổng tiền của ${value.amount} sản phẩm:`}
          disabled
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
          id="description-hangmuc"
          type="text"
          label="Mô tả chi tiết danh mục:"
          textArea
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        {
          value && value.ngayChuanBi && value.ngayChuanBi.map((e, i) => (
            <div key={e.id || new Date().valueOf()} className="col-xs-12">
              <div className="col-xs-4">
                <ControlLabel>{`Ngày chuẩn bị ${i + 1}:`}</ControlLabel>
              </div>
              <div className="col-xs-8">
                <DatePicker
                  value={moment(e.date || new Date())}
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Chọn ngày giờ"
                  onChange={el => updatePreparationDay('date', new Date(el), i, index)}
                  onOk={el => updatePreparationDay('date', new Date(el), i, index)}
                />
              </div>
              <div className="col-xs-4">
                <ControlLabel>{`Công Việc ${i + 1}:`}</ControlLabel>
              </div>
              <div className="col-xs-8">
                <TextArea value={e.congviec || ''} rows={4} onChange={el => updatePreparationDay('congviec', el.target.value, i, index)} />
              </div>
            </div>
          ))
        }
        <button type="button" className="btn btn-success" onClick={() => addNgayChuanBi(index)}>Thêm Ngày Chuẩn Bị</button>
      </div>
      <div className="col-xs-6">
        <FieldGroupSelectNhanVien
          value={value}
          userList={userList}
          id="implementationOfficer"
          type="text"
          kind={1}
          label="Nhân Viên Thực Hiện"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroupSelectNhanVien
          userList={userList}
          value={value}
          multiple
          id="implementationOfficerGroup"
          type="text"
          kind={2}
          label="Nhân Viên Làm Cùng"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          value={value}
          id="proposedPurchase"
          type="text"
          label="Mô tả hạng mục (Yêu cầu của khách hàng và yêu cầu quy chuẩn sản phẩm của công ty)"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          value={value}
          id="employeeComments"
          type="text"
          label="Yêu cầu thu mua"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroupFileImage
          label="Hình Ảnh Không Gian Set-Up"
          thongTinHangMuc={index}
          value={value.image}
        />

        <FieldGroupFile
          handleChangeFile={handleChangeFile}
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
      {phanTichHangMuc
        && phanTichHangMuc.map((item, key) =>
          (<PhanTichHangMuc index={item} key={parseInt(key.toString())} />))
      }
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
          <FieldGroupDate
            id="formControlsEmail"
            type="date"
            label="Thời Gian Yêu Cầu Của CV"
          />
          <FieldGroupDate
            id="formControlsEmail"
            type="date"
            label="Thời Gian Dự Kiến Đặt Đơn Hàng"
          />
          <FieldGroupDate
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

function FieldGroupFileImage({
  label, value
}) {
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
const JUST_CLOSE = 0;
class AddPurchase extends Component {
  constructor(props, context) {
    super(props, context);
    const { match } = this.props;
    this.state = {
      value: {
        image: [],
        phoneSaleGbrown: '',
        deposit: 0,
        saleGbrown: '',
        status: 'Đơn hàng mới'
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
    this.remove = this.remove.bind(this);
    this.onChangeCheckBox = this.onChangeCheckBox.bind(this);
    this.updatePreparationDay = this.updatePreparationDay.bind(this);
    this.addNgayChuanBi = this.addNgayChuanBi.bind(this);
    this.message = {
      title: '',
      message: '',
      button: '',
      code: JUST_CLOSE
    };
  }

  addNgayChuanBi = (index) => {
    const { thongTinHangMuc } = this.state;
    if (!thongTinHangMuc[index].ngayChuanBi) {
      thongTinHangMuc[index].ngayChuanBi = [{ id: `${new Date().valueOf()}-${Math.floor(Math.random() * 900000) + 100000}`, date: new Date(), congviec: '' }];
    } else {
      thongTinHangMuc[index].ngayChuanBi.push({ id: `${new Date().valueOf()}-${Math.floor(Math.random() * 900000) + 100000}`, date: new Date(), congviec: '' });
    }
    this.setState({ thongTinHangMuc });
  }

  updatePreparationDay(key, val, index, indexHangMuc) {
    const { value, thongTinHangMuc } = this.state;
    thongTinHangMuc[indexHangMuc].ngayChuanBi[index][key] = val;
    this.setState({
      value: {
        ...value,
        category: thongTinHangMuc
      }
    });
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

  componentWillMount() {
    const { value } = this.state;
    const { login } = this.props;
    value.saleGbrown = login.data.results._id;
    value.phoneSaleGbrown = login.data.results.email;
  }

  componentDidMount() {
    const { purchaseId } = this.state;
    const { match } = this.props;
    if (purchaseId) {
      API.getPurchaseDetail(match.params.purchaseId).then((data) => {
        this.setState({
          value: {
            ...data.results,
          },
          thongTinHangMuc: data.results.category
        });
      });
    }
  }

  savePurchase() {
    const { value } = this.state;
    const { history, dispathChatPurchase } = this.props;
    API.savePurchase(value).then((data) => {
      const message = {
        message: SALE.purchase_created,
        prefix: SALE.prefix,
        lead: null,
        staffs: []
      };
      dispathChatPurchase({
        message: JSON.stringify(message),
        category: '',
        purchaseId: data.results.purchaseId
      });
      this.setState({
        save: true
      });
      setTimeout(() => {
        this.setState({
          save: false
        });
        history.push(`/purchase/${data.results.purchaseId}`);
      }, 1000);
    }).catch(() => {
      alert('Lưu đơn hàng thất bại vui lòng thử lại!');
    });
  }

  handleChange(key, valuek, thongTinHangMuclk) {
    const { value, thongTinHangMuc } = this.state;
    const { user } = this.props;
    if (thongTinHangMuclk !== undefined) {
      if (key === 'saleGbrown') {
        const phoneSaleGbrown = user.data.filter(e => e._id === valuek._id)[0].email;
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
      const phoneSaleGbrown = user.data.filter(e => e._id === valuek._id)[0].email;
      this.setState({
        value: {
          ...value,
          phoneSaleGbrown,
          [key]: valuek
        }
      });
    } else if ((key === 'deposit' || key === 'total') && (value.total || value.deposit)) {
      let totalWriteAutoFill = 0;
      if (key === 'deposit') {
        if (thongTinHangMuc.length) {
          let total = 0;
          thongTinHangMuc.forEach((e) => {
            total += e.cash;
          });
          value.totalAutoFill = total - parseFloat(valuek || 0);
        }
        totalWriteAutoFill = value.total - parseFloat(valuek || 0);
      } else {
        totalWriteAutoFill = parseFloat(valuek || 0) - parseFloat(value.deposit || 0);
      }
      this.setState({
        value: {
          ...value,
          totalWriteAutoFill,
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
    if (key === 'implementationOfficerGroup') {
      if (!thongTinHangMuc[thongTinHangMuclk][key]) {
        thongTinHangMuc[thongTinHangMuclk][key] = [valuek];
      } else {
        const found = thongTinHangMuc[thongTinHangMuclk][key].filter(e => e._id === valuek._id)[0];
        if (!found) {
          thongTinHangMuc[thongTinHangMuclk][key].push(valuek);
        } else {
          thongTinHangMuc[thongTinHangMuclk][key].forEach((e, i) => {
            if (e._id === valuek._id) {
              if (thongTinHangMuc[thongTinHangMuclk][key][i]) {
                thongTinHangMuc[thongTinHangMuclk][key].splice(i, 1);
              }
            }
          });
        }
      }
      this.setState({
        value: {
          ...value,
          category: thongTinHangMuc
        }
      });
    } else if (key === 'description-hangmuc') {
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
      if ((key === 'price' || key === 'reducedPrice' || key === 'amount' || key === 'deposit') && thongTinHangMuc[thongTinHangMuclk].price) {
        const { price } = thongTinHangMuc[thongTinHangMuclk];
        const { reducedPrice } = thongTinHangMuc[thongTinHangMuclk];
        thongTinHangMuc[thongTinHangMuclk].cash = price - parseFloat(reducedPrice || 0);
        let total = 0;
        thongTinHangMuc.forEach((e) => {
          total += e.cash * (e.amount || 1);
        });
        value.totalAutoFill = total - parseFloat(value.deposit || 0);
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
    if (values[0].type !== 'image/png' && values[0].type !== 'image/jpeg') {
      this.message = {
        title: 'Lỗi',
        message: 'Chỉ hỗ trợ định dạng png, jpg',
        button: 'Đóng',
        code: JUST_CLOSE
      };
      this.setState({ save: true });
    } else {
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
  }

  addThongTinHangMuc = () => {
    const { thongTinHangMuc, phanTichHangMuc } = this.state;
    phanTichHangMuc[thongTinHangMuc.length] = [];
    thongTinHangMuc.push({ image: [], ngayChuanBi: [{ id: `${new Date().valueOf()}-${Math.floor(Math.random() * 900000) + 100000}`, date: new Date(), congviec: '' }] });
    this.setState({ thongTinHangMuc, phanTichHangMuc });
  }

  addPhanTichHangMuc = (index) => {
    const { phanTichHangMuc } = this.state;
    phanTichHangMuc[index].push({});
    this.setState(phanTichHangMuc);
  }

  onChangeCheckBox(id, checked) {
    const { value } = this.state;
    this.setState({
      value: {
        ...value,
        [id]: checked
      }
    });
  }

  remove(index) {
    const { value } = this.state;
    let { thongTinHangMuc } = this.state;
    value.category = value && value.category
      && value.category.length && value.category.filter((_e, i) => i !== parseInt(index));
    thongTinHangMuc = thongTinHangMuc && thongTinHangMuc.length
      && thongTinHangMuc.filter((_e, i) => i !== parseInt(index));
    this.setState({
      value: {
        ...value
      },
      thongTinHangMuc
    });
  }

  render() {
    const {
      thongTinHangMuc, phanTichHangMuc, save, value, purchaseId
    } = this.state;

    const { user } = this.props;

    return (
      <div className="App">
        <NavigationBar
          menus={menuList}
          show
        />
        <div className="container-fluid" style={{ paddingTop: 80 }}>
          <Alert bsStyle={`success ${!save ? 'hide' : ''} fixed`}>
            <strong>Cập nhật thông tin đơn hàng thành Công!</strong>
          </Alert>
          <div className="row">
            <div className="col-xs-8">
              <h1>THÔNG TIN ĐƠN HÀNG</h1>
            </div>
            <div className="col-xs-4">
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
                    <Link to={`/print/${purchaseId}`}><button type="button" className="btn btn-success">In báo Giá</button></Link>
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
                type="number"
                label="Số Điện Thoại"
                handleChange={this.handleChange}
              />
              <FieldGroupDate
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
                value={value.image || []}
              />
              <FieldGroupFile
                id="image"
                type="file"
                label="Thêm Hình Ảnh"
                handleChangeFile={this.handleChangeFile}
              />
              <FieldGroup
                value={value}
                id="totalWriteAutoFill"
                type="number"
                disabled
                label="Tổng tiền tự ghi sau khi cọc:"
                handleChange={this.handleChange}
              />
              <FieldGroup
                value={value}
                id="totalAutoFill"
                type="number"
                disabled
                label="Tổng tiền sau khi cọc (Auto Fill):"
                handleChange={this.handleChange}
              />
            </div>
            <div className="col-xs-6">
              <FieldGroupDate
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
              <FieldGroupDate
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
                userList={user.data}
                value={value}
                id="saleGbrown"
                type="text"
                disabled
                label="Nhân Viên Thực Hiện"
                handleChange={this.handleChange}
              />
              <FieldGroup
                disabled
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
              <FieldGroup
                textArea
                value={value}
                id="depositDescription"
                type="text"
                label="Note Chi Tiết đặt cọc"
                handleChange={this.handleChange}
              />
              <FieldGroupSelect
                data={status}
                value={value}
                id="status"
                type="text"
                label="Trạng thái"
                handleChange={this.handleChange}
              />
              <FieldGroupDate
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
          <div className="col-xs-12" style={{ marginTop: 50, marginBottom: 50 }}>
            <button type="button" className="btn btn-primary" onClick={this.addThongTinHangMuc}>Thêm Hạng Mục</button>
          </div>

          {thongTinHangMuc.map((item, index) => (
            <ThongTinHangMuc
              userList={user.data}
              key={parseInt(index.toString())}
              value={item}
              index={index}
              onClick={this.addPhanTichHangMuc}
              handleChange={this.handleChange}
              handleChangeFile={this.handleChangeFile}
              phanTichHangMuc={phanTichHangMuc[item]}
              remove={this.remove}
              purchaseId={purchaseId}
              updatePreparationDay={this.updatePreparationDay}
              addNgayChuanBi={this.addNgayChuanBi}
            />))}
          <div className="col-xs-12 content-center">
            <FieldCheckBox value={value} onChangeCheckBox={this.onChangeCheckBox} />
            <button type="button" className="btn btn-primary w10" onClick={this.savePurchase}>Lưu Đơn Hàng</button>
          </div>
        </div>
        {/* {save && (
          <ShowMessage
            onClick={() => {
              // reload to refresh field data
              if (this.message.code === RELOAD) {
                window.location.reload();
              }
              this.setState({ save: false });
            }}
            title={this.message.title}
            message={this.message.message}
            button={this.message.button}
          />
        )} */}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.userReducer,
  login: state.login
});
const mapDispathToProps = dispath => ({
  dispathUserList: () => dispath(requestUserList()),
  dispathChatPurchase: data => dispath(chatPurchaseAction(data))
});

export default connect(mapStateToProps, mapDispathToProps)(withRouter(AddPurchase));
