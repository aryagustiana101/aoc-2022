import { readFile } from 'fs/promises'

const input = (await readFile('./calories.txt')).toString().split('\r\n')

const elves = []

let caloriesTemp = []
let totalTemp = 0
let mostCaloriesElf = {}
for (const item of input) {
  if (item !== '') {
    caloriesTemp.push(item)
    totalTemp += parseInt(item)
  }

  if (item === '') {
    const newElf = { calories: caloriesTemp, total: totalTemp }
    elves.push(newElf)

    if (elves.length === 1) mostCaloriesElf = newElf
    if (newElf.total > mostCaloriesElf.total) mostCaloriesElf = newElf

    caloriesTemp = []
    totalTemp = 0
  }
}

const sortedElves = elves.sort((a, b) => b.total - a.total)
const topThreeElves = [sortedElves[0], sortedElves[1], sortedElves[2]]
const totalCaloriesTopThreeElves = topThreeElves.map((elf) => elf.total).reduce((acc, curr) => acc + curr)

console.info('Elves carrying the most Calories', mostCaloriesElf)
console.info('Total calories of top three Elves carrying the most Calories', totalCaloriesTopThreeElves)
