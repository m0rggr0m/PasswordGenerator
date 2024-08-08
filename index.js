const passwordDisplay = document.getElementById('passwordDisplay')
const wordNumber = document.getElementById('wordNumber')
const hyphenCheckbox = document.getElementById('hyphenCheckbox')

wordNumber.addEventListener('input', function() {
    wordNumber.textContent = "Words: " + wordNumber.value;
});

async function genPass() {

  // customers seperator choice
  var theSeperator = document.getElementById('userCustomSeperator').value || "-"

  
    const ourWords = []
    for (let i = 0; i < wordNumber.value; i++) {
        var word = await getWord();
        ourWords.push(word);
    }

    var myPass = ""

    if(hyphenCheckbox.checked){
      myPass = ourWords.join(theSeperator)
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
      return "hello world";
    } catch (error) {
      console.error('Error fetching JSON:', error);
      return undefined;
    }
}


function saveToBrowser(){
  localStorage.setItem('customSeperator', document.getElementById('userCustomSeperator').value)
}

 document.onclick = function(e){
  if(e.target != passwordDisplay)
    passwordDisplay.contentEditable = false
 }

function editDisplay() {
  passwordDisplay.contentEditable = true
}


// This runs when the page loads and sets the custom seperator to the value stored in local storage
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('userCustomSeperator').value = localStorage.getItem('customSeperator')
});