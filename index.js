const slider = document.getElementById('slider');
const sliderValue = document.getElementById('sliderValue');
const passwordDisplay = document.getElementById('passwordDisplay')
const dictionary = ['this', 'cold', 'night', 'password', 'five', 'more', 'words', 'generator']

slider.addEventListener('input', function() {
    sliderValue.textContent = "Words: " + slider.value;
});

function alertMe(){
    var ourWords = []
    for(let i = 0; i < slider.value; i++){
        var dictLength = dictionary.length;
        var randomNum = Math.floor(Math.random() * (dictLength));
        var word = dictionary[randomNum]
        ourWords.push(word)
    }
    var test = ourWords.join('-')
    passwordDisplay.textContent = test
}