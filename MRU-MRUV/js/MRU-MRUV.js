// Variáveis globais
var timer;
var contador = 1;
var dt = 0.07;
var x1 = 0;
var x2 = 0;
var y = 0;
var vx, vx1, vx2;
var ax1 = 0;
var ax2 = 0;
var elapsedTime = 0;
var paused = false; // Variável para controlar a pausa
var isChallengeMode = false; // Esta variável controlará se estamos no modo desafio
var randomVx1, randomVx2, randomAx1;

// Inputs
var gridSelector = document.getElementById("boolGrid");

// Importações do canvas
var scenario = document.getElementById("scenario");
var trailCanvas = document.getElementById("trailCanvas");
var trailContext = trailCanvas.getContext("2d");
var theCanvas = document.getElementById("theCanvas");
var theContext = theCanvas.getContext("2d");

// Funções para exibir valores nos mostradores dos novos sliders
function showBlackBallSpeed() {
  document.getElementById("blackBallSpeedReadout").innerHTML = document.getElementById("blackBallSpeedSlider").value;
}

function showGrayBallSpeed() {
  document.getElementById("grayBallSpeedReadout").innerHTML = document.getElementById("grayBallSpeedSlider").value;
}

function showBlackBallAccel() {
  document.getElementById("blackBallAccelReadout").innerHTML = document.getElementById("blackBallAccelSlider").value;
}

function togglePauseSimulation() {
  paused = !paused;
  if (!paused) {
    moveProjectile();
  }
}


// Função para disparar o projétil
function fireProjectile() {
  paused = false
  if (isChallengeMode) {
    vx1 = parseFloat(randomVx1);
    vx2 = parseFloat(randomVx2);
    ax1 = parseFloat(randomAx1);
  } else {
    vx1 = Number(document.getElementById("blackBallSpeedSlider").value);
    vx2 = Number(document.getElementById("grayBallSpeedSlider").value);
    ax1 = Number(document.getElementById("blackBallAccelSlider").value);
  }

  window.clearTimeout(timer); // Limpa qualquer timer anterior
  contador = 0;
  x1 = 0;
  x2 = 0;
  elapsedTime = 0;
  y = 85;
  moveProjectile();
}


// Função para mover o projétil
function moveProjectile() {
  if (x1 < 525 && x2 < 525) {  // Verifica a posição de ambas as bolas
    if (paused) return; // Se estiver pausado, não faça nada
    contador += 1;
    vx1 += ax1 * dt;
    x1 += vx1 * dt + 0.5 * ax1 * dt * dt;
    vx2 += ax2 * dt;
    x2 += vx2 * dt + 0.5 * ax2 * dt * dt;
    elapsedTime += dt;
    document.getElementById("timerReadout").innerHTML = elapsedTime.toFixed(2)
    document.getElementById("blackBallDistanceReadout").innerHTML = Math.round(x1);
    document.getElementById("grayBallDistanceReadout").innerHTML = Math.round(x2);

    drawProjectile(x1, x2, y);
    timer = window.setTimeout(moveProjectile, 10);
  }
}



// Função para desenhar o projétil
function drawProjectile(x1, x2, y) {
  var metersPerPixel = 1;
  var pixelX1 = 35 + x1 / metersPerPixel;
  var pixelY1 = 220 - y / metersPerPixel;
  var pixelX2 = 35 + x2 / metersPerPixel;
  var pixelY2 = 220 - (y + 60) / metersPerPixel;

  //var selectedColor = document.getElementById("trailColors").value;

  theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
  theContext.beginPath();
  theContext.arc(pixelX1, pixelY1, 10, 0, 2 * Math.PI); // Raio aumentado para 10
  //theContext.fillStyle = selectedColor; // Usando a cor selecionada
  var theGradient1 = theContext.createRadialGradient(pixelX1 - 1, pixelY1 - 2, 1, pixelX1, pixelY1, 10);
  theGradient1.addColorStop(0, "#d0d0d0");
  theGradient1.addColorStop(1, "#000000");
  theContext.fillStyle = theGradient1;
  theContext.fill();

  theContext.beginPath();
  theContext.arc(pixelX2, pixelY2, 10, 0, 2 * Math.PI); // Raio aumentado para 10
  var theGradient = theContext.createRadialGradient(pixelX2 - 1, pixelY2 - 2, 1, pixelX2, pixelY2, 10); // Raio ajustado para 10
  theGradient.addColorStop(0, "#d0d0d0");
  theGradient.addColorStop(1, "#000000");
  theContext.fillStyle = theGradient;
  theContext.fill();
  var showLines = document.getElementById("showCenterLines").checked
  if (showLines) {
    // Cruz para bola preta (ou primeira bola)
    theContext.beginPath();
    theContext.moveTo(pixelX1, pixelY1 - 10);
    theContext.lineTo(pixelX1, pixelY1 + 10);
    theContext.moveTo(pixelX1 - 10, pixelY1);
    theContext.lineTo(pixelX1 + 10, pixelY1);
    theContext.strokeStyle = "#FF0000";
    theContext.lineWidth = 2;
    theContext.stroke();

    // Cruz para bola cinza (ou segunda bola)
    theContext.beginPath();
    theContext.moveTo(pixelX2, pixelY2 - 10);
    theContext.lineTo(pixelX2, pixelY2 + 10);
    theContext.moveTo(pixelX2 - 10, pixelY2);
    theContext.lineTo(pixelX2 + 10, pixelY2);
    theContext.strokeStyle = "#FF0000";
    theContext.lineWidth = 2;
    theContext.stroke();
  }
}


// Função para desenhar a grade
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

// Função para limpar o rastro
function clearTrail() {
  paused = !paused
  if (isChallengeMode) {
    randomVx1 = 0;
    randomVx2 = 0;
    randomAx1 = 0;
  }

  trailContext.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
  theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
  document.getElementById("timerReadout").innerHTML = "0";
  document.getElementById("blackBallDistanceReadout").innerHTML = "0";
  document.getElementById("grayBallDistanceReadout").innerHTML = "0";
}


// Função para mudar a cor
function changeColor() {
  //trailContext.fillStyle = document.getElementById("trailColors").value;
 
}

//Adiciona grade quando marcada
function toggleGrid() {
  var checkbox = document.getElementById("gridToggle");
  var scenario = document.getElementById("scenario");

  if (checkbox.checked) {
    // Mude o cenário para a imagem da grade
    scenario.src = "Pis";
  } else {
    // Retorne o cenário para a imagem normal
    scenario.src = "MRU-MRUV\files\PistaCorrida.png";
  }
}
function sorteio() {
  randomVx1 = (Math.random() * 45 + 5).toFixed(2); // Velocidade inicial da bola Preta entre [5,50]
  randomVx2 = (Math.random() * 45 + 5).toFixed(2); // Velocidade inicial da bola Cinza entre [5,50]
  randomAx1 = (Math.random() * 10).toFixed(2); // Aceleração da bola Preta entre [0,10]

  // Desativar sliders e substituir valores por ?
  document.getElementById("blackBallSpeedSlider").disabled = true;
  document.getElementById("blackBallSpeedReadout").innerHTML = "?";
  document.getElementById("blackBallSpeedSlider").value = 0;

  document.getElementById("grayBallSpeedSlider").disabled = true;
  document.getElementById("grayBallSpeedReadout").innerHTML = "?";
  document.getElementById("grayBallSpeedSlider").value = 0;

  document.getElementById("blackBallAccelSlider").disabled = true;
  document.getElementById("blackBallAccelReadout").innerHTML = "?";
  document.getElementById("blackBallAccelSlider").value = 0;

  // Alterar a cor do botão para verde
  document.getElementById("challengeButton").style.backgroundColor = "green";
  document.getElementById("challengeButton").innerText = "Ver Resposta";

  isChallengeMode = true;
}

function showAnswer() {
  if (isChallengeMode) {
    alert(`Respostas:
        Velocidade inicial da bola Preta: ${randomVx1}
        Velocidade inicial da bola Cinza: ${randomVx2}
        Aceleração inicial da bola Preta: ${randomAx1}`);

    // Reativar sliders e mostrar os valores reais
    document.getElementById("blackBallSpeedSlider").disabled = false;
    document.getElementById("blackBallSpeedReadout").innerHTML = randomVx1;
    document.getElementById("blackBallSpeedSlider").value = randomVx1;

    document.getElementById("grayBallSpeedSlider").disabled = false;
    document.getElementById("grayBallSpeedReadout").innerHTML = randomVx2;
    document.getElementById("grayBallSpeedSlider").value = randomVx2;

    document.getElementById("blackBallAccelSlider").disabled = false;
    document.getElementById("blackBallAccelReadout").innerHTML = randomAx1;
    document.getElementById("blackBallAccelSlider").value = randomAx1;

    // Alterar a cor do botão de volta e o texto
    document.getElementById("challengeButton").style.backgroundColor = "";
    document.getElementById("challengeButton").innerText = "Desafio";

    isChallengeMode = false;
  } else {
    sorteio();
  }
}

