var fs = require('fs');

function getList() {
  // Pull the letter list and return it as an array
  var file = 'words.txt';
  var words = fs.readFileSync(file);

  return words.toString().split('\n');
}
//fucntion to return the random word
function getWord() {
  var wordsArr = getList();
  return wordsArr[rand(wordsArr.length)].trim(); 
}
//function for random index of the array between 0 and the array length - 1
function rand(len) {
  return Math.floor(Math.random()*len);
}

module.exports = {
  getWord: getWord
};