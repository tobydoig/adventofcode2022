'use strict';

//  https://adventofcode.com/2022/day/1

const fs = require('fs');

var elves = [];
elves.push({idx: 0, calories: 0, food: []});

fs.readFileSync('input.txt', {encoding: 'utf8' }).split('\n').forEach(line => {
  line = line.trim();
  if (!line.length) {
    elves.push({idx: elves.length, calories: 0, food: []});
  } else {
    const calories = +line;
    const elf = elves[elves.length - 1];
    elf.food.push(calories);
    elf.calories += calories;
  }
});

elves.sort((a, b) => {
  return b.calories - a.calories; //  sort calories descending
});

const topThree = elves.slice(0, 3);

const calories = topThree.reduce((prev, elf) => {
  console.log(`${elf.idx} ${elf.calories} = ${elf.food.join(', ')}`);

  return prev + elf.calories;
}, 0);

console.log(`Top three carrying ${calories}`);
