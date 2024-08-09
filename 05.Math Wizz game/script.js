"use strict";

const usernameContainer = document.getElementById("username-container");
const userInput = document.getElementById("username-input");
const gameContentContainer = document.getElementById("game-content");
const startGameBtn = document.getElementById("start-game");
const questionEl = document.getElementById("question");
const answerInput = document.getElementById("answer-input");
const submitBtn = document.getElementById("submit-answer");
const fedbackEl = document.getElementById("feedback");
const submitAnswBtn = document.getElementById("submit-answer");
const usernameEl = document.getElementById("username");
const scoreEl = document.getElementById("score");
const timeEL = document.getElementById("time");
const highScoreEl = document.getElementById("high-score");

let score = 0;
let timeLeft = 30;
let timerId;
let correctAnswer;
let username = "";
const maxTime = 30;

answerInput.focus();

// generate random question
const generateQuestion = function () {
  const operators = ["+", "-", "*", "/"];
  // random numbers
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;
  // random operators
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let questionTxt;
  // case for each operator
  switch (operator) {
    case "+":
      questionTxt = `${num1} + ${num2}`;
      correctAnswer = num1 + num2;
      break;

    case "-":
      questionTxt = `${num1} - ${num2}`;
      correctAnswer = num1 - num2;
      break;

    case "*":
      questionTxt = `${num1} * ${num2}`;
      correctAnswer = num1 * num2;
      break;

    case "/":
      questionTxt = `${num1} / ${num2}`;
      correctAnswer = num1 / num2;
      break;
  }
  // add questionTxt element to the html element this will display the random question
  questionEl.textContent = questionTxt;
};
// check for the correct answer
const checkAnswer = function () {
  // convert user input to a number
  const userAnswer = +answerInput.value;
  // if the user answer is correct increase score by 3, display text correct, and restart time countdown again
  if (userAnswer === correctAnswer) {
    score += 3;
    fedbackEl.textContent = "Correct";
    timeLeft = maxTime;
  } else {
    // decrease score by 2 and display the text loser
    score -= 2;
    fedbackEl.textContent = "Haha loser";
  }
  // we add score elm to the html el to display the score
  scoreEl.textContent = score;
  // answer input input so it doesn't display the correct answer
  answerInput.value = "";
  // we call the generate question so it generates a new question everytime the answer gets submitted
  generateQuestion();
};
// timer function
const startTimer = function () {
  timerId = setInterval(() => {
    // decrease time by 1s
    timeLeft--;
    // add time to the html el
    timeEL.textContent = timeLeft;
    // if the timer is 0
    if (timeLeft <= 0) {
      // clear timer and endGame()
      clearInterval(timerId);
      endGame();
    }
  }, 1000);
};
// display higScore
const displayHighScore = function () {
  const highScore = loadHighScore();
  highScoreEl.textContent = highScore;
};
// start game
const initGame = function () {
  // remove whiteSpace from username input
  username = userInput.value.trim();
  if (!username) {
    // if no username
    alert("Please enter a username to start game.");
    return;
  }
  // add the username that user enters to the usernameEl
  usernameEl.textContent = username;
  // hide username container
  usernameContainer.style.display = "none";
  // display game content
  gameContentContainer.style.display = "block";
  // Save all the user info
  saveUserInfo();
  // when the game start everything will start from the beginning we want to generate a question and start timer
  score = 0;
  timeLeft = maxTime;
  scoreEl.textContent = score;
  timeEL.textContent = timeLeft;
  fedbackEl.textContent = "";
  generateQuestion();
  startTimer();
};
// end game
const endGame = function () {
  // we want to display a text when the game ends
  // we want to laod the new highScore
  const highScore = loadHighScore();
  if (score > highScore) {
    // if score is higer then highscore we want to update the highscore
    saveHighScore(score);
    fedbackEl.textContent += " New high Score!";
  }
  if (timeLeft <= 0) {
    // if time is 0 we want to alert and if they press ok the game will start from the beginning again
    alert(
      `Time's up! Your final score is ${score}. Press OK to start game again`
    );
    initGame();
  }
  // we always want to save the highscore
  displayHighScore();
  // clearUserInfo();
};
// if you exit or reload the page and come back page will load user info
const loadUserInfo = function () {
  // get username and gameStats from the local storage
  const storedUsername = localStorage.getItem("username");
  const storedGameStats = localStorage.getItem("gameState");
  if (storedUsername) {
    username = storedUsername;
    userInput.value = username;
  }

  if (storedGameStats === "inGame") {
    usernameContainer.style.display = "none";
    gameContentContainer.style.display = "block";
    displayHighScore();
    initGame();
  } else {
    usernameContainer.style.display = "block";
    gameContentContainer.style.display = "none";
  }
};
// we also want to load your highest score
function loadHighScore() {
  const storedHighScore = localStorage.getItem("highScore");
  return storedHighScore ? +(storedHighScore, 10) : 0;
}
// save high score int the localStorage
const saveHighScore = function (newHighScore) {
  localStorage.setItem("highScore", newHighScore);
};
// save username and game stats we also have to called this in the initGame() so it saves the info
const saveUserInfo = function () {
  localStorage.setItem("username", username);
  localStorage.setItem("gameState", "inGame");
};

// const clearUserInfo = function () {
//   localStorage.removeItem("username");
//   localStorage.removeItem("gameState");
// };
// when the startGameBtn is clicked initGame
startGameBtn.addEventListener("click", initGame);
// Add keypress event so when you click enter the answer will be submitted
answerInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    submitAnswBtn.click();
    checkAnswer();
  }
});

loadUserInfo();
