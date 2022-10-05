  // JavaScript code goes here.

  //GLOBAL VARIABLES
  var x,y,vx,vy,ax,ay,theta; //pos e velocity
  var timer
  var g = 9.81;
  var viscosity=0;
  var speedSlider = document.getElementById("speedSlider");
  var speedReadout = document.getElementById("speedReadout");

  var angleSlider = document.getElementById("angleSlider");
  var angleReadout = document.getElementById("angleReadout");



  var dt =0.1;




  //AUX functionS
  function showSpeed() {
    speedReadout.innerHTML = speedSlider.value;
  }

  function showAngle() {
    angleReadout.innerHTML = angleSlider.value;
  }

  //ATIRA O PROJETIL
  function fireProjectile() {
    window.clearTimeout(timer);
    x = 1;
    y = -29;
    v =  Number(speedSlider.value);
    theta=Number(angleSlider.value)*Math.PI/180.0;
    var cos=Math.cos(theta);
    var sen=Math.sin(theta);
    vx=v*cos;
    vy=v*sen;
    moveProjectile();
  }

//move o projetil
  function moveProjectile() {

    if (y>-30){
      ax=0;
      ay=-g;
      vx += ax * dt;
      vy += ay * dt;
      x += vx * dt;
      y += vy * dt;
      drawProjectile(x,y);
      timer=window.setTimeout(moveProjectile, 10);
      }

    }



  function drawProjectile() {
    var metersPerPixel = 1 //1000 / ( theCanvas.width);
    var pixelX = 95 + x/metersPerPixel;
    var pixelY = 220 - y/metersPerPixel;

    //trailContext.fillRect(pixelX-0.5, pixelY-0.5, 1, 1);
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





//MAIN CODE
var trailCanvas = document.getElementById("trailCanvas");
var trailContext = trailCanvas.getContext("2d");

var theCanvas = document.getElementById("theCanvas");
var theContext = theCanvas.getContext("2d");

  drawProjectile(0,0);
//moveProjectile()
