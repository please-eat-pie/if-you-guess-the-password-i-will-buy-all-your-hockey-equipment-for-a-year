// List of possible characters to use in the password
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?/\\`~-= ";
let password = "";
let attempts = 0;
let maxAttempts = 10;
let guessHistory = [];

// Difficulty levels
const difficultyLevels = {
  1: { length: 6, maxAttempts: 15 },
  2: { length: 8, maxAttempts: 10 },
  3: { length: 10, maxAttempts: 7 },
};

// Function to generate a random password
function generatePassword(length) {
  let generatedPassword = '';
  for (let i = 0; i < length; i++) {
    generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return generatedPassword;
}

// Function to update the game based on the selected difficulty
function updateGame() {
  const difficulty = document.getElementById("difficulty").value;
  const selectedDifficulty = difficultyLevels[difficulty];
  
  password = generatePassword(selectedDifficulty.length);
  maxAttempts = selectedDifficulty.maxAttempts;
  attempts = 0;
  guessHistory = [];
  
  // Clear previous guesses and messages
  document.getElementById("message").textContent = "";
  document.getElementById("guess").value = "";
  document.getElementById("game-board").innerHTML = '';
  
  // Display empty game board
  for (let i = 0; i < maxAttempts; i++) {
    let row = document.createElement('div');
    row.classList.add('game-row');
    for (let j = 0; j < selectedDifficulty.length; j++) {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      row.appendChild(cell);
    }
    document.getElementById("game-board").appendChild(row);
  }

  console.log("Password for debugging (don't show this in production):", password);
}

// Function to check the user's guess
function checkGuess() {
  const userGuess = document.getElementById("guess").value;
  if (userGuess.length !== password.length) {
    document.getElementById("message").textContent = `Please enter exactly ${password.length} characters.`;
    return;
  }

  // Update guess history
  guessHistory.push(userGuess);
  attempts++;

  // Determine feedback for the guess
  let feedback = [];
  for (let i = 0; i < userGuess.length; i++) {
    if (userGuess[i] === password[i]) {
      feedback.push('correct');
    } else if (password.includes(userGuess[i])) {
      feedback.push('wrong-position');
    } else {
      feedback.push('incorrect');
    }
  }

  // Update game board with feedback
  updateGameBoard(guessHistory.length - 1, feedback);

  if (userGuess === password) {
    document.getElementById("message").textContent = `Congratulations! You guessed the password correctly!`;
    return;
  }

  if (attempts >= maxAttempts) {
    document.getElementById("message").textContent = `Sorry, you've run out of attempts! The correct password was: ${password}`;
  }
}

// Function to update the game board with feedback
function updateGameBoard(rowIndex, feedback) {
  const gameBoard = document.getElementById("game-board");
  const row = gameBoard.children[rowIndex];
  
  for (let i = 0; i < feedback.length; i++) {
    const cell = row.children[i];
    cell.classList.add(feedback[i]);
    cell.textContent = guessHistory[rowIndex][i];
  }
}

// Initialize the game when the page loads
window.onload = function() {
  updateGame();
  document.getElementById("difficulty").addEventListener("change", updateGame);
};
