// Loading and initializing the board ...
board = JXG.JSXGraph.initBoard('jxgbox', {
  boundingbox: [-2, 15, 15, -12],
  axis: true,
  grid: false,
  showCopyright: false
});


// Add point to predators...
startpred = board.createElement('glider', [0.0, 0.0, board.defaultAxes.y], {
  name: 'Init state',
  strokeColor: 'purple',
  fillColor: 'purple'
});


var g3 = null;

function fi(x)
{
  let res = 0.2 * (1.0 - x) * Math.sin(3.14159265 * x / 180);

  return res;
}

function calculateWaveEquation() 
{
  let a = 1.0, T = 10.0;
  let I = 15, J = 15;
  
  let h = 1.0/I;
  let ti = T/J;
  let c1 = a*ti/h;
  let lambda = c1*c1;
  let c2 = 2.0*(1.0 - lambda);  
  let xi = 4.0;
  
  
  let u = new Array(I);
  for (var i = 0; i < I; i++) {
    u[i] = new Array(J);
  }

  for (let i = 0; i < I; i++)
  {
    u[i][0] = fi(i);
    u[i][1] = u[i][0] + ti*xi;
    
  } 

  for (let j = 1; j < J - 1; j++)
  {
    u[0][j + 1] = 0.0;
    u[I - 1][j + 1] = 0.0;
    
    for (let i = 1; i < I - 1; i++)
    {
      u[i][j + 1] = c2 * u[i][j] + lambda * (u[i + 1][j] + u[i - 1][j]) - u[i][j - 1];
    } 
  
  } 
  
  return u;

}


var data = calculateWaveEquation(); 

var t = [];
var datapred = [];

var x = 0

for (var i = 0; i < 15; i++) {
  datapred[i] = data[5][i];
  t[i] = x;
  x += 1;
}

g3 = board.createElement('curve', [t, datapred], {
  strokeColor: 'purple',
  strokeWidth: '2px'
});
g3.updateDataArray = function() {
  this.dataX = [];
  this.dataY = [];
  x = 0
  for (let i = 0; i < 15; i++) {
    this.dataX[i] = x;
    this.dataY[i] = data[5][i];
    x += 1;
  }
};