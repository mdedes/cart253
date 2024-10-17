/**
 * Plain JavaScript Events
 * Mary Dedes
 * 
 * Experimenting with event handling in Plain JavaScript
 */

"use strict";

// Information about the current background fills
const bg = {
    fill: "#000000",
    fills: {
        black: "#000000",
        white: "#ffffff"
    },
    switchKey: 32 // spacebar
};

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(400, 400);

    // Listen for keypresses
    window.addEventListener("keydown", changeBG);
}


/**
 * Displays the background
*/
function draw() {
    background(bg.fill);
}

/**
 * Switches the background from black to white
 */
function changeBG(event) {
    if (event.keyCode === bg.switchKey) {
        if (bg.fill === bg.fills.black) {
            bg.fill = bg.fills.white;
        }
        else {
            bg.fill = bg.fills.black;
        }
    }
}

// "mousedown" "mouseup" "mousemove" "mouseenter" "mouseleave" "dblclick"
// "keydown" "keyup"