const fs = require('fs');


function *react(polymers) {
  // console.log('react',polymers.length)
  let newPolymers = [];
  for (let i = 0; i < polymers.length - 1; i++){
    const unit1 = polymers[i];
    const unit2 = polymers[i+1];
    if (unit1 === unit2) {
      continue
    } else if (unit1.toUpperCase() === unit2.toUpperCase()) {
      newPolymers = [].concat(polymers.slice(0,i), polymers.slice(i + 2))
      break
    }
  }

  if (newPolymers.length == 0) {
    return polymers
  }
  yield react(newPolymers)
  
}

fs.readFile('./5_1.input', (err, res) => {
  const polymers = res.toString('utf8').split('');
  let reactionGenerator = react(polymers);
  reactionGenerator = reactionGenerator.next()
  while (!reactionGenerator.done) {
    reactionGenerator = reactionGenerator.value.next()
  }
  console.log(reactionGenerator.value.length)
})