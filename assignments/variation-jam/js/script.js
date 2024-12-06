/**
 * Fortune-Telling Crystal Ballifications
 * Mary Dedes
 * 
 * WELCOME one and all to this *INCREDIBLE*, *LIFE-CHANGING* (or *LIFE AFFIRMING?*) 
 * compilation of fortune-telling experiences. 
 * 
 * To navigate this experience (and the experiences within it), simply 
 * follow the instructions below:
 * 
 * - When you are on the menu page, simply click on a floating crystal ball for
 *    a fortune-telling.
 * 
 * -- If you reach 'FORTUNE APPARITIONS":
 * 1 - Rub the ball with your hand to activate it. See it shake! 
 * 2 - Click on the ball to reveal your fortune and the apparition! *wWWWoOoOooooOo*
 * 3 - You will have refresh the page and re-access this experience to get a new fortune.
 * 
 * -- If you reach 'LUCK FORTUNE SLOT MACHINE':
 * 1 - Simply click in the large center ball to start the slottin'.
 * 2 - Let the Lucky Charms speak their spinny truth.
 * 3 - Get a good idea of your luck state today!!
 * 
 * -- If you reach 'POTENTIAL LOTTO MAX FORTUNE NUMBER GENERATOR FORTUNE':
 * 1 - Click in the lowest ball at the center to activate the Lotto Max number generator.
 * 2 - Be amazed as your potential literal fortune *might* be found in these numbers (fortune-achieving results NOT guranteed).
 * 
 * -- If you reach 'REALITY CHECK FORTUNE':
 * 1 - Click inside the giant floating crystal ball.
 * 2 - Prepare yourself for a life-altering revelation.
 * 
 * And that's it! Enjoy the experience!!! You can pay in cash after you're done!!
 * 
 * 
 * *NOTE*
 * Sample code from this sketch was used to create the Lucky Charms slot machine: https://editor.p5js.org/felicwong1/sketches/eeX2HnHbj
 * I also used this https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes to figure out Array.prototye.includes()
 * under Sabine's guidance.
 * 
 * BIG BIG BIG thank you to Sabine for helping me!! And to Pippin for his unwavering support!!
 */

"use strict";

//These are several variables used primarily to able to activate 
// certain actions/elements with a click of the mouse - or touch of your hand rather!

// These are used to be able to activate the Fortune A apparitions in mouseClicked.
let fortuneALlamaImage = undefined; // This enables the llama fortune apparation.
let fortuneASockImage = undefined; // This enables the smelly sock fortune apparition.
let fortuneAGnomeImage = undefined; // This enables the business-savvy gnoble gnome apparition.
let fortuneACactusImage = undefined; // This enables the wisecracking pet cactus apparition.
let fortuneACigarImage = undefined; // This enables Crystal Ball A's leisuring cigar holding hand apparition.
let fortuneATireImage = undefined; // This enables your possibly eaten tire apparition.

// These are used to activate specific luck assessments according to the Lucky Charms combos in Fortune B's slot machiine.
let drawFortuneBLucky = false; // This will be true if all three Charms are identical!
let drawFortuneBUnlucky = false; // This will be true when all three Charms are different.
let drawFortuneBLuckyish = false; // This will be true if only 2 Charms are identical-  no matter the order.

// These are used to activate Fortune C's lottery number generator and comment in moueClicked
let drawTextBoolean = false; // // This is used to draw Fortune C's desperate comment. It will be true in mouseClicked.
let drawDigit = false //This is used to draw the numbers. Will be true in mouseClicked.
let randomList = [] // This is to help define an array of random numbers.

// These are used to activate Fortune D's shaking finger and text in mouseClicked.
let drawFortuneD = false; // This is used to draw the Reality Check text. It will be true in mouseClicked.
let animateShakingFinger = false; // This is used to be able to draw the disciplinary shaking finger. It will be true in mouseClicked.
let direction = "right"; // This is used to help define the finger's direction so it animates.
let rotateFinger = 0; // This value helps determine the hand's angle (how much it tilts/ it disapproves of you).

// This variable helps define the Title Screen/ Menu state for seamless transitioning between scenes in the experience.
let crystalBallState = "M"


// These are our Fortune Telling Crystal Balls as JS Objects.

// Menu crystal balls so you can choose your adventure - or fortune telling experience rather.
let menuCrystalBalls = [
    { // This is Menu Ball 0, linked to Fortune A.
        // Ball position
        x: 150,
        originalY: 450, // This will be used to help balls float.
        y: 450,
        // Ball size
        size: 100,
        // Values that help define the balls' floatery.
        floatiness: 4,
        angle: 0.3
    },
    { // This is Menu Ball 1, linked to Fortune B.
        x: 240,
        originalY: 600,
        y: 600,
        size: 100,
        floatiness: 6,
        angle: 0.1
    },
    { // This is Menu Ball 2, linked to Fortune C.
        x: 460,
        originalY: 600,
        y: 600,
        size: 100,
        floatiness: 6,
        angle: 0.5
    },
    { // This is Menu Ball 3, linked to Fortune D.
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
    // Position
    x: 350,
    y: 355,
    // Size
    size: 320
}

// Our mystical balls B.
let crystalBallBs = [
    { // Crystal Ball B 0.
        x: 150,
        originalY: 250,
        y: 250,
        size: 110,
        floatiness: 6,
        angle: 0

    },
    {// Crystal Ball B 1.
        x: 550,
        originalY: 250,
        y: 250,
        size: 110,
        floatiness: 6,
        angle: 0
    },
    { // Crystal Ball B 2.
        x: 350,
        originalY: 370,
        y: 370,
        size: 295,
        floatiness: 0,
        angle: 0
    }
];

// Our lucky(?) balls C.
let crystalBallCs = [
    { // Crystal Ball C 0.
        x: 155,
        originalY: 255,
        y: 255,
        size: 90,
        floatiness: 5,
        angle: 0
    },
    { // Crystal Ball C 1.
        x: 152,
        originalY: 370,
        y: 370,
        size: 90,
        floatiness: 5,
        angle: 0
    },
    { // Crystal Ball C 2.
        x: 230,
        originalY: 450,
        y: 450,
        size: 90,
        floatiness: 5,
        angle: 0
    },
    { // Crystal Ball C 3.
        x: 350,
        originalY: 480,
        y: 480,
        size: 90,
        floatiness: 5,
        angle: 0
    },
    { // Crystal Ball C 4.
        x: 470,
        originalY: 450,
        y: 450,
        size: 90,
        floatiness: 5,
        angle: 0
    },
    { // Crystal Ball C 5.
        x: 548,
        originalY: 370,
        y: 370,
        size: 90,
        floatiness: 5,
        angle: 0
    },
    { // Crystal Ball C 6.
        x: 545,
        originalY: 255,
        y: 255,
        size: 90,
        floatiness: 5,
        angle: 0
    }
]

// Our stern ball D.
let crystalBallD = {
    x: 350,
    originalY: 425,
    y: 425,
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

// Our Lucky Charms slot images will be used in experience B.
let slotImgs = []; // These images are stored on the slot machine wheels.

// Defining variables for experience B: the Slot Machine Luck Tester.
let slotSpeed = 10; // This defines the wheel rotation speed.
let slot1, slot2, slot3; // These are used to define the wheel positions.
let isSpinning = false; // Is the wheel spinning? Not yet! It will be in mouseClicked though!



/**
 * We must magically load all our apparitions, visual fortunes and furnishings!
 */
function preload() {
    // Loading our hand, curtain and stool images into the program for *ambiance*.
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

    // Loading our Lucky Charms slot images. I titled them all a certain way so I can do this - less code to deal with!
    for (let i = 1; i <= 8; i++) {
        slotImgs.push(loadImage('assets/images/charms/slot_' + i + '.png'));
    } // This came from the Slot Machine sample code I borrowed.
}


/**
 * Creating a 700x800 canvas to set up the scene.
*/
function setup() {
    createCanvas(700, 800);
    // Removing cursor from our sight so we only see our delicate hand.
    noCursor();
    generateRandomNumbers(); // Fortune C will always be generating numbers - you just won't see until you click on that center ball!
    generateRandomSlots(); // Fortune D will always be generating those slots - you can click in the big Crystal Ball B to watch it go.
}

/**
 * This is where all the magic happens! 
 * This is the basic skeleton of the whole experience: 
 * all "scenes" or "states" of the experience switch here accordingly.
*/
function draw() {
    // If you are at the menu scene, then all menu elements will appear only.
    if (crystalBallState === "M") {
        drawMenu();
    }
    // Your hand shall always appear throughout the entire experience!
    drawHand();
    // If you are at Fortune A, then the Fortune A experience will be drawn.
    if (crystalBallState === "A") {
        drawFortuneTellingA()
    }
    // If you are at Fortune B, then the Fortune B experience will be drawn.
    else if (crystalBallState === "B") {
        drawFortuneTellingB()
    }
    // If you are at Fortune C, then the Fortune C experience will be drawn.
    else if (crystalBallState === "C") {
        drawFortuneTellingC()
    }
    // If you are at Fortune D, then the Fortune D experience will be drawn.
    else if (crystalBallState === "D") {
        drawFortuneTellingD()
    }
}

/**
 * Draws our mysterious menu.
 */
function drawMenu() {
    // The background colour will stay consistent throughout the whole experience.
    background(20, 20, 40)

    // Displays our welcoming welcome title.
    push();
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(25);
    fill('white')
    text("* WELCOME TO YOUR FORTUNE TELLING *", 350, 200);
    // Displays our basic instructive instructions.
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(15);
    fill('white')
    text("Click on a crystal ball to begin an experience.", 350, 350);
    pop();

    // Displays our array of menu Crystal Balls.
    for (let menuCrystalBall of menuCrystalBalls) {
        drawMenuCrystalBall(menuCrystalBall);
    }
}

/**
 * Draws our menu Crystal Balls' characteristics, like their colour shifting
 * and their floatiness.
 */
function drawMenuCrystalBall(menuCrystalBall) {
    push();
    noStroke();

    // When you move the mouse around the balls,
    // the balls' colour changes, *ooOoooUuU*.
    // When the mouse hovers over a different ball,
    // a different colour will appear. All balls change to
    // the colour of the ball upon which your hand lays,
    // meaning they all know which ball you're hovering over!
    // *MAGIC*
    let r = map(mouseX, 200, 500, 200, 500);
    let b = map(mouseX, 200, 500, 500, 200);

    // Styles the ball.
    fill(r, 0, b);
    // Makes the balls *float* in a cool way.
    menuCrystalBall.angle += 0.1
    menuCrystalBall.y = sin(menuCrystalBall.angle) * menuCrystalBall.floatiness + menuCrystalBall.originalY
    ellipse(menuCrystalBall.x, menuCrystalBall.y, menuCrystalBall.size);
    pop();
}

/**
 * This draws Fortune A. Creates the mystical ambiance with a dark background 
 * and draws the magical Crystal Ball A so it really stands out.
 * You also have a hand to *touch* and *rub* the ball!!
*/
function drawFortuneTellingA() {
    drawRoom(); //Draws the background, including curtains.
    drawStool(); // Draws the stool upon which the ball lays.
    drawCrystalBallA(); // Draws Crystal Ball A.
    drawHand(); // Draws our dainty hand.

    // This draws the title of Fortune A, so we kinda know what we're getting into.
    // This could've been a function, but I did not find it super necessary. 
    // It is easier for me to edit it here.
    push();
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(20);
    fill('white');
    text("'FORTUNE APPARITIONS' ", 350, 140);
    pop();
}

/**
 * This draws Fortune B. Creates the mystical ambiance of Fortune B and draws the magical Crystal Balls B .
 */
function drawFortuneTellingB() {
    drawRoom();
    drawStool();
    drawCrystalBallB();
    drawHand();

    // This draws the title of Fortune B, so we kinda know what we're getting into.
    // This could've been a function, but I did not find it super necessary.
    // It is easier for me to edit it here.
    push();
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(20);
    fill('white')
    text("'LUCK FORTUNE SLOT MACHINE' ", 350, 140)
    pop();
}

/**
 * This draws Fortune C. Creates the mystical ambiance of Fortune C and draws the magical Crystal Balls C .
 */
function drawFortuneTellingC() {
    drawRoom();
    drawStool();
    drawCrystalBallC();
    drawTextC(); // Draws the text that appears in Fortune C when you click!
    drawHand();

    // This draws the first title line of Fortune C, so we can begin to know what we're getting into.
    push();
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(20);
    fill('white')
    text("'POTENTIAL LOTTO MAX FORTUNE", 350, 130)
    // This draws the second title of Fortune C, so we fully know what we're getting into.
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(20);
    fill('white')
    text("NUMBER GENERATOR FORTUNE'", 350, 160)
    pop();
}

/**
 * This draws Fortune D. Creates the mystical ambiance of Fortune D and draws the wise Crystal Ball D.
 */
function drawFortuneTellingD() {
    drawRoom();
    drawCrystalBallD();
    drawTextD(); // Draws the text that appears in Fortune D when you click!
    drawHand();

    // This draws the title of Fortune D, so we kinda know what we're getting into.
    // This could've been a function, but I did not find it super necessary.
    // It is easier for me to edit it here.
    push();
    textAlign(CENTER, CENTER);
    textStyle(BOLDITALIC);
    textSize(20);
    fill('white')
    text("'REALITY CHECK FORTUNE'", 350, 140)
    pop();
}


/**
 * Draws our hand so we can rub the Crystal Ball!
 */
function drawHand() {
    image(handImage, mouseX, mouseY)
}

/**
 * Draws our dark room.
 */
function drawRoom() {
    // The darkness of the room; no light except that of the ball(s)!
    background(20, 20, 40);
    // Adding the curtains for extra ambiance...
    curtainImage.resize(width, height);
    image(curtainImage, 0, 0);
}

/**
 * Draws our rustic stool upon which rests our future (the ball(s)).
 */
function drawStool() {
    stoolImage.resize(590, 488)
    image(stoolImage, 55, 443);
}

/**
 * Draws our mystical, magical crystal ball set A.
 */
function drawCrystalBallA() {
    drawBallA(); // The Ball.
    drawLeftFrontLegA(); // The left leg.
    drawRightFrontLegA(); // The right leg.
    drawFortuneA(); // The fortune A!!
}

/**
 * Draws our slotty crystal ball set B.
 */
function drawCrystalBallB() {
    drawBallB(crystalBallBs[0], slot1, false) // Slot 1 is on this ball.
    drawBallB(crystalBallBs[1], slot2, false) // Slot 2 is on this ball.
    drawBallB(crystalBallBs[2], slot3, true) // Slot 3 is on this ball. Our fortune text will only appear on *this* ball!
    // This is how the spinning wheel gets activated!
    if (isSpinning) {
        spinSlots();
    }
    // We want our center ball to have legs.
    drawLeftFrontLegA();
    drawRightFrontLegA();
}

/**
 * Draws our Lotto Max number generator crystal ball set C.
 */
function drawCrystalBallC() {
    // Indicates the position of the digit within the array.
    let index = 0;
    // We are drawing each Crystal Ball C with a generated Lotto Max number.
    for (let crystalBallC of crystalBallCs) {
        drawBallC(crystalBallC, randomList[index]);  // This keeps generating a number for each ball.
        index++;
    }
}

/**
 * Draws our wise crystal ball D.
 */
function drawCrystalBallD() {
    drawBallD();
    drawShakingFinger(); // Draws the shaking finger of discipline inside the ball.
}

/**
 * Draws our animated shaking finger apparition.
 */
function drawShakingFinger() {
    // If the finger is shaking,
    if (animateShakingFinger === true) {
        // the direction starts off right (which we previously defined it is). 
        // When that is the case,
        if (direction === "right") {
            // the finger rotates towards the left in the way described below.
            if (rotateFinger < 0.25) { // This determines how angled the finger starts off.
                push();
                translate((crystalBallD.x - 60), (crystalBallD.y + 50)) // This places the finger in Fortune D.
                //This value influences how quickly the finger will rotate.
                rotate(rotateFinger)
                rotateFinger += 0.01
                // This is the finger shaking apparation image to which we are applying the animation.
                image(shakingFingerImage, 0, -200)
                pop();
                // When the finger is no longer right, it is left!
            } else { direction = "left" }
        }
        // When the finger is going towards the left,
        if (direction === "left") {
            // it moves in the way descibed below. 
            // We want to keep it consistent to how it rotates when it is right for seamless animation.
            if (rotateFinger >= -0.25) { // This determines how angled the finger ends up. It is basically a reflection of how it started off from the right.
                push();
                translate((crystalBallD.x - 60), (crystalBallD.y + 50)) // We want the finger to stay in the same place as it was when it was right.
                //We want a consistent speed that is the same as it was when it was right.
                rotate(rotateFinger)
                rotateFinger -= 0.01
                // We want the same apparation image to be animated.
                image(shakingFingerImage, 0, -200)
                pop();
                // When the finger is no longer left, it goes back right!
            } else { direction = "right" }
        }
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
 * Draws the golden claw-like left front "leg" that supports our crystal ball(s).
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
 * Draws the golden claw-like left front "leg" that supports our crystal ball(s).
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
 * Displays our shocking fortunes and apparations A in Crystal Ball A!
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

    // This set of conditionals helps associate apparitions to their respective fortune.
    // What you will read is indeed what you will get!

    // If the pet cactus image variable is defined, the cactus apparaition will appear.
    if (fortuneACactusImage !== undefined) {
        image(fortuneACactusImage, 50, 125)
        // This is what the cactus says when he appears. Maybe I'll eventually make an array of different cactus puns for him to say each time?
        push();
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(8);
        fill('black');
        text("You're lookin' sharp.", 250, 180);
        pop();

        // If the cigar hand image variable is defined, the leisuring hand apparition will appear.
    } else if (fortuneACigarImage !== undefined) {
        image(fortuneACigarImage, 450, 400)

        // If the tire image variable is defined, the eaten tire apparition will appear.
    } else if (fortuneATireImage !== undefined) {
        image(fortuneATireImage, 60, 340)

        // If the MBA-holder gnome image variable is defined, the gnome economist apparition will appear.
    } else if (fortuneAGnomeImage !== undefined) {
        image(fortuneAGnomeImage, 456, 250)
        push();
        // First line of the link to the tips.
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(5);
        fill('black')
        text("https://www.schwab.com/learn/story/", 626, 305)
        //Second line to the link to the tips.
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(5);
        fill('black')
        text("stock-investment-tips-beginners", 626, 310)
        pop();

        // If the lost sock image variable is defined, the dirty sock apparition will appear.
    } else if (fortuneASockImage !== undefined) {
        image(fortuneASockImage, 250, 180)

        // If the clever llama variable is defined, the smiling apparition will appear.
    } else if (fortuneALlamaImage !== undefined) {
        image(fortuneALlamaImage, 50, 350)
    }
}

/**
 * Displays our Lucky Charms slots in Crystal Balls B!
 */
function drawBallB(crystalBallB, index, isLargeBallB) {
    push();
    noStroke();
    // When you move the mouse around the balls,
    // the balls' colour changes, *ooOoooUuU*.
    let r = map(mouseX, 100, 600, 100, 600);
    let b = map(mouseX, 100, 600, 600, 100);

    // Style the ball.
    fill(r, 0, b);

    // Make the two small balls floaty.
    crystalBallB.angle += 0.1
    crystalBallB.y = sin(crystalBallB.angle) * crystalBallB.floatiness + crystalBallB.originalY
    // Makes crystal balls, crystal ball-shaped.
    ellipse(crystalBallB.x, crystalBallB.y, crystalBallB.size);

    // This is where we display all our slots and their images!
    image(slotImgs[index], (crystalBallB.x - 40), (crystalBallB.y - 40), 80, 80); // This is to place the slots where I want in Crystal Ball Bs.

    //This set of conditionals determines the fortune associated to the luck verdict, and that it will displayed in the big ball.

    // If the verdict is "lucky" and the big ball B is indeed the big ball B,
    if (drawFortuneBLucky === true && isLargeBallB === true) {
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(16);
        fill('white')
        // then this is the fortune displayed.
        text("You *just* might be lucky!", crystalBallB.x, (crystalBallB.y + 60))
    }
    // If the verdict is "luckyish" and the big ball B is indeed the big ball B,
    else if (drawFortuneBLuckyish === true && isLargeBallB === true) {
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(16);
        fill('white')
        // then this is the fortune displayed.
        text("Doesn't cut it. Not that lucky.", crystalBallB.x, (crystalBallB.y + 60))
    }
    // If the verdict is "unlucky" and the big ball B is indeed the big ball B,
    else if (drawFortuneBUnlucky === true && isLargeBallB === true) {
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(10);
        fill('white')
        // then this is the fortune displayed.
        text("Do not test your luck today - results are negative.", crystalBallB.x, (crystalBallB.y + 60))
    }
    pop();
}

/**
 * Draws our Crystal Balls C and the Lotto Max numbers in them!
 */
function drawBallC(crystalBallC, randomDigit) {
    push();
    noStroke();

    // When you move the mouse around the crystal balls,
    // the balls' colour changes, *ooOoooUuU*.
    let r = map(mouseX, 100, 600, 100, 600);
    let b = map(mouseX, 100, 600, 600, 100);

    // Style crystal balls.
    fill(r, 0, b);

    // Make crystal balls floaty.
    crystalBallC.angle += 0.1
    crystalBallC.y = sin(crystalBallC.angle) * crystalBallC.floatiness + crystalBallC.originalY

    // Shape balls.
    ellipse(crystalBallC.x, crystalBallC.y, crystalBallC.size);

    // If the generated numbers are appearing,
    // they will appear as decribed below.
    if (drawDigit === true) {
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(25);
        fill('white')
        text(randomDigit, crystalBallC.x, crystalBallC.y) // The text will be the generated number, and will be placed inside Crystal Balls C.
    }
    pop();
}

/**
 * Draws the desperate statement in Fortune C!
 */
function drawTextC() {
    // If the statement becomes true in mouseClicked, it looks as described below.
    if (drawTextBoolean === true) {
        push();
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(20);
        fill('white');
        text("MAYBE *this* time???", 350, 330);
        pop();
    }
}

/**
 * This is where the numbers in Fortune C get generated! 
 * We make sure numbers don't repeat themselves!
 */
function generateRandomNumbers() {
    let count = 0;
    while (count < 7) { // We have 7 crystal balls, therefore 7 numbers to generate.
        let randomNumber = Math.floor(random(1, 50)); // First, we generate a random number,
        // (Where we found how to use Array.prototye.includes(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes).
        if (randomList.includes(randomNumber) === false) { // Then, we check if the random number is already in the list.
            randomList.push(randomNumber) // If not, we add it to list.
            count = count + 1 // Here we increment the count.
        }
    }
    //
}

/**
 * We generate the random Charms in each slot in Fortune C!
 */
function generateRandomSlots() {
    slot1 = floor(random(slotImgs.length));
    slot2 = floor(random(slotImgs.length));
    slot3 = floor(random(slotImgs.length));
}

/**
 * We generate the random Charm slot wheels in each slot in Fortune C!
 */
function spinSlots() {
    // If the slot wheel's speed is more than 0,
    if (slotSpeed > 0) {
        // this is its speed.
        slotSpeed -= 0.1;
    } else {
        //If the slot wheel's speed is less than 0,
        if (slotSpeed < 0) {
            // the speed is zero.
            slotSpeed = 0;
        }
        // If the slot speed is 0,
        if (slotSpeed === 0) {
            // then when all Charms are identical, the fortune verdict is lucky!
            if (slot1 === slot2 && slot2 === slot3) {
                drawFortuneBLucky = true
            }
            // then when 2 Charms are identical to eachother, but the other is different, the fortue verdict is luckyish.
            else if (slot1 !== slot2 && slot2 === slot3 || slot1 === slot2 && slot2 !== slot3 || slot1 === slot3 && slot3 !== slot2) {
                drawFortuneBLuckyish = true
            }
            // then when all charms are different from eachother, the fortune verdict is unlucky.
            else if (slot1 !== slot2 && slot2 !== slot3) {
                drawFortuneBUnlucky = true
            }
            // the wheel is no longer spinning when the slot speed is 0.
            isSpinning = false;
        }
    }
    // This updates the spinning wheels' positions so that Charms are not the same with every consecutive spin.
    slot1 = (slot1 + 1) % slotImgs.length;
    slot2 = (slot2 + 1) % slotImgs.length;
    slot3 = (slot3 + 1) % slotImgs.length;
}

/**
 * Draws Crystal Ball D in all its floaty glory!
 */
function drawBallD() {
    push();
    // When you move the mouse around the ball,
    // the ball's colour changes, *ooOoooUuU*.
    let r = map(mouseX, 0, 700, 0, 700);
    let b = map(mouseX, 0, 700, 700, 0);

    // Style the ball.
    fill(r, 0, b);

    // Make ball floaty.
    crystalBallD.angle += 0.05;
    crystalBallD.y = sin(crystalBallD.angle) * crystalBallD.floatiness + crystalBallD.originalY;

    // Draw the ball.
    circle(crystalBallD.x, crystalBallD.y, crystalBallD.size);
    pop();
}

/**
 * Draws the epic, wise, life-changing advice in Fortune D!
 */
function drawTextD() {
    // If the fortune becomes true in mouseClicked, 
    // the text will appear as decribed below.
    if (drawFortuneD === true) {
        push();
        // The first line of the advice.
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(18);
        fill('white')
        text("AH AH AH! Quit searching for your fortune and go make it!", 350, 650)
        // The second line of the advice.
        textAlign(CENTER, CENTER);
        textStyle(BOLDITALIC);
        textSize(18);
        fill('white')
        text("Live your life to the fullest - then you will be *TRULY* fortunate.", 350, 680)
        pop();
    }
}



// We will define our random Fortune A variables here.
let fortuneA = undefined;
let fortuneARead = false;

/**
 * Time for fortunes to be unveiled! This function helps determine
 * our fortunes and other elements when they will appear (via a click of the mouse - 
 * I mean a tap of the hand!).
 */
function mouseClicked() {
    // If you are on the menu:
    if (crystalBallState === "M") {

        // (This is where we define where we want the hand to be to be able to click on each experience.
        // There is a more efficient way to write this, but we kept it like this so I would understand it.)

        // This defines Fortune A's Menu Crystal Ball clicking space.
        const distanceMenu = dist(mouseX, mouseY, menuCrystalBalls[0].x, menuCrystalBalls[0].y);
        const mouseInsideMenuCrystalBalls = (distanceMenu < menuCrystalBalls[0].size);

        // This defines Fortune B's Menu Crystal Ball clicking space.
        const distanceMenuB = dist(mouseX, mouseY, menuCrystalBalls[1].x, menuCrystalBalls[1].y);
        const mouseInsideMenuCrystalBallsB = (distanceMenuB < menuCrystalBalls[1].size);

        // This defines Fortune C's Menu Crystal Ball clicking space.
        const distanceMenuC = dist(mouseX, mouseY, menuCrystalBalls[2].x, menuCrystalBalls[2].y);
        const mouseInsideMenuCrystalBallsC = (distanceMenuC < menuCrystalBalls[2].size);

        // This defines Fortune D's Menu Crystal Ball clicking space.
        const distanceMenuD = dist(mouseX, mouseY, menuCrystalBalls[3].x, menuCrystalBalls[3].y);
        const mouseInsideMenuCrystalBallsD = (distanceMenuD < menuCrystalBalls[3].size);


        // These are the conditionals that associate the correct Fortune experience with the correct Menu Crystal Ball.

        // then if the hand clicks inside the far left Menu Ball, you will access Fortune A.
        if (mouseInsideMenuCrystalBalls === true) {
            crystalBallState = "A"
        }
        // then if the hand clicks inside the lower left Menu Ball, you will access Fortune B.
        else if (mouseInsideMenuCrystalBallsB === true) {
            crystalBallState = "B"
        }
        // then if the hand clicks inside the lower right Menu Ball, you will access Fortune C.
        else if (mouseInsideMenuCrystalBallsC === true) {
            crystalBallState = "C"
        }
        // then if the hand clicks inside the far right Menu Ball, you will access Fortune D.
        else if (mouseInsideMenuCrystalBallsD === true) {
            crystalBallState = "D"
        }
    }
    // If you are on Fortune A, the following will happen:
    else if (crystalBallState === "A") {
        // We want the mouse to click on the ball to activate its fortune/ apparitions.
        const distance = dist(mouseX, mouseY, crystalBallA.x, crystalBallA.y);
        const mouseInsideCrystalBallA = (distance < crystalBallA.size / 2);

        // The fortune will only be unveiled unless the mouse is clicked
        // inside the circle. Once it clicks, the fortune will not regenerate
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
            if (p < 0.01) { // If this is the probability result you get, you will get the gnome! 
                fortuneA = "A gnome will give you stock tips.";
                fortuneAGnomeImage = gnomeImage
            }
            // Between 0.01 and 0.11 means this one is 10% of the time
            else if (p < 0.11) { // If this is the probability result you get, you will get the cactus!
                fortuneA = "Your next pet will be a wisecracking cactus.";
                fortuneACactusImage = wisecrackingCactusImage
            }
            // Between 0.11 and 0.26 means this one is 15% of the time
            else if (p < 0.26) { // If this is the probability result you get, you will get the sock!
                fortuneA = "You will lose your left sock. Eventually."
                fortuneASockImage = sockImage
            }
            // Between 0.26 and 0.31 means this one is 5% of the time
            else if (p < 0.31) { // If this is the probability result you get, you will get the llama!
                fortuneA = "A llama will offer you life advice, but only in riddles."
                fortuneALlamaImage = smileyLlamaImage
            }
            // Between 0.31 and 0.61 means this one is 30% of the time
            else if (p < 0.61) { // If this is the probability result you get, you will get the tire!
                fortuneA = "Your tire may or may not get slighty eaten."
                fortuneATireImage = eatenTireImage
            }
            // Between 0.61 and 1.0 means this one is 39% of the time
            else { // Otherwise, you will get the cigar hand!
                fortuneA = "Get lost, chump. I ain't feelin' it today."
                fortuneACigarImage = cigarHandImage
            }
            // When the mouse gets clicked, the fortunes will be read, and they will stay until you refresh the page.
            fortuneARead = true;
        }
    }
    // If you are on Fortune B, the following will happen:
    else if (crystalBallState === "B") {

        // We want the mouse to click on the big ball to activate the Lucky Charms slots.
        const distance = dist(mouseX, mouseY, crystalBallBs[2].x, crystalBallBs[2].y);
        const mouseInsideCrystalBallB = (distance < crystalBallBs[2].size / 2);

        // The slots will only be spin unless the mouse is clicked
        // inside the big ball. The fortunes will also appear only after the first spin,
        // and after spins are done.
        // You can keep clicking to spin the wheels anew.
        if (mouseInsideCrystalBallB) {
            isSpinning = true;
            slotSpeed = 10;
            drawFortuneBLucky = false;
            drawFortuneBLuckyish = false;
            drawFortuneBUnlucky = false;
        }
    }
    // If you are on Fortune C, the following will happen:
    else if (crystalBallState === "C") {
        // We want the mouse to click on the center ball to activate the Lotto Max Ticket numbers generator.
        const distance = dist(mouseX, mouseY, crystalBallCs[3].x, crystalBallCs[3].y);
        const mouseInsideCrystalBallC = (distance < crystalBallCs[3].size);

        // The numbers will only appear unless the mouse is clicked
        // inside the center ball. The desperate statement will also appear at the same time.
        if (mouseInsideCrystalBallC) {
            drawDigit = true;
            drawTextBoolean = true;
        }
    }
    // If you are on Fortune D, the following will happen:
    else if (crystalBallState === "D") {
        // We want the mouse to click on the Crystal Ball D to activate the Jurassic Park reference Reality Check fortune.
        const distance = dist(mouseX, mouseY, crystalBallD.x, crystalBallD.y);
        const mouseInsideCrystalBallD = (distance < crystalBallD.size / 2);

        // The shaking finger will only appear unless the mouse is clicked
        // inside the ball. The wise words of advice will also appear at the same time.
        if (mouseInsideCrystalBallD) {
            animateShakingFinger = true;
            drawFortuneD = true;
        }
    }
}
/**
 * Makes Crystal Ball A shake when you hover your hand on it and rub it! 
 */
function mouseMoved() {
    //Defining variables to indicate where we want your hand to be to be able to rub Crystal Ball A (hint: we want it inside the ball).
    const distance = dist(mouseX, mouseY, crystalBallA.x, crystalBallA.y);
    const mouseInsideCrystalBallA = (distance < crystalBallA.size / 2);

    // If your hand is rubbing the ball before clicking for fortune reveal,
    if (mouseInsideCrystalBallA && !fortuneARead) {
        // the ball shakes! It is is activating!
        crystalBallA.x = crystalBallA.x + random(-0.3, 0.3);
        crystalBallA.y = crystalBallA.y + random(-0.3, 0.3);
    }
}

