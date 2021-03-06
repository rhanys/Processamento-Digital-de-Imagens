const Sobel = require('sobel');
const math = require('mathjs');
const brain = require('brain.js');



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


	for (var linha = 0; linha < width; linha++) {
		for (var coluna = 0; coluna < height; coluna++) {
			var pixel = ctx.getImageData(linha, coluna, 1, 1);
			var data = pixel.data;
			if (data[0] < t && data[1] < t && data[2] < t) { //if black
				data[0] = 255; //white
				data[1] = 255;
				data[2] = 255;
			} else { // if white
				data[0] = 0; //black
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

	calcBinarize(limit, dtMin);
}
/*
var SplitLetters = () => {
	var canvasOri = document.querySelector('#captcha-binarize');
	var ctxOri = canvasOri.getContext('2d');
	var canvas = document.querySelector('#captcha-split');
	var width = canvasOri.width;
	var height = canvasOri.height;
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext('2d');
	var imgdata = ctxOri.getImageData(0, 0, width, height);
	ctx.putImageData(imgdata, 0, 0);
	var fillPix;

	var letters = [];
	console.log(width);

	//var pixel = ctx.getImageData(coluna, linha, 1, 1);
	//var data = pixel.data;

	letters.push({ //letter 1
		initX: 10,
		initY: 5
	});

	letters[0].finalX = 24; //letter 1
	letters[0].finalY = height - 10; //letter 1
	var fl = 34;
	var f = 24

	for (let i = 1; i < 5; i++) { //letter 2 ate 5
		if (i === 1) { //letter 2
			letters.push({
				initX: fl,
				initY: 5
			});
			letters[i].finalX = f;
			letters[i].finalY = height - 10; //tamanho do canvas -10
		} else {
			fl += 24;
			f += 1;
			letters.push({

				initX: fl,
				initY: 5
			});
			letters[i].finalX = f;
			letters[i].finalY = height - 10; //tamanho do canvas =10
		}



	}

	for (let i = 0; i < letters.length; i++) {
		ctx.strokeRect(letters[i].initX, 5, letters[i].finalX, height - 10);
		/*console.log('Dimensoes');
		console.log(Math.abs(letters[i].finalX - letters[i].initX));
		console.log('por');
		console.log(letters[i].finalY - letters[i].initY);
		console.log(letters);
	}
	return letters;

}*/


var SplitLetters = () => {
	var canvasOri = document.querySelector('#captcha-binarize');
	var ctxOri = canvasOri.getContext('2d');
	var canvas = document.querySelector('#captcha-split');
	var width = canvasOri.width;
	var height = canvasOri.height;
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext('2d');
	var imgdata = ctxOri.getImageData(0, 0, width, height);
	ctx.putImageData(imgdata, 0, 0);
	var fillPix;

	var letters = [];
	var cont = 0;
	var base = 0;
	while (cont < 5) {
		cont++;



		var initX = 1000,
			initY = 1000,
			finalX = 0,
			finalY = 0;
		var findEdge = false;


		for (let col = base; col < width; col++) {

			for (let lin = 0; lin < height; lin++) {
				var pixel = ctx.getImageData(col, lin, 1, 1);
				var data = pixel.data;


				if (data[0] < 10) { //black
					if (col < initX)
						initX = col
					if (lin < initY)
						initY = lin;
					findEdge = true;
				} else if (findEdge && data[0] > 100 && lin > finalY && col > finalX) { //white
					finalX = initX + 20;
					finalY = lin;
					findEdge = false;
				}

			}
		}

		letters.push({
			initX: initX,
			initY: initY,
			finalX: finalX,
			finalY: finalY
		});
		if ((finalX) < 300)
			base = finalX + 1;
	}



	for (let i = 0; i < letters.length; i++) {
		if(i !== 4)
		ctx.strokeRect(letters[i].initX, letters[i].initY, (letters[i].finalX - letters[i].initX), (letters[i].finalY - letters[i].initY));
		else
		ctx.strokeRect(letters[i].initX, letters[i].initY, (letters[i].finalX - letters[i].initX), 33);

		console.log('Dimensoes');
		console.log(letters[i].initX);
		console.log(letters[i].initY)
		console.log(letters[i].finalX - letters[i].initX);
		console.log(letters[i].finalX);
		console.log(letters[i].finalY - letters[i].initY);

	}
	return letters;


}

var transformArrayData = (arrData) => {
	let arrDataConv = [];
	arrData.data.map((s, i) => {
		if (s > 200)
			arrDataConv.push(0);
		else
			arrDataConv.push(1);

	});

	return arrDataConv;
}

var runRecognize = (letters) => {
	// provide optional config object (or undefined). Defaults shown.
	const config = {
		binaryThresh: 0.5,
		hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
		activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
		leakyReluAlpha: 0.01
	};

	// create a simple feed forward neural network with backpropagation
	const net = new brain.NeuralNetwork(config);






	//captcha
	var canvasOri = document.querySelector('#captcha-binarize');
	var canvas = document.querySelector('#captcha-recog');
	var width = letters[0].finalX - letters[0].initX;
	var height = letters[0].finalY - letters[0].initY;
	canvas.width = canvasOri.width;
	canvas.height = canvasOri.height + 100;
	var ctxOri = canvasOri.getContext('2d');
	var ctx = canvas.getContext('2d');


	var dataTrain = [];
	for (let i = 0; i < letters.length; i++) {
		var lettData = ctxOri.getImageData(letters[i].initX, letters[i].initY, letters[i].finalX, letters[i].finalY);
		var lettDataConvert = [];
		let outpt = [];
		for (j = 0; j < 5; j++) {
			outpt.push(0);
		}
		outpt[i] = 1;
		lettDataConvert = transformArrayData(lettData);
		dataTrain.push({
			input: lettDataConvert,
			output: outpt
		})
		//ctx.putImageData(lettData, 0, 0);


	}

	net.train(dataTrain);
	var recognizedWord = '';
	// reconhece todas as letras do captcha
	for (let captchaIdx = 0; captchaIdx < letters.length; captchaIdx++) {
		var runData = ctxOri.getImageData(letters[captchaIdx].initX, letters[captchaIdx].initY, letters[captchaIdx].finalX, letters[captchaIdx].finalY);
		runData = transformArrayData(runData);
		var output = net.run(runData);
		var result = -1;

		for (let i = 0; i < output.length; i++) {
			result = activate(output[i], i);
			if (result > -1)
				break;
		}


		switch (result) {
			case 0:
				result = '4';
				break;
			case 1:
				result = 'D';
				break;
			case 2:
				result = '7';
				break;
			case 3:
				result = 'Y';
				break;
			case 4:
				result = 'S';
				break;
			default:
				result = 'NAO RECONHECIDO'
				break;
		}

		console.log('Letra reconhecida: ' + result);
		recognizedWord += result + '';
	}
	ctx.font = "30px Arial";
	ctx.fillText(recognizedWord, 10, 50);
	console.log(recognizedWord);
}

var activate = (v, i) => v > 0.5 ? i : -1;

module.exports = {
	DrawCaptcha,
	DetectEdges,
	Binarize,
	SplitLetters,
	runRecognize,
}