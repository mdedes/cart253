/**
 * Crystal Ball
 * Mary Dedes
 * 
 * Behold! A magical crystal ball that will reveal your fortune
 * with a wave of your hand (a click of your mouse)! Or will it?
 * I dunno, I'm kinda new to this. Pretty sure I ordered 
 * a functional crystal ball...
 */

"use strict";

/**
 * Creating a 700x800 canvas to set up the scene.
*/
function setup() {
    createCanvas(700, 800);
}

// Defining r and b (rgb) variables
var r = 0;
var b = 650;

/**
 * Creates the mystical ambiance with a dark background 
 * and draws the magical crystal ball so it really stands out.
*/
function draw() {
    drawRoom();
    drawCrystalBall();
}

/**
 * Draws our dark room.
 */
function drawRoom() {
    background(20, 20, 40);
}

/**
 * Draws our mystical, magical crystal ball set.
 */
function drawCrystalBall() {
    drawBall();
    drawLeftFrontLeg();
    drawRightFrontLeg();
}

/**
 * Draws our mesmerizing ball only.
 */
function drawBall() {
    push();
    // When you move the mouse around the ball,
    // the ball's colour changes, *ooOoooUuU*.
    let r = map(mouseX, 0, 700, 0, 700);
    let b = map(mouseX, 0, 700, 700, 0);

    // Style the ball.
    fill(r, 0, b);

    // Draw the ball.
    circle(350, 355, 250);
    pop();
}

/**
 * Draws the golden claw-like left front "leg" that supports our ball.
 */
function drawLeftFrontLeg() {
    push();
    noStroke();
    fill(200, 150, 50);
    beginShape();
    vertex(235, 495);
    bezierVertex(340, 405, 250, 395, 235, 495);
    endShape();
    pop();
}

/**
 * Draws the golden claw-like left front "leg" that supports our ball.
 */
function drawRightFrontLeg() {
    push();
    noStroke();
    fill(200, 150, 50);
    beginShape();
    vertex(465, 495)
    bezierVertex(360, 405, 445, 395, 465, 495);
    endShape();
    pop();
}