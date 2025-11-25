const scoreDisplay = document.querySelector("#S");
const char = document.querySelector("#C");
const obs = document.querySelector("#O");
const resetButton = document.querySelector("#R");
const highScoreDisplay = document.querySelector("#H");
const resetHighScore = document.querySelector("#R2");

let startCon = false;
var scoreCounter;
let score = 0;

displayHighScores();

function startGame() {
  if (startCon === false) {
    startCon = true;
    obs.classList.add("slide");
    score = 0;
    scoreCounter = setInterval(function () {
      score++;
      scoreDisplay.textContent = score;
    }, 100);
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
  void obs.offsetWidth;
  clearInterval(scoreCounter);
  startCon = false;
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
