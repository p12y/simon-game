import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <div 
        onClick={this.props.onClick} 
        className={`btn ${this.props.className}`}
      >
      </div>
    );
  }
}

export default Button;