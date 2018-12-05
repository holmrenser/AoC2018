const fs = require('fs');

function *react(polymers) {
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

function fullReaction(polymers){
  let reactionGenerator = react(polymers);
  reactionGenerator = reactionGenerator.next()
  while (!reactionGenerator.done) {
    reactionGenerator = reactionGenerator.value.next()
  }
  return reactionGenerator.value.length;
}

fs.readFile('./5_2.input', (err, res) => {
  const polymers = res.toString('utf8')//.split('');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const lengths = alphabet.map(letter => {
    const re = new RegExp(letter, 'ig')
    const reducedPolymers = polymers.replace(re,'');
    return [letter,fullReaction(reducedPolymers.split(''))]
  })
  console.log(lengths)
})