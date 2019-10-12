// aux
function getIndex(array, value) {
  // array to store index values
  var indicies = [];
  // loop through the array to be searched for indicies
  for (var i = 0; i < array.length; i++){
    // check indicies against value
    if (array[i] === value) {
      // pushes correct index to indicies[]
      indicies.push(i);
    }
  }
  // returns correct indicies
  return indicies;
}


var gameState = {
  carParts: [
    'alternator', 'axle', 'exhaust', 'intake', 'coilpack', 'gauges', 'harness', 'fender', 'trunk', 'hood', 'door', 'solenoid', 'relay', 'fuse', 'wheel', 'tire', 'bearing', 'transmission', 'differential', 'frame', 'mount', 'motor', 'hub', 'knuckle', 'rack', 'pinion', 'piston', 'rod', 'cam', 'sensor', 'bumper', 'brakes', 'rotor', 'caliper', 'headlight', 'airbox',
  ],
  // array for guessed letters
  guessedLetters: [],
  // array for chosen word to make processing easier
  theWordArray: [],
  // array to be filled in by guessing letters
  fillInArray: [],
  // property for word to be chosen
  theWord: "",
  // base number of guesses
  guesses: 7,
  // win counter
  wins: 0,
  pickWord: function () {
    // Gets list length
    var listLength = this.carParts.length - 1;
    // Picks index between 0 and list length
    var index = Math.floor(Math.random() * (listLength));
    // Sets result to the found index in the list
    var result = this.carParts[index];
    // Sets theWord to the result
    this.theWord = result;
  },

  // Adds more guesses based off of the length of the goal word
  initGuesses() {
    this.guesses += this.theWord.length;
    console.log('Remaining guesses:', this.guesses);
  },

  // populates theWordArray 
  initWordAray(word) {
    // splits a word into individual characters
    // pushes them to theWordArray
    word.split('').forEach(c => {
      this.theWordArray.push(c);
    });
  },

  // creates an array of underscores
  initFillArray(arrayLength) {
    for (let i = 0; i < arrayLength; i++) {
      this.fillInArray.push('_');
    }
  },

  setFillArray(letter, answer, fill) {
    // gets array of indicies that contain the letter
    var correctIndicies = getIndex(answer, letter);
    // if correctIndicies has more than one index
    if(correctIndicies.length != 1) {
      // iterate
      for(var i = 0; i < correctIndicies.length - 1; i++){
        // get the index by taking the value of the current iteration
        var index = correctIndicies[i];
        // set fill array at that index to the answer array at that index
        fill[index] = answer[index];
      } 
    } else {
      // case for only having one index
      var index = correctIndicies[0];
      fill[index] = answer[index];
    }
  },

  addGuess(letter) {
    // case for already guessed letter
    if(this.fillInArray.includes(letter)) {
      console.log('Already guessed', letter);
    // case for correct guess
    } else if (this.theWordArray.includes(letter)) {
      console.log('Correct guess');
      // add letter to guessedLetters array
      this.guessedLetters.push(letter);
      // add new letter to fillInArray based on index in theWordArray
      this.setFillArray(letter, this.theWordArray, this.fillInArray);
      // subtract one from guesses
      this.guesses = this.guesses - 1;
      
    // case for incorrect guess
    } else {
      console.log('Chosen word does not contain this character:', letter);
      // push letter to guessed array
      this.guessedLetters.push(letter);
      console.log('Guessed letters: ', this.guessedLetters);
      // subtract one from guesses
      this.guesses = this.guesses - 1;
    }
  },

  // Sets the gameState
  init() {
    // picks the word
    this.pickWord();
    // sets the number of guesses
    this.initGuesses();
    // creates the array for theWord
    this.initWordAray(this.theWord);
    // creates the array for correctly guessed words
    this.initFillArray(this.theWordArray.length);
    // console.log(this.fillInArray);
  }

}

// Debug statement, making sure gameState is picking a word

// gameState.pickWord();
// gameState.addGuesses();
// gameState.setWordArray(gameState.theWord);
gameState.init();
console.log(gameState.theWordArray);
console.log('Game word:', gameState.theWord);