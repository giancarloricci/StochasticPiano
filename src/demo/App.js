import React, { Component } from 'react';
import InteractivePiano from './components/InteractivePiano';
import SlidingBar from './components/SlidingBar';
import './App.css';

export default class Instrument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      displayKeys: true,
    };
  }

  change = (event) => {
    this.setState({ value: event });
  }

  render() {
    return (
      <div className={'app__fullscreen-container'}>
        <div className={'app__body'}>
          <SlidingBar handler={this.change} />
          <InteractivePiano value={this.state.value} />
        </div>
      </div>
    );
  }
}
