'use strict';

let score = 0;
const playerScore = document.querySelector('.label-score');
let secretNumber = Math.trunc(Math.random() * 15);
let nextRiddle = false;
let usedNumbers = [];
const highScore = document.querySelector('.highscore').textContent;
//remove hidden
const hiddenAnimal = document.querySelector('.animal');
const leftSection = document.querySelector('.left');
const rightSection = document.querySelector('.right');
const infoSpecies = document.querySelector('.infoSpecies');
const nextBtn = document.querySelector('.next');
const riddle = document.querySelector('.riddle');
const guessAnimal = document.querySelector('.guess');

//addhidden
const comment = document.querySelector('.comment');
const startBtn = document.querySelector('.start');

let clue = 0;
let games = 5;

class Animal {
  constructor(json) {
    Object.assign(this, json);
  }
}

const dataJson = `[{"species": "mammals","animal": "elephant","clues": ["I live a long time", "I have tusks", "My nose is a trunk"]},{"species": "reptiles","animal": "crocodile","clues": ["My jaw is very powerful","I live on the land and in the water","I'm the face of Lacoste"]},{"species": "birds","animal": "penguin","clues": ["I love freezing weather","People think I don't have knees but I have!","I can't fly"]},{"species": "amphibians","animal": "frog","clues": ["I like water", "I croak to myself", "I'm not a toad!"]},{"species": "insects","animal": "mosquito","clues": ["I live mainly in Summer", "Noone likes me", "I'm a vampire!"]},{"species": "arachnids","animal": "scorpio","clues": ["I'm poisonous", "I have tongs", "My tail is a spike"]},{"species": "mammals","animal": "panda","clues": ["I'm a China national", "I'm fluffy", "I eat bamboo"]},{"species": "reptiles","animal": "chameleon","clues": ["Now you can see me, now you can't","My eyes see everything","I can change my color"]},{"species": "birds","animal": "stork","clues": ["I bring you children","In winter I reside in Africa","When I come back you say it's spring"]},{"species": "insects","animal": "bee","clues": ["I'm buzzzzing", "I'm useful", "My name is Maja"]},{"species": "mammals","animal": "lemur","clues": ["Call me Julian, King Julian","I like to move it!","I came from Madagascar"]},{"species": "reptiles","animal": "salamander","clues": ["I'm in spots", "I have a tail", "I'm close to salame"]},{"species": "insects","animal": "mantis","clues": ["My eyes are beautiful","I have 2 swords","I eat my husband for breakfast"]},{"species": "arthropod","animal": "lobster","clues": ["My tail is strong so my paws","My paws are nippers","I'm very yummy"]},{"species": "insects","animal": "bittern","clues": ["Big Boi", "I'm not bumblebee", "Fart is a synomime in Polish"]}]`;

//const dataJson = `[{"species": "arthropod","animal": "lobster","clues": ["My tail is strong so my paws","My paws are nippers","I'm very yummy"]},{"species": "insects","animal": "bittern","clues": ["Big Boi", "I'm not bumblebee", "Fart is a synomime in Polish"]},{"species": "reptiles","animal": "salamander","clues": ["I'm in spots", "I have a tail", "I'm close to salame"]}]`;

const rawArray = JSON.parse(dataJson);
const animalsArray = [];

for (let i = 0; i < rawArray.length; i++) {
  const animal = new Animal(rawArray[i]);
  animalsArray.push(animal);
}

document.querySelector('.start').addEventListener('click', () => {
  guessAnimal.classList.remove('hidden');
  hiddenAnimal.classList.remove('hidden');
  leftSection.classList.remove('hidden');
  rightSection.classList.remove('hidden');
  infoSpecies.classList.remove('hidden');
  riddle.classList.remove('hidden');

  comment.classList.add('hidden');
  startBtn.classList.add('hidden');
  play();
});

document.querySelector('.again').addEventListener('click', () => {
  hiddenAnimal.classList.add('hidden');
  leftSection.classList.add('hidden');
  rightSection.classList.add('hidden');
  infoSpecies.classList.add('hidden');
  riddle.classList.add('hidden');

  comment.classList.remove('hidden');
  startBtn.classList.remove('hidden');
  score = 0;
  playerScore.textContent = 'Score: ' + score;
  usedNumbers = [];
  init();
  games = 5;
  document.querySelector('.middle').classList.remove('hidden');
  rightSection.removeAttribute('style', 'height: 5vw;');
});

function init() {
  displayMessage(`Waiting...`);
  clue = 0;
  hiddenAnimal.textContent = '?';
  nextBtn.classList.add('hidden');
  guessAnimal.value = '';
  document.querySelector('.check').classList.remove('hidden');
}

const play = function () {
  secretNumber = Math.trunc(Math.random() * 15);
  console.log(secretNumber);
  if (usedNumbers.length === 0 || usedNumbers.indexOf(secretNumber)) {
    usedNumbers.push(secretNumber);
    console.log('Nice');
    infoSpecies.textContent = 'Species:\n' + animalsArray[secretNumber].species;
    riddle.textContent = animalsArray[secretNumber].clues[clue];
    console.log(animalsArray[secretNumber].animal);
  } else {
    console.log('Used :(');
    play();
  }
};

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function addPoints(number) {
  console.log(number);
  if (number === 0) {
    score += 100;
  } else if (number === 1) {
    score += 50;
  } else if (number === 2) {
    score += 20;
  } else {
    score -= 20;
  }
  playerScore.textContent = 'Score: ' + score;
}

function displayEndMessage(message) {
  hiddenAnimal.setAttribute('style', 'white-space: pre;');
  rightSection.setAttribute('style', 'height: 5vw;');
  hiddenAnimal.textContent += '\r\n\r\n' + message;
}

function gameEnded() {
  displayMessage('The END!');
  guessAnimal.classList.add('hidden');
  document.querySelector('.middle').classList.add('hidden');

  if (score < highScore && score > 0) {
    displayEndMessage('Nice! Close to beat best! 🙌');
  } else if (score < 0) {
    displayEndMessage('This was horrible 💫');
  } else {
    document.querySelector('.highscore').textContent = score;
    displayEndMessage('👑 AWESOME! NEW HIGHSCORE! 👑');
  }
}

function checkIfNext() {
  addPoints(clue);
  hiddenAnimal.textContent = animalsArray[secretNumber].animal;
  document.querySelector('.check').classList.add('hidden');
  games--;
  if (games < 1) {
    gameEnded();
  } else {
    nextBtn.classList.remove('hidden');
  }
}

nextBtn.addEventListener('click', () => {
  init();
  play();
});

document.querySelector('.check').addEventListener('click', () => {
  const guess = guessAnimal.value;
  riddle.setAttribute('style', 'white-space: pre;');
  if (!guess) {
    displayMessage(`🛑 It's not an animal! 🛑`);
  } else if (guess === animalsArray[secretNumber].animal) {
    displayMessage('Correct! ヽ(✿ﾟ▽ﾟ)ノ');
    checkIfNext();
  } else if (guess !== animalsArray[secretNumber].animal) {
    clue++;
    if (clue < 3) {
      displayMessage('Wrong, read next clue! ＞﹏＜');
      riddle.textContent += `\r\n\r\n${animalsArray[secretNumber].clues[clue]}`;
    } else {
      displayMessage('Sorry but you failed (´。＿。｀)');
      checkIfNext();
    }
  }
});
