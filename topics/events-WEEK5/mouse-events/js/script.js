/**
 * Mouse Events
 * Pippin Barr
 * 
 * A chance to experiment with mouse events in a simple setting.
*/

"use strict";

// Our ball
const ball = {
    // Position
    x: 0,
    y: 200,
    // Size
    size: 50,
    // Velocity so it can move
    velocity: {
        x: 0,
        y: 0
    },
    // Speed when it moves
    speed: 5
}

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Moves the ball and draws it
 */
function draw() {
    background(0);

    // Move the ball
    ball.x += ball.velocity.x
    ball.y += ball.velocity.y;

    // Draw the ball
    push();
    ellipse(ball.x, ball.y, ball.size);
    pop();
}

/**
 * Starts the balls moving right
 */
function mousePressed() {
    ball.velocity.x = ball.speed;
}

/**
 * Stops the ball moving right
 */
function mouseReleased() {
    ball.velocity.x = 0
}

/**
 * Resizes the ball
 */
function mouseWheel(event) {
    if (event.delta > 0) {
        ball.size += 2;
    }
    else {
        ball.size -= 2;
    }
}