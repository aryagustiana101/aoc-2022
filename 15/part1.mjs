import { readFile } from 'fs/promises'

const y = 2000000
const input = (await readFile('./input.txt')).toString().split('\r\n').join('\n')

// const y = 10
// const input = (await readFile('./test.txt')).toString().split('\r\n').join('\n')

const sensors = input.split('\n').map((line) => {
  const [, sx, sy, bx, by] = line.match(/^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/)
  return { sx: +sx, sy: +sy, bx: +bx, by: +by }
})

const options = new Set()
let beacons = new Set()
for (const { sx, sy, bx, by } of sensors) {
  const distance = Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(sy - y)
  for (let i = sx - distance; i <= sx + distance; i++) options.add(i)
  if (by === y) beacons.add(bx)
}

console.info(options.size - beacons.size)
