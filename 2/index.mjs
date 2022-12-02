import { readFile } from 'fs/promises'

const dict = {
  A: { item: 'rock', point: 1 },
  rock: { item: 'rock', point: 1 },
  B: { item: 'paper', point: 2 },
  paper: { item: 'paper', point: 2 },
  C: { item: 'scissors', point: 3 },
  scissors: { item: 'scissors', point: 3 }
}

const rules = {
  'rock-rock': 'draw',
  'rock-paper': 'paper',
  'rock-scissors': 'rock',
  'paper-paper': 'draw',
  'paper-rock': 'paper',
  'paper-scissors': 'scissors',
  'scissors-scissors': 'draw',
  'scissors-rock': 'rock',
  'scissors-paper': 'scissors'
}

const codes = {
  X: 'lose',
  Y: 'draw',
  Z: 'win'
}

const strategies = {
  'win-rock': 'paper',
  'win-paper': 'scissors',
  'win-scissors': 'rock',
  'draw-rock': 'rock',
  'draw-paper': 'paper',
  'draw-scissors': 'scissors',
  'lose-rock': 'scissors',
  'lose-paper': 'rock',
  'lose-scissors': 'paper'
}

const input = (await readFile('./input.txt')).toString().split('\r\n')

let score = 0
let opponentScore = 0
for (const item of input) {
  const opponent = dict[item.split(' ')[0]]
  const you = dict[strategies[`${codes[item.split(' ')[1]]}-${opponent.item}`]]

  const winner = rules[`${opponent.item}-${you.item}`]

  if (winner === you.item) {
    score += 6 + you.point
    opponentScore += opponent.point
  }

  if (winner === opponent.item) {
    score += you.point
    opponentScore += 6 + opponent.point
  }

  if (winner === 'draw') {
    score += 3 + you.point
    opponentScore += 3 + opponent.point
  }
}

console.info('Your Score', score)
console.info('Opponent Score', opponentScore)
