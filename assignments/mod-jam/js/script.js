/**
 * Frog Prince
 * 
 * Once upon a time there was a prince whose life got turned
 * upside down afer being transformed into a frog by a vengeful wizard. 
 * Now, he is not only forced to *earn* his living- devastating- 
 * but he must also be one with nature... oh the hu/frog/man/non-prince/ity(?)! 
 * 
 * Now he must spend the rest of his days just like any regular ol' frog-
 * catching coins to satisfy his money hunger (and to buy flies) and dodging anti-wealth curses before starving 
 * to death.
 * 
 * Will he ever escape this miserable existence?? Will he ever get his
 * happily ever after??? 
 * 
 * *Can* he????
 * 
 * Maybe you can help! By maybe I mean you definitely are going to help.
 * 
 * To help this spoiled frog prince who probably deserves all this, simply:
 * 
 * - Move the frog left by pressing the right arrow key, and right by pressing 
 *   the left arrow key (the wizard cursed the keys too, good luck)
 * - Press the up arrow to launch the tongue and catch coins (pretty intuitive)
 * - Press the spacebar to jump - press the left arrow key right after
 *   to leap over the floating anti-wealth curse 
 * - Collect 10 coins before a minute runs out or he'll starve to death 
 *   and it will be your fault. Not mine- I mean the wizard's.
 * - If you successfully collect enough coins, our frog lives, but he must 
 *   properly manage his finances or else...
 * 
 * *NOTE* The next step would've been to add fun images to better illustrate what is going on.
 * This would have made it look more polished. As new ideas about the concept popped up while I worked, 
 * I just prioritized making sure the basic program worked well at least. 
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our unfortunate (literally) frog prince.
const frog = {
    // The frog's body has a position and size.
    body: {
        x: 320,
        y: 450,
        size: 130,
        // These are the keys that will be use to control his not-so-Majesty.
        keys: {
            leftArrowKey: 37,
            rightArrowKey: 39,
            upArrowKey: 38,
            spaceBar: 32
        },
        //The state and speed help determine how the frog moves.
        state: "idle",
        speed: 10,
        // The frog will be constrained to stay within his prison canvas reality.
        minX: 80,
        maxX: 560
    },
    // The frog's tongue has a position, size, speed, and state.
    tongue: {
        x: undefined,
        y: 480,
        size: 10,
        speed: 30,
        // Determines how the tongue moves each frame.
        state: "idle" // State can be: idle, outbound, inbound.
    }
};

// Our precious magic floating coin(s).
// Has a position, size, and speed of horizontal movement.
const coin = {
    x: 0,
    y: 200, // Will be random.
    size: 20,
    speed: {
        x: 5,
        y: 8
    },
    degree: 0 // This is used to influence the wave the coin will make.
};

// Our cursey curse that will make us bankrupt!
const curse = {
    // Curses also come in all positions and sizes.
    x: 640,
    y: 440,
    size: 50,
    // The curse will come from the right, from where we least expect it to.
    speed: -1.5
};

//Setting up for some scenes. When the game reloads, 
// it will always start at this scene.
let scene = 0;

// Setting up our score! When the game reloads, you will always start poor.
let score = 0;

// How long do you have before death by starvation (in milliseconds)?
let gameTime = 60 * 1000; // You have 1 minute of guaranteed life!

// Setting up our timer variable!
let timer;

// The game is not over yet! The frog has yet to struggle.
let gameOver = false;

// Setting up our randomized outcomes post-wealth (if he gets there)!
let drop = undefined;

// Our background variable will always be the sky!
const backgroundColour = "#87ceeb"

/**
 * Creates the canvas and initializes the coin.
 */
function setup() {
    createCanvas(640, 480);
    // Give the coin its first random position.
    resetCoin();
}

/**
 * This is the whole frog's existence and destiny as decided by the wizard who cursed him.
 */
function draw() {
    background(backgroundColour);
    // These are the possible scenes of the frog's current life.
    // Depending on each outcome (how you interact with the game and whether you kill him or not),
    // the scenes will switch accordingly.
    switch (scene) {
        // This is the title of the game! When you reload the frog's life, you start here.
        case 0:
            fill(255);
            textSize(50);
            textAlign(CENTER);
            text("Frog Prince", width / 2, height - 50);
            // When you click your mouse, the scene switches to the next one. Here, case 1.
            if (mouseIsPressed) {
                startGameOverTimer();
                scene++
            }
            break;
        // This is where you desperately help the desperate frog collect coins before the time runs out!
        case 1:
            // Start the timer for the game to be over.
            moveCoin();
            drawCoin();
            moveCurse();
            drawCurse();
            moveFrog();
            drawFrog();
            moveTongue();
            drawScore();
            checkTongueCoinOverlap();
            checkFrogCurseOverlap();
            // If you collect the necessary amount of coins before starving to death,
            // there is still hope for you!
            checkCoinsCollected();
            break;
        // When frog prince dies, he doesn't go to heaven. You just stay on this screen. Until you reload.
        // Think about what you've done.
        case 2:
            fill(255);
            textSize(50);
            textAlign(CENTER);
            text("You died of hunger:(", width / 2, height - 50);
            break;
        // Congrats! He didn't die! Yet! Now that you helped him make money, 
        // he must decide what he actually does with it. And you might pay for it (see what I did there).
        // His decision decides his fate and his fate decides his decision... 
        // and all this will be random.
        case 3:
            clearTimeout(timer);
            timer = 0;
            fill(255);
            textSize(15);
            textAlign(CENTER);
            text("You now have enough coins for food! Click to find out what Frog Prince does with them...", width / 2, height - 50);
            // Getting a random number for the frog prince's destiny probability.
            // It is between 0..1
            const p = random();
            // Click the mouse to discover what fate has in store for the frog (and you).
            if (mouseIsPressed) {
                // 20% of the time!
                if (p < 0.21) {
                    drop = (scene = 4);
                }
                // Between 0.21 and 0.51 means this one is 30% of the time
                else if (p < 0.51) {
                    drop = (scene = 5);
                }
                // Between 0.51 and 0.91 means this one is 40% of the time
                else if (p < 0.91) {
                    drop = (scene = 6)
                }
            }
            break;
        // HUZZAH! At last! The frog found a pamphlet advertising a kissing booth with the local princess!!
        // If this is the frog's fate, the frog has a chance at true love's first kiss maybe. 
        // At least a meal ticket outta this pond. Yay!!
        case 4:
            fill(255);
            textSize(15);
            textAlign(CENTER);
            text("Frog Prince found a pamphlet adversting the local princess's kissing booth! We have enough money! Hurray!!", width / 2, height - 50);
            break;
        // Frog prince decided to get some frog flies for the week! Maybe he's adjusting to his new life...
        case 5:
            fill(255);
            textSize(15);
            textAlign(CENTER);
            text("You bought yourself some tasty french flies for the week! Being a frog ain't so bad...", width / 2, height - 50);
            break;
        // Frog Prince got power-hungry and decided to gamble. He lost everything and now you must restart.
        // Tsk tsk.
        case 6:
            fill(255);
            textSize(15);
            textAlign(CENTER);
            text("You just gambled away your money. Guess you better restart. Press any key to try again.", width / 2, height - 50);
            if (keyIsPressed) {
                restartGame();
            }
            break;
    }
}

/**
 * Moves the coin according to its speed.
 * Resets the coin if it gets all the way to the right.
 */
function moveCoin() {
    // Move the coin.
    coin.x += coin.speed.x;
    // We are going to make the coins float around in magical waves.
    coin.degree += 0.2;
    coin.y = (coin.y) + (coin.speed.y * sin(coin.degree));
    console.log(coin.y);
    // If a coin goes off canvas, a new one comes back! *Magic*.
    if (coin.x > width) {
        resetCoin();
    }
}

/**
 * Draws the beautiful coin as a golden circle.
 */
function drawCoin() {
    push();
    noStroke();
    fill("yellow");
    ellipse(coin.x, coin.y, coin.size);
    pop();
}

/**
 * Resets the coin to the left with a random y.
 */
function resetCoin() {
    coin.x = 0;
    coin.y = random(0, 300);
}

/**
 * Moves curse according to its speed.
 */
function moveCurse() {
    curse.x += curse.speed;
    if (curse.x < 0) {
        resetCurse();
    }
}

/**
 * Draws our cursey curse to be a purple ball.
 */
function drawCurse() {
    push();
    noStroke();
    fill("purple");
    ellipse(curse.x, curse.y, curse.size);
    pop();
}

/**
 * Resets curse to the right and stays and the same level.
 */
function resetCurse() {
    curse.x = 640;
    curse.y = 440;
}

/**
 * Ensures the curse curses the frog if they overlap.
 */
function checkFrogCurseOverlap() {
    // Get distance from frog to curse.
    const d = dist(frog.body.x, frog.body.y, curse.x, curse.y);
    // Check if the curse actually overlaps the frog.
    const cursed = (d < frog.body.size / 2 + curse.size / 2);
    if (cursed) {
        // Reset the curse.
        resetCurse()
        // Frog prince loses all his coins.
        resetScore();
    }
}

/**
 * Moves the frog using some cursed keys.
 */
function moveFrog() {
    // The frog doesn't do anything at this state.
    if (frog.body.state === "idle") {
        // Does nothing.
    }
    // Determines how frog jumps up at this state.
    else if (frog.body.state === "outbound") {
        frog.body.y += -frog.body.speed;
        if (frog.body.y <= 250) {
            frog.body.state = "inbound"
        }
    }
    // Determines how frog comes down and is no longer jumping (until you make it).
    else if (frog.body.state === "inbound") {
        frog.body.y += frog.body.speed;
        if (frog.body.y >= height) {
            frog.body.state = "idle";
        }
    }
    if (keyIsPressed === true) {
        // When you press the right arrow key, the frog moves left.
        if (keyCode === frog.body.keys.rightArrowKey) {
            frog.body.x -= 10;
            // When you press the left arrow key, the frog moves right.
        } else if (keyCode === frog.body.keys.leftArrowKey) {
            frog.body.x += 10;
            // When you press the spacebar, the frog jumps.
        } else if (keyCode === frog.body.keys.spaceBar && frog.body.state === "idle") {
            frog.body.state = "outbound"
        }
    }
    // The frog can't escape the canvas! He is constrained to stay in.
    frog.body.x = constrain(frog.body.x, frog.body.minX, frog.body.maxX)
}

/**
 * Handles moving the tongue based on its state.
 */
function moveTongue() {
    // Tongue matches the frog's x.
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything.
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up.
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top.
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down.
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom.
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body).
 */
function drawFrog() {
    // Draw the grippy tongue tip.
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue.
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

/**
 * Checks that if you help our frog collect the necessary amount of coins, 
 * he survives!
 */
function checkCoinsCollected() {
    if (score === 10)
        scene = 3;
}

/**
 * Handles the tongue overlapping the coin.
 */
function checkTongueCoinOverlap() {
    // Getting distance from tongue to coin.
    const d = dist(frog.tongue.x, frog.tongue.y, coin.x, coin.y);
    // Check if it's an overlap.
    const eaten = (d < frog.tongue.size / 2 + coin.size / 2);
    if (eaten) {
        // Reset the coin.
        resetCoin();
        // Bring back the tongue.
        frog.tongue.state = "inbound";
        score++;
        console.log(score)
    }
}

/**
 * Launch the tongue on click (if it's not launched yet).
 */
function keyPressed() {
    if (keyCode === frog.body.keys.upArrowKey && frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}

/**
 * Resets the score back to 0.
 */
function resetScore() {
    score = 0;
}

/**
 * Starts a timer that will kill the frog (end the game).
 */
function startGameOverTimer() {
    timer = setTimeout(frogDies, gameTime);
}

/**
 * Starves the frog. 
 */
function frogDies() {
    if (score < 10) {
        (gameOver = true) && (scene = 2);
    }
}

/**
 * Resetting the frog's miserabe coin hunting experience.
 */
function restartGame() {
    scene = 1;
    score = 0;
    gameOver = false;
    gameTime = 60 * 1000;
    startGameOverTimer();
}

/**
 * Displays how many coins have currently been collected.
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