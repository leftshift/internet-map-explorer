const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('wheel', handleScroll);

const image = new Image(4096, 4096);
image.onload = drawMap;

var zoom = 1;
var center = {x:400, y:400};

function loadMap(href) {
  image.src = href;
}

function drawMap() {
  ctx.drawImage(image, 0, 0);
}

function zoomMap(delta, x, y) {
  dx = x - center.x;
  dy = y - center.y;
  dz = Math.pow(2, delta/3);
  console.log(dx + ' ' + dy + ' ' + dz);
  ctx.transform(dz, 0, 0, dz, dx, dy);
  drawMap();
}

function handleScroll(ev) {
  console.log(this);
  console.log(ev);
  zoomMap(-ev.deltaY, ev.layerX - ev.target.offsetLeft, ev.layerY - ev.target.offsetTop);
  ev.preventDefault();
}

loadMap("map.png");
