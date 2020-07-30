import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
  getScore,
} from "./snake.js";

import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameover = false;
let highestScore = 0;

const gameBoard = document.getElementById("game-board");

function main(currentTime) {
  setHighestScore();
  if (gameover) {
    const score = getScore();

    setHighestScore(score);
    if (confirm(`You lost!\n Score: ${score} \n Press ok to restart`)) {
      window.location = "/";
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function setHighestScore(score = 0) {
  highestScore = Math.max(
    parseInt(localStorage.getItem("snake-high-score")),
    score
  );
  document.getElementById("highest-score").innerHTML = highestScore;
  localStorage.setItem("snake-high-score", highestScore);
}

function update() {
  updateSnake();
  updateFood();
  checkForDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkForDeath() {
  gameover = outsideGrid(getSnakeHead()) || snakeIntersection();
}
