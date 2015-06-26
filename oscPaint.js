var xPos = [];
var yPos = [];
var sound, amplitude;
var lifespan;
var radius;

var a = 0;
var button;
var bg = true;
var osc;
var freq;
var canvas;
var redraw;
var stroke_weight;
var stroke_alpha;
var xVel;
var yVel;
var aVel;
var hueVal;
var satVal;
var briVal;
var alphaVal;
var chainLength;
var shadows = false;
var hueJitter;
var sizeJitter;
var shaDepth;

function setup() {
    "use strict";
    colorMode(HSB, 100);
    canvas = createCanvas(screen.availWidth/2, screen.availHeight*0.85);
    canvas.parent('canvas-container');
    background(0);
    guiSetup();


    //	 button1.parent('button-container');

}




function draw() {

    //        freq = map(yPos[0], 0, height, 200, 300);

    bg = document.getElementById("redrawOn").checked;
    shadows = document.getElementById("shadowsOn").checked;

    if (bg) {
        background(0);
    }
    //        osc.freq(freq);



    radius = radSlider.value()
    fluctuator(radius);
//    if (xPos.length > 0) {
////        console.log(xPos.length)
//    }
    //    slider labels

    $("#radlabel").text("radius: " + this.radius);
    $("#xvlabel").text("x velocity: " + this.xVel);
    $("#yvlabel").text("y velocity: " + this.yVel);
    $("#avlabel").text("rotation speed: " + this.aVel);
    $("#swtlabel").text("Stroke Weight: " + this.stroke_weight);
    $("#skalabel").text("Stroke Opacity: " + this.stroke_alpha + "%");
    $("#huelabel").text("Hue: " + int(this.hueVal / 2.55) + "%");
    $("#satlabel").text("Saturation: " + int(this.satVal) + "%");
    $("#brilabel").text("Brightness: " + int(this.briVal) + "%");
    $("#alphalabel").text("Fill Opacity: " + int(this.alphaVal) + "%");
    $("#lenlabel").text("Chain Length: " + this.chainLength);
    $("#jitterlabel").text("Hue Jitter: " + (1100 - this.hueJitter));
    $("#shadepthlabel").text("Shadow Depth: " + (this.shaDepth));
}

function mouseDragged() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {

        xPos.push(mouseX);
        yPos.push(mouseY);
    }
    // console.log(xPos, yPos)

}


function guiSetup() {


    radSlider = createSlider(10, 500);
    radSlider.parent("radius");
    
     
    symSlider = createSlider(1, 4, 4);
    symSlider.parent("symmetry");
    xVelSlider = createSlider(-10, 10, 0);
    xVelSlider.parent("xvel");
    yVelSlider = createSlider(-10, 10, 0);
    yVelSlider.parent("yvel");
    aVelSlider = createSlider(-20, 20, 0);
    aVelSlider.parent("avel");
    lengthSlider = createSlider(0, 300);
    lengthSlider.parent("len");
    shapeSlider = createSlider(0, 2, 2);
    shapeSlider.parent("shape");
    
    hueJitterSlider = createSlider(1, 1000);
    hueJitterSlider.parent("huejitter");

    hueSlider = createSlider(0, 255);
    hueSlider.parent("hue");
    satSlider = createSlider(0, 100, 90);
    satSlider.parent("sat");
    briSlider = createSlider(0, 100, 80);
    briSlider.parent("bri");
    alphaSlider = createSlider(0, 100, 100);
    alphaSlider.parent("alpha");
    strokeSlider = createSlider(0, 100, 2);
    strokeSlider.parent("swt");
    strokeAlpha = createSlider(0, 100, 100);
    strokeAlpha.parent("skalpha");
    
    shadowSlider = createSlider(0,30);
    shadowSlider.parent("shadepth");

}

function mousePressed() {
    //     osc.stop(); 
    //    osc.start();

}

function mouseReleased() {


}

function fluctuator(size, rec) {


   
    var ctx = document.getElementById("defaultCanvas").getContext('2d');
    shaDepth = shadowSlider.value()/100;
    if (shadows) {

        ctx.shadowColor = '#3c3c39';
        ctx.shadowBlur = radius * .02;
        ctx.shadowOffsetY = radius * shaDepth;
      


    }
    hueJitter = 1100 - hueJitterSlider.value();
    var shapeDepth = shapeSlider.value();
    hueVal = hueSlider.value();
    satVal = satSlider.value();
    briVal = briSlider.value();
    var symPlanes = symSlider.value();
    chainLength = lengthSlider.value();
    alphaVal = alphaSlider.value();
    stroke_weight = strokeSlider.value() / 10;
    strokeWeight(stroke_weight);
    stroke_alpha = strokeAlpha.value();
    xVel = xVelSlider.value() / 10;
    yVel = yVelSlider.value() / 10;
    aVel = aVelSlider.value();
    
    stroke(0, stroke_alpha);
    for (var i = 0; i < xPos.length; i++) {

        xPos[i] += xVel;
        yPos[i] += yVel;
        if (yPos[0] > height + radius || xPos[0] > width + radius || yPos[0] <
            0 - radius || xPos[0] < 0 -
            radius ||
            xPos.length > chainLength) {
            yPos.shift();
            xPos.shift();

        }

        rectMode(CENTER);
        lifespan = 255;
        lifespan -= 1;

        // noStroke();

        push();
        scale(-1);
        translate(xPos[i], yPos[i]);
        rotate(a);

        fill(noise(yPos[i] / hueJitter) * (hueVal), satVal, briVal, alphaVal);
        if (shapeDepth >= 1) {
            rect(0, 0, noise(yPos[i] / 10) * size * sin(millis() / 1000),
                noise(yPos[i] / 10) * size *
                cos(a / 1000));

        }
        if (shapeDepth <= 1) {
            ellipse(0, 0, noise(yPos[i] / 10) * size * sin(millis() / 1000),
                noise(yPos[i] / 10) * size *
                cos(a /
                    1000));

        }
        pop();
        push();

        translate(xPos[i], yPos[i]);
        rotate(a);

        fill(noise(yPos[i] / hueJitter) * (hueVal), satVal, briVal, alphaVal);
        if (shapeDepth >= 1) {
            rect(0, 0, noise(yPos[i] / 10) * size * sin(millis() / 1000),
                noise(yPos[i] / 10) * size *
                cos(a / 1000));

        }
        if (shapeDepth <= 1) {
            ellipse(0, 0, noise(yPos[i] / 10) * size * sin(millis() / 1000),
                noise(yPos[i] / 10) * size *
                cos(a / 1000));

        }
        pop();
        if (symPlanes > 1) {
            push();

            fill(noise(yPos[i] / hueJitter) * (hueVal), satVal, briVal, alphaVal)
            translate(width - xPos[i], yPos[i]);

            rotate(-a);
            if (shapeDepth >= 1) {
                rect(0, 0, noise(yPos[i] / 10) * size * sin(millis() / 1000),
                    noise(yPos[i] / 10) * size *
                    cos(a / 1000));
            }
            if (shapeDepth <= 1) {
                ellipse(0, 0, noise(yPos[i] / 10) * size * sin(millis() /
                        1000), noise(yPos[i] / 10) *
                    size * cos(a / 1000));
            }

            pop();
        }
        a += 0.0001 * aVel;
        if (symPlanes > 2) {
            fill(noise(yPos[i] / hueJitter) * (hueVal), satVal, briVal, alphaVal)
            push();
            translate(yPos[i], xPos[i]);
            rotate(a);

            if (shapeDepth >= 1) {
                rect(0, 0, noise(yPos[i] / 10) * size * sin(millis() / 1000),
                    noise(yPos[i] / 10) * size * cos(millis() / 1000));
            }
            if (shapeDepth <= 1) {
                ellipse(0, 0, noise(yPos[i] / 10) * size * sin(millis() /
                        1000),
                    noise(yPos[i] / 10) * size * cos(millis() / 1000));
            }
            pop();



            push();
            translate(width - yPos[i], xPos[i])
            rotate(-a);
            if (shapeDepth >= 1) {
                rect(0, 0, noise(yPos[i] / 10) * size * sin(millis() / 1000),
                    noise(yPos[i] / 10) * size *
                    cos(
                        millis() / 1000));
            }
            if (shapeDepth <= 1) {
                ellipse(0, 0, noise(yPos[i] / 10) * size * sin(millis() /
                        1000), noise(yPos[i] / 10) *
                    size * cos(
                        millis() / 1000));
            }
            pop();
        }
    }

}

//<!--    jQuery UI dialog box-->


$(function () {
    $("#dialog").dialog({
        resizable: true,
        width: "50%",
        position: {
            my: "right top",
            at: "right top",
            of: window
        }

    });
});