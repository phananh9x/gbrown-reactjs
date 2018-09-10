import React, { Component } from 'react';
import * as API from '../API';
import moment from 'moment';
import ReactToPrint from "react-to-print";
import "../styles/contact.css";

class Contact extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: {
      },
    };
  }
  componentWillMount() {
    if (this.props.match.params && this.props.match.params.purchaseId) {
      API.getPurchaseDetail(this.props.match.params.purchaseId).then(data => {
        // console.log(data.results)
        this.setState({
          value: {
            ...data.results
          }
        })
      })
    }
  }

  componentDidMount() {

  }
   render() {
    const { value } = this.state
    return (
         <div className="App" ref={el => (this.componentRef = el)} >
            <ReactToPrint
              trigger={() => <button style={{position: 'absolute'}} class="btn btn-success">In báo Giá</button>}
              content={() => this.componentRef}
            />
            <div className="A4 page">
              <div className="section" style={{position: 'absolute', left: '72px', right: '72px', top: '30px'}}>
                <div className="centercenter">
                  <h3>GBROWN</h3>
                  <div className="f44">DỊCH VỤ TRANG TRÍ GIA TIÊN CAO CẤP</div>
                </div>
              </div>
            </div>
        </div>
  	);
  }
}

export default Contact;