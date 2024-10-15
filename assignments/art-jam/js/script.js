/**
 * Crystal Ball
 * Mary Dedes
 * 
 * Behold! A magical crystal ball that will reveal your fortune 
 * with a wave of your hand (a click of your mouse)! Or will it? 
 * I dunno, I'm kinda new to this. Pretty sure I ordered
 * a functional crystal ball... Anyway, just wave your 
 * hand (mouse) around the ball to power it up, 
 * then tap (click) on it to conjure up your fortune 
 * (hope that's what it is)!
 * 
 * 
 * PLEASE NOTE* I originally intended to also make the ball 
 * shake when the mouse hovered over the ball to add to the experience, 
 * but I got ahead on this a bit too late to troubleshoot 
 * (code wasn't working). I left the code there to get back to it 
 * eventually. If I had extra extra time, 
 * I would've also tried to add a glow when the mouse 
 * approached the ball for *extra* effect. In time!
 */

"use strict";

// Our lovely ball.
let crystalBall = {
    //Position
    x: 350,
    y: 355,
    // Size
    size: 320
}

// Setting up our image variables.
let curtainImage = undefined;
let handImage = undefined;
let stoolImage = undefined;

// Loading our hand, curtain and stool images into the program.
function preload() {
    curtainImage = loadImage('assets/images/redcurtains.png');
    handImage = loadImage('assets/images/ladyhand.png');
    stoolImage = loadImage('assets/images/stool.png');
}

/**
 * Creating a 700x800 canvas to set up the scene.
*/
function setup() {
    createCanvas(700, 800);
    // Removing cursor from our sight so we only see our delicate hand.
    noCursor();
}

/**
 * Creates the mystical ambiance with a dark background 
 * and draws the magical crystal ball so it really stands out.
 * We also have a hand now so we can *touch* the bal!!
*/
function draw() {
    drawRoom();
    drawStool();
    drawCrystalBall();
    drawHand();
}

/**
 * Draws our dark room.
 */
function drawRoom() {
    // The darkness of the room; no light except that of the ball!
    background(20, 20, 40);
    // Adding the curtains for extra ambiance...
    curtainImage.resize(width, height);
    image(curtainImage, 0, 0);
}

/**
 * Draws our rustic stool upon which rests our future (the ball).
 */
function drawStool() {
    stoolImage.resize(590, 488)
    image(stoolImage, 55, 443);
}

/**
 * Draws our mystical, magical crystal ball set.
 */
function drawCrystalBall() {
    drawBall();
    drawFortune()
    drawLeftFrontLeg();
    drawRightFrontLeg();
}

/**
 * Draws our hand so we can rub the Crystal Ball!
 */
function drawHand() {
    image(handImage, mouseX, mouseY)
}

// We will define our random fortune variables here.
let fortune = undefined;
let fortuneRead = false;

/**
 * Time for fortunes to be unveiled! This function helps determine
 * our fortunes and when they will appear (via a click of the mouse - 
 * I mean a tap of the hand!).
 */
function mouseClicked() {
    // We will indicate where we want the mouse to be when we click (over ball).
    const distance = dist(mouseX, mouseY, crystalBall.x, crystalBall.y);
    const mouseInsideCrystalBall = (distance < crystalBall.size / 2);

    // The fortune will only be unveiled unless the mouse is clicked
    // inside the circle. Once it clicks, the fotune will not regenerate
    // until you refresh the page.
    if (!fortuneRead && mouseInsideCrystalBall) {
        // Getting a random number to set up 
        // the probability for our fortunes.
        const p = random();
        // Choosing different fortunes at different
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
            fortune = "Get lost, chump. I ain't feelin' it today."
        }
        fortuneRead = true;
    }
}

/**
 * Makes the ball shake when you hover your hand on it and rub it! *needs work*
 */
//function mouseMoved() {
// We will indicate where we want the to be when we click (inside ball)
// const distance = dist(mouseX, mouseY, crystalBall.x, crystalBall.y);
//const mouseInsideCrystalBall = (distance < crystalBall.size / 2);

// if (mouseInsideCrystalBall) {
//const x = crystalBall.x + random(-20, 20);
// const y = crystalBall.y + random(-20, 20);
// }
//}

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
    circle(crystalBall.x, crystalBall.y, crystalBall.size);
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

/**
 * Displays our shocking fortunes!
 */
function drawFortune() {
    // Display the fortune in front of ball.
    push();
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(13);
    fill('white')
    text(fortune, 350, 355);
    pop();
}
