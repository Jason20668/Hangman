//Word list array
const wordList = [
    'jaws',
    'it',
    'nope',
,   'ted',
    'shrek ',
    'dexter',
    'frozen',
    'rocky',
    'dune',
    'moana',
    'titanic',
    'inception',
    'sharknado',
    'mammamia',
    'jumanji',
    'snowwhite',
    'theoffice',
    'fightclub',
    'friends',
    'greenbook',
    'velocipastor',
    'adventuretime',
    'haroldandkumargotowhitecastle',
    'supernatural',
    'thewalkingdead',
    'invincible',
    'crouchingtigerhiddendragon',
    'samuraijack',
    'interstellar',
    'montypythonandtheholygrail'
]
//decare variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6
let letterInput = document.getElementById('letterInput')

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
  document.getElementById('guessStuff').classList.remove('d-none')
  document.getElementById('guessStuff').classList.add('d-block')
  document.getElementById('difficultySelection').classList.add('d-none')
  //Auto-focus on input
  document.getElementById('letterInput').focus()
}

function customStart () {
  selectedWord = prompt('What is your word?');

  // Reset game 
  wrongGuesses = 0;
  guessedLetters = [];
  displayedWord = '_'.repeat(selectedWord.length); 

  level = 'custom'

  updateDifficultyDisplay(level)
  updateUI();

  // Show the game area
  document.getElementById('gameArea').classList.remove('d-none');
  document.getElementById('gameArea').classList.add('d-block');

  // Show the difficulty box (custom difficulty message)
  document.getElementById('difficultyBox').classList.remove('d-none');
  document.getElementById('difficultyBox').classList.add('d-block');
  document.getElementById('difficultyBox').textContent = 'Difficulty: Custom';

  // Hide the difficulty selection
  document.getElementById('difficultySelection').classList.add('d-none');

  // Show the guess input section
  document.getElementById('guessStuff').classList.remove('d-none');
  document.getElementById('guessStuff').classList.add('d-block');

  // Auto-focus the letter input for user to start guessing
  document.getElementById('letterInput').focus();
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
  difficultyBox.classList.remove('easy', 'medium', 'hard', 'custom')

  if (level === 'easy') {
    difficultyBox.textContent = 'Difficulty: Easy'
    difficultyBox.classList.add('easy')
  } else if (level === 'medium') {
    difficultyBox.textContent = 'Difficulty: Medium'
    difficultyBox.classList.add('medium')
  } else if (level === 'hard') {
    difficultyBox.textContent = 'Difficulty: Hard'
    difficultyBox.classList.add('hard')
  } else if (level === 'custom') {
    difficultyBox.textContent = 'Difficulty: Custom'
    difficultyBox.classList.add('custom')
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
  if(guessedLetters.includes(guessedLetter)){
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

function updateWrongGuess(guessedLetter){ 
  wrongGuesses++
  document.getElementById('wrongLetters').textContent += `${guessedLetter}`

  if (wrongGuesses === maxMistakes){
    endGame(false)
  }

  roboImage = document.getElementById('shamrock')

if (wrongGuesses === 1){
  roboImage.src = 'IMGS/Shamrock1.png'
  document.getElementById('shamrock').classList.remove('d-none')
} else if (wrongGuesses === 2){
  roboImage.src = 'IMGS/Shamrock2.png'
} else if (wrongGuesses === 3){
  roboImage.src = 'IMGS/Shamrock3.png'
} else if (wrongGuesses === 4){
  roboImage.src = 'IMGS/Shamrock4.png'
} else if (wrongGuesses === 5){
  roboImage.src = 'IMGS/Shamrock5.png'
} else if (wrongGuesses === 6){
  roboImage.src = 'IMGS/Shamrock6.png'
}
}



function updateCorrectGuess(guessedLetter){
  let newDisplayedWord =''

  for (let i=0; i < selectedWord.length; i++){
    if (selectedWord[i] === guessedLetter){
      newDisplayedWord += guessedLetter 
    }else{
    newDisplayedWord += displayedWord[i] 
    }
  }

letterInput  

  displayedWord = newDisplayedWord
  updateUI()

  //  Check if the player has guessed all letters
  if (!displayedWord.includes('_')) {
    endGame(true)
  }

}

letterInput.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("guessBtn").click();
  }
});


function endGame(won){
  let message = document.getElementById('endText')
  if (won){
    document.getElementById('everythingGone').classList.add('d-none')
    document.getElementById('endText').classList.remove('d-none')
    document.getElementById('endText').classList.add('d-block')
    message.textContent = `Congratulations! You found the word and stopped the evil robot from being built!`
    document.getElementById('restartBtn').classList.remove('d-none')
    document.getElementById('winAudio').play()
  } else {
    document.getElementById('everythingGone').classList.add('d-none')
    document.getElementById('endText').classList.remove('d-none')
    document.getElementById('endText').classList.add('d-block')
    message.textContent = `You failed! the word was ${selectedWord} and now the evil robot will destroy the world!`
    document.getElementById('restartBtn').classList.remove('d-none')
    document.getElementById('loseAudio').play()
  }
}

function restartGame() {
  // Reset game 
  wrongGuesses = 0;
  guessedLetters = [];
  selectedWord = '';
  displayedWord = '';


  document.getElementById('restartBtn').classList.add('d-none');
  document.getElementById('endText').classList.add('d-none');

  document.getElementById('difficultySelection').classList.remove('d-none');
  document.getElementById('difficultyBox').classList.add('d-none');
  document.getElementById('shamrock').src = 'IMGS/Shamrock1.png';
  document.getElementById('shamrock').classList.add('d-none');
  document.getElementById('gameArea').classList.add('d-none');

  document.getElementById('wrongLetters').textContent = 'Wrong Guesses: ';
  document.getElementById('everythingGone').classList.remove('d-none');
  document.getElementById('everythingGone').classList.add('d-block');
  document.getElementById('guessStuff').classList.add('d-none')
}