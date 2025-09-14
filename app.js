document.addEventListener("DOMContentLoaded", () => {
  // Game elements
  const redBtn = document.getElementById("red");
  const blueBtn = document.getElementById("blue");
  const greenBtn = document.getElementById("green");
  const yellowBtn = document.getElementById("yellow");
  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");
  const levelDisplay = document.getElementById("level");
  const statusDisplay = document.getElementById("status");
  const messageDisplay = document.getElementById("message");
  const gameOverScreen = document.getElementById("game-over");
  const finalLevelDisplay = document.getElementById("final-level");

  // Game variables
  let gameSequence = [];
  let playerSequence = [];
  let level = 0;
  let isGameActive = false;
  let isPlayerTurn = false;
  let isShowingSequence = false;

  // Button colors for reference
  const buttonColors = ["red", "blue", "green", "yellow"];
  const buttons = [redBtn, blueBtn, greenBtn, yellowBtn];

  // Reset game state
  function resetGame() {
    gameSequence = [];
    playerSequence = [];
    level = 0;
    isGameActive = false;
    isPlayerTurn = false;
    isShowingSequence = false;

    levelDisplay.textContent = "0";
    statusDisplay.textContent = "Ready to start";
    messageDisplay.textContent = "Press Start Game or any key to begin!";

    // Hide game over screen
    gameOverScreen.style.display = "none";

    // Show start button
    startBtn.style.display = "inline-block";

    // Disable all game buttons
    buttons.forEach((btn) => {
      btn.classList.add("disabled");
      btn.classList.remove("active");
    });
  }

  // Initialize game
  function initGame() {
    gameSequence = [];
    playerSequence = [];
    level = 1;
    levelDisplay.textContent = level;
    statusDisplay.textContent = "Watch the sequence";
    messageDisplay.textContent = "Get ready...";
    isGameActive = true;
    isPlayerTurn = false;
    isShowingSequence = false;

    // Hide start button and game over screen
    startBtn.style.display = "none";
    gameOverScreen.style.display = "none";

    // Enable game buttons
    buttons.forEach((btn) => {
      btn.classList.remove("disabled");
    });

    // Start the first level after a short delay
    setTimeout(() => {
      nextLevel();
    }, 1000);
  }

  // Generate next level
  function nextLevel() {
    isPlayerTurn = false;
    isShowingSequence = true;
    playerSequence = [];
    statusDisplay.textContent = "Watch the sequence";
    messageDisplay.textContent = `Level ${level}`;

    // Add a new random color to the sequence
    const randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);

    // Play the sequence after a short delay
    setTimeout(() => {
      playSequence();
    }, 800);
  }

  // Play the current sequence
  function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= gameSequence.length) {
        clearInterval(interval);
        isShowingSequence = false;
        isPlayerTurn = true;
        statusDisplay.textContent = "Your turn";
        messageDisplay.textContent = "Repeat the sequence";
        return;
      }

      flashButton(gameSequence[i]);
      i++;
    }, 800);
  }

  // Flash a button
  function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add("active");

    setTimeout(() => {
      button.classList.remove("active");
    }, 400);
  }

  // Handle player input
  function handlePlayerInput(color) {
    if (!isGameActive || !isPlayerTurn || isShowingSequence) return;

    // Add to player sequence and flash the button
    playerSequence.push(color);
    flashButton(color);

    // Check if the input matches the game sequence
    const currentIndex = playerSequence.length - 1;
    if (playerSequence[currentIndex] !== gameSequence[currentIndex]) {
      gameOver();
      return;
    }

    // If the sequence is complete, move to next level
    if (playerSequence.length === gameSequence.length) {
      isPlayerTurn = false;
      level++;
      levelDisplay.textContent = level;
      statusDisplay.textContent = "Correct!";
      messageDisplay.textContent = "Well done!";

      setTimeout(() => {
        nextLevel();
      }, 1500);
    }
  }

  // Game over
  function gameOver() {
    isGameActive = false;
    isPlayerTurn = false;
    isShowingSequence = false;

    statusDisplay.textContent = "Game Over";
    messageDisplay.textContent = "Better luck next time!";

    // Disable buttons
    buttons.forEach((btn) => {
      btn.classList.add("disabled");
    });

    // Show final score (level - 1 because we increment before showing next level)
    finalLevelDisplay.textContent = level - 1;

    // Show game over screen after a short delay
    setTimeout(() => {
      gameOverScreen.style.display = "flex";
    }, 1000);
  }

  // Event listeners for game buttons
  redBtn.addEventListener("click", () => handlePlayerInput("red"));
  blueBtn.addEventListener("click", () => handlePlayerInput("blue"));
  greenBtn.addEventListener("click", () => handlePlayerInput("green"));
  yellowBtn.addEventListener("click", () => handlePlayerInput("yellow"));

  // Start game with button
  startBtn.addEventListener("click", () => {
    initGame();
  });

  // Restart game with button
  restartBtn.addEventListener("click", () => {
    initGame();
  });

  // Start/restart game with keyboard
  document.addEventListener("keydown", (e) => {
    // Prevent default behavior for some keys
    if (e.code === "Space") {
      e.preventDefault();
    }

    // Start or restart the game if it's not currently active
    if (!isGameActive) {
      initGame();
    }
  });

  // Initialize the page
  resetGame();
});
