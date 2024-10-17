/**
 * Time and JavaScript and p5
 * Mary Dedes
 * 
 * Just looking at time in p5.
 */

"use strict";

const ball = {
    x: 0,
    y: 200,
    size: 50
}

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(400, 400)

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);

    ball.x += 1;

    push();
    noStroke();
    ellipse(ball.x, ball.y, ball.size);
    pop();
}