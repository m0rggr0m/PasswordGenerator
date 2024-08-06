const passwordDisplay = document.getElementById('passwordDisplay')
const wordNumber = document.getElementById('wordNumber')
const hyphenCheckbox = document.getElementById('hyphenCheckbox')

wordNumber.addEventListener('input', function() {
    wordNumber.textContent = "Words: " + wordNumber.value;
});

async function genPass() {
    const ourWords = []
    for (let i = 0; i < wordNumber.value; i++) {
        var word = await getWord();
        ourWords.push(word);
    }

    var myPass = ""

    if(hyphenCheckbox.checked){
      myPass = ourWords.join('-')
    }
    else{
      myPass = ourWords.join('')
    }
    passwordDisplay.textContent = myPass;
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

 document.onclick = function(e){
  if(e.target != passwordDisplay)
    passwordDisplay.contentEditable = false
 }

function editDisplay() {
  passwordDisplay.contentEditable = true
}