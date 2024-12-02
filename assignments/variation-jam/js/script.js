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

let crystalBallState = undefined

// Menu crystal balls so you can choose your adventure - or fortune telling experience rather.
let menuCrystalBalls = [
    {
        x: 150,
        y: 450,
        size: 100,
        floatiness: 5
    },
    {
        x: 240,
        y: 600,
        size: 100,
        floatiness: 5
    },
    {
        x: 460,
        y: 600,
        size: 100,
        floatiness: 5
    },
    {
        x: 550,
        y: 450,
        size: 100,
        floatiness: 5
    }
];


// Our lovely ball A.
let crystalBallA = {
    //Position
    x: 350,
    y: 355,
    // Size
    size: 320
}

// Our mystical balls B.
let crystalBallBs = [
    {
        x: 150,
        originalY: 250,
        y: 250,
        size: 100,
        floatiness: 4,
        angle: 0

    },
    {
        x: 550,
        originalY: 250,
        y: 250,
        size: 100,
        floatiness: 4,
        angle: 0
    },
    {
        x: 350,
        originalY: 370,
        y: 370,
        size: 295,
        floatiness: 0,
        angle: 0
    }
];

// Our lucky balls C.
let crystalBallCs = [
    {
        x: 155,
        y: 255,
        size: 90,
        floatiness: 0
    },
    {
        x: 152,
        y: 370,
        size: 90,
        floatiness: 0
    },
    {
        x: 230,
        y: 450,
        size: 90,
        floatiness: 0
    },
    {
        x: 350,
        y: 480,
        size: 90,
        floatiness: 0
    },
    {
        x: 470,
        y: 450,
        size: 90,
        floatiness: 0
    },
    {
        x: 548,
        y: 370,
        size: 90,
        floatiness: 0
    },
    {
        x: 545,
        y: 255,
        size: 90,
        floatiness: 0
    }
]

// Defining r and b (rgb) variables for our balls.
var r = 0;
var b = 650;

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

// Keys we will use to separate variations.
const keys = {
    fortuneTellingA: 65,
    fortuneTellingB: 66,
    fortuneTellingC: 67
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
    drawTitleCard();
    drawHand();
    if (crystalBallState == "A") {
        drawFortuneTellingA()
    }
    else if (crystalBallState == "B") {
        drawFortuneTellingB()
    }
    // if (keyIsPressed) {
    //     if (keyCode === keys.fortuneTellingA) {
    //         drawFortuneTellingA()
    //     }
    //     else if (keyCode === keys.fortuneTellingB) {
    //         drawFortuneTellingB()
    //     }
    //     else if (keyCode === keys.fortuneTellingC) {
    //         drawFortuneTellingC()
    //     }
    // }
}

/**
 * Draws the title card
 */
function drawTitleCard() {
    background(20, 20, 40)

    // Display the fortune in front of ball.
    push();
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(13);
    fill('white')
    text("Welcome to your Fortune Telling. Click on a crystal ball to begin an experience.", 350, 255);
    pop();

    for (let menuCrystalBall of menuCrystalBalls) {
        drawMenuCrystalBall(menuCrystalBall);
    }
}

function drawMenuCrystalBall(menuCrystalBall) {
    push();
    noStroke();

    // When you move the mouse around the ball,
    // the ball's colour changes, *ooOoooUuU*.
    let r = map(mouseX, 200, 500, 200, 500);
    let b = map(mouseX, 200, 500, 500, 200);

    // Style the ball.
    fill(r, 0, b);
    ellipse(menuCrystalBall.x, menuCrystalBall.y, menuCrystalBall.size);
    pop();
}

function drawFortuneTellingA() {
    drawRoom();
    drawStool();
    drawCrystalBallA();
    drawHand();
}

function drawFortuneTellingB() {
    drawRoom();
    drawStool();
    drawCrystalBallB();
    drawHand();
}

function drawFortuneTellingC() {
    drawRoom();
    drawStool();
    drawCrystalBallC();
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
function drawCrystalBallA() {
    drawBallA();
    drawFortuneA()
    drawLeftFrontLegA();
    drawRightFrontLegA();
}

function drawCrystalBallB() {
    //drawFortuneA()
    for (let crystalBallB of crystalBallBs) {
        drawBallB(crystalBallB);
    }
    drawLeftFrontLegA();
    drawRightFrontLegA();
}

function drawCrystalBallC() {
    for (let crystalBallC of crystalBallCs) {
        drawBallC(crystalBallC)
    }
}

/**
 * Draws our hand so we can rub the Crystal Ball!
 */
function drawHand() {
    image(handImage, mouseX, mouseY)
}

// We will define our random fortune variables here.
let fortuneA = undefined;
let fortuneARead = false;

/**
 * Time for fortunes to be unveiled! This function helps determine
 * our fortunes and when they will appear (via a click of the mouse - 
 * I mean a tap of the hand!).
 */
function mouseClicked() {
    console.log("mouseClicked")

    const distanceMenu = dist(mouseX, mouseY, menuCrystalBalls[0].x, menuCrystalBalls[0].y);
    const mouseInsideMenuCrystalBalls = (distanceMenu < menuCrystalBalls[0].size);

    if (mouseInsideMenuCrystalBalls === true) {
        crystalBallState = "A"
    }

    const distanceMenuB = dist(mouseX, mouseY, menuCrystalBalls[1].x, menuCrystalBalls[1].y);
    const mouseInsideMenuCrystalBallsB = (distanceMenuB < menuCrystalBalls[1].size);

    if (mouseInsideMenuCrystalBallsB === true) {
        crystalBallState = "B"
    }

    if (crystalBallState === "A" || crystalBallState === "B" || crystalBallState === "C" || crystalBallState === "D") {
        // We will indicate where we want the mouse to be when we click (over ball).
        const distance = dist(mouseX, mouseY, crystalBallA.x, crystalBallA.y);
        const mouseInsideCrystalBallA = (distance < crystalBallA.size / 2);


        // The fortune will only be unveiled unless the mouse is clicked
        // inside the circle. Once it clicks, the fotune will not regenerate
        // until you refresh the page.
        if (!fortuneARead && mouseInsideCrystalBallA) {
            // Getting a random number to set up 
            // the probability for our fortunes.
            const p = random();
            // Choosing different fortunes at different
            // probabilities. This part of the code was
            // borrowed from Pippin's "random() and
            // probability" example.

            // 1% of the time!
            if (p < 0.01) {
                fortuneA = "A gnome will give you stock tips.";
            }
            // Between 0.01 and 0.11 means this one is 10% of the time
            else if (p < 0.11) {
                fortuneA = "Your next pet will be a wisecracking cactus.";
            }
            // Between 0.11 and 0.26 means this one is 15% of the time
            else if (p < 0.26) {
                fortuneA = "You will lose your left sock. Eventually."
            }
            // Between 0.26 and 0.31 means this one is 5% of the time
            else if (p < 0.31) {
                fortuneA = "A llama will offer you life advice, but only in riddles."
            }
            // Between 0.31 and 0.61 means this one is 30% of the time
            else if (p < 0.61) {
                fortuneA = "You may or may not be tempted to eat a tire."
            }
            // Between 0.61 and 1.0 means this one is 39% of the time
            else {
                fortuneA = "Get lost, chump. I ain't feelin' it today."
            }
            fortuneARead = true;
        }
    }
}

/**
 * Makes the ball shake when you hover your hand on it and rub it! *needs work*
 */
//function mouseMoved() {
//We will indicate where we want the to be when we click (inside ball)
// const distance = dist(mouseX, mouseY, crystalBall.x, crystalBall.y);
// const mouseInsideCrystalBall = (distance < crystalBall.size / 2);

// if (mouseInsideCrystalBall) {
///  const x = crystalBall.x + random(-200, 200);
// const y = crystalBall.y + random(-200, 200);
// }
//}

/**
 * Draws our mesmerizing ball only 
 * (in front of which fortune is displayed).
 */
function drawBallA() {

    push();
    // When you move the mouse around the ball,
    // the ball's colour changes, *ooOoooUuU*.
    let r = map(mouseX, 0, 700, 0, 700);
    let b = map(mouseX, 0, 700, 700, 0);

    // Style the ball.
    fill(r, 0, b);

    // Draw the ball.
    circle(crystalBallA.x, crystalBallA.y, crystalBallA.size);
    pop();
}

/**
 * Draws the golden claw-like left front "leg" that supports our ball.
 */
function drawLeftFrontLegA() {
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
function drawRightFrontLegA() {
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
function drawFortuneA() {
    // Display the fortune in front of ball.
    push();
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(13);
    fill('white')
    text(fortuneA, 350, 355);
    pop();
}


function drawBallB(crystalBallB) {
    push();
    noStroke();

    // When you move the mouse around the ball,
    // the ball's colour changes, *ooOoooUuU*.
    let r = map(mouseX, 100, 600, 100, 600);
    let b = map(mouseX, 100, 600, 600, 100);

    // Style the ball.
    fill(r, 0, b);
    crystalBallB.angle += 0.1
    crystalBallB.y = sin(crystalBallB.angle) * crystalBallB.floatiness + crystalBallB.originalY
    ellipse(crystalBallB.x, crystalBallB.y, crystalBallB.size);
    pop();
}

function drawBallC(crystalBallC) {
    push();
    noStroke();

    // When you move the mouse around the ball,
    // the ball's colour changes, *ooOoooUuU*.
    let r = map(mouseX, 100, 600, 100, 600);
    let b = map(mouseX, 100, 600, 600, 100);

    // Style the ball.
    fill(r, 0, b);
    ellipse(crystalBallC.x, crystalBallC.y, crystalBallC.size);
    pop();
}