// JavaScript code goes here.
var x,y,vx,vy; //pos e velocity
var timer
var earthRadius = 6371000;
var mountainHeight = earthRadius * 0.165;
var speedSlider = document.getElementById("speedSlider");
var speedReadout = document.getElementById("speedReadout");

var y = earthRadius + mountainHeight;
var newtonG = 6.67e-11;
var earthMass = 5.97e24;
var dt =10;
var r = Math.sqrt(x*x + y*y);
var accel = 0;
var ax =0;
var ay=0;

//console.log(speedSlider.value)
function showSpeed() {
  speedReadout.innerHTML = speedSlider.value;
}


function fireProjectile() {
  window.clearTimeout(timer);
  x = 0;
  y = earthRadius + mountainHeight;
  vx =  Number(speedSlider.value);
  vy = 0;
  moveProjectile(speedSlider);
}



function drawProjectile() {
  var metersPerPixel = earthRadius / (0.355 * theCanvas.width);
  var pixelX = theCanvas.width/2 + x/metersPerPixel;
  var pixelY = theCanvas.height/2 - y/metersPerPixel;

  trailContext.fillRect(pixelX-0.5, pixelY-0.5, 1, 1);


  theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
  theContext.beginPath();
  theContext.arc(pixelX, pixelY, 5, 0, 2*Math.PI);

  //theContext.fillStyle = "red"; //preenchimento solido
  var theGradient = theContext.createRadialGradient(
  pixelX-1, pixelY-2, 1, pixelX, pixelY, 5);
  theGradient.addColorStop(0, "#ffd0d0");
  theGradient.addColorStop(1, "#ff0000");
  theContext.fillStyle = theGradient;



  theContext.fill();
}

function moveProjectile() {
  r = Math.sqrt(x*x + y*y);
  if (r > earthRadius) {
    accel = newtonG * earthMass /(r * r);
    ax = -accel * x / r;
    ay = -accel * y / r;
    vx += ax * dt;
    vy += ay * dt;
    x += vx * dt;
    y += vy * dt;
    drawProjectile();
    timer=window.setTimeout(moveProjectile, 1000/30);
  }
}

var trailCanvas = document.getElementById("trailCanvas");
var trailContext = trailCanvas.getContext("2d");

var theCanvas = document.getElementById("theCanvas");
var theContext = theCanvas.getContext("2d");


moveProjectile()
