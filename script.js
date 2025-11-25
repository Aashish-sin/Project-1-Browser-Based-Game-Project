const scoreDisplay = document.querySelector("#S");
const char = document.querySelector("#C");
const obs = document.querySelector("#O");
const resetButton = document.querySelector("#R");

let startCon = false;
var scoreCounter;
let score = 0;

function startGame() {
  if (startCon === false) {
    startCon = true;
    if (!obs.classList.contains("slide"));
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
    alert("Your score is " + scoreDisplay.textContent);
  }
}, 10);

resetButton.addEventListener("click", function () {
  endGame();
  scoreDisplay.textContent = 0;
  score = 0;
  scoreCounter = 0;
  startGame();
});
