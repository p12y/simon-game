import React, { Component } from 'react';
import './App.css';
import Switch from './components/switch';
import Button from './components/button';
import Control from './components/control';
import { generateSteps } from './helpers';
import sound_1 from './sounds/sound_1.mp3';
import sound_2 from './sounds/sound_2.mp3';
import sound_3 from './sounds/sound_3.mp3';
import sound_4 from './sounds/sound_4.mp3';

let interval;

const SOUNDS = {
  1: new Audio(sound_1),
  2: new Audio(sound_2),
  3: new Audio(sound_3),
  4: new Audio(sound_4)
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      on: false,
      start: false,
      strictMode: false,
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
     this.handleStrictClick = this.handleStrictClick.bind(this);
  }

  handleSwitch() {
    let start = this.state.start;
    if (this.state.on === true) { 
      start = false;
      clearInterval(interval);
      this.clearGame(true, false);
    };

    this.setState({start, on: !this.state.on});
  }

  handleStrictClick() {
    if (this.state.on) {
      this.setState({strictMode: !this.state.strictMode});
    }
  }

  handleStart() {
    if (this.state.on && !this.state.start) {
      this.setState({start: true});
      this.playSequence(this.state.steps, this.state.seqLength);
    }
  }

  playSequence(steps, length) {
    if (String(this.state.userInput) === String(this.state.steps)) {
      this.setState({count: 'WIN!'});
      setTimeout(() => {
        this.clearGame(true, false)
      }, 2500);
      return false;
    }

    this.setState({acceptingInput: false, userInput: []});

    function play() {
      let i = 0;
      interval = setInterval(() => {
        this.setState({pointer: steps[i]});
        SOUNDS[steps[i]].cloneNode(true).play();
        setTimeout(() => {
          this.setState({pointer: null});
        }, 300);
        i++;
        if (i === length || i === steps.length) {
          clearInterval(interval);
          this.handlePlayStop(length);
        }
      }, this.calculateSpeed());
    }

    setTimeout(play.bind(this), 500);
  }

  handlePlayStop(count) {
    setTimeout(() => {
      this.setState({acceptingInput: true});
    }, 300);
  }

  handleUserInput(value) {
    function validate() {
      this.validateInput();
    }

    if (this.state.start && this.state.acceptingInput) {
      SOUNDS[value].cloneNode(true).play();
      this.setState({pointer: value});
      setTimeout(() => {
        this.setState({pointer: null});
      }, 300);

      this.setState({userInput: this.state.userInput.concat(value)}, validate);
    }
  }

  validateInput() {
    const numClicks = this.state.userInput.length;
    let { seqLength } = this.state;

    if (String(this.state.steps.slice(0, numClicks)) === String(this.state.userInput)) {
      if (numClicks === seqLength) {
        seqLength += 1;
        this.setState({seqLength}, () => { 
          this.setState({count: seqLength - 1
        });
        this.playSequence(this.state.steps, seqLength);
      });
      }
    } else {
      this.state.strictMode ? this.clearGame(true, true) : this.clearGame(false, true);
    }
  }

  flash() {
    let interval = setInterval(() => {
      this.state.count !== '' ? this.setState({count: ''}) : 
        this.setState({count: null})
    }, 300);

    setTimeout(() => {clearInterval(interval)}, 2000);
  }

  clearGame(reset, flash) {
    this.setState(
      {
        userInput: [], 
        steps: reset ? generateSteps(20) : this.state.steps, 
        start: false, 
        seqLength: 2, 
        count: null,
        acceptingInput: false
      }
    );
    
    if (flash) this.flash();
  }

  calculateSpeed() {
    const { count } = this.state;
    let speed = 1000;

    if (count > 14) {
      speed = 300;
    } else if (count > 9) {
      speed = 500;
    } else if (count > 4) {
      speed = 800;
    }
    return speed;
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
              className={`top left ${this.state.acceptingInput ? 'input' : ''}`} 
              active={pointer === 1 ? true : false} 
            />
            <Control 
              onClick={this.handleUserInput} 
              value={2} 
              className={`top right ${this.state.acceptingInput ? 'input' : ''}`} 
              active={pointer === 2 ? true : false} 
            />
          </div>
          <div className="row">
          <Control 
            onClick={this.handleUserInput} 
            value={3} 
            className={`bottom left ${this.state.acceptingInput ? 'input' : ''}`} 
            active={pointer === 3 ? true : false} 
          />
          <Control 
            onClick={this.handleUserInput} 
            value={4} 
            className={`bottom right ${this.state.acceptingInput ? 'input' : ''}`} 
            active={pointer === 4 ? true : false} 
          />
          </div>
          <div id="face">
            <div id="strict-led" className={this.state.strictMode ? 'on' : 'off'}></div>
            <h1>Simon<span className="reg">®</span></h1>
            <div className="face-controls">
              <div id="display">
                <div id="display-content" className={this.state.on ? 'on' : 'off'}>
                  {count || count === '' ? count : '--'}
                </div>
              </div>
              <Button className="start" onClick={this.handleStart} />
              <Button onClick={this.handleStrictClick} className="strict" />
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
