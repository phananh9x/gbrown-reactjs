/* eslint-disable */
import React from 'react';
import moment from 'moment';
import { ControlLabel } from 'react-bootstrap';
import { DatePicker } from 'antd';

const FieldGroupDate = ({
  id,
  label,
  value, handleChange, disabled, thongTinHangMuc
}) => (
  <div controlId={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
    <div className="col-xs-4 app-label">
      <ControlLabel>{label}</ControlLabel>
    </div>
    <div className="col-xs-8">
      <DatePicker
        value={value[id] && moment(value[id])|| moment(new Date()) }
        showTime
        format="YYYY-MM-DD HH:mm"
        placeholder="Chọn ngày giờ"
        onChange={e => handleChange(id, new Date(e), thongTinHangMuc)}
        onOk={e => handleChange(id, new Date(e), thongTinHangMuc)}
        disabled={!!disabled}
      />
    </div>
  </div>
);

export default FieldGroupDate;
