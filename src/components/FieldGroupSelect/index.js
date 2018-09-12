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

  render() {
    const {
      id, label, handleChange, data
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
                handleChange(data[e.target.value]);
              }
            }}
          >
            {data && data.length && data.map((e, i) => (
              <option key={parseInt(i.tString())} value={i}>{e.name}</option>
            ))}
          </FormControl>
        </div>
      </div>
    );
  }
}
