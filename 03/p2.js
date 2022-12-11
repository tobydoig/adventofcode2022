'use strict';

const { assert } = require('console');
//  https://adventofcode.com/2022/day/3

const fs = require('fs');
const TEST_DATA = 'vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw\n';

var common;
const totalScore = fs.readFileSync('input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean).reduce((acc, line, idx) => {
// const totalScore = TEST_DATA.split('\n').filter(Boolean).reduce((acc, line, idx) => {
  const phase = idx % 3;

  if (phase === 0) {
    common = new Set();
    line.split('').forEach(c => common.add(c));

    return acc;
  }

  var newCommon = new Set();
  line.split('').forEach(c => {
      if (common.has(c)) newCommon.add(c);
  });
  common = newCommon;

  if (phase === 1) return acc;

  //  phase 2 - last in group
  assert(common.size === 1);
  const c = common.values().next().value;
  //  a.. = 1.., A.. = 27..
  const priority = c >= 'a' ? c.charCodeAt(0) - 96 : c.charCodeAt(0) - 38;

  return acc + priority;
}, 0);

console.log(`total score = ${totalScore}`);
