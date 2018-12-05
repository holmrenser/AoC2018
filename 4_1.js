const fs = require('fs');
const { range } = require('./util.js');

function getGuardTimes(times){
  const guardTimes = {};
  let guard;
  let asleep;
  let awake;
  times.forEach(([dateString, rest]) => {
    const minute = parseInt(dateString.slice(-2, dateString.length));
    if (/Guard/.test(rest)) {
      [_,guard,_,_] = rest.split(' ');
      if (!guardTimes.hasOwnProperty(guard)){
        guardTimes[guard] = {};
      }
      asleep = undefined;
      awake = undefined;
    } else if (/falls asleep/.test(rest)) {
      asleep = minute;
    } else if (/wakes up/.test(rest)) {
      awake = minute;
      range(awake - asleep, asleep).forEach(sleepMinute => {
        if (!guardTimes[guard].hasOwnProperty(sleepMinute)) {
          guardTimes[guard][sleepMinute] = 0;
        }
        guardTimes[guard][sleepMinute] += 1
      })
    } 
  })
  return guardTimes
}

fs.readFile('./4_1.input',(err,dat) => {
  const lines = dat.toString('utf8').split('\n');
  const times = lines.map(line => {
    const [_, dateString, rest] = line.split(/\[|\]/);
    return [dateString, rest.trim()]
  }).sort((a,b) => new Date(a[0]) - new Date(b[0]))
  
  const guardTimes = getGuardTimes(times)
  const asleepTimes = Object.entries(guardTimes).map(([guard, minutes]) => {
    const { max, argMax, sum } = Object.entries(minutes).reduce((acc, [minute, timesAsleep]) => {
      const max = timesAsleep > acc.max ? timesAsleep : acc.max;
      const argMax = timesAsleep > acc.max ? minute : acc.argMax;
      const sum = acc.sum + timesAsleep;
      return {
        max, argMax, sum
      }
    },{
      max: 0, sum: 0, argMax: undefined
    })
    return {
      guard, max, sum, argMax
    }
  }).sort((a,b) => b.sum - a.sum)

  const mostAsleep = asleepTimes[0];
  const { guard, max, argMax, sum } = mostAsleep;
  const _guard = parseInt(guard.slice(1))
  console.log(`${_guard} * ${argMax} = ${_guard * argMax}`)  
})