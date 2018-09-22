import React, { Component } from 'react';
import {
  FormControl,
  ControlLabel,
} from 'react-bootstrap';


export default class FieldGroupSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderList = () => {
    const array = [];
    const { data } = this.props;
    if (data && data.length) {
      data.forEach((e) => {
        array.push(
          <option key={parseInt(e.id)} value={e.name}>{e.name}</option>
        );
      });
    }
    return array;
  }

  render() {
    const {
      id, label, handleChange, value, disabled
    } = this.props;

    return (
      <div controlid={id} style={{ marginBottom: 10 }} className="app-from-group col-xs-12">
        <div className="col-xs-4 app-label">
          <ControlLabel>{label}</ControlLabel>
        </div>
        <div className="col-xs-8">
          <FormControl
            id={id}
            disabled={disabled || false}
            value={value.status}
            componentClass="select"
            placeholder="Chọn"
            onChange={(e) => {
              if (handleChange) {
                handleChange(id, e.target.value);
              }
            }}
          >
            {this.renderList()}
          </FormControl>
        </div>
      </div>
    );
  }
}
