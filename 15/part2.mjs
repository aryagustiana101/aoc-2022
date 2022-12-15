/*
USE THIS IF RUNS OUT OF MEMORY
node --max-old-space-size=8192 .\part2.mjs
*/

import { readFile } from 'fs/promises'

const size = 4000000
const input = (await readFile('./input.txt')).toString().split('\r\n').join('\n')

// const size = 20
// const input = (await readFile('./test.txt')).toString().split('\r\n').join('\n')

const sensors = input.split('\n').map((line) => {
  const [, sx, sy, bx, by] = line.match(/^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/)
  return { sx: +sx, sy: +sy, bx: +bx, by: +by }
})

const map = new Array(size + 1).fill().map(() => [])
for (const { sx, sy, bx, by } of sensors) {
  map.forEach((ranges, y) => {
    const distance = Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(sy - y)
    if (distance >= 0) ranges.push([sx - distance, sx + distance])
    if (by === y) ranges.push([bx, bx])
  })
}

let result = 0
for (let y = 0; y < map.length; y++) {
  const ranges = map[y].sort((a, b) => a[0] - b[0])
  let guess = 0
  for (const range of ranges) {
    if (range[0] <= guess && range[1] >= guess) guess = range[1] + 1
  }
  if (guess <= size) {
    result = guess * 4000000 + y
    break
  }
}

console.info(result)
