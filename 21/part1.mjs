import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString().split('\r\n').join('\n')
// const input = (await readFile('./test.txt')).toString().split('\r\n').join('\n')

const code = input
  .split('\n')
  .map((line) => {
    if (line.match(/^([a-z]+): (\d+)$/)) {
      const [, variable, number] = line.match(/^([a-z]+): (\d+)$/)
      return { variable, number: +number }
    } else if (line.match(/^([a-z]+): ([a-z]+) (.) ([a-z]+)$/)) {
      const [, variable, param1, operator, param2] = line.match(/^([a-z]+): ([a-z]+) (.) ([a-z]+)$/)
      return { variable, param1, operator, param2 }
    }
  })
  .reduce((obj, x) => ({ ...obj, [x.variable]: x }), {})

console.info(calc(code, 'root'))

function calc(code, name) {
  const line = code[name]
  if (line.number !== undefined) return line.number
  const val1 = calc(code, line.param1)
  const val2 = calc(code, line.param2)
  switch (line.operator) {
    case '+':
      return val1 + val2
    case '-':
      return val1 - val2
    case '/':
      return val1 / val2
    case '*':
      return val1 * val2
  }
}

function calc2(code, name, result) {
  if (name === 'humn') return result
  const line = code[name]
  const val1 = calc(code, line.param1)
  const val2 = calc(code, line.param2)
  if (Number.isNaN(val1)) {
    if (name === 'root') return calc2(code, line.param1, val2)
    switch (line.operator) {
      case '+':
        return calc2(code, line.param1, result - val2)
      case '-':
        return calc2(code, line.param1, result + val2)
      case '*':
        return calc2(code, line.param1, result / val2)
      case '/':
        return calc2(code, line.param1, result * val2)
    }
  }

  if (Number.isNaN(val2)) {
    if (name === 'root') return calc2(code, line.param2, val1)
    switch (line.operator) {
      case '+':
        return calc2(code, line.param2, result - val1)
      case '-':
        return calc2(code, line.param2, val1 - result)
      case '*':
        return calc2(code, line.param2, result / val1)
      case '/':
        return calc2(code, line.param2, val1 / result)
    }
  }
}
