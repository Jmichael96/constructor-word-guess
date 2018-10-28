
//constructor fuction
function Letters(word) {
    this.word = word;
    this.answerLettersArray = this.word.split("");
    this.lettersGuessed = [];
    this.output = [];
    this.isMatch = false;

//calling the game in the main.js , it outputs these  _'S for the random word chosen

    this.begin = function(){
        for (i in this.word){
            this.output.push("_");
        }
    };

    //displaying the output 
    this.display = function(){
        return this.output;
    };

    //pushes letters guessed from array to letters picked from word.js
    this.update = function(letterPicked){
        this.lettersGuessed.push(letterPicked);
        this.isMatch = false;
            for (l = 0; l < this.answerLettersArray.length; l++){
                if(letterPicked == this.answerLettersArray[l]){
                    this.output[l] = this.answerLettersArray[l];
                    this.isMatch = true;
                }
            }
    };

   //matches letters array and output 

    this.win = function(){
        var alaString = this.answerLettersArray.toString();
        var opString = this.output.toString();
        if (alaString == opString){
            return true;
        }
    }

 }

 
//FILE LOAD 
 module.exports = Letters;