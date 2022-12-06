import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString().split('')
// const input = (await readFile('./test.txt')).toString().split('')

for (let i = 3; i < input.length; i++) {
  const set = new Set(input.slice(i - 4, i))

  if (set.size === 4) {
    console.info(i)
    break
  }
}
