import { readFile } from 'fs/promises'

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

const input = (await readFile('./rucksacks.txt')).toString().split('\r\n')
// const input = [
//   'vJrwpWtwJgWrhcsFMMfFFhFp',
//   'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
//   'PmmdzqPrVvPwwTWBwg',
//   'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
//   'ttgJtRGJQctTZtZT',
//   'CrZsJsPPZsGzwwsLwLmpwMDw'
// ]

const groupInput = input.reduce(
  (acc, curr, index) => (index % 3 ? acc[acc.length - 1].push(curr) : acc.push([curr])) && acc,
  []
)

const priorities = []

for (const item of groupInput) {
  // const firstItem = item.substring(0, item.length / 2)
  // const secondItem = item.substring(item.length / 2, item.length)

  const hashes = []
  const letters = []
  for (let i = 0; i < item.length; i++) {
    let hash = {}
    for (let j = 0; j < item[i].length; j++) {
      if (!hash[item[i][j]]) {
        hash[item[i][j]] = [item[i][j]]
        letters.push(item[i][j])
      } else {
        hash[item[i][j]].push(item[i][j])
      }
    }
    hashes.push(hash)
    hash = {}
  }

  const stack = []
  for (let i = 0; i < letters.length; i++) {
    if (hashes[0][letters[i]] && hashes[1][letters[i]] && hashes[2][letters[i]]) {
      stack.push(letters[i])
    }
  }

  // const stack = []
  // for (let i = 0; i < item.length / 2; i++) {
  //   stack.push(firstItem.split('').find((char) => char === secondItem[i]))
  // }

  const same = stack.filter((char) => char !== undefined)[0]
  for (let i = 0; i < alphabet.length; i++) {
    if (alphabet[i].toLowerCase() === same) priorities.push(i + 1)
    if (alphabet[i].toUpperCase() === same) priorities.push(i + 1 + 26)
  }
}

const sum = priorities.reduce((acc, curr) => acc + curr)
console.info('The sum of the priorities of the item types', sum)
