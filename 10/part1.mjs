import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString().split('\r\n')
// const input = (await readFile('./test.txt')).toString().split('\r\n')

let sum = 0
let cycle = 0
let x = 1

for (const item of input) {
  if (item === 'noop') {
    cycle++
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
      sum += x * cycle
    }
  } else {
    cycle++
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) sum += x * cycle

    cycle++
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) sum += x * cycle

    x += +item.split(' ').pop()
  }
}

console.info(sum)
