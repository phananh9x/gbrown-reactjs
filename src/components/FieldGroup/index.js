import React, { Component } from 'react';
import moment from 'moment';
import { ControlLabel, FormControl } from 'react-bootstrap';

export default class FieldGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      id,
      label,
      type, value,
      disabled,
      textArea, handleChangeFile, handleChange, thongTinHangMuc
    } = this.props;
    console.log(value[id]);

    return (
      <div controlid={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
        <div className="col-xs-4 app-label">
          <ControlLabel>{label}</ControlLabel>
        </div>
        <div className="col-xs-8">
          {textArea
            ? (
              <FormControl
                type={type}
                componentClass="textarea"
                onChange={e => handleChange(id, e.target.value)}
                {...this.props}
                value={value[id] && type === 'date' && (moment(value[id]).format('YYYY-MM-DD') || value[id] || '')}
              />
            )
            : (
              <FormControl
                type={type}
                onChange={e => handleChangeFile
                  && (handleChangeFile(e.target.files)
                    || handleChange(id, e.target.value, thongTinHangMuc))}
                disabled={disabled || false}
                {...this.props}
                value={value[id] && type === 'date' && (moment(value[id]).format('YYYY-MM-DD') || value[id] || '')}
              />
            )
          }
        </div>
      </div>
    );
  }
}
