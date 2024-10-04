/**
 * Crystal Ball
 * Mary Dedes
 * 
 * Behold! A magical crystal ball that will reveal your fortune
 * with a wave of your hand (a click of your mouse)! Or will it?
 * I dunno, I'm kinda new to this. Pretty sure I ordered a crystal ball...
 */

"use strict";

/**
 * Creating a 700x700 canvas to set up the 
*/

function setup() {
    createCanvas(700, 800);
}

/**
 * Creating the mystical ambiance with a dark background 
 * that allows the magical crystal ball to really stand out.
*/

// Defining r and b (rgb) variables
var r = 0;
var b = 650;

// Establishing the background.
function draw() {
    background(20, 20, 40);

    // Remap mouseX from [0, 700] to [0, 255]
    let r = map(mouseX, 0, 700, 0, 700);
    let b = map(mouseX, 0, 700, 700, 0);

    // Style the circle.
    fill(r, 0, b);

    // Draw the ball.
    circle(350, 355, 250);

    // Draw the left "leg" of the ball.
    noStroke()

    fill(200, 150, 50);

    beginShape();

    vertex(235, 495);

    bezierVertex(340, 405, 250, 395, 235, 495);

    endShape();

    // Draw the right "leg" of the ball.

    noStroke();

    fill(200, 150, 50);

    beginShape();

    vertex(465, 495)

    bezierVertex(360, 405, 445, 395, 465, 495);

    endShape();

}
