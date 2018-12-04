const fs = require('fs');

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

function xOverlap(patch1, patch2) {
  if (patch1.x_start < patch2.x_start) {
    return {
      x_diff: patch1.x_end - patch2.x_start,
      x_start: patch2.x_start,
      x_end: patch1.x_end
    }
  } else {
    return {
      x_diff: patch2.x_end - patch1.x_start,
      x_start: patch1.x_start,
      x_end: patch2.x_end
    }
  }
}

function yOverlap(patch1, patch2) {
  if (patch1.y_start < patch2.y_start) {
    return {
      y_diff: patch1.y_end - patch2.y_start,
      y_start: patch2.y_start,
      y_end: patch1.y_end
    }
  } else {
    return {
      y_diff: patch2.y_end - patch1.y_start,
      y_start: patch1.y_start,
      y_end: patch2.y_end
    }
  }
}

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

fs.readFile('./3_2.input', (err,dat) => {
  const lines = dat.toString('utf8').split('\n');
  const patches = lines.map(line => new Patch(line));
  /*patches.forEach((patch1, i) => {
    const matches = patches.map(patch2 => {
      const { x_diff, x_start, x_end } = xOverlap(patch1, patch2);
      const { y_diff, y_start, y_end } = yOverlap(patch1, patch2);
      if (x_diff <= 0 && y_diff <= 0){
        return true
      } else {
        return false
      }
    })
    const nonOverlapping = matches.filter(m => m)
    console.log(`${nonOverlapping.length}`)
    if (nonOverlapping.length === matches.length) {
      console.log(patch1)
    }
  })
  //console.log(overlaps.size)*/
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