import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString().split('\r\n').join('\n')
// const input = (await readFile('./test.txt')).toString().split('\r\n').join('\n')

const key = 811589153
const times = 10
const original = input.split('\n').map((x) => ({ num: +x * key }))
const numbers = original.slice(0)

for (let i = 0; i < times; i++) {
  for (const move of original) {
    let i = numbers.indexOf(move)
    const next = numbers.splice(i, 1)[0]
    const pos = (i + next.num) % numbers.length
    if (pos === 0 && next.num !== 0) numbers.push(next)
    else numbers.splice(pos, 0, next)
  }
}

let result
const base = numbers.findIndex((x) => x.num === 0)
if (numbers.length < 1000) result = numbers.map((x) => x.num).join(', ')
else result = [1000, 2000, 3000].map((n) => numbers[base + n].num).reduce((a, b) => a + b)

console.info(result)
