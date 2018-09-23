/* eslint-disable */
import React, { Component } from 'react';
import {
  FormControl, ControlLabel, Checkbox, Thumbnail, Col, Alert,
  Glyphicon
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Input, DatePicker } from 'antd';
import moment from 'moment';
import * as API from '../API';
import FieldGroup from './FieldGroup';
import FieldGroupDate from './FieldGroupDate';
import { showNavBar } from '../redux/actions/navBar';
import NavigationBar from './NavigationBar';
import FieldGroupSelect from './FieldGroupSelect';
import { requestUserList } from '../redux/actions/userAction';
import { ROLE } from '../constants/role';
import { WORK_MANAGER } from '../constants/string';
import { chatPurchaseAction } from '../redux/actions/chatAction';
const { Search, TextArea } = Input;

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


// function FieldGroupSelect({
//   id, label, handleChange, value
// }) {
//   return (
//     <div controlid={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
//       <div className="col-xs-4 app-label">
//         <ControlLabel>{label}</ControlLabel>
//       </div>
//       <div className="col-xs-8">
//         <FormControl
//           id={id}
//           componentClass="select"
//           placeholder="Chọn"
//           value={(value && value.status) || 'ĐƠN HÀNG MỚI'}
//           onChange={(e) => {
//             if (handleChange) {
//               handleChange(id, e.target.value);
//             }
//           }}
//         >
//           <option value="Đơn hàng mới">{status.s1}</option>
//           <option value="Đang chăm sóc">{status.s2}</option>
//           <option value="Thành công">{status.s3}</option>
//           <option value="Thất bại">{status.s4}</option>
//         </FormControl>
//       </div>
//     </div>
//   );
// }

/**
 * 0 default nhanvien
 */

const stylesSelected = {
  backgroundColor: 'blue',
  color: 'white',
  flexDirection: 'row',
};

const stylesUnSelected = {
  flexDirection: 'row',
  backgroundColor: 'white',
  color: 'black'
};


function FieldGroupSelectNhanVien({
  id, label, handleChange, value, userList, kind = 0, thongTinHangMuc, multiple = false, disabled
}) {
  let optionValue = '';
  if (kind === 0 && value.saleGbrown) {
    const saleGbrown = userList.filter(e => e._id === value.saleGbrown)[0];
    optionValue = (saleGbrown !== undefined ? saleGbrown._id : value.saleGbrown._id);
  } else if (kind === 1 && value.implementationOfficer) {
    const saleGbrown = userList.filter(e => e._id === value.implementationOfficer._id)[0];
    optionValue = (saleGbrown !== undefined ? saleGbrown._id : value.implementationOfficer._id);
  }

  return (
    <div controlid={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
      <div className="col-xs-4 app-label">
        <ControlLabel>{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        <FormControl
          disabled={disabled || false}
          id={id}
          multiple={multiple}
          componentClass="select"
          placeholder="Chọn"
          value={optionValue}
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


function FieldGroupMultiSelectNhanVien({
  id, label, handleChange, value, userList, kind = 0, thongTinHangMuc, multiple = false
}) {
  let optionValue = '';
  if (kind === 0 && value.saleGbrown) {
    const saleGbrown = userList.filter(e => e._id === value.saleGbrown)[0];
    optionValue = (saleGbrown !== undefined ? saleGbrown._id : value.saleGbrown._id);
  } else if (kind === 1 && value.implementationOfficer) {
    const saleGbrown = userList.filter(e => e._id === value.implementationOfficer._id)[0];
    optionValue = (saleGbrown !== undefined ? saleGbrown._id : value.implementationOfficer._id);
  }

  return (
    <div controlid={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
      <div className="col-xs-4 app-label">
        <ControlLabel>{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        <FormControl
          id={id}
          multiple={multiple}
          componentClass="select"
          placeholder="Chọn"
          value={optionValue}
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


function FieldCheckBox({ onChangeCheckBox, value, disabled }) {
  if (disabled) return <div />
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
  remove, purchaseId, updateChatMessage, updatePreparationDay, addNgayChuanBi, userList, that, removeNgayChuanBi,
  removeHinh, hasPermission
}) {

  return (
    <div className="row" style={{ marginTop: 50 }}>
      <div className="col-xs-12">
        <div className="col-xs-6">
          <h1>{`THÔNG TIN HẠNG MỤC ${index + 1}`}</h1>
        </div>
        {hasPermission &&
          <div className="col-xs-6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to={`/purchase/${purchaseId}/chiaviec/${index}`}><button style={{ marginRight: '10px' }} type="button" className="btn btn-success">Chia Việc</button></Link>
            <button type="button" className="btn btn-danger" id={index} onClick={e => remove(e.target.id)}>Xóa hạng mục</button>
          </div>
        }
      </div>
      <div className="col-xs-6">
        <FieldGroup
          disabled={!hasPermission}
          value={value}
          id="categoryName"
          type="text"
          label="Tên Hạng Mục"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroupFileImage
          hasPermission={hasPermission}
          label="Hình Ảnh Hạng Mục"
          thongTinHangMuc={index}
          value={value.image}
          removeHinh={removeHinh}
        />
        {hasPermission
          && <FieldGroupFile
            id="imageCategory"
            type="file"
            label="Thêm Hình Ảnh Hạng Mục"
            thongTinHangMuc={index}
            handleChangeFile={handleChangeFile}
          />}
        {hasPermission
          && <FieldGroup
            value={value}
            id="price"
            type="number"
            label="Giá Tiền"
            thongTinHangMuc={index}
            handleChange={handleChange}
          />
        }
        {hasPermission
          && <FieldGroup
            value={value}
            id="reducedPrice"
            type="number"
            label="Giá Giảm"
            thongTinHangMuc={index}
            handleChange={handleChange}
          />
        }
        {hasPermission
          && <FieldGroup
            value={value}
            id="cash"
            type="number"
            label="Còn lại"
            thongTinHangMuc={index}
            handleChange={handleChange}
            disabled
          />
        }
        <FieldGroup
          disabled={!hasPermission}
          value={value || 1}
          id="amount"
          type="number"
          label="Số Lượng"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        {hasPermission
          && <FieldGroup
            valueDefault={(value.cash || 0) * (value.amount || 1)}
            value={value}
            id="totalcash"
            type="number"
            label={`Tổng tiền của ${value.amount} sản phẩm:`}
            disabled
          />
        }
        <FieldGroup
          disabled={!hasPermission}
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
          label="Mô tả chi tiết hạng mục"
          textArea
          thongTinHangMuc={index}
          handleChange={handleChange}
          disabled={!hasPermission}
        />
        {
          value && value.ngayChuanBi && value.ngayChuanBi.map((e, i) => (
            <div key={e.id || new Date().valueOf()} className="col-xs-12" style={{ marginTop: '20px' }}>
              <div className="col-xs-4">
                <ControlLabel>{`Ngày chuẩn bị ${i + 1}:`}</ControlLabel>
              </div>
              <div className="col-xs-8" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <DatePicker
                  disabled={!hasPermission}
                  value={moment(e.date || new Date())}
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Chọn ngày giờ"
                  onChange={el => updatePreparationDay('date', new Date(el), i, index)}
                  onOk={el => updatePreparationDay('date', new Date(el), i, index)}
                />
                {hasPermission
                  && <button className="btn btn-danger" id={e.id} onClick={e => removeNgayChuanBi(e.target.id, index)}>{`Xóa`}</button>
                }
              </div>
              <div className="col-xs-4">
                <ControlLabel>{`Công Việc ${i + 1}:`}</ControlLabel>
              </div>
              <div className="col-xs-8">
                <TextArea disabled={!hasPermission} value={e.congviec || ''} rows={4} onChange={el => updatePreparationDay('congviec', el.target.value, i, index)} />
              </div>
            </div>
          ))
        }
        {hasPermission
          && <button type="button" className="btn btn-success" onClick={() => addNgayChuanBi(index)}>Thêm Ngày Chuẩn Bị</button>
        }

      </div>
      <div className="col-xs-6">
        <FieldGroupSelectNhanVien
          userList={userList}
          value={value}
          kind={1}
          id="implementationOfficer"
          type="text"
          label="Nhân Viên Thực Hiện"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          value={value}
          id="noteImplementationOfficer"
          type="text"
          label="Note Chi Tiết Nhân Viên Thực Hiện"
          thongTinHangMuc={index}
          handleChange={handleChange}
          textArea
        />
        <FieldGroupMultiSelectNhanVien
          userList={userList}
          value={value}
          kind={2}
          id="implementationOfficerGroup"
          type="text"
          multiple
          label="Nhân Viên Làm Cùng"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          disabled={!hasPermission}
          value={value}
          id="proposedPurchase"
          type="text"
          label="Mô tả hạng mục (Yêu cầu của khách hàng và yêu cầu quy chuẩn sản phẩm của công ty)"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />

        <FieldGroup
          disabled={!hasPermission}
          value={value}
          id="employeeComments"
          type="text"
          label="Yêu cầu thu mua"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        {hasPermission
          && <FieldGroupFile
            id="imageSetup"
            type="file"
            label="Hình Ảnh Không Gian Set-Up"
            thongTinHangMuc={index}
          />
        }
        <FieldGroup
          disabled={!hasPermission}
          value={value}
          id="requestSetup"
          type="text"
          label="Yêu Cầu Của Không Gian Set-Up"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          value={value}
          disabled={!hasPermission}
          id="relatedMaterials"
          type="text"
          label="Vật Liệu Liên Quan"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          disabled={!hasPermission}
          value={value}
          id="customerReviews"
          type="text"
          label="Ý Kiến Khách Hàng"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroupDate
          disabled={!hasPermission}
          value={value}
          id="startTimePartTime"
          type="date"
          label="Giờ PartTime"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroupDate
          disabled={!hasPermission}
          value={value}
          id="endTimePartTime"
          type="date"
          label="Hết Giờ PartTime"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <FieldGroup
          disabled={!hasPermission}
          value={value}
          id="nhanSuPartTime"
          type="text"
          textArea
          label="Nhân sự PartTime:"
          thongTinHangMuc={index}
          handleChange={handleChange}
        />
        <div className="col-xs-12">
          <h3>Chat Giữa Lãnh Đạo, Khách Hàng, Sale và Nhân Viên Sản Xuất</h3>
          <div
            style={{
              maxHeight: '300px', overflow: 'auto', border: '1px solid lightblue', minHeight: '300px'
            }}
            ref={c => that._chatMessage.set(index, c)}
          >
            {
              value.chat && value.chat.map((e, i) => (
                <div key={e.id || new Date().valueOf()} style={{ borderBottom: (i !== (value.chat.length - 1) && '1px solid lightblue') || 'none', margin: '0 10px' }}>
                  <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <b>{e.name.toUpperCase()}</b>
                    <p>{e.date}</p>
                  </div>
                  <div>
                    <p>{e.message}</p>
                  </div>
                </div>
              ))
            }
          </div>
          <Search
            ref={c => that._chatInput.set(index, c)}
            style={{ marginTop: '10px' }}
            placeholder="Nhập gì đó ở đây..."
            enterButton="GỬI"
            size="large"
            onChange={(e) => console.log(e.target.value)}
            onSearch={val => {
              updateChatMessage(index, val)
            }}
          />
        </div>
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

function FieldGroupFileImage({ label, value, removeHinh, thongTinHangMuc, hasPermission }) {
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
              {hasPermission && <button className="btn-danger remove-image" id={e._id} onClick={(e) => removeHinh(e.target.id, thongTinHangMuc)}><Glyphicon glyph="glyphicon glyphicon-remove" /></button>}
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
        phoneSaleGbrown: '',
        deposit: 0,
        saleGbrown: '',
        status: 'ĐƠN HÀNG MỚI'
      },
      thongTinHangMuc: [],
      phanTichHangMuc: {},
      save: false,
      purchaseId: match.params.purchaseId,
    };
    this.holderThongTinHangMuc = [];
    this._chatInput = new Map();
    this._chatMessage = new Map();
    this.handleChange = this.handleChange.bind(this);
    this.onChangeCheckBox = this.onChangeCheckBox.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.addThongTinHangMuc = this.addThongTinHangMuc.bind(this);
    this.addPhanTichHangMuc = this.addPhanTichHangMuc.bind(this);
    this.savePurchase = this.savePurchase.bind(this);
    this.remove = this.remove.bind(this);
    this.updateChatMessage = this.updateChatMessage.bind(this);
    this.updatePreparationDay = this.updatePreparationDay.bind(this);
    this.addNgayChuanBi = this.addNgayChuanBi.bind(this);
    this.removeNgayChuanBi = this.removeNgayChuanBi.bind(this);
    this.removeHinh = this.removeHinh.bind(this);
    this.createChatTotal = this.createChatTotal.bind(this);
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

  updateChatMessage(index, msg) {

    const { value, purchaseId } = this.state;
    const { login } = this.props;
    const obj = {
      id: `${new Date().valueOf()}-${Math.floor(Math.random() * 900000) + 100000}`,
      message: msg,
      name: (login && login.data && login.data.results && login.data.results.firstname) || 'ADMIN',
      date: moment().format('DD/MM/YYYY HH:mm:ss')
    };
    if (value.category[index] && !value.category[index].chat) {
      value.category[index].chat = [];
    }
    value.category[index].chat.push(obj);
    API.updatePurchase({ category: value.category }, purchaseId).then(() => {
      this.setState({
        value: {
          ...value
        }
      }, () => {
        Array.from(this._chatMessage.values())
          .filter(node => node != null)
          .forEach(node => {
            node.scrollTop = node.scrollHeight
          });
      });
    });
    Array.from(this._chatInput.values())
      .filter(node => node != null)
      .forEach(node => {
        node.input.valueOf().input.value = ""
      });

  }

  componentWillReceiveProps(nextProps) {
    const { login, chat } = nextProps;
    const { value } = this.state;
    if (login.success) {
      this.getUserList();
    }
    if (!chat.fecthing && chat.success) {
      this.setState({
        value: {
        ...value,
          chat: [...value.chat, chat.data]
        }
      }, () => {
        // debugger
        this._chatMessageTotal.scrollTop = this._chatMessageTotal.scrollHeight
        this._chatInputTotal.input.valueOf().input.value = ""
      })
    }
  }

  getUserList = () => {
    const { dispathUserList, user } = this.props;
    if (user.data.length === 0 && !user.fetching) {
      dispathUserList();
    }
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
            thongTinHangMuc: data.results ? data.results.category : []
          });
          this.holderThongTinHangMuc = JSON.parse(JSON.stringify(data.results ? data.results.category : []));
        }
      });
    }
  }

  savePurchase() {
    /**
       * detect when worker manager makes schedule changes
       */
    const { dispathChatPurchase } = this.props;
    const { value, purchaseId } = this.state;
    let nhanSuPartTime = []

    value.category.forEach((e, index) => {

      let implementationOfficerName = '';
      if (this.holderThongTinHangMuc[index].implementationOfficer !== e.implementationOfficer
        || this.holderThongTinHangMuc[index].implementationOfficerGroup !== e.implementationOfficerGroup) {
        implementationOfficerName = e.implementationOfficer ? e.implementationOfficer.firstname : '';

        if (implementationOfficerName.length > 0) {
          implementationOfficerName += ', ';
        }

        if (e.implementationOfficerGroup && e.implementationOfficerGroup.length > 0) {
          e.implementationOfficerGroup.forEach(p => {
            implementationOfficerName += p.firstname + ',';
          })
        }

        dispathChatPurchase({
          message: WORK_MANAGER.schedule_changes + implementationOfficerName,
          category: e.categoryName || '',
          purchaseId: value.purchaseId
        });
        value.chiaViec = false;
      }

      if (e.nhanSuPartTime || e.endTimePartTime || e.startTimePartTime) {
        let obj = {}
        obj.nhanSuPartTime = e.nhanSuPartTime || ''
        obj.endTimePartTime = e.endTimePartTime || ''
        obj.startTimePartTime = e.startTimePartTime || ''
        nhanSuPartTime.push(obj);
      }
    })
    value.nhanSuPartTime = nhanSuPartTime;


    API.updatePurchase(value, purchaseId).then(() => {
      this.setState({
        save: true
      });
      this.holderThongTinHangMuc = JSON.parse(JSON.stringify(value.category));
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
              thongTinHangMuc[thongTinHangMuclk][key].splice(i, 1);
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
    thongTinHangMuc.push({ image: [], chat: [], ngayChuanBi: [{ id: `${new Date().valueOf()}-${Math.floor(Math.random() * 900000) + 100000}`, date: new Date(), congviec: '' }] });
    this.setState({ phanTichHangMuc, thongTinHangMuc });
  }

  addPhanTichHangMuc = (index) => {
    const { phanTichHangMuc } = this.state;
    phanTichHangMuc[index].push({});
    this.setState({ phanTichHangMuc });
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
    let confirm = window.confirm("Bạn có thực sự muốn xóa ?")
    if (confirm) {
      const { value } = this.state;
      let { thongTinHangMuc } = this.state;
      value.category = value && value.category && value.category.length
        && value.category.filter((e, i) => i !== parseInt(index));
      thongTinHangMuc = thongTinHangMuc && thongTinHangMuc.length
        && thongTinHangMuc.filter((e, i) => i !== parseInt(index));
      this.setState({
        value: {
          ...value
        },
        thongTinHangMuc
      });
    }
  }

  removeNgayChuanBi(indexNgayChuanBi, index) {
    console.log(indexNgayChuanBi, index)
    let confirm = window.confirm("Bạn có thực sự muốn xóa ?")
    if (confirm) {
      const { value } = this.state;
      let { thongTinHangMuc } = this.state;
      thongTinHangMuc[index].ngayChuanBi = thongTinHangMuc[index].ngayChuanBi.filter(e => e.id != indexNgayChuanBi)
      value.category[index].ngayChuanBi = thongTinHangMuc[index].ngayChuanBi
      this.setState({
        value: {
          ...value
        },
        thongTinHangMuc
      });
    }
  }

  removeHinh(indexHinh, index) {
    const { value } = this.state;
    let { thongTinHangMuc } = this.state;
    let confirm = window.confirm("Bạn có thực sự muốn xóa ?")
    if (confirm) {
      debugger
      thongTinHangMuc[index].image = thongTinHangMuc[index].image.filter(e => e._id != indexHinh)
      value.category[index].image = thongTinHangMuc[index].image
      this.setState({
        value: {
          ...value
        },
        thongTinHangMuc
      });
    }
  }

  createChatTotal(val) {
    const { dispathChatPurchase } = this.props;
    const { value } = this.state;
    dispathChatPurchase({
      message: val,
      purchaseId: value.purchaseId
    });
  }

  render() {
    const {
      thongTinHangMuc, phanTichHangMuc, save, value, purchaseId
    } = this.state;
    const { user, login } = this.props;
    const { role } = login.data.results ? login.data.results : false;
    const hasPermission = role && role.groupId !== ROLE.WORK_MANAGER;
    return (
      <div className="App">
        <Alert bsStyle={`success`} className={`fixed ${!save ? 'hide' : ''}`}>
          <strong>Cập nhật thông tin đơn hàng thành Công!</strong>
        </Alert>
        <NavigationBar
          menus={menuList}
          show
        />
        <div className="container-fluid" style={{ paddingTop: 80 }}>
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
                    {hasPermission
                      && <div>
                        <Link to="/main"><button type="button" className="btn btn-primary">Thêm Đơn Hàng</button></Link>
                        <Link to={`/baogia/${purchaseId}`}><button type="button" className="btn btn-success">In báo Giá</button></Link>
                        <Link to={`/chitiethopdong/${purchaseId}`}><button type="button" className="btn btn-success">In Chi Tiết Hợp Đồng</button></Link>
                        <button type="button" className="btn btn-success" onClick={() => window.open(`${API.server}purchase/${purchaseId}/hopdong`, '_blank')}>In Hợp Đồng</button>
                        <button type="button" className="btn btn-success" onClick={() => window.open(`${API.server}purchase/${purchaseId}/bangiaotiencoc   `, '_blank')}>In Bàn Giao Tiền Cọc</button>
                      </div>
                    }
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
                disabled={!hasPermission}
                value={value}
                id="agreementCode"
                type="text"
                label="Mã Hợp Đồng"
              />
              <FieldGroup
                disabled={!hasPermission}
                value={value}
                id="eventName"
                type="text"
                label="Tên Sự Kiên"
                handleChange={this.handleChange}
              />
              <FieldGroup
                disabled={!hasPermission}
                value={value}
                id="customerName"
                type="text"
                label="Tên Khách Hàng"
                handleChange={this.handleChange}
              />
              <FieldGroup
                disabled={!hasPermission}
                value={value}
                id="phone"
                type="text"
                label="Số Điện Thoại"
                handleChange={this.handleChange}
              />
              <FieldGroupDate
                disabled={!hasPermission}
                value={value}
                id="startDate"
                type="date"
                label="Ngày tổ chức"
                handleChange={this.handleChange}
              />
              <FieldGroup
                disabled={!hasPermission}
                value={value}
                id="location"
                type="text"
                label="Địa Điểm Tổ Chức"
                handleChange={this.handleChange}
              />
              <FieldGroup
                disabled={!hasPermission}
                value={value}
                id="colorTone"
                type="text"
                label="Tone Màu"
                handleChange={this.handleChange}
              />
              {hasPermission
                && <FieldGroup
                  value={value}
                  id="total"
                  type="text"
                  label="Tổng tiền"
                  handleChange={this.handleChange}
                />}
              <FieldGroup
                disabled={!hasPermission}
                value={value}
                id="manager"
                type="text"
                label="Quản Lý"
                handleChange={this.handleChange}
              />
              <FieldGroupFileImage
                hasPermission={hasPermission}
                label="Hình Ảnh"
                value={value.image || []}
                removeHinh={this.removeHinh}
              />

              {hasPermission
                && <FieldGroupFile
                  has={!hasPermission}
                  id="image"
                  type="file"
                  label="Thêm Hình Ảnh"
                  handleChangeFile={this.handleChangeFile}
                />
              }
              {hasPermission
                &&
                <FieldGroup
                  value={value}
                  id="totalWriteAutoFill"
                  type="number"
                  disabled
                  label="Tổng tiền tự ghi sau khi cọc:"
                  handleChange={this.handleChange}
                />
              }
              {hasPermission
                && <FieldGroup
                  value={value}
                  id="totalAutoFill"
                  type="number"
                  disabled
                  label="Tổng tiền sau khi cọc (Auto Fill):"
                  handleChange={this.handleChange}
                />
              }
            </div>
            <div className="col-xs-6">
              <FieldGroupDate
                disabled={!hasPermission}
                value={value}
                id="agreementDate"
                type="date"
                label="Ngày Chuẩn Bị"
                handleChange={this.handleChange}
              />
              <FieldGroup
                disabled={!hasPermission}
                value={value}
                id="customerAddress"
                type="text"
                label="Địa Chỉ Khách Hàng"
                handleChange={this.handleChange}
              />
              <FieldGroup
                disabled={!hasPermission}
                value={value}
                id="email"
                type="email"
                label="Email Khách Hàng"
                handleChange={this.handleChange}
              />
              <FieldGroupDate
                disabled={!hasPermission}
                value={value}
                id="setupDate"
                type="date"
                label="Ngày Set-Up"
                handleChange={this.handleChange}
              />
              <FieldGroup
                disabled={!hasPermission}
                value={value}
                id="setupAdress"
                type="text"
                label="Địa Điểm Set-Up"
                handleChange={this.handleChange}
              />
              <FieldGroupSelectNhanVien
                disabled={!hasPermission}
                userList={user.data}
                value={value}
                id="saleGbrown"
                type="text"
                label="Nhân Viên Thực Hiện"
                handleChange={this.handleChange}
              />
              <FieldGroup
                disabled={!hasPermission}
                value={value}
                id="phoneSaleGbrown"
                type="Number"
                label="Sđt Nhân Viên"
                handleChange={this.handleChange}
              />
              <FieldGroup
                disabled={!hasPermission}
                value={value}
                id="emailSaleGbrown"
                type="email"
                label="Email Nhân Viên"
                handleChange={this.handleChange}
              />
              <FieldGroup
                disabled={!hasPermission}
                value={value}
                id="material"
                type="text"
                label="Chất Liệu"
                handleChange={this.handleChange}
              />
              {hasPermission
                &&
                <FieldGroup
                  value={value}
                  id="deposit"
                  type="text"
                  label="Đặt Cọc"
                  handleChange={this.handleChange}
                />
              }
              {hasPermission
                &&
                <FieldGroup
                  textArea
                  value={value}
                  id="depositDescription"
                  type="text"
                  label="Note Chi Tiết đặt cọc"
                  handleChange={this.handleChange}
                />
              }
              <FieldGroupSelect
                disabled={!hasPermission}
                data={status}
                value={value}
                id="status"
                type="text"
                label="Trạng thái"
                handleChange={this.handleChange}
              />
              <FieldGroupDate
                disabled={!hasPermission}
                value={value}
                id="acceptanceDate"
                type="date"
                label="Ngày Nghiệm Thu"
                disabled
              />
              <FieldGroup
                disabled={!hasPermission}
                value={value}
                id="description"
                type="text"
                label="Mô tả"
                textArea
                handleChange={this.handleChange}
              />
              <div className="col-xs-12">
                <h3>Chat Tổng</h3>
                <div
                  style={{
                    maxHeight: '300px', overflow: 'auto', border: '1px solid lightblue', minHeight: '300px'
                  }}
                  ref={c => this._chatMessageTotal = c}
                >
                  {
                    value && value.chat && value.chat.map((e, i) => (
                      <div key={e._id  || new Date().valueOf()} style={{ borderBottom: (i !== (value.chat.length - 1) && '1px solid lightblue') || 'none', margin: '0 10px' }}>
                        <div style={{ justifyContent: 'space-between', display: 'flex' }}>
                          <b>{e.user && e.user.firstname.toUpperCase()}</b>
                          <p>{moment(new Date(e.created)).format("DD/MM/YYYY HH:mm")}</p>
                        </div>
                        <div>
                          <p>{e.message}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <Search
                  ref={c => this._chatInputTotal = c}
                  style={{ marginTop: '10px' }}
                  placeholder="Nhập gì đó ở đây..."
                  enterButton="GỬI"
                  size="large"
                  onChange={(e) => console.log(e.target.value)}
                  onSearch={val => {
                    this.createChatTotal(val);
                  }}
                />
              </div>
               <div className="col-xs-12">
                <h3>Thông Tin Nhân Sự PartTime</h3>
                <div
                  style={{
                    maxHeight: '300px', overflow: 'auto', border: '1px solid lightblue', minHeight: '300px'
                  }}
                >
                  {
                    value && value.nhanSuPartTime && value.nhanSuPartTime.map((e, i) => (
                      <div key={i} style={{ borderBottom: (i !== (value.nhanSuPartTime.length - 1) && '1px solid lightblue') || 'none', margin: '0 10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div>Thời Gian Đến: <b>{e.startTimePartTime && moment(e.startTimePartTime).format("DD/MM/YYYY HH:mm")}</b></div>
                          <div>Thời Gian Đi: <b>{e.endTimePartTime && moment(e.endTimePartTime).format("DD/MM/YYYY HH:mm")}</b></div>
                        </div>
                        <div>
                          <p>Thông Tin Nhân Sư PartTime :</p>
                          <b style={{ whiteSpace: 'pre-wrap' }}>{e.nhanSuPartTime && e.nhanSuPartTime}</b>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

          </div>
          <div className="col-xs-12" style={{ marginTop: 50, marginBottom: 50 }}>
            {hasPermission
              && <button type="button" className="btn btn-primary" onClick={this.addThongTinHangMuc}>Thêm Hạng Mục</button>}
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
              updateChatMessage={this.updateChatMessage}
              updatePreparationDay={this.updatePreparationDay}
              addNgayChuanBi={this.addNgayChuanBi}
              that={this}
              removeNgayChuanBi={this.removeNgayChuanBi}
              removeHinh={this.removeHinh}
              hasPermission={role && role.groupId !== ROLE.WORK_MANAGER}
            />))}
          <div className="col-xs-12 content-center" >
            <FieldCheckBox disabled={!hasPermission} value={value} onChangeCheckBox={this.onChangeCheckBox} />
            <button style={{ marginTop: 20, marginBottom: 20, width: '20%', alignSelf: 'center' }} type="button" className="btn btn-success" onClick={this.savePurchase}>Cập Nhập Đơn Hàng</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  navBar: state.navBar,
  user: state.userReducer,
  login: state.login,
  chat: state.chatPurchaseReducer
});
const mapDispathToProps = dispath => ({
  dispathNavBar: show => dispath(showNavBar(show)),
  dispathUserList: () => dispath(requestUserList()),
  dispathChatPurchase: data => dispath(chatPurchaseAction(data))
});

export default connect(mapStateToProps, mapDispathToProps)(withRouter(Purchase));
