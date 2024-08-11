let player;
let foods = [];
let poisons = [];
let score = 0;
let playerSize = 50;
let playerSpeed = 5;
let objectSpeed = 2;
let force = 1;
const numFood = 100;
const numPoison = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Retrieve score from localStorage or initialize to 0
  score = parseInt(localStorage.getItem("score")) || 0;

  // Initialize player
  player = {
    x: width / 2,
    y: height / 2,
    size: playerSize,
    color: "blue",
  };

  // Initialize food items
  for (let i = 0; i < numFood; i++) {
    foods.push({
      x: random(width),
      y: random(height),
      size: 30,
      color: "green",
    });
  }

  // Initialize poison items
  for (let i = 0; i < numPoison; i++) {
    poisons.push({
      x: random(width),
      y: random(height),
      size: 30,
      color: "red",
    });
  }

  createControls();
}

function draw() {
  background(200);

  // Draw player
  fill(player.color);
  ellipse(player.x, player.y, player.size);

  // Draw food items
  for (let i = 0; i < foods.length; i++) {
    fill(foods[i].color);
    ellipse(foods[i].x, foods[i].y, foods[i].size);
  }

  // Draw poison items
  for (let i = 0; i < poisons.length; i++) {
    fill(poisons[i].color);
    ellipse(poisons[i].x, poisons[i].y, poisons[i].size);
  }

  // Move player based on key presses
  if (keyIsDown(LEFT_ARROW)) movePlayer(-playerSpeed, 0);
  if (keyIsDown(RIGHT_ARROW)) movePlayer(playerSpeed, 0);
  if (keyIsDown(UP_ARROW)) movePlayer(0, -playerSpeed);
  if (keyIsDown(DOWN_ARROW)) movePlayer(0, playerSpeed);

  // Check for collisions with food and poison
  checkCollisions();

  // Display score
  fill(0);
  textSize(32);
  text(`Score: ${score}`, 10, 30);

  player.size = playerSize;
}

function movePlayer(dx, dy) {
  player.x += dx;
  player.y += dy;

  // Check for collisions with food items
  for (let i = 0; i < foods.length; i++) {
    if (
      dist(player.x, player.y, foods[i].x, foods[i].y) <
      (player.size + foods[i].size) / 2
    ) {
      foods[i].x += dx * objectSpeed * force;
      foods[i].y += dy * objectSpeed * force;
      // Ensure food stays within bounds
      foods[i].x = constrain(
        foods[i].x,
        foods[i].size / 2,
        width - foods[i].size / 2
      );
      foods[i].y = constrain(
        foods[i].y,
        foods[i].size / 2,
        height - foods[i].size / 2
      );
    }
  }

  // Check for collisions with poison items
  for (let i = 0; i < poisons.length; i++) {
    if (
      dist(player.x, player.y, poisons[i].x, poisons[i].y) <
      (player.size + poisons[i].size) / 2
    ) {
      poisons[i].x += dx * objectSpeed * force;
      poisons[i].y += dy * objectSpeed * force;
      // Ensure poison stays within bounds
      poisons[i].x = constrain(
        poisons[i].x,
        poisons[i].size / 2,
        width - poisons[i].size / 2
      );
      poisons[i].y = constrain(
        poisons[i].y,
        poisons[i].size / 2,
        height - poisons[i].size / 2
      );
    }
  }

  // Keep player within bounds
  player.x = constrain(player.x, player.size / 2, width - player.size / 2);
  player.y = constrain(player.y, player.size / 2, height - player.size / 2);
}

function checkCollisions() {
  // Check for collisions with food items
  for (let i = foods.length - 1; i >= 0; i--) {
    let food = foods[i];
    if (
      dist(player.x, player.y, food.x, food.y) <
      (player.size + food.size) / 2
    ) {
      score += 10;
      foods.splice(i, 1); // Remove this food item
      updateScore(); // Update score in localStorage
    }
  }

  // Check for collisions with poison items
  for (let i = poisons.length - 1; i >= 0; i--) {
    let poison = poisons[i];
    if (
      dist(player.x, player.y, poison.x, poison.y) <
      (player.size + poison.size) / 2
    ) {
      score -= 10;
      poisons.splice(i, 1); // Remove this poison item
      updateScore(); // Update score in localStorage
    }
  }
}

function updateScore() {
  localStorage.setItem("score", score);
}

function createControls() {
  // Create player size slider
  let sizeSlider = createSlider(20, 100, 50);
  sizeSlider.position(10, height + 10);
  sizeSlider.input(() => {
    playerSize = sizeSlider.value();
  });

  // Create player speed slider
  let speedSlider = createSlider(1, 10, 5);
  speedSlider.position(10, height + 40);
  speedSlider.input(() => {
    playerSpeed = speedSlider.value();
  });

  // Create force slider
  let forceSlider = createSlider(0.1, 2, 1, 0.1);
  forceSlider.position(10, height + 70);
  forceSlider.input(() => {
    force = forceSlider.value();
  });

  // Create labels
  let sizeLabel = createP("Player Size");
  sizeLabel.position(sizeSlider.x * 2 + sizeSlider.width, sizeSlider.y);

  let speedLabel = createP("Player Speed");
  speedLabel.position(speedSlider.x * 2 + speedSlider.width, speedSlider.y);

  let forceLabel = createP("Push Force");
  forceLabel.position(forceSlider.x * 2 + forceSlider.width, forceSlider.y);
}

// this disables the screen from moving when we press the arrows keys
window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);
