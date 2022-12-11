'use strict';

const { assert } = require('console');
//  https://adventofcode.com/2022/day/3

const fs = require('fs');
const TEST_DATA = 'vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw\n';

const totalScore = fs.readFileSync('input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean).reduce((acc, line) => {
// const totalScore = TEST_DATA.split('\n').filter(Boolean).reduce((acc, line) => {
  assert(line.length % 2 === 0);

  const c1 = line.substring(0, line.length / 2);
  const c2 = line.substring(c1.length);

  const s1 = new Set();
  c1.split('').forEach(c => s1.add(c));
  const s2 = new Set();
  c2.split('').forEach(c => { if (s1.has(c)) s2.add(c); });
  assert(s2.size === 1);
  const c = s2.values().next().value;
  //  a.. = 1.., A.. = 27..
  const priority = c >= 'a' ? c.charCodeAt(0) - 96 : c.charCodeAt(0) - 38;

  return acc + priority;
}, 0);

console.log(`total score = ${totalScore}`);
