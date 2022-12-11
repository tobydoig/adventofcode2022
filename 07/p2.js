'use strict';

const { assert } = require('console');
//  https://adventofcode.com/2022/day/7

const fs = require('fs');
const TEST_DATA = '$ cd /\n$ ls\ndir a\n14848514 b.txt\n8504156 c.dat\ndir d\n$ cd a\n$ ls\ndir e\n29116 f\n2557 g\n62596 h.lst\n$ cd e\n$ ls\n584 i\n$ cd ..\n$ cd ..\n$ cd d\n$ ls\n4060174 j\n8033020 d.log\n5626152 d.ext\n7214296 k\n'

const PAD = '  ';
const DISK_SIZE = 70000000;
const SPACE_NEEDED = 30000000;

class Node {
  constructor(name, size = -1) {
    this.name = name;
    this.size = size;
    this.isfile = size >= 0;
    this.parent = null;
    this.children = [];
  }

  calcSizes() {
    let sz = 0;
    //  depth first search so we only calculate directory sizes once and bubble their values up
    this.children.forEach(c => {
      if (!c.isfile) c.calcSizes();
      sz += c.size;
    });
    this.size = sz;
  }

  add(n) {
    n.parent = this;
    this.children.push(n);
  }

  ls(cb, dirsonly = false, depth = 0) {
    if (!depth) {
      cb(this, depth);
      ++depth;
    }
    //  in-order search
    this.children.forEach(c => {
      if (!dirsonly || !c.isfile) cb(c, depth);
      if (!c.isfile) c.ls(cb, dirsonly, depth + 1);
    });
  }

  cd(d) {
    if (d === '..') return this.parent
    let f = this.children.find(f => {
      if (!f.isfile && f.name === d) return 1;
    });
    return f;
  }
}

const input = fs.readFileSync('input.txt', {encoding: 'utf8' }).split('\n').filter(Boolean);
// const input = TEST_DATA.trim().split('\n').filter(Boolean);

var root = new Node('/');
var wd;

input.forEach(e => {
  if (e.startsWith('$ cd ')) {
    let n = e.substring(5);
    if (n === '/') wd = root;
    else wd = wd.cd(n);
  } else if (e === '$ ls') {

  } else if (e.startsWith('dir ')) {
    wd.add(new Node(e.substring(4)));
  } else {
    //  it's a file entry
    let p = e.indexOf(' ');
    wd.add(new Node(e.substring(p + 1), +e.substring(0, p)));
  }
});

root.calcSizes();

const currentSpace = DISK_SIZE - root.size;
const spaceToFree = SPACE_NEEDED - currentSpace;

var candidateDirs = [];
root.ls((n, depth) => {
  if (n.size >= spaceToFree) candidateDirs.push(n);
  // if (n.isfile) console.log(`${PAD.repeat(depth)}- ${n.name} (file, ${n.size})`);
  // else console.log(`${PAD.repeat(depth)}- ${n.name} (dir, ${n.size})`);
}, true);

candidateDirs.sort((a, b) => a.size - b.size);
candidateDirs.forEach(n => console.log(`${n.name} ${n.size}`));
console.log(`${candidateDirs.length} candidates`);

console.log(`Delete ${candidateDirs[0].name} freeing ${candidateDirs[0].size}`);
