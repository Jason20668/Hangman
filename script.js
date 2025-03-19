//Word list array
const wordList = [
    'Jaws',
    'It',
    'Saw',
    'Friends',
    'Arrow',
    'Shrek ',
    'Dexter',
    'Frozen',
    'Glee',
    'Rocky',
    'Dune',
    'Coco',
    'Moana',
    'Dr Who',
    'Trolls',
]

//declare variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
const guessedLetters = []
const maxMistakes = 6

//Start Game Function
function startGame(level){
    //reset the game
    wrongGuesses = 0
    guessedLetters = []

    selectedWord = getRandomWord(level) 

    updateDifficultyDisplay(level)

    //Show Game Area/Difficulty Display, Hide selection buttons
    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-block')

    document.getElementById('difficultyBox').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.add('d-block')

    document.getElementById('difficultySelection').classList.add('d-none')
}

function getRandomWord(level) {
    let filteredWords = wordList.filter (word => {
        if (level === 'Easy') return word.length <= 6
        if (level === 'Medium') return word.length >= 7 && word.length <= 9
        if (level === 'Hard') return word.length >= 10
    })

    return filteredWords[Math.floor(Math.random()*filteredWords.length)]
}


//Update Difficulty Display
function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox')
    difficultyBox.classList.remove('Easy', 'Medium', 'Hard')

    if(level === 'Easy') {
        difficultyBox.innerText = 'Difficulty: Easy'
        difficultyBox.classList.add('Easy')
    } else if(level === 'Medium'){
        difficultyBox.innerText = 'Difficulty: Medium'
        difficultyBox.classList.add('Medium')
    }else if(lvel === 'Hard'){
        difficultyBox.innerText = 'Difficulty: Hard'
        difficultyBox.classList.add('Hard')
    }
}