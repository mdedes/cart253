/**
 * Keyboard Events
 * Pippin Barr
 * 
 * A chance to experiment with keyboard events in a simple setting.
*/

"use strict";

// Our ball
const ball = {
    // Position
    x: 200,
    y: 200,
    // Size
    size: 50,
    // fill
    fill: "#ffffff",
    // fills
    fills: {
        white: "#ffffff",
        red: "#ff0000",
        blue: "#0000ff"
    },
    keys: {
        redKey: 82, // R
        blueKey: 66 //B
    }
}

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draws the ball
 */
function draw() {
    background(0);

    // Draw the ball
    push();
    noStroke();
    fill(ball.fill);
    ellipse(ball.x, ball.y, ball.size);
    pop();
}

/**
 * Controls the ball's colour
 */
function keyPressed(event) {
    // If you press r key, ball is red
    if (event.keyCode === ball.keys.redKey) {
        ball.fill = ball.fills.red;
    }
    // If you press b key, ball is blue
    else if (event.keyCode === ball.keys.blueKey) {
        ball.fill = ball.fills.blue;
    }

}

/**
 * Resets the ball's colour
 */
function keyReleased(event) {
    if (event.keyCode === ball.keys.redKey || event.keyCode === ball.keys.blueKey)
        ball.fill = ball.fills.white;

}


