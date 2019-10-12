// auxiliary functions
function getIndex(array, value) {
  // array to store index values
  var indicies = [];
  // loop through the array to be searched for indicies
  for (var i = 0; i < array.length; i++) {
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
  initWord: function () {
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
    this.guesses = 7;
    this.guesses += this.theWord.length;
  },

  // populates theWordArray 
  initWordAray(word) {
    this.theWordArray = [];
    // splits a word into individual characters
    // pushes them to theWordArray
    word.split('').forEach(c => {
      this.theWordArray.push(c);
    });
  },

  // creates an array of underscores
  initFillArray(arrayLength) {
    this.fillInArray = [];
    for (let i = 0; i < arrayLength; i++) {
      this.fillInArray.push('_');
    }
  },

  setFillArray(letter, answer, fill) {
    // gets array of indicies that contain the letter
    var correctIndicies = getIndex(answer, letter);
    // if correctIndicies has more than one index
    if (correctIndicies.length != 1) {
      // iterate
      for (var i = 0; i < correctIndicies.length; i++) {
        console.log('setFillArray - correctIndicies: ', correctIndicies);
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
    if (this.fillInArray.includes(letter)) {
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
      console.log('Remaining guesses: ', this.guesses);

      // case for incorrect guess
    } else {
      console.log('Chosen word does not contain this character:', letter);
      // push letter to guessed array
      this.guessedLetters.push(letter);
      console.log('Guessed letters: ', this.guessedLetters);
      // subtract one from guesses
      this.guesses = this.guesses - 1;
      console.log('Remaining guesses: ', this.guesses);
    }
    console.log('gameState.fillInArray: ', gameState.fillInArray);
    console.log('gameState.guessedLetters: ', gameState.guessedLetters);
  },

  checkWinCondition() {
    // makes fillInArray a string
    var fillInWord = this.fillInArray.join('');
    // compares chosen word against fillInArray word
    if (this.theWord === fillInWord) {
      return true;
    } else {
      return false;
    }
  },

  // Sets the gameState
  init() {
    // picks the word
    this.initWord();
    console.log('Game word: ', this.theWord);
    // sets the number of guesses
    this.initGuesses();
    console.log('Number of guesses: ', this.guesses);
    // creates the array for theWord
    this.initWordAray(this.theWord);
    console.log('Game word array: ', this.theWordArray);
    // creates the array for correctly guessed words
    this.initFillArray(this.theWordArray.length);
    console.log('Fill in array: ', this.fillInArray);    
  },

  // resets the game upon a win
  newGame() {
    alert('YOU WON, SON');
    this.wins++;
    this.init();
    this.guessedLetters = [];
    this.update();
  },

  update() {
    // get elements to be modified and set them to variables
    var targetWord = document.getElementById('target-word');
    var fillArrayDisplay = document.getElementById('fill-display');
    var winCount = document.getElementById('win-count');
    var guessCount = document.getElementById('guess-count');
    var guessArrayDisplay = document.getElementById('guess-display');

    // populating HTML with gameState data
    targetWord.innerHTML = this.theWord;
    fillArrayDisplay.innerHTML = this.fillInArray.join(' ');
    guessArrayDisplay.innerHTML = this.guessedLetters.join(', ');
    winCount.innerHTML = 'Win Count: ' + this.wins;
    guessCount.innerHTML = 'Guesses Left: ' + this.guesses;

    // onkeyup event to capture key input
    document.onkeyup = function (event) {
      // gets the key code from the onkeyup event
      var guessCode = event.keyCode;
      // if statement to make sure a letter was pressed
      // if a letter is pressed, update gameState and HTML
      if (guessCode >= 65 && guessCode <= 90) {
        console.log('input was a letter');
        // forces lower case for consistency
        var guess = String.fromCharCode(guessCode).toLowerCase();
        console.log('Guess: ', guess);
        // handles the guessed letter
        gameState.addGuess(guess);

        // updates HTML after pressing a key, has to use gameState because it is a nested function
        fillArrayDisplay.innerHTML = gameState.fillInArray.join(' ');
        guessArrayDisplay.innerHTML = gameState.guessedLetters.join(', ');
        guessCount.innerHTML = 'Remaining guesses: ' + gameState.guesses;

        // do not update gameState and HTML if letter was not pressed
      } else {
        console.log('input was not a letter');
      }

      //--------------------------------------------
      // update win condition logic. make sure that 
      //there is lose condition logic too! look at
      // functions newGame(), the if statement below
      // and initialization functions
      //--------------------------------------------
      if (gameState.checkWinCondition()) {
        gameState.newGame();
      }
      console.log('Win condition: ', gameState.checkWinCondition());
    }
  },
}

// Initialize gameState
gameState.init();

// updates gameState
gameState.update();