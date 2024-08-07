"use strict";
const num = 1500;
const noiseScale = 0.01 / 2;

let particles = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }
  let c = color(255, 0, 0, 100);
  fill(c);
  // stroke();
  // background(220);
  // clear();
}

function draw() {
  // background(0, 10);
  for (let i = 0; i < num; i++) {
    let p = particles[i];
    point(p.x, p.y);

    let n = noise(
      p.x * noiseScale,
      p.y * noiseScale,
      frameCount * noiseScale * noiseScale
    );
    let a = TAU * n;
    p.x += cos(a);
    p.y += sin(a);
    if (!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }
}

function mouseReleased() {
  noiseSeed(millis());
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
