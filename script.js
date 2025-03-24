//Word list array
const wordList = [
    'Jaws',
    'It',
    'Nope',
,   'Lost',
    'Shrek ',
    'Dexter',
    'Frozen',
    'Rocky',
    'Dune',
    'Moana',
    'Titanic',
    'Inception',
    'Sharknado',
    'Mamma Mia',
    'Jumanji',
    'Snow White',
    'The Office',
    'Fight Club',
    'Friends',
    'Green Book',
    'The Amazing World of Gumball',
    'Adventure Time',
    'Harold and Kumar go to White Castle',
    'Supernatural',
    'The Walking Dead',
    'Invincible',
    'Crouching Tiger Hidden Dragon',
    'Samurai Jack',
    'Interstellar',
    'Monty Python and the Holy Grail'
]
//decare variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6

// Start Game Function (runs everything)
function startGame (level) {
  //reset game
  wrongGuesses = 0
  guessedLetters = []

  selectedWord = getRandomWord(level)
  displayedWord = '_'.repeat(selectedWord.length)

  updateDifficultyDisplay(level)
  updateUI()
  
  //Show Game Area/Difficulty Display , hide selection buttons
  document.getElementById('gameArea').classList.remove('d-none')
  document.getElementById('gameArea').classList.add('d-block')

  document.getElementById('difficultyBox').classList.remove('d-none')
  document.getElementById('difficultyBox').classList.add('d-block')

  document.getElementById('difficultySelection').classList.add('d-none')
  //Auto-focus on input
  document.getElementById('letterInput').focus()
}

function getRandomWord (level) {
  let filteredWords = wordList.filter(word => {
    if (level === 'easy') return word.length <= 6
    if (level === 'medium') return word.length >= 7 && word.length <= 9
    if (level === 'hard') return word.length >= 10
  })
  return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

//update Difficulty Display
function updateDifficultyDisplay (level) {
  let difficultyBox = document.getElementById('difficultyBox')
  difficultyBox.classList.remove('easy', 'medium', 'hard')

  if (level === 'easy') {
    difficultyBox.textContent = 'Difficulty: Easy 🍀'
    difficultyBox.classList.add('easy')
  } else if (level === 'medium') {
    difficultyBox.textContent = 'Difficulty: Medium 🌟'
    difficultyBox.classList.add('medium')
  } else if (level === 'hard') {
    difficultyBox.textContent = 'Difficulty: Hard 💀'
    difficultyBox.classList.add('hard')
  }
}

function updateUI() {
  document.getElementById('wordDisplay').textContent = displayedWord.split('').join('  ') // Show word progress with spaces
}

function guessLetter () {
  let inputField = document.getElementById('letterInput') // Get input field
  let guessedLetter = inputField.value.toLowerCase() // Convert input to lowercase

  //Check if input is a valid letter (A-Z)
  if (!guessedLetter.match(/^[a-z]$/)){
    alert('Please enter a valid letter (A-Z)!') // Alert user if invalid input
    inputField.value = '' // Clear input field
    return // Exit function
  }
  

  //Check if letter was already guessed
  if(guessedLetters.includes(guessLetter)){
    alert(`You already guessed '${guessedLetter}'. Try a different letter!`)
    inputField.value = '' // Clear input field
    return
  }

  //Store guessed letter
  guessedLetters.push(guessedLetter)

  //Check if guessed letter is in the selected word
  if (selectedWord.includes(guessedLetter)){
    updateCorrectGuess(guessedLetter)
  } else {
    updateWrongGuess(guessedLetter)
  }

  inputField.value = '' // Clear input field
  document.getElementById('letterInput').focus() // Refocus input field for next guess

}
//shows what letters have been guessed
function guessedLetter() {

}

//Shows amount of wrong guesses
function updateWrongGuess(guessedLetter){
    wrongGuesses++
    document.getElementById('wrongLetters').textContent += `${guessedLetter}`
    //document.getElementById('shamrock').src = `imgs/shamrock${6-wrongGuesses}.jpg`

    if(wrongGuesses === maxMistakes){
        //endGame(false)
    }
}

function updateCorrectGuess(guessedLetter){
    let newDisplayedWord = ''

    for (let i=0; i < selectedWord.length; i++){
        if (selectedWord[i] === guessLetter){
           newDisplayedWord += guessLetter
        } else { 
        newDisplayedWord += displayedWord[i]
        }
    }
}

displayedWord = newDisplayedWord
updateUI()