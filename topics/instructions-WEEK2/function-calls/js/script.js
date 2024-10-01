/**
 * The Blank Page
 * Mary Dedes
 * 
 * An exploration of the existential angst of a novelist confronting 
 * the blank page while under huge pressure from their publisher.
 * The program is non-interactive intentionally in order to simulate
 * the writer's inability to get started on the project.
 * 
 * Uses: 
 * p5.js
 * https://p5js.org/
 */

"use strict";

/**
 * Creates a 640x480 canvas for our masterpiece.
*/
function setup() {
// Once at the beginning of the program: Create the canvas at a standard resolution
createCanvas(640,480)
}


/**
 * Draws a blank piece of paper on a pink background.
*/
function draw() {
// Every frame
// The pink desktop
background(255, 100, 100)
// The blank piece of paper
rect(200, 80, 240, 320)
}
