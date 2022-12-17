import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString().split('\r\n').join('\n')
// const input = (await readFile('./test.txt')).toString().split('\r\n').join('\n')

const valves = input
  .split('\n')
  .map((line) => {
    const [, id, rate, destination] = line.match(
      /^Valve ([^\s]+) has flow rate=(\d+); tunnels? leads? to valves? (.+)$/
    )
    return { id, rate: +rate, destination: destination.split(', ') }
  })
  .reduce((obj, valve) => ({ ...obj, [valve.id]: valve }), {})

Object.values(valves).forEach((valve) => {
  valve.paths = Object.values(valves)
    .filter(({ id }) => id !== valve.id)
    .map(({ id }) => ({ id, distance: distance(valves, valve, id) }))
})

const open = Object.keys(valves).filter((id) => valves[id].rate === 0)

console.info(best(valves, 'AA', new Set(open), 0, 30, false))

function best(valves, current, open, pressure, time, elephant) {
  if (time === 0) return pressure
  const results = valves[current].paths
    .filter(({ id, distance }) => !open.has(id) && time > distance)
    .flatMap(({ id, distance }) => {
      const nextOpen = new Set(open).add(id)
      const nextPressure = pressure + valves[id].rate * (time - distance - 1)
      return [
        best(valves, id, nextOpen, nextPressure, time - distance - 1, elephant),
        elephant && best(valves, 'AA', nextOpen, nextPressure, 26, !elephant)
      ]
    })
  return Math.max(pressure, ...results)
}

function distance(valves, valve, id) {
  const queue = [{ id: valve.id, steps: 0 }]
  const visited = new Set(`${valve.id},0`)
  while (queue.length > 0) {
    const current = queue.shift()
    if (current.id === id) return current.steps
    const neighbors = valves[current.id].destination
      .map((id) => ({ id, steps: current.steps + 1 }))
      .filter((x) => !visited.has(`${x.id},${x.steps}`))
    neighbors.forEach((x) => visited.add(`${x.id},${x.steps}`))
    queue.push(...neighbors)
  }
}
