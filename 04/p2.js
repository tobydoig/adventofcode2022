'use strict';

const { assert } = require('console');
//  https://adventofcode.com/2022/day/4

const fs = require('fs');
const TEST_DATA = '2-4,6-8\n2-3,4-5\n5-7,7-9\n2-8,3-7\n6-6,4-6\n2-6,4-8\n';

const contained = fs.readFileSync('input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean).reduce((acc, line) => {
// const contained = TEST_DATA.split('\n').filter(Boolean).reduce((acc, line) => {
  var m = line.match(/(\d+)\-(\d+)\,(\d+)\-(\d+)/);

  const x1 = +m[1];
  const y1 = +m[2];
  const x2 = +m[3];
  const y2 = +m[4];
  
  if (x1 >= x2 && x1 <= y2) {
    ++acc;
  } else if (y1 >= x2 && y1 <= y2) {
    ++acc;
  } else if (x2 >= x1 && x2 <= y1) {
    ++acc;
  } else if (y2 >= x1 && y2 <= y1) {
    ++acc;
  }

  return acc;
}, 0);

console.log(`total contained = ${contained}`);
