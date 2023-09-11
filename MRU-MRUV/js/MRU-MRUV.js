  // JavaScript code goes here.

  //GLOBAL VARIABLES
  var timer
  var contador=1;
  var dt =0.07;
  var x1=0;
  var x2=0;
  var y=0;
  var vx,vx1,vx2;
  var ax1=0;
  var ax2=10;

  //inputs
  var speedSlider = document.getElementById("speedSlider");
  var speedReadout = document.getElementById("speedReadout");



  var gridSelector=document.getElementById("boolGrid");

  


  //CANVAS IMPORTS
  var scenario = document.getElementById("scenario");
  var trailCanvas = document.getElementById("trailCanvas");
  var trailContext = trailCanvas.getContext("2d");

  var theCanvas = document.getElementById("theCanvas");
  var theContext = theCanvas.getContext("2d");

  //var gridCanvas = document.getElementById("gridCanvas");
  //var gridContext = gridCanvas.getContext("2d");


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
 
  function fireProjectile() {
    console.log('Fire!')
    window.clearTimeout(timer);  
    contador=0  
    moveProjectile();
  }

//move o projetil
  function moveProjectile() {
    vx =  Number(speedSlider.value);
    vx1=vx;
    vx2=vx;

    

    if ( x2<500){ // condicao de parada da simulacao - obs: criar botao de parada               
      contador+=1
      console.log(contador)

      vx1 += ax1 * dt;      
      x1 += vx1 * dt +0.5*ax1*dt*dt;        
      
      vx2 += ax2 * dt;      
      x2 += vx2 * dt +0.5*ax2*dt*dt;

      console.log(x1,vx1,ax1,x2,vx2,ax2,y)

      //Desenhar moveis 
      drawProjectile(x1,x2,y);

      
      // configura um timer para chamar a funcao novamente após um tempo
      timer=window.setTimeout(moveProjectile, 10);  
      
      }

    }



  function drawProjectile(x1,x2,y) {
    contador =contador+ 1;
    var metersPerPixel = 1 //1000 / ( theCanvas.width);
    var pixelX1 = 95 + x1/metersPerPixel;
    var pixelY1 = 220 - y/metersPerPixel;
    var pixelX2 = 95 + x2/metersPerPixel;
    var pixelY2 = 220 - (y+60)/metersPerPixel;
    

    

    //trailContext.fillRect(pixelX-0.5, pixelY-0.5, 1, 1);
    theContext.fillStyle = "red"; //preenchimento solido
    
    theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
    theContext.beginPath();
    theContext.arc(pixelX1, pixelY1, 5, 0, 2*Math.PI);
    theContext.arc(pixelX2, pixelY2, 5, 0, 2*Math.PI);

    //Se quiser criar um gradiente nas bolinhas use as linhas abaixo:

    
    var theGradient = theContext.createRadialGradient(    pixelX1-1, pixelY1-2, 1, pixelX1, pixelY1, 5);
    theGradient.addColorStop(0, "#d0d0d0");
    theGradient.addColorStop(1, "#000000");
    theContext.fillStyle = theGradient;
    theContext.fill();
  }


//PREPARING CANVASGRID
/*
gridContext.fillStyle = "rgba(220, 220, 220, 0.4)";
gridContext.fillRect(0, 0, gridCanvas.width, gridCanvas.height);
gridContext.lineWidth = 1;
gridContext.strokeStyle = "#303030";
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
*/



function drawGrid(){
  drawBool=gridSelector.checked;
  if (drawBool){
    //gridCanvas.removeAttribute("hidden");
    document.getElementById("scenario-grid").removeAttribute("hidden");
    document.getElementById("scenario").setAttribute("hidden", "hidden");
    //scenario.setAttribute("hidden", "hidden");

  }else {
    //gridCanvas.setAttribute("hidden", "hidden");
document.getElementById("scenario-grid").setAttribute("hidden", "hidden");
    document.getElementById("scenario").removeAttribute("hidden");
    //scenario.removeAttribute("hidden");
  }
}

function clearTrail(){
  trailContext.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
  theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
}

function changeColor(){
  trailContext.fillStyle =  document.getElementById("trailColors").value ;

}



function showTarget(){
  xTarget=Math.floor(Math.random() * 450)+50;
  yTarget=Math.floor(Math.random() * 250);
  if(document.getElementById("simTarget").hidden){
    document.getElementById("simTarget").removeAttribute("hidden");
    document.getElementById("simTarget").style.left=xTarget.toString()+'px'
    document.getElementById("simTarget").style.top=yTarget.toString()+'px'
  }
  else{
    document.getElementById("simTarget").setAttribute("hidden", "hidden");
  }
}
