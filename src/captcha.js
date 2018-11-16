const Sobel = require('sobel');
const math = require('mathjs')



function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

function DrawCaptcha(imgSrc = '../captcha3.png') {
	var canvas = document.querySelector('#captcha-img');
	var width = canvas.width;
	var height = canvas.height;
	var ctx = canvas.getContext('2d');
	var img = new Image;
	img.onload = function () {
		canvas.width = img.width;
		canvas.height = img.height;
		width = img.width;
		height = img.height;
		ctx.drawImage(this, 0, 0);
	}
	img.src = imgSrc;
}


var DetectEdges = () => {
	var canvasOri = document.querySelector('#captcha-img');
	var canvas = document.querySelector('#captcha-edge');
	var width = canvasOri.width;
	var height = canvasOri.height;
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext('2d');
	var ctxOri = canvasOri.getContext('2d');
	var imgdata = ctxOri.getImageData(0, 0, width, height);
	var sobelData = Sobel(imgdata);
	var sobelImageData = sobelData.toImageData();
	ctx.putImageData(sobelImageData, 0, 0);
}

var calcBinarize = (limit, dtMin) => {
	var canvasOri = document.querySelector('#captcha-edge');
	var ctxOri = canvasOri.getContext('2d');
	var canvas = document.querySelector('#captcha-binarize');
	var width = canvasOri.width;
	var height = canvasOri.height;
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext('2d');
	var imgdata = ctxOri.getImageData(0, 0, width, height);
	ctx.putImageData(imgdata, 0, 0);

	var t = limit;
	var dt = dtMin;

	/*while (dt >= dtMin) {
		var g1 = [];
		var g2 = [];
		for (var linha = 0; linha < width; linha++) {
			for (var coluna = 0; coluna < height; coluna++) {
				var pixel = ctx.getImageData(linha, coluna, 1, 1);
				var data = pixel.data;
				if (data[0] < t && data[1] < t && data[2] < t) g1.push(data[0]);
				else g2.push(data[0]);
			}
		}
		const m1 = math.mean(g1);
		const m2 = math.mean(g2);
		const nt = (m1 + m2) / 2;

		dt = Math.abs(nt - t);
		t = nt;
	}*/

	for (var linha = 0; linha < width; linha++) {
		for (var coluna = 0; coluna < height; coluna++) {
			var pixel = ctx.getImageData(linha, coluna, 1, 1);
				var data = pixel.data;
			if(data[0] < t && data[1] < t && data[2] < t) {
				data[0] = 255;
				data[1] = 255;
				data[2] = 255;
			}
			else {
				data[0] = 0;
				data[1] = 0;
				data[2] = 0;
			}

			ctx.putImageData(pixel, linha, coluna);
     			ctx.fillStyle = 'rgba(' + data[0] +
     				',' + data[1] +
     				',' + data[2] +
     				',' + (data[3] / 255) + ')';
		}
	}
}

var Binarize = (limit) => {
	const dtMin = 1;
	const min = 0;
	const max = 255;

	limit = limit ? limit : (max + min) / 2;

	calcBinarize(limit, dtMin);
}

module.exports = {
	DrawCaptcha,
	DetectEdges,
	Binarize,
}