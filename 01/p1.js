'use strict';

//  https://adventofcode.com/2022/day/1

const fs = require('fs');

var elves = [];
elves.push([]);

const inputs = fs.readFileSync('input.txt', {encoding: 'utf8' }).split('\n').forEach(line => {
  line = line.trim();
  if (!line.length) {
    elves.push([]);
  } else {
    elves[elves.length - 1].push(+line);
  }
});

var elfMost = -1;
var most = 0;
elves.forEach((elf, idx) => {
  const curr = elf.reduce((prev, curr) => { return prev + curr; }, 0);
  console.log(`${idx + 1} ${curr} = ${elf.join(', ')}`);
  if (curr > most) {
    most = curr;
    elfMost = idx;
  }
});

console.log(`Elf ${elfMost + 1} is carrying ${most}`);
