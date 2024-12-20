// List of possible characters to use in the password
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?/\\`~-= ";
let password = "";
let attempts = 0;
let maxAttempts = 10;

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

  document.getElementById("message").textContent = "";
  document.getElementById("guess").value = "";
  console.log("Password for debugging (don't show this in production):", password);
}

// Function to check the user's guess
function checkGuess() {
  const userGuess = document.getElementById("guess").value;

  if (userGuess === password) {
    document.getElementById("message").textContent = `Congratulations! You guessed the password correctly!`;
    document.getElementById("message").className = "success";
  } else {
    attempts++;
    if (attempts >= maxAttempts) {
      document.getElementById("message").textContent = `Sorry, you've run out of attempts! The correct password was: ${password}`;
      document.getElementById("message").className = "failure";
    } else {
      document.getElementById("message").textContent = `Incorrect! Try again. Attempts left: ${maxAttempts - attempts}`;
    }
  }
}

// Initialize the game
updateGame();
document.getElementById("difficulty").addEventListener("change", updateGame);
