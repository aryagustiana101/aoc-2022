import { readFile } from 'fs/promises'

const input = (await readFile('./input.txt')).toString().split('\r\n')
// const input = (await readFile('./test.txt')).toString().split('\r\n')

const fs = { files: {}, dirs: {} }

let current = fs

for (const command of input) {
  const [cmd, ...rest] = command.split(' ')

  if (cmd === '$') {
    if (rest[0] === 'cd') {
      const dir = rest[1]
      if (dir === '..') {
        current = current.parent
      } else if (dir === '/') {
        current = fs
      } else {
        if (!current.dirs[dir]) {
          current.dirs[dir] = { parent: current, files: {}, dirs: {} }
        }
        current = current.dirs[dir]
      }
    }
  } else if (cmd !== 'dir') {
    current.files[rest[0]] = parseInt(cmd)
  }
}

const dirSizes = []

const computeFileSize = (curr) => {
  let size = 0

  for (const file in curr.files) {
    size += curr.files[file]
  }

  for (const dir in curr.dirs) {
    const dirSize = computeFileSize(curr.dirs[dir])
    size += dirSize

    dirSizes.push(dirSize)
  }

  return size
}

computeFileSize(fs)

const sumOfSub100k = dirSizes.filter((x) => x <= 100000).reduce((a, b) => a + b)
console.log('part 1:', sumOfSub100k)
