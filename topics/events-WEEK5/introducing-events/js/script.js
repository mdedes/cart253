/**
 * Introducing Events
 * Mary Dedes
 * 
 * Taking a look at how events work in Javascript and p5.
 */

"use strict";

/**
 * 
*/
function setup() {
    createCanvas(400, 400);
    background(0);

}


/**
 * 
*/
function draw() {

}

/**
 * Draws a circle at the mouse location
 */
function mousePressed() {
    push();
    noStroke();
    fill(255, 255, 0);
    ellipse(mouseX, mouseY, 50);
    pop();
}