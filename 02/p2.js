'use strict';

const { assert } = require('console');
//  https://adventofcode.com/2022/day/2

const fs = require('fs');

const LOSE = 0;
const DRAW = 3;
const WIN = 6;
const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

//  X = lose
//  Y = draw
//  Z = win
const OUTCOMES = {
  'A X': LOSE + SCISSORS,
  'A Y': DRAW + ROCK,
  'A Z': WIN + PAPER,
  'B X': LOSE + ROCK,
  'B Y': DRAW + PAPER,
  'B Z': WIN + SCISSORS,
  'C X': LOSE + PAPER,
  'C Y': DRAW + SCISSORS,
  'C Z': WIN + ROCK
}

const totalScore = fs.readFileSync('input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean).reduce((acc, line) => {
// const totalScore = 'A Y\nB X\nC Z'.split('\n').filter(Boolean).reduce((acc, line) => {
  const score = OUTCOMES[line];
  console.log(`${line} = ${score}`);
  return acc + score;
}, 0);

console.log(`total score = ${totalScore}`);
