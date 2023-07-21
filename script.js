const words = ["HANG", "GAME", "WORD", "GOKU"];
let currentWord;
let guessedLetters;
let wrongGuesses;
let hangmanStage;

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
    startGame();
}

  function startGame() {
    currentWord = words[0];
    guessedLetters = Array(currentWord.length).fill('_');
    wrongGuesses = 0;
    hangmanStage = 0;
  
    updateWordDisplay();
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
    const hangmanAsciiText = document.getElementById('hangmanAsciiText');
    switch (hangmanStage) {
      case 1:
        hangmanAsciiText.textContent = `
           ______
           |    |
           |    O
           |
           |
          _|_
        `;
        break;
      case 2:
        hangmanAsciiText.textContent = `
           ______
           |    |
           |    O
           |    |
           |
          _|_
        `;
        break;
      case 3:
        hangmanAsciiText.textContent = `
           ______
           |    |
           |    O
           |   /|
           |
          _|_
        `;
        break;
      case 4:
        hangmanAsciiText.textContent = `
           ______
           |    |
           |    O
           |   /|\\
           |
          _|_
        `;
        break;
      case 5:
        hangmanAsciiText.textContent = `
           ______
           |    |
           |    O
           |   /|\\
           |   /
          _|_
        `;
        break;
      case 6:
        hangmanAsciiText.textContent = `
           ______
           |    |
           |    O
           |   /|\\
           |   / \\
          _|_
        `;
        break;
    }
}  

window.onload = startGame;