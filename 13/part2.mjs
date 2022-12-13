import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString().split('\r\n').join('\n')
// const input = (await readFile('./test.txt')).toString().split('\r\n').join('\n')

const divider = [[[2]], [[6]]]

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

const list = input
  .replaceAll('\n\n', '\n')
  .split('\n')
  .map((item) => JSON.parse(item))
  .concat(divider)
  .sort((first, second) => compare(first, second))

const result = divider.map((item) => list.indexOf(item) + 1).reduce((acc, curr) => acc * curr)

console.info(result)
