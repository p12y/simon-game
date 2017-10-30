import React, { Component } from 'react';

class Control extends Component {
  render() {
    const active = this.props.active ? 'active' : '';
    return (
      <div className={`control ${this.props.className} ${active}`}></div>
    );
  }
}

export default Control;