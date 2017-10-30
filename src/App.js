import React, { Component } from 'react';
import './App.css';
import Switch from './components/switch';
import Button from './components/button';
import Control from './components/control';

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSteps(length) {
  return Array.from(Array(length), () => randNum(1,4));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      on: false,
      start: false,
      strict: false,
      steps: generateSteps(20)
     }

     this.handleSwitch = this.handleSwitch.bind(this);
     this.handleStart = this.handleStart.bind(this);
  }

  handleSwitch() {
    this.setState({on: !this.state.on});
  }

  handleStart() {
    this.setState({start: !this.state.start});
  }

  render() {
    return (
      <div className="App">
        <div id="base">
          <div className="row">
            <Control className="top left" active={false} />
            <Control className="top right" active={false} />
          </div>
          <div className="row">
          <Control className="bottom left" active={false} />
          <Control className="bottom right" active={false} />
          </div>
          <div id="face">
            <div id="strict-led" className="off"></div>
            <h1>Simon<span className="reg">®</span></h1>
            <div className="face-controls">
              <div id="display">
                <div id="display-content" className={this.state.on ? 'on' : 'off'}>--</div>
              </div>
              <Button className="start" onClick={this.handleStart} />
              <Button className="strict" />
              <span className="label left">COUNT</span>
              <span className="label middle">START</span>
              <span className="label right">STRICT</span>
            </div>
            <Switch onClick={this.handleSwitch} on={this.state.on} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
