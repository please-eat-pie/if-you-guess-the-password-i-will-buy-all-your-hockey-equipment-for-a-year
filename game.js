document.addEventListener('DOMContentLoaded', () => {  // Wait for the DOM to load before attaching event listeners
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
    document.getE
