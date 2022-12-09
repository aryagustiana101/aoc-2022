import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString().split('\n')
// const input = (await readFile('./test.txt')).toString().split('\n')

let rope = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 }
]

let allPos = new Set()

for (const line of input) {
  const [dir, amount] = line.split(' ')

  const amountNum = parseInt(amount)

  for (let moved = 0; moved < amountNum; moved++) {
    const newEnd = { ...rope[0] }

    if (dir === 'R') {
      newEnd.x++
    } else if (dir === 'L') {
      newEnd.x--
    } else if (dir === 'U') {
      newEnd.y++
    } else if (dir === 'D') {
      newEnd.y--
    }
    rope[0] = newEnd

    // Redone for diagonals to work right
    for (let knot = 0; knot < rope.length - 1; knot++) {
      let dx = rope[knot].x - rope[knot + 1].x
      let dy = rope[knot].y - rope[knot + 1].y
      if (Math.abs(dx) > 1) {
        rope[knot + 1].x += dx > 0 ? 1 : -1
        if (Math.abs(dy) != 0) rope[knot + 1].y += dy > 0 ? 1 : -1
      } else if (Math.abs(dy) > 1) {
        rope[knot + 1].y += dy > 0 ? 1 : -1
        if (Math.abs(dx) != 0) rope[knot + 1].x += dx > 0 ? 1 : -1
      }
    }

    allPos.add(`${rope[9].x},${rope[9].y}`)
  }
}

console.log(allPos.size)
