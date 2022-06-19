import React, { Component } from 'react';
import { Slider } from 'rsuite';
import './SlidingBar.css';


export default class Modes extends Component {
  render() {
    return (
      <div>
        <h1>Mode (Toggle Algorithm): </h1>
        <Slider progress
          defaultValue={0}
          max = {1}
          onChange={(value) => { this.props.handler(value); }}
        />
      </div>
    );
  }
}
