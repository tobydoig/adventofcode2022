'use strict';

const { assert } = require('console');
//  https://adventofcode.com/2022/day/8

const fs = require('fs');
const TEST_DATA = '30373\n25512\n65332\n33549\n35390\n';

const input = fs.readFileSync('input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean).map(s => s.trim().split('').map(c => +c));
// const input = TEST_DATA.trim().split('\n').filter(Boolean).map(s => s.trim().split('').map(c => +c));

var highScore = 0;

const maxRow = input.length;
const maxCol = input[0].length;
//  start at 1 and end -1 because edges have a 0 visibility in 1 direction which makes that score 0
for (let r = 1; r < maxRow - 1; r++) {
  for (let c = 1; c < maxCol - 1; c++) {
    const h = input[r][c];
    // console.log(`${h} at ${r},${c}`);

    //  scan left
    let leftScore = 0;
    for (let c2 = c - 1; c2 >= 0; c2--) {
      ++leftScore;
      if (input[r][c2] >= h) {
        break;
      };
    }

    //  scan right
    let rightScore = 0;
    for (let c2 = c + 1; c2 < maxCol; c2++) {
      ++rightScore;
      if (input[r][c2] >= h) {
        break;
      };
    }

    //  scan up
    let upScore = 0;
    for (let r2 = r - 1; r2 >= 0; r2--) {
      ++upScore;
      if (input[r2][c] >= h) {
        break;
      };
    }

    //  scan down
    let downScore = 0;
    for (let r2 = r + 1; r2 < maxRow; r2++) {
      ++downScore;
      if (h <= input[r2][c]) {
        break;
      };
    }

    var score = leftScore * rightScore * upScore * downScore;
    
    if (score > highScore) {
      console.log(`** ${h} at ${r},${c} has ${leftScore},${rightScore},${upScore},${downScore} = ${score}`);
      highScore = score;
    } else {
      console.log(`${h} at ${r},${c} has ${leftScore},${rightScore},${upScore},${downScore} = ${score}`);
    }
  }
}

console.log(`highScore = ${highScore}`);
