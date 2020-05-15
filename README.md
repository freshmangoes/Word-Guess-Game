# Word-Guess-Game

Sort of like hangman, but all about parts that might break on your car :)

The user guesses by pressing a letter key on their keyboard. Guessed letters are stored and cannot be guessed again. If a guess is incorrect, the guesses left counter goes down. Once it reaches 0, the user has lost, and the game will choose a new word and restart.

Made with vanilla HTML/CSS and Javascript.

- DOM manipulation achieved with document.getElementById() and #element.innerHTML().
- Word guess by typing achieved by document.onkeyup and checking the range of keycodes for validation