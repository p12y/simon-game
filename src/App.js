import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="base">
          <div className="row">
            <div className="control top left"></div>
            <div className="control top right"></div>
          </div>
          <div className="row">
            <div className="control bottom left"></div>
            <div className="control bottom right"></div>
          </div>
          <div id="face">
            <div id="strict-led"></div>
            <h1>Simon<span className="reg">®</span></h1>
            <div className="face-controls">
              <div id="display">
                <div id="display-content">--</div>
              </div>
              <div className="btn start"></div>
              <div className="btn strict"></div>
              <span className="label left">COUNT</span>
              <span className="label middle">START</span>
              <span className="label right">STRICT</span>
            </div>
            <div id="switch-container">
              <div id="switch-slot">
                <div id="switch"></div>
                <span className="inline-label left">OFF</span>
                <span className="inline-label right">ON</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
