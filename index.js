const passwordDisplay = document.getElementById('passwordDisplay')
const wordNumber = document.getElementById('wordNumber')
const dictionary = ['this', 'cold', 'night', 'password', 'five', 'more', 'words', 'generator']

wordNumber.addEventListener('input', function() {
    wordNumber.textContent = "Words: " + wordNumber.value;
});

async function genPass() {
    var ourWords = [];
    for (let i = 0; i < wordNumber.value; i++) {
        var dictLength = dictionary.length;
        var randomNum = Math.floor(Math.random() * dictLength);
        var word = await getWord();
        ourWords.push(word);
    }
    
    var test = ourWords.join('-');
    passwordDisplay.textContent = test;
}

function checkNum(){
    if(wordNumber.value >= 15){
        wordNumber.value = 15
    }
}

async function getWord() {
    const jsonFilePath = 'words.json';
    try {
      const response = await fetch(jsonFilePath);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      const number = Math.floor(Math.random() * 981);
      return data.commonWords[number];
    } catch (error) {
      console.error('Error fetching JSON:', error);
      return undefined;
    }
  }