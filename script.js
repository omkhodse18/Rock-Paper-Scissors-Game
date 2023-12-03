// DOM Elements
const computerScore = document.querySelector(".scoreComp");
const playerScore = document.querySelector(".scorePlayer");
const keys = document.querySelectorAll(".item");
const playAgainBtn = document.querySelector(".playBtn");
const replayBtn = document.querySelector(".replayBtn");
const userIcons = document.querySelectorAll(".user-icon");
const pcIcons = document.querySelectorAll(".pc-icon");
const nextBtn = document.querySelector(".nextBtn");
const rulesBtn = document.querySelector(".rulesBtn");
const mainScreen = document.querySelector(".main-screen");
const winnerScreen = document.querySelector(".winner-screen");
const winnerPlayAgainBtn = document.querySelector(".winnerPlayBtn");
const rulesDisplay = document.querySelector(".rules");
const crossBtn = document.querySelector(".cross");
const playingZone = document.querySelector(".playing-zone");
const resultZone = document.querySelector(".result-zone");
const winText = document.querySelector("#win-text");
const lostText = document.querySelector("#lost-text");
const tieText = document.querySelector("#tie-text");
const subText = document.querySelector(".sub-text");

// Constants
const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

// Functions

// Update the displayed scores from local storage
function updateScoreDisplay() {
  const scores = JSON.parse(localStorage.getItem("scores")) || { user: 0, computer: 0 };
  computerScore.innerText = scores.computer;
  playerScore.innerText = scores.user;
}

// Get the numeric value of a key (rock, paper, or scissors)
function valueOfKey(key) {
  const keyMap = { rock: ROCK, paper: PAPER, scissor: SCISSORS };
  return keyMap[key] || 0;
}

// Get a random number between 1 and 3
function getRandomNumber() {
  return Math.floor(Math.random() * 3) + 1;
}

// Determine the winner of the game
function playRockPaperScissors(userChoice, compChoice) {
  if (userChoice === compChoice) return "tie";
  if ((userChoice === ROCK && compChoice === SCISSORS) ||
      (userChoice === PAPER && compChoice === ROCK) ||
      (userChoice === SCISSORS && compChoice === PAPER)) {
    return "user";
  }
  return "comp";
}

// Update the result sides based on choices
function updateResultSides(userChoice, compChoice) {
  userIcons.forEach(icon => icon.style.display = "none");
  pcIcons.forEach(icon => icon.style.display = "none");

  userIcons[userChoice - 1].style.display = "flex";
  pcIcons[compChoice - 1].style.display = "flex";
}

// Update the result zone based on the game result
function updateResultZone(result, userChoice, compChoice) {
  playingZone.style.display = "none";
  resultZone.style.display = "flex";

  winText.style.display = result === "user" ? "block" : "none";
  lostText.style.display = result === "comp" ? "block" : "none";
  tieText.style.display = result === "tie" ? "block" : "none";

  replayBtn.style.display = "block";
  nextBtn.style.display = result === "user" ? "inline" : "none";

  updateResultSides(userChoice, compChoice);

  if (result === "user") {
    userIcons[userChoice - 1].classList.add("green-background");
    pcIcons[compChoice - 1].classList.remove("green-background");
  } else if (result === "comp") {
    userIcons[userChoice - 1].classList.remove("green-background");
    pcIcons[compChoice - 1].classList.add("green-background");
  }
}

// Update the local storage scores and display
function updateScores(result) {
  const scores = JSON.parse(localStorage.getItem("scores")) || { user: 0, computer: 0 };

  if (result === "user") {
    scores.user += 1;
  } else if (result === "comp") {
    scores.computer += 1;
  }

  localStorage.setItem("scores", JSON.stringify(scores));
  updateScoreDisplay();
}

// Event Handlers

// Handle a key (rock, paper, or scissors) being clicked
function keyClickHandler(event) {
  const target = event.target.closest(".item");

  if (target) {
    const keyClicked = target.id;
    const userChoice = valueOfKey(keyClicked);
    const compChoice = getRandomNumber();
    const result = playRockPaperScissors(userChoice, compChoice);

    updateScores(result);
    updateResultZone(result, userChoice, compChoice);
  }
}

// Handle the play again button being clicked
function playAgainHandler() {
  playingZone.style.display = "flex";
  resultZone.style.display = "none";
  mainScreen.style.display = "block";
  winnerScreen.style.display = "none";
}

// Handle the next page button being clicked
function nextPageHandler() {
  mainScreen.style.display = "none";
  winnerScreen.style.display = "flex";
  nextBtn.style.display = "none";
}

// Show the rules display
function showRulesHandler() {
  crossBtn.style.display = "flex";
  rulesDisplay.style.display = "flex";
}

// Remove the rules display
function removeRulesHandler() {
  crossBtn.style.display = "none";
  rulesDisplay.style.display = "none";
}

// Event Listeners
keys.forEach(key => key.addEventListener("click", keyClickHandler));
replayBtn.addEventListener("click", playAgainHandler);
playAgainBtn.addEventListener("click", playAgainHandler);
nextBtn.addEventListener("click", nextPageHandler);
winnerPlayAgainBtn.addEventListener("click", playAgainHandler);
rulesBtn.addEventListener("click", showRulesHandler);
crossBtn.addEventListener("click", removeRulesHandler);

// Initial Setup
updateScoreDisplay();
