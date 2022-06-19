import React, { Component } from 'react';
import Piano from '../../lib';
import './InteractivePiano.css';

const keyboard = ['Q', '2', 'W', '3', 'E', 'R', '5', 'T', '6', 'Y', '7', 'U', 'V', 'G', 'B', 'H', 'N', 'M', 'K', ',', 'L', '.', ':', '\''];

/* APPROACH 1: HEAP PERMUTATION */

// Implementation of Heap Permutation - earlier permutations better preserve locality
function permutations(arr, len, repeat = false) {
  len = len || arr.length;
  if (len > arr.length) len = arr.length;
  const results = [];

  function eliminate(el, arr) {
    let i = arr.indexOf(el);
    arr.splice(i, 1);
    return arr;
  }

  function perms(arr, len, prefix = []) {
    if (prefix.length === len) {
      results.push(prefix);
    } else {
      for (let elem of arr) {
        let newPrefix = [...prefix];
        newPrefix.push(elem);
        let newRest = null;

        if (repeat) {
          newRest = arr;
        } else {
          newRest = eliminate(elem, [...arr]);
        }
        perms(newRest, len, newPrefix);
      }
    }
    return;
  }
  perms(arr, len);
  return results;
}

function makeKeyBoardObject(values) {
  const obj = {};
  keyboard.forEach((element, index) => {
    obj[element] = values[index];
  });
  return obj;
}

function makeKeyboardMapHeap(p) {
  p /= 100; // convert scale to probability
  let notes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5'];

  // split notes into equal sections to permute
  let splits = (function splitToChunks(array, parts) {
    let result = [];
    for (let i = parts; i > 0; i--) {
      result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
  })(notes, 4);

  // perform heap permutation algorithm on each slice
  var heaps = [];
  splits.forEach((arr) => {
    var permutes = permutations(arr);
    var index = Math.floor(p * permutes.length); // use scale to index into heap permutation; proxy for randomness
    var item = permutes[Math.max(Math.min(index, permutes.length - 1), 0)]; // guard index for bounds
    heaps.push(...item);
  });

  // construct object mapping
  return makeKeyBoardObject(heaps);
}

/* APPROACH 2: NORMAL DISTRIBUTION */

// Normal Distribution Simulator
function boxMullerTransform() {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
  return { z0, z1 };
}

function getNormallyDistributedRandomNumber(mean, stddev) {
  const { z0, _ } = boxMullerTransform();
  return (z0 * stddev) + mean;
}

// Select index from array - using normal distribution with specified mean / sttdev
function normalIndexChoice(lst, mean, stddev, used, duplicates = true) {
  var index;

  // empirically faster for final index
  if (used.length === lst.length - 1) {
    return lst.filter(e => !used.includes(e))[0];
  }

  while (true) { // sample index inside viable range
    index = Number.parseInt(getNormallyDistributedRandomNumber(mean, stddev), 10);
    if (index >= 0 && index <= lst.length) { // ensure no repeated elements
      if (duplicates && used.includes(lst[index])) {
        continue;
      }
      used.push(lst[index]);
      return lst[index];
    }
  }
}

const SCALE = 20;

function makeKeyboardMapNormal(p) {
  let notes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5'];
  let used = [];
  let values = [];

  for (var i = 0; i < notes.length; i++) {
    // use position as mean, p as stddev
    values.push(normalIndexChoice(notes, i, p / SCALE, used));
  }
  return makeKeyBoardObject(values);
}


function PianoContainer({ children }) {
  return (
    <div
      className={'interactive-piano__piano-container'}
      onMouseDown={event => event.preventDefault()}
    >
      {children}
    </div>
  );
}

function AccidentalKey({ isPlaying, eventHandlers }) {
  return (
    <div className={'interactive-piano__accidental-key__wrapper'}>
      <button
        className={`interactive-piano__accidental-key ${isPlaying ? 'interactive-piano__accidental-key--playing' : ''
        }`}
        {...eventHandlers}
      >
        {/* <div className={'interactive-piano__text'}>{text}</div> */}
      </button>
    </div>
  );
}

function NaturalKey({ isPlaying, eventHandlers }) {
  return (
    <button
      className={`interactive-piano__natural-key ${isPlaying ? 'interactive-piano__natural-key--playing' : ''
      }`}
      {...eventHandlers}
    >
      {/* <div className={'interactive-piano__text'}>{text}</div> */}
    </button>
  );
}

function PianoKey({
  isNoteAccidental,
  isNotePlaying,
  startPlayingNote,
  stopPlayingNote,
}) {
  function handleMouseEnter(event) {
    if (event.buttons) {
      startPlayingNote();
    }
  }
  const KeyComponent = isNoteAccidental ? AccidentalKey : NaturalKey;
  const eventHandlers = {
    onMouseDown: startPlayingNote,
    onMouseEnter: handleMouseEnter,
    onTouchStart: startPlayingNote,
    onMouseUp: stopPlayingNote,
    onMouseOut: stopPlayingNote,
    onTouchEnd: stopPlayingNote,
  };

  return (
    <KeyComponent
      isPlaying={isNotePlaying}
      eventHandlers={eventHandlers}
    />
  );
}

export default class InteractivePiano extends Component {
  render() {
    return (
      <PianoContainer>
        <Piano
          startNote={'C4'}
          endNote={'B5'}
          renderPianoKey={PianoKey}
          keyboardMap={this.props.mode === 0 ? makeKeyboardMapHeap(this.props.value) : makeKeyboardMapNormal(this.props.value)}
        />
      </PianoContainer>
    );
  }
}
