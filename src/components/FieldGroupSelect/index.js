import React, { Component } from 'react';
import {
  FormControl,
  ControlLabel,
} from 'react-bootstrap';


const status = {
  s1: 'Đơng hàng mới',
  s2: 'Đang chăm sóc',
  s3: 'Thành công',
  s4: 'Thất bại',
};

export default class FieldGroupSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      id, label, handleChange
    } = this.props;

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
            onChange={(e) => {
              if (handleChange) {
                handleChange(status[e.target.value]);
              }
            }}
          >
            <option value="s1">{status.s1}</option>
            <option value="s2">{status.s2}</option>
            <option value="s3">{status.s3}</option>
            <option value="s4">{status.s4}</option>
          </FormControl>
        </div>
      </div>
    );
  }
}
