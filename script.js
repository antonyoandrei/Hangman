const words = ["HANG", "GAME", "WORD", "GOKU"];
let currentWord;
let guessedLetters;
let wrongGuesses;
let hangmanStage;
let initialHangmanAscii;

function startGame() {
  currentWord = words[0];
  guessedLetters = Array(currentWord.length).fill('_');
  wrongGuesses = 0;
  hangmanStage = 0;
  updateWordDisplay();
  updateHangmanAscii();
}

function guessLetter(letter) {
  if (guessedLetters.includes(letter) || !currentWord.includes(letter)) {
    wrongGuesses++;
    hangmanStage++;
    updateHangmanAscii();
    if (wrongGuesses >= 6) {
      showLoseModal();
    }
  } else {
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === letter) {
        guessedLetters[i] = letter;
      }
    }
    updateWordDisplay();
    if (!guessedLetters.includes('_')) {
      showWinModal();
    }
  }
}

function updateWordDisplay() {
  const wordDisplay = document.getElementById('wordDisplay');
  wordDisplay.textContent = guessedLetters.join(' ');
}

function updateHangmanAscii() {
  const hangmanImg = document.getElementById('hangmanImg');
  switch (hangmanStage) {
    case 1:
      hangmanImg.src = 'hangman png/1.png';
      break;
    case 2:
      hangmanImg.src = 'hangman png/2.png';
      break;
    case 3:
      hangmanImg.src = 'hangman png/3.png';
      break;
    case 4:
      hangmanImg.src = 'hangman png/4.png';
      break;
    case 5:
      hangmanImg.src = 'hangman png/5.png';
      break;
    case 6:
      hangmanImg.src = 'hangman png/6.png';
      break;
    default:
      hangmanImg.src = 'hangman png/0.png';
  }
}

function showLoseModal() {
  const loseModal = document.getElementById('loseModal');
  loseModal.style.display = 'block';
}

function showWinModal() {
  const winModal = document.getElementById('winModal');
  winModal.style.display = 'block';
}

function resetGame() {
  const loseModal = document.getElementById('loseModal');
  loseModal.style.display = 'none';
  const hangmanImg = document.getElementById('hangmanImg');
  hangmanImg.src = 'hangman png/0.png';
  startGame();
}

function nextWord() {
  const winModal = document.getElementById('winModal');
  winModal.style.display = 'none';
  const hangmanImg = document.getElementById('hangmanImg');
  const currentWordIndex = words.indexOf(currentWord);
  if (currentWordIndex + 1 < words.length) {
    currentWord = words[currentWordIndex + 1];
    guessedLetters = Array(currentWord.length).fill('_');
    wrongGuesses = 0;
    hangmanStage = 0;
    updateWordDisplay();
    updateHangmanAscii();
    hangmanImg.src = 'hangman png/0.png'; 
  } else {
    hangmanImg.src = 'hangman png/0.png'; 
  }
}

window.onload = startGame;
