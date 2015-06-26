float xPos = [];
float yPos = [];
float sound, amplitude;
float lifespan;
float radius;
var hue;
float a = Math.PI/200;
boolean bg = true;

void setup(){

	amplitude = new p5.Amplitude();
  	colorMode(HSB, 100);
	canvas = createCanvas(500,500);
	canvas.class = "main";
	canvas.position = 400,50
	background(0);
	radSlider= createSlider(10, 500);
	radSlider.position(550, 50)
	xVelSlider = createSlider(-30, 30, 0);
	yVelSlider = createSlider(-30, 30, 0);
	xVelSlider.position(550, 80)
	yVelSlider.position(550, 110)	
	hueSlider = createSlider(0,100);
	hueSlider.position(550, 140);
	button1 = createButton('Redraw');
	radSlider.class("slider")
	xVelSlider.class("slider");
	yVelSlider.class("slider");
	hueSlider.class("slider");
  button1.position(550, 180);
  button1.mousePressed(bgRedraw);
  button1.class("myButton");
	}


void bgRedraw(){
	if (bg === true){
		bg = false;
	} else {
		bg = true;
	}
	}
void draw(){
	if(bg === true){
		background(0);
	}
	 
	fill(0,50);
	// rect(0,0,width, height);
	stroke(0);
	radius = radSlider.value()
	elliptical(radius);
	if (xPos.length > 0){
	console.log(xPos.length)
	}
}
	
void mouseDragged(){
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		
	xPos.push(mouseX);
	yPos.push(mouseY);
}
	// console.log(xPos, yPos)

}
void elliptical(size, rec){
	hueVal = hueSlider.value();
	for (var i = 0; i < xPos.length; i++) {
			xPos[i]+=xVelSlider.value()/10;
			yPos[i]+=yVelSlider.value()/10;
			if (yPos[0]>height +radius || xPos[0] > width + radius
				||yPos[0]<0 - radius || xPos[0] < 0 - radius){
				yPos.shift();
				xPos.shift();

			}
			
  			rectMode(CENTER);
  			lifespan = 255;
  			lifespan-=1;
  			strokeWeight(0.5);
  			// noStroke();
  			push();
  			fill(noise(yPos[i]/100)*(hueVal), 100, 80)
  			translate(xPos[i], yPos[i]);
  			rotate(a);
  			
			ellipse(0,0, noise(yPos[i]/10)*size*sin(millis()/1000), noise(yPos[i]/10)*size*cos(millis()/1000));
			pop();
			push();
			fill(noise(yPos[i]/100)*(hueVal/2), 100, 80)
			translate(width - xPos[i], yPos[i]);
			 rotate(-a);
  			
			ellipse(0,0, noise(yPos[i]/10)*size*sin(millis()/1000), noise(yPos[i]/10)*size*cos(millis()/1000));
			pop();
			a+=0.0001;
			fill(noise(yPos[i]/100)*(hueVal/2), 100, 80)
			ellipse(yPos[i], xPos[i], noise(yPos[i]/10)*size*sin(millis()/1000), noise(yPos[i]/10)*size*cos(millis()/1000));
			 ellipse(width - yPos[i], xPos[i], noise(yPos[i]/10)*size*sin(millis()/1000), noise(yPos[i]/10)*size*cos(millis()/1000));

		}



}