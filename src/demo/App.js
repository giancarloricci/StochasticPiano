import React, { Component } from 'react';
import InteractivePiano from './components/InteractivePiano';
import SlidingBar from './components/SlidingBar';
import Modes from './components/Modes';
import './App.css';

export default class Instrument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      mode: 0, // 0 -> Heap, 1 -> Normal
      displayKeys: true,
    };
  }

  change = (event) => {
    this.setState({ value: event });
  }

  changeMode = (event) => {
    this.setState({ mode: event });
  }

  render() {
    return (
      <div className={'app__fullscreen-container'}>
        <div className={'app__body'}>
          <SlidingBar handler={this.change} />
          <Modes handler={this.changeMode} />
          <InteractivePiano
            value={this.state.value}
            mode={this.state.mode}
          />
        </div>
      </div>
    );
  }
}
