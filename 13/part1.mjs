import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString().split('\r\n').join('\n')
// const input = (await readFile('./test.txt')).toString().split('\r\n').join('\n')

const compare = (first, second) => {
  for (let i = 0; i < first.length && i < second.length; i++) {
    if (Number.isInteger(first[i]) && Number.isInteger(second[i])) {
      if (first[i] !== second[i]) return first[i] - second[i]
    } else {
      const result = compare(
        Number.isInteger(first[i]) ? [first[i]] : first[i],
        Number.isInteger(second[i]) ? [second[i]] : second[i]
      )
      if (result !== 0) return result
    }
  }
  return first.length - second.length
}

const result = input
  .split('\n\n')
  .map((pair) => pair.split('\n').map((item) => JSON.parse(item)))
  .map((pair, index) => (compare(...pair) < 0 ? index + 1 : 0))
  .reduce((acc, curr) => acc + curr)

console.info(result)
