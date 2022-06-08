# react-piano-component

As a piano performer, I appreciate that deterministic interface of the piano – what you hear is what you expect.

However, I wondered about the effects of adding stochasticity to this interface. Would adding randomness add any utility for composers or other music generation tasks? Let's code to find out.

For the bulk of my project, I build upon this wonderful react piano component:
Demo: https://lillydinhle.github.io/react-piano-component/

My primary intervention to this codebase was the ability to control randomness through a sliding bar.

To do so, I generated alternate keyboard mappings. Initial attempts shuffling the mapping with some fixed probabilities caused unsatisfying and overly chaotic results.

To better preserve locality, I applied Heap's Algorithm (https://en.wikipedia.org/wiki/Heap%27s_algorithm#:~:text=Heap's%20algorithm%20generates%20all%20possible,2%20elements%20are%20not%20disturbed.)

to generate a serious of permutations – using the index in the total generate permutations are a proxy for total interface shuffling. 








## Installation

```shell
npm install --save react-piano-component
```
