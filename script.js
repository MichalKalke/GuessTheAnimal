'use strict';

class Animal {
  constructor(json) {
    Object.assign(this, json);
  }
}

const dataJson = `[{"species": "mammals","animal": "elephant","clues": ["I live a long time", "I have tusks", "My nose is a trunk"]},{"species": "reptiles","animal": "crocodile","clues": ["My jaw is very powerful","I live on the land and in the water","I'm the face of Lacoste"]},{"species": "birds","animal": "penguin","clues": ["I love freezing weather","People think I don't have knees but I have!","I can't fly"]},{"species": "amphibians","animal": "frog","clues": ["I like water", "I croak to myself", "I'm not a toad!"]},{"species": "insects","animal": "mosquito","clues": ["I live mainly in Summer", "Noone likes me", "I'm a vampire!"]},{"species": "arachnids","animal": "scorpio","clues": ["I'm poisonous", "I have tongs", "My tail is a spike"]},{"species": "mammals","animal": "panda","clues": ["I'm a China national", "I;m fluffy", "I eat bamboo"]},{"species": "reptiles","animal": "chameleon","clues": ["Now you can see me, now you can't","My eyes see everything","I can change my color"]},{"species": "birds","animal": "stork","clues": ["I bring you children","In winter I reside in Africa","When I come back you say it's spring"]},{"species": "insects","animal": "bee","clues": ["I'm buzzzzing", "I'm useful", "My name is Maja"]},{"species": "mammals","animal": "lemur","clues": ["Call me Julian, King Julian","I like to move it!","I came from Madagascar"]},{"species": "reptiles","animal": "salamander","clues": ["I'm in spots", "I have a tail", "I'm close to salame"]},{"species": "insects","animal": "mantis","clues": ["My eyes are beautiful","I have 2 swords","I eat my husband for breakfast"]},{"species": "arthropod","animal": "lobster","clues": ["My tail is strong so my paws","My paws are nippers","I'm very yummy"]},{"species": "insects","animal": "bittern","clues": ["Big Boi", "I'm not bumblebee", "Fart is a synomime in Polish"]}]`;

const rawArray = JSON.parse(dataJson);
const animalsArray = [];

for (let i = 0; i < rawArray.length - 1; i++) {
  const animal = new Animal(rawArray[i]);
  animalsArray.push(animal);
}

console.log(rawArray);

console.log(animalsArray[3].clues[2]);
