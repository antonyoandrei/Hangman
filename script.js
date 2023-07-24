const words = ["JAVA", "PIZZA", "MATRIX", "CHORIZO", "CABEZOTA"];
let currentWord;
let guessedLetters;
let wrongGuesses;
let hangmanStage;
let initialHangmanAscii;

function showStartModal() {
  const startModal = document.getElementById('startModal');
  startModal.style.display = 'block';
}

function startGame() {
  const playerNameInput = document.getElementById('playerName');
  const playerName = playerNameInput.value.trim();
  startModal.style.display = 'none';
  
  // Muestro el resto del contenido del juego
  const gameContent = document.getElementById('gameContent');
  gameContent.classList.remove('hidden');

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
  const letterButton = event.target;
  letterButton.disabled = true;
}

function updateWordDisplay() {
  const wordDisplay = document.getElementById('wordDisplay');
  wordDisplay.textContent = guessedLetters.join(' ');
}

function updateHangmanAscii() {
  const hangmanImg = document.getElementById('hangmanImg');
  switch (hangmanStage) {
    case 1:
      hangmanImg.src = 'assets/hangman png/1.png';
      break;
    case 2:
      hangmanImg.src = 'assets/hangman png/2.png';
      break;
    case 3:
      hangmanImg.src = 'assets/hangman png/3.png';
      break;
    case 4:
      hangmanImg.src = 'assets/hangman png/4.png';
      break;
    case 5:
      hangmanImg.src = 'assets/hangman png/5.png';
      break;
    case 6:
      hangmanImg.src = 'assets/hangman png/6.png';
      break;
    default:
      hangmanImg.src = 'assets/hangman png/0.png';
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
  hangmanImg.src = 'assets/hangman png/0.png';

    // Habilitar los botones de clase "btns"
    const letterButtons = document.querySelectorAll('.btns');
    letterButtons.forEach(button => {
      button.disabled = false;
    });

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
    hangmanImg.src = 'assets/hangman png/0.png'; 

        // Habilitar los botones de clase "btns"
        const letterButtons = document.querySelectorAll('.btns');
        letterButtons.forEach(button => {
          button.disabled = false;
        });
        
  } else {
    hangmanImg.src = 'assets/hangman png/0.png'; 
  }
}

window.onload = function() {
  const playerNameInput = document.getElementById('playerName');
  const startButton = document.getElementById('startButton');

  playerNameInput.addEventListener('input', function () {
    if (playerNameInput.value.length >= 3) {
      startButton.disabled = false;
      startButton.style.cursor = 'pointer';
    } else {
      startButton.disabled = true;
      startButton.style.cursor = 'not-allowed';
    }
  });
}