//////////////////////////////////////////
// global variables

var session;
var wMax = 600;
var hMax = 900;
var w = wMax
var h = hMax;
var sinSpeed = 2;

//////////////////////////////////////////
// setup and draw functions

function setup() {    
    createCanvas(wMax, hMax); 
    
    session = new Session();
    session.newMenu();
}

function draw() {
    background(255);
    session.draw();
}

////////////////////////////////////////////
// global functions

function assert(condition) {
    if (!condition) {
        message = "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

/////////////////////////////////////////////
// events

// mouse right clic
function mousePressed() {
    session.mousePressed();
}




