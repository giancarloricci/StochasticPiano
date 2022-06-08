import React, { Component } from 'react';
import { Slider } from 'rsuite';
import './SlidingBar.css';

export default class SlidingBar extends Component {
  render() {
    return (
      <div>
        <h1>Stochasticity: </h1>
        <Slider progress
          defaultValue={0}
          onChange={(value) => { this.props.handler(value); }}
        />
      </div>
    );
  }
}
