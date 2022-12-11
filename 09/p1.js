'use strict';

const { assert } = require('console');
//  https://adventofcode.com/2022/day/8

const fs = require('fs');
const TEST_DATA = '30373\n25512\n65332\n33549\n35390\n';

const input = fs.readFileSync('input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean).map(s => s.trim().split('').map(c => +c));
// const input = TEST_DATA.trim().split('\n').filter(Boolean).map(s => s.trim().split('').map(c => +c));

let totalVisible = (input.length + input[0].length) * 2 - 4; //  4 for the corners so we don't double-count

const maxRow = input.length;
const maxCol = input[0].length;
for (let r = 1; r < maxRow - 1; r++) {  //  start from 1 and end before last row so we don't reprocess edges
  for (let c = 1; c < maxCol - 1; c++) {  //  start from 1 and end before last row so we don't reprocess edges
    const h = input[r][c];
    // console.log(`${h} at ${r},${c}`);
    var visible = true;

    //  scan left
    for (let c2 = c - 1; c2 >= 0; c2--)
      if (h <= input[r][c2]) {
        visible = false;
        break;
      };
    if (visible) console.log(`${h} at ${r},${c} visible left`);

    //  scan right if necessary
    if (!visible) {
      visible = true;
      for (let c2 = c + 1; c2 < maxCol; c2++)
        if (h <= input[r][c2]) {
          visible = false;
          break;
        };
      if (visible) console.log(`${h} at ${r},${c} visible right`);
    }

    //  scan up if necessary
    if (!visible) {
      visible = true;
      for (let r2 = r - 1; r2 >= 0; r2--)
        if (h <= input[r2][c]) {
          visible = false;
          break;
        };
      if (visible) console.log(`${h} at ${r},${c} visible up`);
    }

    //  scan down if necessary
    if (!visible) {
      visible = true;
      for (let r2 = r + 1; r2 < maxRow; r2++)
        if (h <= input[r2][c]) {
          visible = false;
          break;
        };
      if (visible) console.log(`${h} at ${r},${c} visible down`);
    }

    if (visible) totalVisible++;
  }
}

console.log(`total ${totalVisible} visible`);
