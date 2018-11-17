// All this code is open source
// Copy as much as you want - just as long as you give credit to where the code came from
var canvas = document.getElementById("display");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("cp");
var ctx2 = canvas2.getContext("2d");
width = canvas.width;
height = canvas.height;
width2 = canvas2.width;
height2 = canvas2.height;
ctx.fillStyle = "rgb(52, 2, 80)";
ctx.textAlign = "center";
ctx.font = "70px Fantasy";
ctx.fillText("Eternal Void", width / 2, height / 2);
ctx.font = "20px Fantasy";
ctx.fillText("Eternal adventure! Until you run out of fuel...", width / 2, height / 2 + 50);
ctx2.fillStyle = "rgb(52, 2, 80)";
ctx2.textAlign = "center";
ctx2.font = "50px Fantasy";
ctx2.fillText("Control panel", width2 / 2, height2 / 2);
var intervalId = null;
var starList = [];
var steamList = [];
var bulletList = [];
var fuelList = [];
var mList = [];
var frame = 1;
var ship = null;
var hp = 100;
var fuel = 100;
var score = 0;
var gameState = "play";

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min))
}

function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function drawEllipse(x, y, width, height) {
  ctx.beginPath();
  ctx.ellipse(x, y, width, height, 0, 0, 2 * Math.PI);
  ctx.fill();
}

function Star(x, y) {
  this.x = x;
  this.y = y;
}

Star.prototype.draw = function() {
  ctx.fillStyle = "White";
  drawCircle(this.x, this.y, 5)
  this.y += 1;
}

function Bullet(x, y) {
  this.x = x;
  this.y = y;
}

Bullet.prototype.draw = function() {
  ctx.fillStyle = "Red";
  ctx.fillRect(this.x, this.y, 5, 15);
  this.y -= 15;
}

function Spaceship(x, y) {
  this.x = x;
  this.y = y;
  this.xVel = 0;
  this.cooldown = 0;
  this.ani = 1;
}

Spaceship.prototype.draw = function() {
  switch (this.ani) {
    case 1:
      ctx.fillStyle = "Red";
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - 10);
      ctx.lineTo(this.x - 30, this.y + 40);
      ctx.lineTo(this.x - 12, this.y - 30);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - 10);
      ctx.lineTo(this.x + 30, this.y + 40);
      ctx.lineTo(this.x + 12, this.y - 30);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - 15, this.y + 55);
      ctx.lineTo(this.x + 15, this.y + 55);
      ctx.fill();
      ctx.fillStyle = "rgb(200, 200, 200)";
      drawEllipse(this.x, this.y, 25, 50);
      ctx.fillStyle = "White";
      drawEllipse(this.x + 10, this.y - 20, 6, 12)
      ctx.fillStyle = "Red";
      this.x += this.xVel;
      this.xVel *= 0.9;
      if (this.x < 26) {
        this.x = 26;
        this.xVel *= -2;
      }
      if (this.x > 774) {
        this.x = 774;
        this.xVel *= -2;
      }
      this.cooldown -= 1;
      break;
    case 2:
      ctx.fillStyle = "rgb(250, 138, 0)";
      drawEllipse(this.x, this.y, 10, 10);
      this.ani++;
      break;
    case 3:
      ctx.fillStyle = "rgb(245, 134, 0)";
      drawEllipse(this.x, this.y, 15, 15);
      this.ani++;
      break;
    case 4:
      ctx.fillStyle = "rgb(240, 130, 0)";
      drawEllipse(this.x, this.y, 20, 20);
      this.ani++;
      break;
    case 5:
      ctx.fillStyle = "rgb(235, 127, 0)";
      drawEllipse(this.x, this.y, 25, 25);
      this.ani++;
      break;
    case 6:
      ctx.fillStyle = "rgb(230, 126, 0)";
      drawEllipse(this.x, this.y, 30, 30);
      this.ani++;
      break;
    case 7:
      ctx.fillStyle = "rgb(225, 124, 0)";
      drawEllipse(this.x, this.y, 35, 35);
      this.ani++;
      break;
    case 8:
      ctx.fillStyle = "rgb(220, 123, 0)";
      drawEllipse(this.x, this.y, 40, 40);
      this.ani++;
      break;
    case 9:
      ctx.fillStyle = "rgb(213, 122, 0)";
      drawEllipse(this.x, this.y, 45, 45);
      this.ani++;
      break;
    case 9:
      ctx.fillStyle = "rgb(207, 121, 0)";
      drawEllipse(this.x, this.y, 50, 50);
      this.ani++;
      break;
    case 10:
      ctx.fillStyle = "rgb(200, 120, 0)";
      drawEllipse(this.x, this.y, 55, 55);
      this.ani++;
      break;
    case 11:
      ctx.fillStyle = "rgb(150, 90, 0)";
      drawEllipse(this.x, this.y, 60, 60);
      this.ani++;
      break;
    case 12:
      ctx.fillStyle = "rgb(75, 50, 0)";
      drawEllipse(this.x, this.y, 65, 65);
      this.ani++;
      break;
    case 13:
      ctx.fillStyle = "rgb(50, 25, 0)";
      drawEllipse(this.x, this.y, 70, 70);
      this.ani++;
      break;
    case 14:
      ctx.fillStyle = "rgb(25, 10, 0)";
      drawEllipse(this.x, this.y, 75, 75);
      this.ani++;
      break;
    case 15:
      ctx.fillStyle = "rgb(10, 5, 0)";
      drawEllipse(this.x, this.y, 80, 80);
      this.ani++;
      break;
  }

  if (hp == 0 && this.ani == 1) {
    this.ani += 1;
  }

}

Spaceship.prototype.doAction = function(toDo) {
  if (toDo === "right" && this.ani==1) {
    this.xVel += 2;
  } else if (toDo === "left" && this.ani==1) {
    this.xVel -= 2;
  } else if (toDo === "shoot" && this.cooldown < 1 && this.ani==1) {
    bulletList.push(new Bullet(this.x, this.y + 25));
    this.cooldown = 15;
  }
}

function Steam(x, y) {
  this.x = x;
  this.y = y;
  this.size = 15;
  this.o = 1;
}

Steam.prototype.draw = function() {
  ctx.fillStyle = "rgba(255, 165, 0, " + this.o + ")";
  drawCircle(this.x, this.y, this.size);
  this.y += 5;
  this.size += 1;
  this.o -= 0.04;
}
ship = new Spaceship(400, 250);

function Fuel(x, y) {
  this.x = x;
  this.y = y;
}

Fuel.prototype.draw = function() {
  ctx.fillStyle = "Red";
  ctx.fillRect(this.x, this.y, 10, 30);
  ctx.fillStyle = "Yellow";
  drawEllipse(this.x + 5, this.y - 5, 2, 5);
  this.y += 3;
}

Fuel.prototype.cc = function() {
  if (this.x >= ship.x - 50 && this.y > ship.y - 75 && this.x <= ship.x + 50 && this.y <= ship.y + 50 && ship.ani==1) {
    fuel += 5;
    return true;
  }
  return false;
}

function Meteor(x, y) {
  this.x = x;
  this.y = y;
  this.xVel = randInt(-4, 4);
  this.yVel = randInt(2, 8);
}

Meteor.prototype.draw = function() {
  ctx.fillStyle = "rgb(210,120,40)";
  drawCircle(this.x, this.y, 30);
  ctx.fillStyle = "rgb(105,60,20)";
  drawCircle(this.x + 10, this.y - 20, 5);
  drawCircle(this.x - 10, this.y - 12, 5);
  drawCircle(this.x - 12, this.y + 4, 5);
  drawCircle(this.x + 4, this.y + 14, 5);
  this.x += this.xVel;
  this.y += this.yVel;

}

Meteor.prototype.cc = function() {
  if (this.x >= ship.x - 28 && this.y > ship.y - 65 && this.x <= ship.x + 28 && this.y <= ship.y + 65 && ship.ani==1) {
    this.xVel *= -1.2;
    this.yVel *= -1.2;
    this.x += this.xVel;
    this.y += this.yVel;
    this.x += this.xVel;
    this.y += this.yVel;
    this.x += this.xVel;
    this.y += this.yVel;
    ship.xVel *= -1.2;
    ship.x += ship.xVel;
    ship.x += ship.xVel;
    ship.x += ship.xVel;
    hp -= randInt(8, 24);
    return true;
  }
  return false;
}

Meteor.prototype.dcc = function() {
  for (var i = 0; i < bulletList.length; i++) {
    if (this.x >= bulletList[i].x - 10 && this.y >= bulletList[i].y && this.x <= bulletList[i].x + 30 && this.y <= ship.y + 30 && ship.ani==1) {
      this.xVel *= -1.2;
      this.yVel *= -1.2;
      this.x += this.xVel;
      this.y += this.yVel;
      this.x += this.xVel;
      this.y += this.yVel;
      this.x += this.xVel;
      this.y += this.yVel;
      bulletList.splice(i, 1);
      return true;
    }
    return false;
  }
}

function spawnStars() {
  if (frame == 1) {
    for (var i = 0; i < 21; i++) {
      starList.push(new Star(randInt(50, 600), (randInt(50, 750))))
    }
  } else if (frame % 20 == 0) {
    starList.push(new Star(randInt(50, 750), 0))
  }
}

function spawnFuel() {
  if (frame % 95 == 0) {
    fuelList.push(new Fuel(randInt(50, 750), 0))
  }
}

function spawnSteam() {
  var toMod = 5;
  if (frame % toMod == 0 && ship.ani==1) {
    steamList.push(new Steam(ship.x, ship.y + 55))
  }
}

function spawnMeteors() {
  if (frame % 45 == 0) {
    mList.push(new Meteor(randInt(50, 750), 0))
  }
}

function game() {
  if (gameState == "play") {
    if (hp < 0) {
      hp = 0;
    }
    if (fuel < 1) {
      fuel = 0;
      hp -= 0.05;
    }
    if (hp > 100) {
      hp = 100;
    }
    if (fuel > 100) {
      fuel = 100;
    }
    spawnStars();
    spawnSteam();
    spawnFuel();
    spawnMeteors();
    frame += 1;
    score += 1;
    ctx.fillStyle = "Black";
    ctx.fillRect(0, 0, width, height);
    var i;
    var l = starList.length;
    for (i = 0; i < l; i++) {
      starList[i].draw()
    }
    for (i = 0; i < l; i++) {
      if (starList[i].y > 400) {
        starList.splice(i, 1);
        l -= 1;
      }
    }
    var i;
    var l = steamList.length;
    for (i = 0; i < l; i++) {
      steamList[i].draw()
    }
    for (i = 0; i < l; i++) {
      if (steamList[i].y > 400) {
        steamList.splice(i, 1);
        l -= 1;
      }
    }
    var i;
    var l = bulletList.length;
    for (i = 0; i < l; i++) {
      bulletList[i].draw()
    }
    for (i = 0; i < l; i++) {
      if (bulletList[i].y < 0) {
        bulletList.splice(i, 1);
        l -= 1;
      }
    }
    ship.draw();
    var i;
    var l = fuelList.length;
    for (i = 0; i < l; i++) {
      fuelList[i].draw()
    }
    for (i = 0; i < l; i++) {
      if (fuelList[i].y > 415 || fuelList[i].cc()) {
        fuelList.splice(i, 1);
        l -= 1;
      }
    }
    var i;
    var l = mList.length;
    for (i = 0; i < l; i++) {
      mList[i].draw();
      mList[i].cc();
      mList[i].dcc();
      if (hp < 0) {
        hp = 0;
      }
    }
    for (i = 0; i < l; i++) {
      if (mList[i].y > 435 || mList[i].y < -100) {
        mList.splice(i, 1);
        l -= 1;
      }
    }
    /* ---ctx2 stuff starts now--- */
    ctx2.fillStyle = "White";
    ctx2.fillRect(0, 0, width2, height2);
    ctx2.fillStyle = "rgb(52, 2, 80)";
    ctx2.textAlign = "center";
    ctx2.font = "20px Fantasy";
    ctx2.fillText("Control panel", width2 / 2, height2 / 2 - 75);
    ctx2.font = "20px Fantasy";
    ctx2.fillText("HP:", width2 / 2 - 150, height2 / 2 - 20);
    ctx2.strokeRect(75, height2 / 2 - 35, 101, 18)
    ctx2.fillStyle = "rgb(" + 2.55 * (100 - hp) + "," + 2.55 * hp + ", 0)";
    ctx2.fillRect(76, height2 / 2 - 34, hp, 17)
    ctx2.fillStyle = "rgb(52, 2, 80)";
    ctx2.fillText("Fuel:", width2 / 2 - 150, height2 / 2 + 20);
    ctx2.strokeRect(85, height2 / 2 + 5, 101, 18)
    ctx2.fillStyle = "rgb(" + 2.55 * (100 - fuel) + "," + 2.55 * fuel + ", 0)";
    ctx2.fillRect(86, height2 / 2 + 6, fuel, 17)
    ctx2.fillStyle = "rgb(52, 2, 80)";
    ctx2.textAlign = "left";
    ctx2.fillText("Score: " + score, width2 / 2 - 175, height2 / 2 + 60);
    ctx2.textAlign = "center";
    fuel -= 0.05;
    if(ship.ani>15){
      ship.ani++;
      if(ship.ani>74){
        gameState="over";
      }
    }
  }
  else if (gameState == "over"){
    ctx.fillStyle = "White";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgb(52, 2, 80)";
    ctx.textAlign = "center";
    ctx.font = "70px Fantasy";
    ctx.fillText("You Lost", width / 2, height / 2);
    ctx.font = "20px Fantasy";
    ctx.fillText("Your score was: " + score, width / 2, height / 2 + 50);
    ctx.font = "20px Fantasy";
    ctx.fillText("Click to Play Again!", width / 2, height / 2 + 100);
    ctx2.fillStyle = "rgb(255, 255, 255)";
    ctx2.fillRect(0, 0, width, height);
    ctx2.fillStyle = "rgb(52, 2, 80)";
    ctx2.textAlign = "center";
    ctx2.font = "70px Fantasy";
    ctx2.fillText("You Lost", width2 / 2, height2 / 2);

  }
}

function gameLoop() {
  $(startButton).remove();
  if (intervalId === null) intervalId = setInterval(game, 15);
}

function restart(){
  if (gameState == "over"){
    starList = [];
    steamList = [];
    bulletList = [];
    fuelList = [];
    mList = [];
    frame = 1;
    ship = null;
    hp = 100;
    fuel = 100;
    score = 0;
    ship = new Spaceship(400, 250);
    gameState = "play";
  }
}

var actions = {
  37: "left",
  39: "right",
  38: "shoot"
}

$("body").keydown(function(event) {
  var action = actions[event.keyCode];
  ship.doAction(action);
});
