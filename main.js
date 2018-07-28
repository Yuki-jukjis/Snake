window.onload = function(){
  Initialize();
};

window.onkeydown = function(e) {
  if(e.keyCode == 37 && dir != 3) dir = 1;
  if(e.keyCode == 38 && dir != 4) dir = 2;
  if(e.keyCode == 39 && dir != 1) dir = 3;
  if(e.keyCode == 40 && dir != 2) dir = 4;
  
  //Update();
};

var map;
var posX, posY;
var sizeX = 15, sizeY = 10;
var dir;
var len;
var appleX, appleY;

function Initialize() {
  map = new Array(sizeX);
  for(var i = 0; i < sizeX; i++) 
    map[i] = new Array(sizeY).fill(0);

  posX = 7;
  posY = 7;

  dir = 0;
  len = 10;
  
  appleX = 0;
  appleY = 0;
  
  Update();
}

function Update() {
  if(dir == 1) posX--;
  if(dir == 2) posY--;
  if(dir == 3) posX++;
  if(dir == 4) posY++;
  
  if (posX < 0 || sizeX <= posX ||
      posY < 0 || sizeY <= posY ||
      1 < map[posX][posY]) {
    Initialize(); return;
  }
  
  if(appleX == posX && appleY == posY) {
    len++;
  }
  else {
    for(var x = 0; x < sizeX; x++) 
      for(var y = 0; y < sizeY; y++)
        if(0 < map[x][y]) map[x][y]--;
  }
  
  map[posX][posY] = len;

  var output = "";
  
  for(var x = 0; x < sizeX; x++) 
    for(var y = 0; y < sizeY; y++)
        output += '<span class="' + ((x+y)%2==0 ?'bg1':'bg2') + '" style="left:' + (x * 40) + 'px; top:' + (y * 40) + 'px"></span>';
  
  output += '<span class="apple" style="left:' + (appleX * 40 + 10) + 'px; top:' + (appleY * 40 + 10) + 'px"></span>';

  
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
        
        output += '<span class="snakeBody' + from + to + '" style="left:' + (x * 40 + 20) + 'px; top:' + (y * 40 + 20) + 'px"></span>';
      }
  
  
  document.getElementById("output").innerHTML = output;

  setTimeout(Update, 200);
}