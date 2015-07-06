var a, aVel, alphaVal, amplitude, bg, briVal, button, canvas, chainLength, draw, fluctuator, freq, guiSetup, hueJitter, hueVal, lifespan, mouseDragged, mousePressed, mouseReleased, osc, radius, redraw, satVal, setup, shaDepth, shadows, sizeJitter, sound, stroke_alpha, stroke_weight, xPos, xVel, yPos, yVel;

xPos = [];

yPos = [];

sound = void 0;

amplitude = void 0;

lifespan = void 0;

radius = void 0;

a = 0;

button = void 0;

bg = true;

osc = void 0;

freq = void 0;

canvas = void 0;

redraw = void 0;

stroke_weight = void 0;

stroke_alpha = void 0;

xVel = void 0;

yVel = void 0;

aVel = void 0;

hueVal = void 0;

satVal = void 0;

briVal = void 0;

alphaVal = void 0;

chainLength = void 0;

shadows = false;

hueJitter = void 0;

sizeJitter = void 0;

shaDepth = void 0;

setup = function() {
  'use strict';
  colorMode(HSB, 100);
  canvas = createCanvas(screen.availWidth / 2, screen.availHeight * 0.75);
  canvas.parent('canvas-container');
  background(0);
  guiSetup();
  
};

draw = function() {
    
  bg = document.getElementById('redrawOn').checked;
  shadows = document.getElementById('shadowsOn').checked;
  if (bg) {
    background(0);
  }
  radius = radSlider.value();
  fluctuator(radius);
  $('#radlabel').text('radius: ' + this.radius);
  $('#xvlabel').text('x velocity: ' + this.xVel);
  $('#yvlabel').text('y velocity: ' + this.yVel);
  $('#avlabel').text('rotation speed: ' + this.aVel);
  $('#swtlabel').text('Stroke Weight: ' + this.stroke_weight);
  $('#skalabel').text('Stroke Opacity: ' + this.stroke_alpha + '%');
  $('#huelabel').text('Hue: ' + int(this.hueVal / 2.55) + '%');
  $('#satlabel').text('Saturation: ' + int(this.satVal) + '%');
  $('#brilabel').text('Brightness: ' + int(this.briVal) + '%');
  $('#alphalabel').text('Fill Opacity: ' + int(this.alphaVal) + '%');
  $('#lenlabel').text('Chain Length: ' + this.chainLength);
  $('#jitterlabel').text('Hue Jitter: ' + (1100 - this.hueJitter));
  $('#shadepthlabel').text('Shadow Depth: ' + this.shaDepth);
};

mouseDragged = function() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    xPos.push(mouseX);
    yPos.push(mouseY);
  }
};

guiSetup = function() {
  radSlider = createSlider(10, 500);
  radSlider.parent('radius');
  symSlider = createSlider(1, 4, 4);
  symSlider.parent('symmetry');
  xVelSlider = createSlider(-10, 10, 0);
  xVelSlider.parent('xvel');
  yVelSlider = createSlider(-10, 10, 0);
  yVelSlider.parent('yvel');
  aVelSlider = createSlider(-20, 20, 0);
  aVelSlider.parent('avel');
  lengthSlider = createSlider(0, 300);
  lengthSlider.parent('len');
  shapeSlider = createSlider(0, 2, 2);
  shapeSlider.parent('shape');
  hueJitterSlider = createSlider(1, 1000);
  hueJitterSlider.parent('huejitter');
  hueSlider = createSlider(0, 255);
  hueSlider.parent('hue');
  satSlider = createSlider(0, 100, 90);
  satSlider.parent('sat');
  briSlider = createSlider(0, 100, 80);
  briSlider.parent('bri');
  alphaSlider = createSlider(0, 100, 100);
  alphaSlider.parent('alpha');
  strokeSlider = createSlider(0, 100, 2);
  strokeSlider.parent('swt');
  strokeAlpha = createSlider(0, 100, 100);
  strokeAlpha.parent('skalpha');
  shadowSlider = createSlider(0, 30, 2);
  shadowSlider.parent('shadepth');
};

mousePressed = function() {};

mouseReleased = function() {};

fluctuator = function(size, rec) {
  var ctx, i, shapeDepth, symPlanes;
  ctx = document.getElementById('defaultCanvas').getContext('2d');
  shaDepth = shadowSlider.value() / 100;
  if (shadows) {
    ctx.shadowColor = '#3c3c39';
    ctx.shadowBlur = radius * .02;
    ctx.shadowOffsetY = radius * shaDepth;

  }

    var b = 0;
    
  hueJitter = 1100 - hueJitterSlider.value();
  shapeDepth = shapeSlider.value();
  hueVal = hueSlider.value();
  satVal = satSlider.value();
  briVal = briSlider.value();
  symPlanes = symSlider.value();
  chainLength = lengthSlider.value();
  alphaVal = alphaSlider.value();
  stroke_weight = strokeSlider.value() / 10;
  strokeWeight(stroke_weight);
  stroke_alpha = strokeAlpha.value();
  xVel = xVelSlider.value() / 10;
  yVel = yVelSlider.value() / 10;
  aVel = aVelSlider.value();
  stroke(0, stroke_alpha);
  i = 0;
  while (i < xPos.length) {
       b+=0.5;
    xPos[i] += xVel;
    yPos[i] += yVel;
    if (yPos[0] > height + radius || xPos[0] > width + radius || yPos[0] < 0 - radius || xPos[0] < 0 - radius || xPos.length > chainLength) {
      yPos.shift();
      xPos.shift();
    }
    rectMode(CENTER);
    lifespan = 255;
    lifespan -= 1;
    push();
    scale(-1);
    translate(xPos[i], yPos[i]);
    rotate(a);
    fill(noise(yPos[i] / hueJitter) * hueVal, satVal, briVal, alphaVal);
    
    if (shapeDepth >= 1) {
      rect(0, 0, noise(yPos[i] / 10) * size * sin(b / i), noise(yPos[i] / 10) * size * cos(a / 1000));
    }
    if (shapeDepth <= 1) {
      ellipse(0, 0, noise(yPos[i] / 10) * size * sin(b / i), noise(yPos[i] / 10) * size * cos(a / 1000));
    }
    pop();
    push();
    translate(xPos[i], yPos[i]);
    rotate(a);
    fill(noise(yPos[i] / hueJitter) * hueVal, satVal, briVal, alphaVal);
    
    if (shapeDepth >= 1) {
      rect(0, 0, noise(yPos[i] / 10) * size * sin(b / i), noise(yPos[i] / 10) * size * cos(a / 1000));
    }
    if (shapeDepth <= 1) {
      ellipse(0, 0, noise(yPos[i] / 10) * size * sin(b / i), noise(yPos[i] / 10) * size * cos(a / 1000));
    }
    pop();
    if (symPlanes > 1) {
      push();
      fill(noise(yPos[i] / hueJitter) * hueVal, satVal, briVal, alphaVal);
      
      translate(width - xPos[i], yPos[i]);
      rotate(-a);
      if (shapeDepth >= 1) {
        rect(0, 0, noise(yPos[i] / 10) * size * sin(b / i), noise(yPos[i] / 10) * size * cos(a / 1000));
      }
      if (shapeDepth <= 1) {
        ellipse(0, 0, noise(yPos[i] / 10) * size * sin(b / i), noise(yPos[i] / 10) * size * cos(a / 1000));
      }
      pop();
    }
    a += 0.0001 * aVel;
    if (symPlanes > 2) {
      fill(noise(yPos[i] / hueJitter) * hueVal, satVal, briVal, alphaVal);
      
      push();
      translate(yPos[i], xPos[i]);
      rotate(a);
      if (shapeDepth >= 1) {
        rect(0, 0, noise(yPos[i] / 10) * size * sin(b / i), noise(yPos[i] / 10) * size * cos(b / i));
      }
      if (shapeDepth <= 1) {
        ellipse(0, 0, noise(yPos[i] / 10) * size * sin(b / i), noise(yPos[i] / 10) * size * cos(b / i));
      }
      pop();
      push();
      translate(width - yPos[i], xPos[i]);
      rotate(-a);
      if (shapeDepth >= 1) {
        rect(0, 0, noise(yPos[i] / 10) * size * sin(b / i), noise(yPos[i] / 10) * size * cos(b / i));
      }
      if (shapeDepth <= 1) {
        ellipse(0, 0, noise(yPos[i] / 10) * size * sin(b / i), noise(yPos[i] / 10) * size * cos(b / i));
      }
      pop();
    }
     
    i++;
  }
    
};

