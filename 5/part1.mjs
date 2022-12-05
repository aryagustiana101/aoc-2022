import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString()
// const input = (await readFile('./test.txt')).toString()

const stacks = input.split('\r\n').slice(0, input.split('\r\n').indexOf(''))
const procedures = input.split('\r\n').slice(input.split('\r\n').indexOf('') + 1)

const horizontalStacks = []
for (const stack of stacks.slice(0, stacks.length - 1)) {
  let counter = 0
  let tempCrate = ''
  const tempStacks = []

  for (let i = 0; i < stack.length; i++) {
    if (counter !== 4) {
      tempCrate = `${tempCrate}${stack[i]}`
      counter += 1
    }

    if (counter === 3) {
      tempStacks.push(tempCrate)
    }

    if (counter === 4) {
      tempCrate = ''
      counter = 0
      continue
    }
  }

  horizontalStacks.push(tempStacks)
}

const mapStacks = {}
for (let i = horizontalStacks.length - 1; i >= 0; i--) {
  for (let j = 0; j < horizontalStacks[i].length; j++) {
    if (!mapStacks[j + 1]) {
      if (horizontalStacks[i][j] !== '   ') {
        mapStacks[j + 1] = [horizontalStacks[i][j]]
      }
    } else {
      if (horizontalStacks[i][j] !== '   ') {
        mapStacks[j + 1].push(horizontalStacks[i][j])
      }
    }
  }
}

for (const procedure of procedures) {
  const number = parseInt(procedure.split(' ')[1])
  const from = parseInt(procedure.split(' ')[3])
  const to = parseInt(procedure.split(' ')[5])

  // console.info('before', { from: mapStacks[from], to: mapStacks[to], mapStacks })

  const crates = mapStacks[from].splice(mapStacks[from].length - number)

  mapStacks[to] = [...mapStacks[to], ...crates.reverse()]

  // console.info('after', { crates, from: mapStacks[from], to: mapStacks[to], mapStacks }, '\n')
  // console.info('after', { mapStacks }, '\n')
}

const topStack = []
for (let i = 0; i < Object.keys(mapStacks).length; i++) {
  topStack.push(mapStacks[i + 1][mapStacks[i + 1].length - 1])
}

console.info('Top Stack', topStack.join('').replace(/[\[\]']+/g, ''))
// console.info(mapStacks)
