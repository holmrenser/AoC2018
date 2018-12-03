const fs = require('fs');

fs.readFile('./1_2.input', (err, data) => {
  let foundDuplicate = false;
  let frequency = 0;
  const seenFrequencies = new Set();
  const changes = data.toString('utf8').split('\n').map(d => {
    const sign = d[0];
    const magnitude = parseInt(d.slice(1));
    return [sign, magnitude];
  });
  while (!foundDuplicate) {
    frequency = changes.reduce((acc, [sign, magnitude]) => {
      if (sign === '+'){
        acc += magnitude
      } else {
        acc -= magnitude
      }

      if (seenFrequencies.has(acc)) {
        if (!foundDuplicate) {
          console.log(acc)
        }
        foundDuplicate = true;
      }
      seenFrequencies.add(acc)

      return acc
    }, frequency)
    seenFrequencies.add(frequency)
  }
})