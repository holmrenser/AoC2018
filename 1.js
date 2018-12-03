const fs = require('fs');

fs.readFile('./1.input', (err, data) => {
  const frequency = data.toString('utf8').split('\n').reduce((acc, val) => {
    const sign = val[0];
    const magnitude = parseInt(val.slice(1));
    if (sign === '+') {
      acc += magnitude
    } else {
      acc -= magnitude
    }
    return acc
  }, 0)
  console.log(frequency)
})