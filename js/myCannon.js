  // JavaScript code goes here.

  //GLOBAL VARIABLES
  var x = 1;
  var y = -29;
  var vx,vy,ax,ay,theta; //pos e velocity
  var timer
  var g = 9.81;

  //inputs
  var viscosity=document.getElementById("viscInput").value *0.00001;//viscosidade
  var r=document.getElementById("radiusSlider").value *0.01;//raio
  var k=0

  var speedSlider = document.getElementById("speedSlider");
  var speedReadout = document.getElementById("speedReadout");

  var angleSlider = document.getElementById("angleSlider");
  var angleReadout = document.getElementById("angleReadout");

  var gridSelector=document.getElementById("boolGrid");

  var dt =0.1;


  //CANVAS IMPORTS
  var scenario = document.getElementById("scenario");
  var trailCanvas = document.getElementById("trailCanvas");
  var trailContext = trailCanvas.getContext("2d");

  var theCanvas = document.getElementById("theCanvas");
  var theContext = theCanvas.getContext("2d");

  var gridCanvas = document.getElementById("gridCanvas");
  var gridContext = gridCanvas.getContext("2d");


  //mostradores
  function showSpeed() {
    speedReadout.innerHTML = speedSlider.value;
  }

  function showAngle() {
    angleReadout.innerHTML = angleSlider.value;
  }
  function showRadius() {
    radiusReadout.innerHTML = radiusSlider.value;
  }


  //ATIRA O PROJETIL
  function calculateK(){
    viscosity=document.getElementById("viscInput").value *0.00001;//viscosidade
    r=document.getElementById("radiusSlider").value *0.01;//raio
    rho=11300 //kg/m3 =densidade do chumbo
    m=4*0.3333*Math.PI*r**3
    k=6*Math.PI*viscosity*r/m
    return k
  }

  function fireProjectile() {
    console.log('Fire!')
    window.clearTimeout(timer);
    x = 0;
    y = -29.9;
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
      ax=-k*vx;
      ay=-g-k*vy;
      vx += ax * dt;
      vy += ay * dt;
      x += vx * dt +0.5*ax*dt*dt;
      y += vy * dt +0.5*ay*dt*dt;
      drawProjectile(x,y);
      timer=window.setTimeout(moveProjectile, 10);
      }

    }



  function drawProjectile() {
    var metersPerPixel = 1 //1000 / ( theCanvas.width);
    var pixelX = 95 + x/metersPerPixel;
    var pixelY = 220 - y/metersPerPixel;

    gridContext.fillStyle = "rgba(0, 0, 0, 1)";
    trailContext.fillRect(pixelX-0.5, pixelY-0.5, 2, 2);

    //trailContext.fillRect(pixelX-0.5, pixelY-0.5, 1, 1);
    theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
    theContext.beginPath();
    theContext.arc(pixelX, pixelY, 5, 0, 2*Math.PI);

    //theContext.fillStyle = "red"; //preenchimento solido
    var theGradient = theContext.createRadialGradient(
    pixelX-1, pixelY-2, 1, pixelX, pixelY, 5);
    theGradient.addColorStop(0, "#d0d0d0");
    theGradient.addColorStop(1, "#000000");
    theContext.fillStyle = theGradient;
    theContext.fill();
  }


//PREPARING CANVASGRID
gridContext.fillStyle = "rgba(220, 220, 220, 0.4)";
gridContext.fillRect(0, 0, gridCanvas.width, gridCanvas.height);
gridContext.lineWidth = 1;
w=600;
h=300;
for (xgrid=0; xgrid<= 600; xgrid+=20){
  for (ygrid=10; ygrid<= 300; ygrid+=20){
    gridContext.moveTo(0, ygrid);
    gridContext.lineTo(600, ygrid);
    gridContext.stroke();
    gridContext.moveTo(xgrid, 0);
    gridContext.lineTo(xgrid, 300);
    gridContext.stroke();
  }
}

function drawGrid(){
  drawBool=gridSelector.checked;
  if (drawBool){
    gridCanvas.removeAttribute("hidden");
    //scenario.setAttribute("hidden", "hidden");

  }else {
    gridCanvas.setAttribute("hidden", "hidden");
    //scenario.removeAttribute("hidden");
  }
}

function clearTrail(){
  trailContext.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
  theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
}



//drawProjectile();
