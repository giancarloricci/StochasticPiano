import React, { Component } from 'react';
import Piano from '../../lib';
import './InteractivePiano.css';


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

function makeKeyboardMap(p) {
  p /= 100; // convert scale to probability
  const keyboard = ['Q', '2', 'W', '3', 'E', 'R', '5', 'T', '6', 'Y', '7', 'U', 'V', 'G', 'B', 'H', 'N', 'M', 'K', ',', 'L', '.', ':', '\''];
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

  // consturct object mapping
  notes = heaps;
  const obj = {};
  keyboard.forEach((element, index) => {
    obj[element] = notes[index];
  });
  return obj;
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
  // keyboardShortcuts,
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
          keyboardMap={makeKeyboardMap(this.props.value)}
        />
      </PianoContainer>
    );
  }
}
