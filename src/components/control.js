import React, { Component } from 'react';

class Control extends Component {
  render() {
    const active = this.props.active ? 'active' : '';
    return (
      <div onClick={() => this.props.onClick(this.props.value)} className={`control ${this.props.className} ${active}`}></div>
    );
  }
}

export default Control;