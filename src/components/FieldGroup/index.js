import React from 'react';
import moment from 'moment';
import { ControlLabel, FormControl } from 'react-bootstrap';

const FieldGroup = ({
  id,
  label,
  type, value, help, disabled, textArea, handleChangeFile,
  handleChange, thongTinHangMuc, valueDefault, ...props
}
) =>
  (
    <div
      controlId={id}
      style={{ marginBottom: 10 }}
      className="app-from-group col-xs-12"
    >
      <div
        className="col-xs-4 app-label"
      >
        <ControlLabel>{label}</ControlLabel>
      </div>
      <div className="col-xs-8">
        {(textArea
          && (<FormControl type={type} value={(valueDefault && valueDefault) || (value[id] && (type === 'date') && moment(value[id]).format('YYYY-MM-DD')) || (id === 'description-hangmuc' && value.description) || (value[id] && value[id]) || ''} componentClass="textarea" onChange={e => handleChange(id, e.target.value, thongTinHangMuc)} disabled={disabled || false} {...props} />))
          || (<FormControl type={type} value={(valueDefault && valueDefault) || (value[id] && type === 'date' && moment(value[id]).format('YYYY-MM-DD')) || (value[id] && value[id])} onChange={e => (handleChangeFile && handleChangeFile(e.target.files)) || handleChange(id, e.target.value, thongTinHangMuc)} disabled={disabled || false} {...props} />)}
      </div>
    </div>
  );

export default FieldGroup;
