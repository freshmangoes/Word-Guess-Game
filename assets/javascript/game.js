


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
  addGuesses(){
    this.guesses += this.theWord.length;
    console.log('Remaining guesses:', this.guesses);
  },

  // populates theWordArray 
  setWordArray(word) {
    // splits a word into individual characters
    // pushes them to theWordArray
    word.split('').forEach(c => {
      this.theWordArray.push(c);
    });
  },

  // creates an array of underscores
  setFillInArray(arrayLength){
    for (let i = 0; i < arrayLength; i++) {
      this.fillInArray.push('_');
    }
  },

  // Sets the gameState
  init() {
    // picks the word
    this.pickWord();
    // sets the number of guesses
    this.addGuesses();
    // creates the array for theWord
    this.setWordArray(this.theWord);
    // creates the array for correctly guessed words
    this.setFillInArray(this.theWordArray.length);
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