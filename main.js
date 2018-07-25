window.onload = function(){
  Initialize();
  Update();
};

window.onkeydown = function(e) {
  if(e.keyCode == 37) dir = 1;
  if(e.keyCode == 38) dir = 2;
  if(e.keyCode == 39) dir = 3;
  if(e.keyCode == 40) dir = 4;
  
  //Update();
};

var map;
var posX, posY;
var sizeX = 15, sizeY = 10;
var dir;
var len;

function Initialize() {
  map = new Array(sizeX);
  for(var i = 0; i < sizeX; i++) 
    map[i] = new Array(sizeY).fill(0);

  posX = 7;
  posY = 7;

  dir = 0;
  len = 10;
}

function Update() {
  if(dir == 1) posX--;
  if(dir == 2) posY--;
  if(dir == 3) posX++;
  if(dir == 4) posY++;
  
  if (posX < 0 || sizeX <= posX ||
      posY < 0 || sizeY <= posY ||
      0 < map[posX][posY]) {
    //Initialize(); return;
  }
  
  
  for(var x = 0; x < sizeX; x++) 
    for(var y = 0; y < sizeY; y++)
      if(0 < map[x][y]) map[x][y]--;
  map[posX][posY] = len;

  var output = "";
  for(var x = 0; x < sizeX; x++) 
    for(var y = 0; y < sizeY; y++)
      if(1 < map[x][y] && map[x][y] < len) {
        var from = "", to = "";
        if(map[x-1][y] == map[x][y] - 1) from = " fL";
        if(map[x+1][y] == map[x][y] - 1) from = " fR";
        if(map[x][y-1] == map[x][y] - 1) from = " fT";
        if(map[x][y+1] == map[x][y] - 1) from = " fB";
        if(map[x-1][y] == map[x][y] + 1) to = " tL";
        if(map[x+1][y] == map[x][y] + 1) to = " tR";
        if(map[x][y-1] == map[x][y] + 1) to = " tT";
        if(map[x][y+1] == map[x][y] + 1) to = " tB";
        
        output += '<span class="snakeBody' + from + to + '" style="left:' + (x * 40) + 'px; top:' + (y * 40) + 'px"></span>';
      }
  
  document.getElementById("output").innerHTML = output;

  setTimeout(Update, 200);
}