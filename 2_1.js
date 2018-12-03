const fs = require('fs');

function checkDoublesAndTriples(line) {
  const letterCounts =  line.split('').reduce((acc, letter) => {
    if (acc.hasOwnProperty(letter)) {
      acc[letter] += 1
    } else {
      acc[letter] = 1
    }
    return acc
  },{})

  return Object.entries(letterCounts).reduce((acc, [letter, count]) => {
    if (count === 2) {
      acc.hasDouble = true
    }
    if (count === 3) {
      acc.hasTriple = true
    }
    return acc
  }, {
    hasDouble: false,
    hasTriple: false
  })

}

fs.readFile('./2_1.input', (err, dat) => {
  const lines = dat.toString('utf8').split('\n');
  const { doubles, triples } = lines.reduce((acc, line) => {
    const { hasDouble, hasTriple } = checkDoublesAndTriples(line);
    if (hasDouble) {
      acc.doubles += 1;
    }
    if (hasTriple) {
      acc.triples += 1;
    }
    return acc
  },{
    doubles: 0,
    triples: 0
  })

  console.log(`${doubles} doubles * ${triples} triples = ${doubles * triples}`)
})