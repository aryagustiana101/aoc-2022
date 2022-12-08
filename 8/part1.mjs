import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString().split('\r\n')
// const input = (await readFile('./test.txt')).toString().split('\r\n')

const numGrid = input.map((line) => line.split('').map((num) => parseInt(num)))

const treeIsVisible = (x, y) => {
  const tree = numGrid[x][y]

  let visible = true
  for (let j = 0; j < x; j++) {
    const num = numGrid[j][y]
    if (j === x) continue
    if (num >= tree) visible = false
  }
  if (visible) return true

  visible = true
  for (let j = x; j < numGrid.length; j++) {
    const num = numGrid[j][y]
    if (j === x) continue
    if (num >= tree) visible = false
  }
  if (visible) return true

  visible = true
  for (let k = 0; k < y; k++) {
    const num = numGrid[x][k]
    if (k === y) continue
    if (num >= tree) visible = false
  }
  if (visible) return true

  visible = true
  for (let k = y; k < numGrid[x].length; k++) {
    const num = numGrid[x][k]
    if (k === y) continue
    if (num >= tree) visible = false
  }
  if (visible) return true

  return false
}

let visibleTrees = 0

for (let x = 0; x < numGrid.length; x++) {
  for (let y = 0; y < numGrid[x].length; y++) {
    if (treeIsVisible(x, y)) visibleTrees++
  }
}

console.info(visibleTrees)
