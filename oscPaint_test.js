function setup() {
    "use strict";
    colorMode(HSB, 100);
    var canvas = createCanvas();
    window.addEventListener('resize', resizeCanvas, false);

    // Draw canvas border for the first time.
    resizeCanvas();
    canvas.parent('canvas-container');
    background(0);
    guiSetup();

    varInit();
    //	 button1.parent('button-container');

}

function guiSetup() {

    //region

    //            radiusSlider = createSlider(10, 500);
    //            radiusSlider.parent("radius");

    var symSlider = createSlider(1, 4, 4);
    symSlider.parent("symmetry");
    var xVelSlider = createSlider(-10, 10, 0);
    xVelSlider.parent("xvel");
    var yVelSlider = createSlider(-10, 10, 0);
    yVelSlider.parent("yvel");
    var aVelSlider = createSlider(-20, 20, 0);
    aVelSlider.parent("avel");
    var lengthSlider = createSlider(0, 300);
    lengthSlider.parent("len");
    var shapeSlider = createSlider(0, 2, 2);
    shapeSlider.parent("shape");

    var hueSlider = createSlider(0, 255);
    hueSlider.parent("hue");
    var satSlider = createSlider(0, 100, 90);
    satSlider.parent("sat");
    var briSlider = createSlider(0, 100, 80);
    briSlider.parent("bri");
    var alphaSlider = createSlider(0, 100, 100);
    alphaSlider.parent("alpha");
    var strokeSlider = createSlider(0, 100, 2);
    strokeSlider.parent("swt");
    var strokeAlpha = createSlider(0, 100, 100);
    strokeAlpha.parent("skalpha");

}









var brush = {
    xPos: [],
    yPos: [],
    rad: 100,
    //            rad: radiusSlider.value(),
    angle: 0,
    bg: true,

    stroke_weight: strokeWeight.value(),
    stroke_alpha: strokeAlpha.value(),
    xVel: xVelSlider.value() / 10,
    yVel: yVelSlider.value() / 10,

    hueVal: hueSlider.value(),
    satVal: satSlider.value(),
    briVal: briSlider.value(),
    alpha: alphaSlider.value(),
    chainLength: lengthSlider.value()


}









function draw() {


    //        freq = map(yPos[0], 0, height, 200, 300);

    bg = document.getElementById("redrawOn").checked;

    if (bg) {
        background(0);
    }
    //        osc.freq(freq);




    fluctuator();
    //    if (xPos.length > 0) {
    //        console.log(xPos.length)
    //    }
    //    slider labels

    $("#radlabel").text("rad: " + brush.rad);
    $("#xvlabel").text("x velocity: " + brush.xVel);
    $("#yvlabel").text("y velocity: " + brush.yVel);
    $("#avlabel").text("rotation speed: " + brush.aVel);
    $("#swtlabel").text("Stroke Weight: " + brush.stroke_weight);
    $("#skalabel").text("Stroke Opacity: " + brush.stroke_alpha + "%");
    $("#huelabel").text("Hue: " + int(brush.hueVal / 2.55) + "%");
    $("#satlabel").text("Saturation: " + int(brush.satVal) + "%");
    $("#brilabel").text("Brightness: " + int(brush.briVal) + "%");
    $("#alphalabel").text("Fill Opacity: " + int(brush.alphaVal) + "%");
    $("#lenlabel").text("Chain Length: " + brush.chainLength);
}

function mouseDragged() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {

        brush.xPos.push(mouseX);
        brush.yPos.push(mouseY);
    }
    // console.log(xPos, yPos)

}




function mousePressed() {
    //     osc.stop(); 
    //    osc.start();

}

//        function keyPressed() {
//
//            if (key
//
//            }

function mouseReleased() {


}


function resizeCanvas() {
    htmlCanvas.width = window.innerWidth;
    htmlCanvas.height = window.innerHeight;
    redraw();
}

function fluctuator() {
    
    var shapeDepth = shapeSlider.value();

    var symPlanes = symSlider.value();
   
    var rad = brush.rad;
    var xPos = brush.xPos;
    var yPos = brush.yPos;
    var xVel = brush.xVel;
    var yVel = brush.yVel;
    var chainLength = brush.chaidnLength;
    var alpha = brush.alpha;
    var stroke_alpha = brush.stroke_alpha;
    var a = brush.angle;

    var hueVal = brush.hueVal;
    var satVal = brush.satVal;
    var briVal = brush.briVal;

    stroke(0, stroke_alpha);
    for (var i = 0; i < xPos.length; i++) {

        xPos[i] += xVel;
        yPos[i] += yVel;
        if (yPos[0] > height + this.rad || xPos[0] > width + this.rad || yPos[0] <
            0 - rad || xPos[0] < 0 -
            rad ||
            xPos.length > chainLength) {
            yPos.shift();
            xPos.shift();

        }

        rectMode(CENTER);


        // noStroke();

        push();
        scale(-1);
        translate(xPos[i], yPos[i]);
        rotate(a);

        fill(noise(yPos[i] / 1000) * (hueVal), satVal, briVal, alpha);

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

        fill(noise(yPos[i] / 1000) * (hueVal), satVal, briVal, alpha);

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

            fill(noise(yPos[i] / 1000) * (hueVal), satVal, briVal, alpha)
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
            fill(noise(yPos[i] / 100) * (hueVal), satVal, briVal, alpha)
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