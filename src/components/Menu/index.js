import React, { Component } from 'react';
import { push as SlideMenu } from 'react-burger-menu';

const stylebars = {
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {

  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
};


export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  showSettings(event) {
    event.preventDefault();
  }

  onStateChange = () => {

  }


  render() {
    const { show, pageWrapId, outerContainerId } = this.props;

    return (
      <SlideMenu
        customCrossIcon={false}
        customBurgerIcon={false}
        pageWrapId={pageWrapId}
        outerContainerId={outerContainerId}
        noOverlay
        isOpen={show}
        styles={stylebars}
        onStateChange={this.onStateChange}
        width="20%"
      >
        <div style={{ flexDirection: 'row' }}>
          <a id="home" href="/">Home</a>
          <a id="about" className="menu-item" href="/about">About</a>
          <a id="contact" className="menu-item" href="/contact">Contact</a>
          <a
            className="menu-item--small"
            href="/"
          >
            Settings
          </a>
        </div>
      </SlideMenu>
    );
  }
}
