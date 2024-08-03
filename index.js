const passwordDisplay = document.getElementById('passwordDisplay')
const wordNumber = document.getElementById('wordNumber')
const dictionary = ['this', 'cold', 'night', 'password', 'five', 'more', 'words', 'generator']

wordNumber.addEventListener('input', function() {
    wordNumber.textContent = "Words: " + wordNumber.value;
});

function genPass(){
    var ourWords = []
    for(let i = 0; i < wordNumber.value; i++){
        var dictLength = dictionary.length;
        var randomNum = Math.floor(Math.random() * (dictLength));
        var word = dictionary[randomNum]
        ourWords.push(word)
    }
    var test = ourWords.join('-')
    passwordDisplay.textContent = test
}

function checkNum(){
    if(wordNumber.value >= 15){
        wordNumber.value = 15
    }
}