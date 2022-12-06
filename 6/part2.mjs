import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString().split('')
// const input = (await readFile('./test.txt')).toString().split('')

for (let i = 13; i < input.length; i++) {
  const set = new Set(input.slice(i - 14, i))

  if (set.size === 14) {
    console.info(i)
    break
  }
}
