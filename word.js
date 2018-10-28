module.exports = {
    storeWord: function(word) {
      this.chosenWord = word;
      this.guessed = [];
      this.progressWord = [];
      this.showWord = this.getBlanks(); // Get blank underlines for word length
    },
    //function to take away from guesses remaining and displays it
    checkGuessed: function(guess) {
  
      if(this.guessed.indexOf(guess) !== -1) {
        return false;
      } else {
        this.guessed.push(guess);
        return true;
      }
  
    },
    checkWord: function(guess) {
  
      var check = false;
  
      for(var i=0; i < this.chosenWord.length; i++) {
  
        // If the guess and letter match
        if(guess === this.chosenWord[i]) {
          // Add letter to an separate array which we can compare with later.
          this.progressWord.push(guess);
          this.showWord[i] = guess; // Replace an underline with a letter
          check = true;
        }
      }
  
      return check;
  
    },
    //pushing the blanks for the empty array
    getBlanks: function() {
      arr = [];
  
      for(var i=0; i < this.chosenWord.length; i++) {
        arr.push('_');
      }
  
      return arr;
    },
  };