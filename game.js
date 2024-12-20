document.addEventListener('DOMContentLoaded', () => {
  const difficultyLevels = {
    easy: { length: 4, characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' },
    medium: { length: 6, characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()' },
    hard: { length: 8, characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-' },
    'very-hard': { length: 10, characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-/.,:;<>?' },
    insane: { length: 12, characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-/.,:;<>?{}[]' }
  };

  let password = '';
  let attempts = 0;
  let maxAttempts = 10;
  let currentDifficulty = 'easy';

  document.querySelectorAll('.difficulty-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      currentDifficulty = e.target.dataset.difficulty;
      startGame(currentDifficulty);
    });
  });

  function startGame(difficulty) {
    // Select difficulty settings
    const settings = difficultyLevels[difficulty];
    password = generatePassword(settings.length, settings.characters);
    attempts = 0;

    // Show game play UI and hide the difficulty selection
    document.getElementById('difficulty-selection').classList.add('hidden');
    document.getElementById('game-play').classList.remove('hidden');
    document.getElementById('hint').textContent = `Guess the ${settings.length}-character password!`;
    document.getElementById('attempts').textContent = `Attempts left: ${maxAttempts - attempts}`;
    document.getElementById('message').textContent = '';

    document.getElementById('submit-guess').disabled = false;
    document.getElementById('guess').value = '';
  }

  function generatePassword(length, characters) {
    let password = '';
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  }

  document.getElementById('submit-guess').addEventListener('click', () => {
    const guess = document.getElementById('guess').value.trim().toUpperCase();

    if (guess.length !== password.length) {
      showMessage('Your guess must be ' + password.length + ' characters long!', 'warning');
      return;
    }

    attempts++;
    if (guess === password) {
      showMessage('Congratulations! You guessed the password!', 'success');
      document.getElementById('submit-guess').disabled = true;
    } else if (attempts >= maxAttempts) {
      showMessage(`Sorry! You've used all ${maxAttempts} attempts. The correct password was "${password}"`, 'error');
      document.getElementById('submit-guess').disabled = true;
    } else {
      document.getElementById('attempts').textContent = `Attempts left: ${maxAttempts - attempts}`;
      showMessage('Incorrect guess, try again!', 'error');
    }
  });

  function showMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = type === 'success' ? '#28a745' : type === 'warning' ? '#ffc107' : '#dc3545';
  }
});

