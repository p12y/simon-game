import React, { Component } from 'react';

class Switch extends Component {
  render() {
    const position = this.props.on ? 'auto' : 0;
    return (
      <div id="switch-container">
        <div onClick={this.props.onClick} id="switch-slot">
          <div id="switch" style={{left: position}}></div>
          <span className="inline-label left">OFF</span>
          <span className="inline-label right">ON</span>
        </div>
      </div>
    );
  }
}

export default Switch;