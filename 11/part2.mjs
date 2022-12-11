import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString().split('\r\n').join('\n')
// const input = (await readFile('./test.txt')).toString().split('\r\n').join('\n')

const count = 10000

const monkeys = input.split('\n\n').map((monkey) => {
  const lines = monkey.split('\n')
  const [, items] = lines[1].split(': ')
  const [safe] = lines[2].match(/(old|\d+) (\*|\+) (old|\d+)$/)
  return {
    items: items.split(', ').map((x) => +x),
    operation: new Function('old', `return ${safe}`),
    divisible: +lines[3].match(/\d+$/)[0],
    yes: +lines[4].match(/\d+$/)[0],
    no: +lines[5].match(/\d+$/)[0],
    business: 0
  }
})

const base = monkeys.reduce((prev, monkey) => prev * monkey.divisible, 1)

for (let i = 0; i < count; i++) {
  for (const monkey of monkeys) {
    while (monkey.items.length > 0) {
      let worry = monkey.operation(monkey.items.shift())
      worry = count > 20 ? worry % base : Math.floor(worry / 3)
      const target = worry % monkey.divisible === 0 ? monkey.yes : monkey.no
      monkeys[target].items.push(worry)
      monkey.business++
    }
  }
}

const [top1, top2] = monkeys.sort((a, b) => b.business - a.business)

console.info(top1.business * top2.business)
