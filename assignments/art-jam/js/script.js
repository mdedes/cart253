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

// Our ball
const crystalBall = {
    //Position
    x: 350,
    y: 335,
    // Size
    size: 320,
}

/**
 * Creating a 700x800 canvas to set up the scene 
 * and setting up our fortune probabilities.
*/

let handImage = undefined;

function preload() {
    handImage = loadImage('assets/images/ladyhand Small.jpeg');
}

function setup() {
    createCanvas(700, 800);
    image(img, mouseX, mouseY)
    NoCursor();
}

/**
 * Creates the mystical ambiance with a dark background 
 * and draws the magical crystal ball so it really stands out.
*/
function draw() {
    drawRoom();
    drawCrystalBall();
    checkInput();
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

function checkInput() {
    const distance = dist(mouseX, mouseY, crystalBall.x, crystalBall.y);
    const mouseOverlapsCrystalBall = (distance < crystalBall.size / 2);

    const mouseIsMoving = undefined;

    if (mouseOverlapsCrystalBall) {
        const x = crystalBall.x + random(-50, 50);
        const y = crystalBall.y + random(-50, 50);
    }
}

// Defining r and b (rgb) variables for our ball.
var r = 0;
var b = 650;

/**
 * Draws our mesmerizing ball only 
 * (in front of which fortune is displayed).
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
    circle(350, 355, 320);
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
    vertex(225, 535);
    bezierVertex(330, 445, 240, 435, 225, 535);
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
    vertex(475, 535)
    bezierVertex(370, 445, 455, 435, 475, 535);
    endShape();
    pop();
}

// We will put our random fortune in here.
let fortune = undefined;

function mouseClicked() {

    // Getting a random number to set up 
    // the probability for our fortunes.
    const p = random();

    // Choosing different loot at different
    // probabilities. This part of the code was
    // borrowed from Pippin's "random() and
    // probability" example.

    // 1% of the time!
    if (p < 0.01) {
        fortune = "A gnome will give you stock tips.";
    }
    // Between 0.01 and 0.11 means this one is 10% of the time
    else if (p < 0.11) {
        fortune = "Your next pet will be a wisecracking cactus.";
    }
    // Between 0.11 and 0.26 means this one is 15% of the time
    else if (p < 0.26) {
        fortune = "You will lose your left sock. Eventually."
    }
    // Between 0.26 and 0.31 means this one is 5% of the time
    else if (p < 0.31) {
        fortune = "A llama will offer you life advice, but only in riddles."
    }
    // Between 0.31 and 0.61 means this one is 30% of the time
    else if (p < 0.61) {
        fortune = "You may or may not be tempted to eat a tire."
    }
    // Between 0.61 and 1.0 means this one is 39% of the time
    else {
        fortune = "Get lost, chump."
    }
    // Display the fortune in front of ball.
    push();
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(13);
    fill('white')
    text(fortune, 350, 355);
    pop();
}

