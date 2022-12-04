import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString().split('\r\n')

// const input = ['2-4,6-8', '2-3,4-5', '5-7,7-9', '2-8,3-7', '6-6,4-6', '2-6,4-8']

let contained = 0

for (let item of input) {
  const right = item
    .split(',')[0]
    .split('-')
    .map((value) => parseInt(value))
  const left = item
    .split(',')[1]
    .split('-')
    .map((value) => parseInt(value))

  if ((left[0] <= right[0] && right[1] <= left[1]) || (right[0] <= left[0] && left[1] <= right[1])) contained++
}

console.info(contained)
