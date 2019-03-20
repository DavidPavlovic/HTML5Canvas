const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Line color
ctx.strokeStyle = '#BADA55';
// Line edges
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
// Line size
ctx.lineWidth = 100;
// Blend mode to play with, go to google
//ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  // Stop the function from running when they are not moused down
  if(!isDrawing) {
    return; 
  }
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  //lastX = e.offsetX;
  //lastY = e.offsetY;
  // This two upper lines can be written in one line like this bottom line
  // Upade variables
  [lastX, lastY] = [e.offsetX, e.offsetY];
  // Every time change color
  hue++;
  if(hue >= 360) {
    hue = 0;
  }
  // Increment line
  if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if(direction) {
    ctx.lineWidth++;
  }else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);