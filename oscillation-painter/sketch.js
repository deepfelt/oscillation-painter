var xPos = [];
var yPos = [];
var sound, amplitude;
var lifespan;
var radius;
var hue;

function setup(){

	amplitude = new p5.Amplitude();
  	colorMode(HSB, 100);
	createCanvas(500,500);
	background(0);
	radSlider= createSlider(10, 500);
	radSlider.position(550, 50)
	xVelSlider = createSlider(0, 30);
	yVelSlider = createSlider(0, 30);
	xVelSlider.position(550, 80)
	yVelSlider.position(550, 110)	
	hueSlider = createSlider(0,100);
	hueSlider.position(550, 140);
	}
function draw(){
	stroke(0);
	radius = radSlider.value()
	elliptical(radius);
	console.log(xPos.length)
	}
	
function mouseDragged(){
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		
	xPos.push(mouseX);
	yPos.push(mouseY);
}
	// console.log(xPos, yPos)

}
function elliptical(size, rec){
	hueVal = hueSlider.value();
	for (var i = 0; i < xPos.length; i++) {
			xPos[i]+=xVelSlider.value()/10;
			yPos[i]+=yVelSlider.value()/10;
			if (yPos[0]>height +radius || xPos[0] > width + radius){
				yPos.shift();
				xPos.shift();

			}
			var level = amplitude.getLevel();
  			
  			lifespan = 255;
  			lifespan-=1;
  			fill(noise(yPos[i]/100)*(hueVal), 100, 80)
			ellipse(xPos[i], yPos[i], noise(yPos[i]/10)*size*sin(millis()/1000), noise(yPos[i]/10)*size*cos(millis()/1000));
			ellipse(width - xPos[i], yPos[i], noise(yPos[i]/10)*size*sin(millis()/1000), noise(yPos[i]/10)*size*cos(millis()/1000));
			// ellipse(yPos[i], xPos[i], noise(yPos[i]/10)*size*sin(millis()/1000), noise(yPos[i]/10)*size*cos(millis()/1000));
			// ellipse(width - yPos[i], xPos[i], noise(yPos[i]/10)*size*sin(millis()/1000), noise(yPos[i]/10)*size*cos(millis()/1000));

		}



}