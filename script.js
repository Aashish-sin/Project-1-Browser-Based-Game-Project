const scoreDisplay = document.querySelector("#S");
const char = document.querySelector("#C");
const obs = document.querySelector("#O");
const resetButton = document.querySelector("#R");
const highScoreDisplay = document.querySelector("#H");
const resetHighScore = document.querySelector("#R2");

let startCon = false;
var scoreCounter;
let score = 0;

let currentAnimationDuration = 2;
const MIN_SPEED_DURATION = 0.5;
const SPEED_DECREMENT = 0.001;
const SPEED_THRESHOLD = 50;

displayHighScores();

function randomizeObstacleStyle() {
  const randomSize = Math.floor(Math.random() * 11) + 10;
  obs.style.width = `${randomSize}px`;
  obs.style.height = `20px`;
  obs.style.animationDuration = `${currentAnimationDuration}s`;
  console.log(
    `Obstacle Randomized: Size=${randomSize}px, Radius=${obs.style.borderRadius}`
  );
}

function startGame() {
  if (startCon === false) {
    startCon = true;
    currentAnimationDuration = 2;
    randomizeObstacleStyle();
    obs.classList.add("slide");
    obs.style.animationDuration = `${currentAnimationDuration}s`;
    score = 0;
    scoreDisplay.textContent = score;
    scoreCounter = setInterval(function () {
      updateScoreAndSpeed();
    }, 1);
    obs.addEventListener("animationiteration", randomizeObstacleStyle);
  }
}

function updateScoreAndSpeed() {
  const oldScore = score;
  score++;
  scoreDisplay.textContent = score;
  if (
    Math.floor(score / SPEED_THRESHOLD) > Math.floor(oldScore / SPEED_THRESHOLD)
  ) {
    if (currentAnimationDuration > MIN_SPEED_DURATION) {
      obs.style.animationPlayState = "paused";
      void obs.offsetWidth;
      currentAnimationDuration -= SPEED_DECREMENT;
      obs.style.animationDuration = `${currentAnimationDuration}s`;
      obs.style.animationPlayState = "running";
      console.log(
        `Speed increased! New duration: ${currentAnimationDuration}s`
      );
    }
  }
}

function jump() {
  char.classList.add("jump");
  setTimeout(function () {
    char.classList.remove("jump");
  }, 500);
}

document.addEventListener("click", function () {
  if (!char.classList.contains("jump") && startCon == true) {
    jump();
  }
});

function endGame() {
  obs.classList.remove("slide");
  obs.style.animationDuration = ``;
  void obs.offsetWidth;
  clearInterval(scoreCounter);
  startCon = false;
  obs.removeEventListener("animationiteration", randomizeObstacleStyle);
}

var checkLose = setInterval(function () {
  var charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
  var obsLeft = parseInt(window.getComputedStyle(obs).getPropertyValue("left"));
  if (obsLeft < 70 && obsLeft > 50 && charTop >= 130 && startCon == true) {
    endGame();
    saveHighScore();
    displayHighScores();
  }
}, 10);

resetButton.addEventListener("click", function () {
  endGame();
  scoreDisplay.textContent = 0;
  score = 0;
  scoreCounter = 0;
  startGame();
});

function saveHighScore() {
  const highScore = parseInt(localStorage.getItem("highScore")) || 0;
  if (score > highScore) {
    localStorage.setItem("highScore", score);
  }
}
function displayHighScores() {
  const highScore = localStorage.getItem("highScore") || 0;
  highScoreDisplay.textContent = highScore;
}

resetHighScore.addEventListener("click", function () {
  localStorage.removeItem("highScore");
  displayHighScores();
});
