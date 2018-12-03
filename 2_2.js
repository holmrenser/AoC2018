const fs = require('fs');

function match(line1, line2){
  return [...line1].reduce((acc, l1, i) => {
    const l2 = line2[i];
    if (l1 === l2){
      acc.matches.push(l1)
    } else {
      acc.numberOfMismatches += 1
    }
    return acc
  }, {
    matches: [],
    numberOfMismatches: 0
  })
}

fs.readFile('./2_2.input', (err,dat) => {
  const lines = dat.toString('utf8').split('\n');
  lines.forEach((line1, i) => {
    lines.slice(i).forEach(line2 => {
      const { matches, numberOfMismatches } = match(line1,line2)
      if (numberOfMismatches === 1){
        console.log(matches.join(''))
      }
    })
  })
})
