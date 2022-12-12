import { readFile } from 'fs/promises'

const strength = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  S: 1,
  E: 26
}

const input = (await readFile('./input.txt')).toString()
// const input = (await readFile('./test.txt')).toString()

const grid = input.split('\r\n').map((r) => r.split(''))

const numberGrid = grid.map((row) => row.map((tile) => strength[tile]))

let start = { x: 0, y: 0 }
let end = { x: 0, y: 0 }

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const tile = grid[y][x]
    if (tile === 'S') start = { x, y }
    if (tile === 'E') end = { x, y }
  }
}

const allValidMoves = (point) => {
  const moves = []
  const { x, y } = point

  const elevation = numberGrid[y][x]

  const allMoves = [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 }
  ]

  return allMoves.filter((move) => {
    const { x: x2, y: y2 } = move

    if (x2 < 0 || y2 < 0) return false
    if (x2 >= numberGrid[0].length || y2 >= numberGrid.length) return false

    const elevation2 = numberGrid[y2][x2]

    return elevation2 <= elevation + 1
  })
}

const allVisitedPoints = new Set([`${start.x},${start.y}`])
const pointToString = (point) => `${point.x},${point.y}`

let incompletePaths = [[start]]
while (incompletePaths.length > 0) {
  const newIncompletePaths = []

  for (const incompletePath of incompletePaths) {
    const lastPoint = incompletePath[incompletePath.length - 1]
    const validMoves = allValidMoves(lastPoint)

    for (const move of validMoves) {
      if (allVisitedPoints.has(pointToString(move))) continue

      allVisitedPoints.add(pointToString(move))

      const newIncompletePath = [...incompletePath]
      newIncompletePath.push(move)

      if (move.x === end.x && move.y === end.y) {
        console.info('ANSWER FOUND', newIncompletePath.length - 1)
        process.exit(0)
      } else {
        newIncompletePaths.push(newIncompletePath)
      }
    }
  }

  incompletePaths = newIncompletePaths
}
