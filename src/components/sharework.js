import React, { Component } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import ReactToPrint from 'react-to-print';
import * as API from '../API';
import '../styles/sharework.css';
import { showNavBar } from '../redux/actions/navBar';

class ShareWork extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: {
      },
    };
  }

  componentWillMount() {
    const { match, dispathNavBar } = this.props;
    if (match.params && match.params.purchaseId && match.params.categoryIndex) {
      // console.log(this.props.match.params.purchaseId)
      API.getPurchaseDetail(match.params.purchaseId).then((data) => {
        // console.log(data.results)
        this.setState({
          value: {
            category: {
              ...(data.results && data.results.category
                && data.results.category[match.params.categoryIndex]) || {}
            },
            ...data.results
          }
        });
      });
    }
    dispathNavBar(false);
  }


  render() {
    const { value, category } = this.state;
    console.log(value);
    console.log(category);

    return (
      <div className="App" ref={el => (this.componentRef = el)} style={{ backgroundColor: 'gray' }}>
        <ReactToPrint
          trigger={() => (
            <button
              type="button"
              style={{ position: 'absolute' }}
              className="btn btn-success"
            >
              {'In Bảng Chia Việc'}
            </button>
          )
          }
          content={() => this.componentRef}
        />
        <div className="A4 page vertical">
          <div className="vertical" />
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

export default connect(mapStateToProps, mapDispathToProps)(ShareWork);
