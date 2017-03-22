var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var maxFlies = 15;
var flyXSpeedRange = [-1, 1];
var flyYSpeedRange = [-0.5, 0.5];
var flySizeRange = [1, 5];
var flyLifespanRange = [75, 150];

var flies = [];

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function Fly(options) {
  if (!options) { options = {}; }

  this.x = options.x || randomRange(0, canvas.width);
  this.y = options.y || randomRange(0, canvas.height);
  this.xSpeed = options.xSpeed || randomRange(flyXSpeedRange[0], flyXSpeedRange[1]);
  this.ySpeed = options.ySpeed || randomRange(flyYSpeedRange[0], flyYSpeedRange[1]);
  this.size = options.size || randomRange(flySizeRange[0], flySizeRange[1]);
  this.lifeSpan = options.lifeSpan || randomRange(flyLifespanRange[0], flyLifespanRange[1]);
  this.age = 0;

  this.colors = options.colors || {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 0
  };
}

function addFlies() {
  if (flies.length !== maxFlies) {
    flies.push(new Fly());
  }
}

function moveFlies() {
  flies.forEach(function(fly) {
    fly.x += fly.xSpeed;
    fly.y += fly.ySpeed;
    fly.age++;

    if (fly.age < fly.lifeSpan / 2) {
      fly.colors.alpha += 1 / (fly.lifeSpan / 2);

      if (fly.colors.alpha > 1) { fly.colors.alpha = 1; }
    } else {
      fly.colors.alpha -= 1 / (fly.lifeSpan / 2);

      if (fly.colors.alpha < 0) { fly.colors.alpha = 0; }
    }
  });
}

function deleteFlies() {
  var i = flies.length;

  while (i--) {
    var fly = flies[i];

    if (fly.age >= fly.lifeSpan) {
      flies.splice(i, 1);
    }
  }
}

function drawFlies() {
  flies.forEach(function(fly) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(' + fly.colors.red + ', ' + fly.colors.green + ', ' + fly.colors.blue + ', ' + fly.colors.alpha + ')';
    ctx.arc(
      fly.x,
      fly.y,
      fly.size,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();
  });
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  addFlies();
  moveFlies();
  deleteFlies();
  drawFlies();
}


function update() {
  window.requestAnimationFrame(update);
  render();
};

update();