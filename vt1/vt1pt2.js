var img = new Image();
var url = 'https://image.ibb.co/k6p1JU/vt1pt2pdi.png';
img.setAttribute('crossOrigin', 'anonymous');
img.src =  url + '?' + new Date().getTime();
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
img.onload = function() {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
};
var color = document.getElementById('color');
function pick(event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = ctx.getImageData(x, y, 1, 1);
  var data = pixel.data;
  var rgba = 'rgba(' + data[0] + ', ' + data[1] +
             ', ' + data[2] + ', ' + (data[3] / 255) + ')';
  color.style.background =  rgba;
  color.textContent = rgba;
}
canvas.addEventListener('mousemove', pick);