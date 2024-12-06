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

let drawFortuneD = false;

let fortuneALlamaImage = undefined;

let fortuneASockImage = undefined;

let fortuneAGnomeImage = undefined;

let fortuneACactusImage = undefined;

let fortuneACigarImage = undefined;

let fortuneATireImage = undefined;

let animateShakingFinger = false;

let direction = "right";

let rotateFinger = 0;

let drawTextBoolean = false;

let drawFortuneBLucky = false;

let drawFortuneBUnlucky = false;

let drawFortuneBLuckyish = false;

let drawDigit = false

let randomList = []

let crystalBallState = "M"

// Menu crystal balls so you can choose your adventure - or fortune telling experience rather.
let menuCrystalBalls = [
    {
        x: 150,
        originalY: 450,
        y: 450,
        size: 100,
        floatiness: 4,
        angle: 0.3
    },
    {
        x: 240,
        originalY: 600,
        y: 600,
        size: 100,
        floatiness: 6,
        angle: 0.1
    },
    {
        x: 460,
        originalY: 600,
        y: 600,
        size: 100,
        floatiness: 6,
        angle: 0.5
    },
    {
        x: 550,
        originalY: 450,
        y: 450,
        size: 100,
        floatiness: 4,
        angle: 0.8
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
        size: 110,
        floatiness: 6,
        angle: 0

    },
    {
        x: 550,
        originalY: 250,
        y: 250,
        size: 110,
        floatiness: 6,
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
        originalY: 255,
        y: 255,
        size: 90,
        floatiness: 5,
        angle: 0
    },
    {
        x: 152,
        originalY: 370,
        y: 370,
        size: 90,
        floatiness: 5,
        angle: 0
    },
    {
        x: 230,
        originalY: 450,
        y: 450,
        size: 90,
        floatiness: 5,
        angle: 0
    },
    {
        x: 350,
        originalY: 480,
        y: 480,
        size: 90,
        floatiness: 5,
        angle: 0
    },
    {
        x: 470,
        originalY: 450,
        y: 450,
        size: 90,
        floatiness: 5,
        angle: 0
    },
    {
        x: 548,
        originalY: 370,
        y: 370,
        size: 90,
        floatiness: 5,
        angle: 0
    },
    {
        x: 545,
        originalY: 255,
        y: 255,
        size: 90,
        floatiness: 5,
        angle: 0
    }
]

// Our lovely ball D.
let crystalBallD = {
    //Position
    x: 350,
    originalY: 425,
    y: 425,
    // Size
    size: 360,
    floatiness: 8,
    angle: 0
}

// Defining r and b (rgb) variables for our balls.
var r = 0;
var b = 650;

// Setting up our image variables.
// These will be used for all experiences.
let curtainImage = undefined;
let handImage = undefined;
let stoolImage = undefined;

// These will be used in experience A.
let wisecrackingCactusImage = undefined;
let eatenTireImage = undefined;
let cigarHandImage = undefined;
let gnomeImage = undefined;
let sockImage = undefined;
let smileyLlamaImage = undefined;

// This will be used in experience D.
let shakingFingerImage = undefined;

// These will be used in experience B.
let slotImgs = [];

// Defining variables for experience B: the Slot Machine Luck tester.
let slotSpeed = 10; // 
let slot1, slot2, slot3; // 
let isSpinning = false; // 


/**
 * We must magically load all our apparitions, visual fortunes and furnishings!
 */

function preload() {
    // Loading our hand, curtain and stool images into the program.
    curtainImage = loadImage('assets/images/redcurtains.png');
    handImage = loadImage('assets/images/ladyhand.png');
    stoolImage = loadImage('assets/images/stool.png');

    //Loading our fortune apparitions in experience A.
    wisecrackingCactusImage = loadImage('assets/images/apparitions/wisecrackingcactus.png')
    eatenTireImage = loadImage('assets/images/apparitions/eatentire.png')
    cigarHandImage = loadImage('assets/images/apparitions/cigarhand.png')
    gnomeImage = loadImage('assets/images/apparitions/gnome.png')
    sockImage = loadImage('assets/images/apparitions/sock.png')
    smileyLlamaImage = loadImage('assets/images/apparitions/smileyllama.png')


    //Loading our floating shaking hand in experience D.
    shakingFingerImage = loadImage('assets/images/apparitions/shakinghand.png')

    // Loading 
    for (let i = 1; i <= 8; i++) {
        slotImgs.push(loadImage('assets/images/charms/slot_' + i + '.png'));
    }
}



/**
 * Creating a 700x800 canvas to set up the scene.
*/
function setup() {
    createCanvas(700, 800);
    // Removing cursor from our sight so we only see our delicate hand.
    noCursor();
    generateRandomNumbers(); // Will be there for fortune telling C
    generateRandomSlots();
}

/**
 * Creates the mystical ambiance with a dark background 
 * and draws the magical crystal ball so it really stands out.
 * We also have a hand now so we can *touch* the ball!!
*/
function draw() {
    if (crystalBallState === "M") {
        drawTitleCard();
    }
    drawHand();
    if (crystalBallState === "A") {
        drawFortuneTellingA()
    }
    else if (crystalBallState === "B") {
        drawFortuneTellingB()
    }
    else if (crystalBallState === "C") {
        drawFortuneTellingC()
    }
    else if (crystalBallState === "D") {
        drawFortuneTellingD()
    }
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
    textSize(25);
    fill('white')
    text("* WELCOME TO YOUR FORTUNE TELLING *", 350, 200);
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(15);
    fill('white')
    text("Click on a crystal ball to begin an experience.", 350, 350);
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
    menuCrystalBall.angle += 0.1
    menuCrystalBall.y = sin(menuCrystalBall.angle) * menuCrystalBall.floatiness + menuCrystalBall.originalY
    ellipse(menuCrystalBall.x, menuCrystalBall.y, menuCrystalBall.size);
    pop();
}

function drawFortuneTellingA() {
    drawRoom();
    drawStool();
    drawCrystalBallA();
    drawHand();
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(20);
    fill('white')
    text("'FORTUNE APPARITIONS' ", 350, 140)
}

function drawFortuneTellingB() {
    drawRoom();
    drawStool();
    drawCrystalBallB();
    drawHand();
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(20);
    fill('white')
    text("'LUCK FORTUNE SLOT MACHINE' ", 350, 140)
}

function drawFortuneTellingC() {
    drawRoom();
    drawStool();
    drawCrystalBallC();
    drawTextC();
    drawHand();
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(20);
    fill('white')
    text("'POTENTIAL LOTTO MAX FORTUNE", 350, 130)
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(20);
    fill('white')
    text("NUMBER GENERATOR FORTUNE'", 350, 160)
}

function drawFortuneTellingD() {
    drawRoom();
    drawCrystalBallD();
    drawShakingFinger();
    drawTextD();
    drawHand();
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(20);
    fill('white')
    text("'REALITY CHECK FORTUNE'", 350, 140)
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
    drawLeftFrontLegA();
    drawRightFrontLegA();
    drawFortuneA();
}

function drawCrystalBallB() {
    drawBallB(crystalBallBs[0], slot1, false)
    drawBallB(crystalBallBs[1], slot2, false)
    drawBallB(crystalBallBs[2], slot3, true)
    if (isSpinning) {
        spinSlots();
    }
    drawLeftFrontLegA();
    drawRightFrontLegA();
}

function drawCrystalBallC() {
    let index = 0;
    for (let crystalBallC of crystalBallCs) {

        drawBallC(crystalBallC, randomList[index]);  // keeps generating number for each ball
        index++;
    }
}

function drawCrystalBallD() {
    drawBallD();
}

function drawShakingFinger() {
    if (animateShakingFinger === true) {
        if (direction === "right") {
            if (rotateFinger < 0.25) {
                push();
                translate((crystalBallD.x - 60), (crystalBallD.y + 50))
                rotate(rotateFinger)
                rotateFinger += 0.01
                image(shakingFingerImage, 0, -200)
                pop();
            } else { direction = "left" }
        }
        if (direction === "left") {
            if (rotateFinger >= -0.25) {
                push();
                translate((crystalBallD.x - 60), (crystalBallD.y + 50))
                rotate(rotateFinger)
                rotateFinger -= 0.01
                image(shakingFingerImage, 0, -200)
                pop();
            } else { direction = "right" }
        }
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
    if (crystalBallState === "M") {

        const distanceMenu = dist(mouseX, mouseY, menuCrystalBalls[0].x, menuCrystalBalls[0].y);
        const mouseInsideMenuCrystalBalls = (distanceMenu < menuCrystalBalls[0].size);
        const distanceMenuB = dist(mouseX, mouseY, menuCrystalBalls[1].x, menuCrystalBalls[1].y);
        const mouseInsideMenuCrystalBallsB = (distanceMenuB < menuCrystalBalls[1].size);
        const distanceMenuC = dist(mouseX, mouseY, menuCrystalBalls[2].x, menuCrystalBalls[2].y);
        const mouseInsideMenuCrystalBallsC = (distanceMenuC < menuCrystalBalls[2].size);
        const distanceMenuD = dist(mouseX, mouseY, menuCrystalBalls[3].x, menuCrystalBalls[3].y);
        const mouseInsideMenuCrystalBallsD = (distanceMenuD < menuCrystalBalls[3].size);


        if (mouseInsideMenuCrystalBalls === true) {
            crystalBallState = "A"
        }

        else if (mouseInsideMenuCrystalBallsB === true) {
            crystalBallState = "B"
        }

        else if (mouseInsideMenuCrystalBallsC === true) {
            crystalBallState = "C"
        }

        else if (mouseInsideMenuCrystalBallsD === true) {
            crystalBallState = "D"
        }
    }

    else if (crystalBallState === "A") {
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
                fortuneAGnomeImage = gnomeImage
            }
            // Between 0.01 and 0.11 means this one is 10% of the time
            else if (p < 0.11) {
                fortuneA = "Your next pet will be a wisecracking cactus.";
                fortuneACactusImage = wisecrackingCactusImage
            }
            // Between 0.11 and 0.26 means this one is 15% of the time
            else if (p < 0.26) {
                fortuneA = "You will lose your left sock. Eventually."
                fortuneASockImage = sockImage
            }
            // Between 0.26 and 0.31 means this one is 5% of the time
            else if (p < 0.31) {
                fortuneA = "A llama will offer you life advice, but only in riddles."
                fortuneALlamaImage = smileyLlamaImage
            }
            // Between 0.31 and 0.61 means this one is 30% of the time
            else if (p < 0.61) {
                fortuneA = "Your tire may or not get slighty eaten."
                fortuneATireImage = eatenTireImage
            }
            // Between 0.61 and 1.0 means this one is 39% of the time
            else {
                fortuneA = "Get lost, chump. I ain't feelin' it today."
                fortuneACigarImage = cigarHandImage
            }
            fortuneARead = true;
        }
    }
    else if (crystalBallState === "B") {
        const distance = dist(mouseX, mouseY, crystalBallBs[2].x, crystalBallBs[2].y);
        const mouseInsideCrystalBallB = (distance < crystalBallBs[2].size / 2);
        if (mouseInsideCrystalBallB) {
            isSpinning = true;
            slotSpeed = 10;
            drawFortuneBLucky = false;
            drawFortuneBLuckyish = false;
            drawFortuneBUnlucky = false;
        }
    }
    else if (crystalBallState === "C") {
        const distance = dist(mouseX, mouseY, crystalBallCs[3].x, crystalBallCs[3].y);
        const mouseInsideCrystalBallC = (distance < crystalBallCs[3].size);
        console.log(mouseInsideCrystalBallC)
        if (mouseInsideCrystalBallC) {
            drawDigit = true;
            drawTextBoolean = true;
        }
    }

    else if (crystalBallState === "D") {
        const distance = dist(mouseX, mouseY, crystalBallD.x, crystalBallD.y);
        const mouseInsideCrystalBallD = (distance < crystalBallD.size / 2);
        if (mouseInsideCrystalBallD) {
            animateShakingFinger = true;
            drawFortuneD = true;
        }
    }
}
/**
 * Makes the ball shake when you hover your hand on it and rub it! 
 */
function mouseMoved() {
    //We will indicate where we want the to be when we click (inside ball)
    const distance = dist(mouseX, mouseY, crystalBallA.x, crystalBallA.y);
    const mouseInsideCrystalBallA = (distance < crystalBallA.size / 2);
    console.log(mouseInsideCrystalBallA)
    if (mouseInsideCrystalBallA && !fortuneARead) {
        crystalBallA.x = crystalBallA.x + random(-0.3, 0.3);
        crystalBallA.y = crystalBallA.y + random(-0.3, 0.3);
    }
}

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
    if (fortuneACactusImage !== undefined) {
        image(fortuneACactusImage, 50, 125)
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(8);
        fill('black')
        text("You're lookin' sharp.", 250, 180)

    } else if (fortuneACigarImage !== undefined) {
        image(fortuneACigarImage, 450, 400)

    } else if (fortuneATireImage !== undefined) {
        image(fortuneATireImage, 60, 340)
    } else if (fortuneAGnomeImage !== undefined) {
        image(fortuneAGnomeImage, 456, 250)
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(5);
        fill('black')
        text("https://www.schwab.com/learn/story/", 626, 305)
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(5);
        fill('black')
        text("stock-investment-tips-beginners", 626, 310)
    } else if (fortuneASockImage !== undefined) {
        image(fortuneASockImage, 250, 180)
    } else if (fortuneALlamaImage !== undefined) {
        image(fortuneALlamaImage, 50, 350)
    }
    pop();
}


function drawBallB(crystalBallB, index, isLargeBallB) {
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
    image(slotImgs[index], (crystalBallB.x - 40), (crystalBallB.y - 40), 80, 80);
    if (drawFortuneBLucky === true && isLargeBallB === true) {
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(16);
        fill('white')
        text("You *just* might be lucky!", crystalBallB.x, (crystalBallB.y + 60))
    }
    else if (drawFortuneBLuckyish === true && isLargeBallB === true) {
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(16);
        fill('white')
        text("Doesn't cut it. Not that lucky.", crystalBallB.x, (crystalBallB.y + 60))
    }
    else if (drawFortuneBUnlucky === true && isLargeBallB === true) {
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(10);
        fill('white')
        text("Do not test your luck today - results are negative.", crystalBallB.x, (crystalBallB.y + 60))
    }
    pop();
}

function drawBallC(crystalBallC, randomDigit) {
    push();
    noStroke();

    // When you move the mouse around the ball,
    // the ball's colour changes, *ooOoooUuU*.
    let r = map(mouseX, 100, 600, 100, 600);
    let b = map(mouseX, 100, 600, 600, 100);

    // Style the ball.
    fill(r, 0, b);
    crystalBallC.angle += 0.1
    crystalBallC.y = sin(crystalBallC.angle) * crystalBallC.floatiness + crystalBallC.originalY
    ellipse(crystalBallC.x, crystalBallC.y, crystalBallC.size);
    if (drawDigit === true) {
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(25);
        fill('white')
        text(randomDigit, crystalBallC.x, crystalBallC.y)
    }
    pop();
}

function drawTextC() {
    if (drawTextBoolean === true) {
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(20);
        fill('white')
        text("MAYBE *this* time???", 350, 330)
    }

}

function drawBallD() {
    push();
    // When you move the mouse around the ball,
    // the ball's colour changes, *ooOoooUuU*.
    let r = map(mouseX, 0, 700, 0, 700);
    let b = map(mouseX, 0, 700, 700, 0);

    // Style the ball.
    fill(r, 0, b);

    crystalBallD.angle += 0.05
    crystalBallD.y = sin(crystalBallD.angle) * crystalBallD.floatiness + crystalBallD.originalY

    // Draw the ball.
    circle(crystalBallD.x, crystalBallD.y, crystalBallD.size);
    pop();
}

function drawTextD() {
    if (drawFortuneD === true) {
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(18);
        fill('white')
        text("AH AH AH! Quit searching for your fortune and go make it!", 350, 650)
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(18);
        fill('white')
        text("Live your life to the fullest - then you will be *TRULY* fortunate.", 350, 680)
    }
}

function generateRandomNumbers() {
    let count = 0;
    while (count < 7) {
        let randomNumber = Math.floor(random(1, 50)); // first generate random number
        if (randomList.includes(randomNumber) === false) { // check if random number is already in list
            randomList.push(randomNumber) // if not, add it to list
            count = count + 1 // incrementing count
        }

    }
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

}

function generateRandomSlots() {
    slot1 = floor(random(slotImgs.length));
    slot2 = floor(random(slotImgs.length));
    slot3 = floor(random(slotImgs.length));
}

function spinSlots() {
    if (slotSpeed > 0) {
        slotSpeed -= 0.1;
    } else {
        if (slotSpeed < 0) {
            slotSpeed = 0;
        }
        if (slotSpeed === 0) {
            if (slot1 === slot2 && slot2 === slot3) {
                drawFortuneBLucky = true
            }
            else if (slot1 !== slot2 && slot2 === slot3 || slot1 === slot2 && slot2 !== slot3 || slot1 === slot3 && slot3 !== slot2) {
                drawFortuneBLuckyish = true
            }
            else if (slot1 !== slot2 && slot2 !== slot3) {
                drawFortuneBUnlucky = true
            }
            isSpinning = false;
        }
    }
    // 
    slot1 = (slot1 + 1) % slotImgs.length;
    slot2 = (slot2 + 1) % slotImgs.length;
    slot3 = (slot3 + 1) % slotImgs.length;
}