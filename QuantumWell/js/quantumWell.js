
var emax=30;
var a=parseFloat( document.getElementById("input_a").value);

function EigenFunction(x,n,a){
  if (x<0){return 0;}
  else if (x>a) {return 0;
  }else{
    return Math.sqrt(2/a)*Math.sin(n*Math.PI*i/a);
  }
}

function setEigenFuncs(xmin,xmax){
  var xVec=[],yVec1=[],yVec2=[],yVec3=[],yVec4=[],yVec5=[];
  width=parseFloat(a);
  console.log(a)
  for (i=xmin; i<xmax+0.01;i=i+width/20){
    xVec.push(i.toFixed(2));
    yVec1.push(EigenFunction(i,1,a));
    yVec2.push(EigenFunction(i,2,a));
    yVec3.push(EigenFunction(i,3,a));
    yVec4.push(EigenFunction(i,4,a));
    yVec5.push(EigenFunction(i,5,a));
  }



  PsiData=[xVec,yVec1,yVec2,yVec3,yVec4,yVec5];
  return PsiData;
}

PsiData=setEigenFuncs(0,a);

colors=["white", "black","red","green","yellow","blue"]





grafico= new Chart("myChart", {
  type: "line",
  data: {
    xvalues: PsiData[0],
    datasets: [{},{},{},{},{},{}]
  },
  options: {
    legend: {display: false},
    scales: {
      xAxes: [{ticks: {min: -1, max:2}}]
    }
  }
});



graficoEnergy= new Chart("energyChart", {
  type: "line",
  data: {
    labels: [-1,0,a,a+1],
    datasets: [{
      data: [emax,emax],
      borderColor: colors[1],
      label:"V(x)",
      fill: true
    },{
        data: [undefined,undefined,emax,emax],
        borderColor: colors[1],
        label:"V(x)",
        fill: true
      },
    {},{},{},{},{},{}]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 0}}]
    }
  }
});


function drawPsi(grafico,n) {
  grafico.labels=PsiData[0];
  var selector=document.getElementById("show"+n);
  showBool=selector.checked;
  if (showBool){
    graficoEnergy.data.datasets[n+1]={
      data: [undefined,(n/a)**2,(n/a)**2,undefined],
      borderColor: colors[n],
      label:"Psi"+n,
      fill: false
    } ;
    grafico.data.datasets[n]={
      data: PsiData[n],
      borderColor: colors[n],
      label:"Psi"+n,
      fill: false
    } ;
  }else{
    grafico.data.datasets[n]={};
    graficoEnergy.data.datasets[n+1]={};
  }
  grafico.update();
  graficoEnergy.update();
}


function update_plots(){
  a=document.getElementById("input_a").value;
  emax=document.getElementById("input_emax").value;
  xspan=document.getElementById("input_xpan").value;

  xmin=a/2-xspan/2;
  xmax=(a/2+xspan/2);
  PsiData=setEigenFuncs(xmin,xmax);
  grafico.destroy();
  grafico= new Chart("myChart", {
    type: "line",
    data: {
      labels: PsiData[0],
      datasets: [{},{},{},{},{},{}]
    },
    options: {
      legend: {display: false},
      scales:{
        yAxes: [{ticks: {suggestedMin: -2 ,suggestedMax: 2 }}]
      }
    }
  });


  //atualizar emax
  graficoEnergy.data.datasets[0].data=[emax,emax];
  graficoEnergy.data.datasets[1].data=[undefined, undefined,emax,emax];

  grafico.labels=PsiData[0];
  for (n=1;n<6;n++){
    drawPsi(grafico,n);
  }

}

update_plots();
