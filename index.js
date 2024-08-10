const passwordDisplay = document.getElementById('passwordDisplay')
const wordNumber = document.getElementById('wordNumber')
const separatorCheckbox = document.getElementById('separatorCheckbox')


async function genPass() {

  // customers separator choice
  var theSeparator = document.getElementById('userCustomSeparator').value || "-"

  
    const ourWords = []
    for (let i = 0; i < wordNumber.value; i++) {
        var word = await getWord();
        ourWords.push(word);
    }

    var myPass = ""

    if(separatorCheckbox.checked){
      myPass = ourWords.join(theSeparator)
    }
    else{
      myPass = ourWords.join('')
    }
    passwordDisplay.textContent = myPass;
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


function saveToBrowser(){
  localStorage.setItem('customSeparator', document.getElementById('userCustomSeparator').value)
}

 

// This runs when the page loads and sets the custom separator to the value stored in local storage
document.addEventListener('DOMContentLoaded', function() {
  var storageColor = localStorage.getItem('backgroundColor')
  document.getElementById('userCustomSeparator').value = localStorage.getItem('customSeparator')
  document.getElementById('colorPicker').value = storageColor
  document.body.style.backgroundColor = storageColor

});

function changeColor(){
    
      // Get the selected color value
      const selectedColor = document.getElementById('colorPicker').value;

      document.body.style.backgroundColor = selectedColor
      // document.getElementById('colorForm').value = localStorage.getItem('backgroundColor')

      localStorage.setItem('backgroundColor', document.getElementById('colorPicker').value)
}