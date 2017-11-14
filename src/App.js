import React, { Component } from 'react';
import './App.css';
import Switch from './components/switch';
import Button from './components/button';
import Control from './components/control';

let interval;

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
      steps: generateSteps(20),
      acceptingInput: false,
      seqLength: 2,
      pointer: null,
      count: null,
      userInput: []
     }

     this.handleSwitch = this.handleSwitch.bind(this);
     this.handleStart = this.handleStart.bind(this);
     this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleSwitch() {
    let start = this.state.start;
    if (this.state.on === true) { 
      start = false;
      clearInterval(interval);
      this.setState({pointer: null, userInput: [], seqLength: 2, count: null});
    };

    this.setState({start, on: !this.state.on});
  }

  handleStart() {
    if (this.state.on && !this.state.start) {
      this.setState({start: true});
      this.playSequence(this.state.steps, this.state.seqLength);
    }
  }

  playSequence(steps, length) {
    this.setState({acceptingInput: false, userInput: []});

    function play() {
      let i = 0;
      interval = setInterval(() => {
        this.setState({pointer: steps[i]});
        setTimeout(() => {
          this.setState({pointer: null});
        }, 500);
        i++;
        if (i === length || i === steps.length) {
          clearInterval(interval);
          this.handlePlayStop(length);
        }
      }, 1000);
    }

    setTimeout(play.bind(this), 500);
  }

  handlePlayStop(count) {
    this.setState({acceptingInput: true});
  }

  handleUserInput(value) {
    function validate() {
      this.validateInput();
    }

    if (this.state.start && this.state.acceptingInput) {
      this.setState({pointer: value});
      setTimeout(() => {
        this.setState({pointer: null});
      }, 200);

      this.setState({userInput: this.state.userInput.concat(value)}, validate);
    }
  }

  validateInput() {
    const loseGame = () => {
      this.setState({userInput: [], steps: generateSteps(20), start: false, seqLength: 2});
      this.flash();
    }

    const numClicks = this.state.userInput.length;
    let { seqLength } = this.state;

    if (String(this.state.steps.slice(0, numClicks)) === String(this.state.userInput)) {
      if (numClicks === seqLength) {
        seqLength += 1;
        this.setState({seqLength}, () => { 
        this.setState({count: seqLength - 1});
        this.playSequence(this.state.steps, seqLength);
      });
      }
    } else {
      loseGame();
    }
  }

  flash() {
    let interval = setInterval(() => {
      this.state.count !== '' ? this.setState({count: ''}) : this.setState({count: null})
    }, 300);

    setTimeout(() => {clearInterval(interval)}, 2000);
  }

  render() {
    const { pointer, count } = this.state;
    return (
      <div className="App">
        <div id="base">
          <div className="row">
            <Control 
              onClick={this.handleUserInput} 
              value={1} 
              className="top left" 
              active={pointer === 1 ? true : false} 
            />
            <Control 
              onClick={this.handleUserInput} 
              value={2} 
              className="top right" 
              active={pointer === 2 ? true : false} 
            />
          </div>
          <div className="row">
          <Control 
            onClick={this.handleUserInput} 
            value={3} 
            className="bottom left" 
            active={pointer === 3 ? true : false} 
          />
          <Control 
            onClick={this.handleUserInput} 
            value={4} 
            className="bottom right" 
            active={pointer === 4 ? true : false} 
          />
          </div>
          <div id="face">
            <div id="strict-led" className="off"></div>
            <h1>Simon<span className="reg">®</span></h1>
            <div className="face-controls">
              <div id="display">
                <div id="display-content" className={this.state.on ? 'on' : 'off'}>{count || count === '' ? count : '--'}</div>
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
