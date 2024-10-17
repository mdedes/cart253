/**
 * Time and JavaScript and p5
 * Mary Dedes
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
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