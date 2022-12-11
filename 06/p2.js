'use strict';

const { assert } = require('console');
//  https://adventofcode.com/2022/day/6

const fs = require('fs');
const TEST_DATA = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw\n'

const input = fs.readFileSync('input.txt', {encoding: 'utf8' }).trim();
// const input = TEST_DATA.trim();

var pos;
//  sliding window
for (pos = 14; pos < input.length; pos++) {
  let s = new Set();
  let w = input.slice(pos - 14, pos);
  w.split('').forEach(e => s.add(e));
  if (s.size === 14) break;
}

console.log(`Marker at position ${pos}`);
