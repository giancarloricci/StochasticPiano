# Stochastic Piano

As someone with a deep love for the piano, I often appreciate its deterministic interface – what you hear is what you expect. However, I wondered what would happen upon stochasticity to this interface. Would adding randomness add any compositional of generative utility? 

To answer this question, I began by building upon this wonderful [react piano component](https://github.com/lillydinhle/react-piano-component). My  primary intervention to this codebase was for a user to inject randomness via a sliding bar.

Initial attempts at shuffling the keyword mapping with some fixed probabilities caused unsatisfying and overly chaotic results. To better preserve locality, I applied [Heap's Algorithm](https://en.wikipedia.org/wiki/Heap%27s_algorithm#:~:text=Heap's%20algorithm%20generates%20all%20possible,2%20elements%20are%20not%20disturbed.) to generate a series of permutations. This approach enables the array index with respect to all generated heap permutations to function as a proxy for chaos. To further support the spirit of this project, I also randomly selected an instrument each time the user reloads the application. 

## Installation

```shell
npm install
```
