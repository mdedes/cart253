/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 450,
        size: 130,
        keys: {
            leftArrowKey: 37,
            rightArrowKey: 39,
            upArrowKey: 38,
            spaceBar: 32
        },
        state: "idle",
        speed: 10,
        minX: 80,
        maxX: 560
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 10,
        speed: 30,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our coin
// Has a position, size, and speed of horizontal movement
const coin = {
    x: 0,
    y: 200, // Will be random
    size: 20,
    speed: {
        x: 5,
        y: 8
    },
    degree: 0
};

// Our curse
const curse = {
    x: 640,
    y: 440,
    size: 50,
    speed: -1.5
};

let scene = 0;

let score = 0;

// How long is the game (in milliseconds)
let gameTime = 10 * 1000; // 10 seconds

let gameOver = false;

const backgroundColour = "#87ceeb"

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    // Give the fly its first random position
    resetCoin();
}

function draw() {
    background(backgroundColour);
    switch (scene) {
        case 0:
            fill(255);
            textSize(50);
            textAlign(CENTER);
            text("Frog Prince", width / 2, height - 50);
            if (mouseIsPressed) {
                scene++
            }
            break;
        case 1:
            // Start the timer for the game to be over
            startGameOverTimer();
            // if (!gameOver) {
            moveCoin();
            drawCoin();
            moveCurse();
            drawCurse();
            moveFrog();
            moveTongue();
            drawScore();
            drawFrog();
            checkTongueCoinOverlap();
            checkFrogCurseOverlap();
            checkCoinsCollected();
            // }
            // else {
            //drawEndGame();
            // }
            break;
        case 2:
            fill(255);
            textSize(20);
            textAlign(CENTER);
            text("You now have enough coins for food and kissing booth!", width / 2, height - 50);
            break;
        case 3:
            fill(255);
            textSize(50);
            textAlign(CENTER);
            text("You died of hunger!", width / 2, height - 50);
            break;
    }
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveCoin() {
    // Move the fly
    coin.x += coin.speed.x;
    coin.degree += 0.2;
    coin.y = (coin.y) + (coin.speed.y * sin(coin.degree));
    console.log(coin.y);
    // Handle the fly going off the canvas
    if (coin.x > width) {
        resetCoin();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawCoin() {
    push();
    noStroke();
    fill("yellow");
    ellipse(coin.x, coin.y, coin.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetCoin() {
    coin.x = 0;
    coin.y = random(0, 300);
}

/**
 * Moves curse according to its speed
 */
function moveCurse() {
    curse.x += curse.speed;
    if (curse.x < 0) {
        resetCurse();
    }
}

function drawCurse() {
    push();
    noStroke();
    fill("purple");
    ellipse(curse.x, curse.y, curse.size);
    pop();
}

function resetCurse() {
    curse.x = 640;
    curse.y = 440;
}

/**
 * Handles the tongue overlapping the fly
 */
function checkFrogCurseOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.body.x, frog.body.y, curse.x, curse.y);
    // Check if it's an overlap
    const cursed = (d < frog.body.size / 2 + curse.size / 2);
    if (cursed) {
        // Reset the fly
        resetCurse()
        // Bring back the tongue
        resetScore();
    }

}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    if (frog.body.state === "idle") {
        // Do nothing
    }
    else if (frog.body.state === "outbound") {
        frog.body.y += -frog.body.speed;
        if (frog.body.y <= 250) {
            frog.body.state = "inbound"
        }
    }
    else if (frog.body.state === "inbound") {
        frog.body.y += frog.body.speed;
        if (frog.body.y >= height) {
            frog.body.state = "idle";
        }
    }
    if (keyIsPressed === true) {
        if (keyCode === frog.body.keys.leftArrowKey) {
            frog.body.x -= 10;
        } else if (keyCode === frog.body.keys.rightArrowKey) {
            frog.body.x += 10;
        } else if (keyCode === frog.body.keys.spaceBar && frog.body.state === "idle") {
            frog.body.state = "outbound"
        }
    }
    frog.body.x = constrain(frog.body.x, frog.body.minX, frog.body.maxX)
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

function checkCoinsCollected() {
    if (score === 2)
        scene = 2;
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueCoinOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, coin.x, coin.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + coin.size / 2);
    if (eaten) {
        // Reset the fly
        resetCoin()
        // Bring back the tongue
        frog.tongue.state = "inbound";
        score++;
        console.log(score)
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function keyPressed() {
    if (keyCode === frog.body.keys.upArrowKey && frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}

function resetScore() {
    score = 0
}

/**
 * Starts a timer that will end the game
 */
function startGameOverTimer() {
    setTimeout(endGame, gameTime);
}

/**
 * Ends the game
 */
function endGame() {
    if (score < 2) {
        (gameOver = true) && (scene = 3);
    }
}


/**
 * Displays the current score at the top left
 */
function drawScore() {
    push();
    fill("white");
    textSize(64);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(score, width / 8, height / 8);
    pop();
}