//import utils from './utils.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

var gravity = 1;
var friction = 0.9;
var ballNumber=400;

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}


function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}
// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
})

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
})

addEventListener('click',function(){
  init();
})



// Objects
function Ball(x,y,dx,dy,radius,color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
 

 this.update = function() {
   if(this.y + this.radius + this.dy > canvas.height){
     this.dy= -this.dy * friction;

   }else{
     this.dy += gravity;
   }
   if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius <0){
     this.dx = -this.dx;
   }
   this.x += this.dx;
   this.y += this.dy;
   console.log(this.dy)
   this.draw()
};

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  };
}


// Implementation,

var ballArray = [];
function init() {
  ballArray = [];
  for (var i=0; i < ballNumber; i++){
    var radius = randomIntFromRange(20,30);
    var color = randomColor(colors);
    var x = randomIntFromRange(radius,canvas.width-radius);
    var y = randomIntFromRange(radius,canvas.height-radius-100);
    var dx = randomIntFromRange(-10,5);
    var dy = randomIntFromRange(-2,2);
    ballArray.push(new Ball(x,y,dx,dy,radius,color));
  }
  
}

function appleAd(){
  c.font = "50px Helvetica";
  c.textAlign = "center";
  //c.fillStyle = '#FF7F66';
  c.fillStyle = 'white';
  c.fillText("Apple", canvas.width/2, canvas.height/2);
  c.font = "14px Helvetica";
  c.fillText("Design your future. by iPhone", canvas.width/2,canvas.height/2+50);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height)
  appleAd();

  for(var i=0; i<ballArray.length; i++){
    ballArray[i].update();
  }
 
  // objects.forEach(object => {
  //  object.update()
  // })
}

init();
animate();
