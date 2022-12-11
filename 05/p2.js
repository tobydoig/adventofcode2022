'use strict';

const { assert } = require('console');
//  https://adventofcode.com/2022/day/5

const fs = require('fs');
const TEST_DATA = '    [D]    \n[N] [C]    \n[Z] [M] [P]\n 1   2   3 \n\nmove 1 from 2 to 1\nmove 3 from 1 to 3\nmove 2 from 2 to 1\nmove 1 from 1 to 2\n'

const lines = fs.readFileSync('input.txt', {encoding: 'utf8' }).split('\n');
// const lines = TEST_DATA.split('\n');

//  make an array of stacks (where each stack is an array)
const stackData = lines.slice(0, lines.findIndex(s => !Boolean(s)));
const numColumns = (stackData[stackData.length - 1].length + 1) / 4;  //  +1 for the missing trailing space, then /4 as each column is 4 characters
const stacks = [];
for (let i = 0 ; i < numColumns; i++) stacks.push([]);
//  go in reverse order from bottom of stack to top so we push items on in the correct order
for (let i = stackData.length - 2; i >= 0; i--) {
  const line = stackData[i];
  let m = line.match(/(\[\w\]|\s{3})\s?/g);
  m.forEach((value, idx) => {
    value = value.trim();
    if (value) {
      const c = value.charAt(1);  //  value = [X]
      stacks[idx].push(c);
    }
  });
}

for (let i = stackData.length + 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line) {
    const m = line.match(/move (\d+) from (\d+) to (\d+)/); 
    const count = +m[1];
    const src = +m[2];
    const dst = +m[3];

    let s = stacks[src - 1];
    let c = s.splice(s.length - count);
    stacks[dst - 1].push(...c);
  }
}

console.log(`Top items = ${stacks.reduce((acc, stack) => acc + stack[stack.length - 1], '')}`);
