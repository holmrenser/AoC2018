const fs = require('fs');

const { range } = require('./util.js');

class Patch {
  constructor(line){
    this.line = line;
    const [ID, _, coords, size] = line.split(' ');
    const [x_start, y_start] = coords.slice(0, -1).split(',');
    const [x_size, y_size] = size.split('x');
    
    Object.assign(this, {
      ID, 
      coords, 
      size,
      x_start: parseInt(x_start),
      y_start: parseInt(y_start),
      x_size: parseInt(x_size),
      y_size: parseInt(y_size)
    });

    this.x_end = this.x_start + this.x_size;
    this.y_end = this.y_start + this.y_size;
  }
}

fs.readFile('./3_2.input', (err,dat) => {
  const lines = dat.toString('utf8').split('\n');
  const patches = lines.map(line => new Patch(line));

  coords = patches.reduce((acc, patch) => {
    range(patch.x_size, patch.x_start).forEach(x => {
      range(patch.y_size, patch.y_start).forEach(y => {
        ID = `${x}_${y}`;
        if (!acc.hasOwnProperty(ID)) {
          acc[ID] = 0
        }
        acc[ID] += 1
      })
    })
    return acc
  }, {})
  patches.forEach(patch => {
    let hasOverlap = false
    range(patch.x_size, patch.x_start).forEach(x => {
      range(patch.y_size, patch.y_start).forEach(y => {
        ID = `${x}_${y}`;
        if (coords[ID] > 1) {
          hasOverlap = true
        }
      })
    })
    if (!hasOverlap) {
      console.log(patch)
    }
  })
})