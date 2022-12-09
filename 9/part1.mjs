import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString().split('\n')
// const input = (await readFile('./test.txt')).toString().split('\n')

let tailPos = { x: 0, y: 0 }
let headPos = { x: 0, y: 0 }

let allPos = new Set()

const pointsAreAdjacent = (p1, p2) => {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y) === 1
}

const allPointsBetween = (p1, p2) => {
  const points = new Set()

  let x = p1.x
  let y = p1.y

  let lastPoint = { x, y }

  while (x !== p2.x || y !== p2.y) {
    lastPoint = { x, y }
    points.add(`${x},${y}`)
    if (x < p2.x) {
      x++
    } else if (x > p2.x) {
      x--
    }

    if (y < p2.y) {
      y++
    } else if (y > p2.y) {
      y--
    }
  }

  return { points, lastPoint }
}

const printVisitedPoints = (allPos) => {
  const minX = Math.min(...Array.from(allPos).map((p) => parseInt(p.split(',')[0])))
  const maxX = Math.max(...Array.from(allPos).map((p) => parseInt(p.split(',')[0])))
  const minY = Math.min(...Array.from(allPos).map((p) => parseInt(p.split(',')[1])))
  const maxY = Math.max(...Array.from(allPos).map((p) => parseInt(p.split(',')[1])))

  console.log(minX, maxX, minY, maxY)

  for (let y = maxY; y >= minY; y--) {
    let line = ''
    for (let x = minX; x <= maxX; x++) {
      if (x === 0 && y === 0) {
        line += 'S'
        continue
      }
      line += allPos.has(`${x},${y}`) ? 'X' : '.'
    }
    console.log(line)
  }
}

for (const line of input) {
  const [dir, amount] = line.split(' ')

  const amountNum = parseInt(amount)

  console.log('\n\n\n')
  console.log(dir, amountNum)

  let newPos = { x: headPos.x, y: headPos.y }
  if (dir === 'L') {
    newPos.x -= amountNum
  } else if (dir === 'R') {
    newPos.x += amountNum
  } else if (dir === 'U') {
    newPos.y += amountNum
  } else if (dir === 'D') {
    newPos.y -= amountNum
  }

  const { points, lastPoint } = allPointsBetween(tailPos, newPos)
  tailPos = lastPoint
  headPos = newPos

  // combine sets
  // printVisitedPoints(allPos);
  points.forEach((p) => allPos.add(p))
}

console.log(allPos, allPos.size)
