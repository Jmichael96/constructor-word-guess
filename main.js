var inquirer = require('inquirer');

var game = require('./game.js');
var word = require('./word.js');
const colors = require('colors');
console.log(game.getWord());


function WordGame() {
  word.storeWord(game.getWord());
  this.chances = 11;
  this.printWordGame();
  this.startPrompt();
}

// Print the current stats of the WordGame, takes an argument for a custom message 
WordGame.prototype.printWordGame = function(customMsg) {
  console.log('\033c'); // Clears the terminal after every new input is made 
  console.log(colors.rainbow('===================================='));
  console.log(colors.cyan.bold('          Word-Guess-Game        '));
  console.log(colors.rainbow('===================================='));
  console.log(' ');
  console.log(colors.yellow.underline('Chances left: ' + this.chances));
  console.log(colors.bold.red('Letters guessed: ' + word.guessed.join(' ').toUpperCase()));
  console.log(' ');
  console.log(colors.bold.cyan('Your Word: ' + word.showWord.join(' ').toUpperCase()));
  console.log(' ');
  console.log(colors.rainbow('===================================='));
  console.log(' ');
  if(customMsg) {
    console.log(customMsg.bold.cyan);
    console.log(' '.bold.cyan);
  }

};

WordGame.prototype.startPrompt = function() {

  var self = this;

  // Prompt for letter guess
  inquirer.prompt([
    {
      type: 'input',
      name: 'guess',
      message: 'Please enter a letter: ',
      validate: function(input) {
        // Check if input is a longer than a letter or not an alphabetical character
        if(input.length > 1 || !input.match(/[a-z]/i)) {
          return false;
        }
        return true;
      }
    }
  ]).then(function(userData) {

    if(self.processGuess(userData.guess)) {
      // Win message
      self.printWordGame(colors.green.bold('Congratulations, you win! The word was.. ' + word.chosenWord.toUpperCase()));
      startGame(1);
    } else if(self.chances === 0) {
      // Lose message
      self.printWordGame(colors.red.bold('You are out of chances! You lose! The word was.. ' + word.chosenWord.toUpperCase()));
      startGame(1);
    } else {
      // Prompt for next guess
      self.startPrompt();
    }

  });

};

WordGame.prototype.processGuess = function(guess) {

  // Check if letter was already guessed
  if(word.checkGuessed(guess)) {

    // Check if letter guessed is in the word, if so it will return true
    var check = word.checkWord(guess);

    if(check) {

      // If the progressWord array is equal to the chosenWord letter length, then the win condition is met
      if(word.progressWord.length === word.chosenWord.length) {
        return true;
      }

      // else send message that the letter was in the word.
      this.printWordGame(guess.toUpperCase() + ' Is a letter in the word.');
    } else {

      // Remove chance letter was not in the word.
      this.chances--;
      this.printWordGame(guess.toUpperCase() + ' Was not found in the word.');
    }
  } else {
    this.printWordGame('You\'ve already guess the letter ' + guess.toUpperCase() + '!');
  }

  return false;

};

// Begin the Game!
function startGame(again) {

  // If again is a truthy statement, ask if user would like to play again
  var msg = again ? 'Want to play again?'.bold.blue : 'Would you like to play?'.bold.blue;

  inquirer.prompt([{
    type: 'confirm',
    name: 'play',
    message: msg
  }]).then(function(data) {
    if(data.play) {

      // Start WordGame class
      var hgm = new WordGame();
    } else {
      console.log('Maybe another time!'.bold.red);
    }
  });
}

console.log('==============================================='.america);
console.log('                                               ');
console.log('      Word-Guess-Game (Remade in Node)       '.bold.red);
console.log('                                               ');
console.log('==============================================='.america);
console.log('                                               ');
console.log('         The Theme is About The Gym            '.bold.red);
console.log('                                               ');
console.log('==============================================='.america);

startGame();