"use strict";
	 var imgGlobal = new Image();
     var filterMask = [];

     var cData = [];
     var cLabel = [];
	 const funcs = require('./functions');
	 const Captcha = require('./captcha');
	 const Sobel = require('sobel');
	 const fs = require('fs');
	 const captcha = require('trek-captcha');

	var newCaptcha = () => {
		Captcha.DrawCaptcha();
	
	}

	var detectEdges = () => {
		Captcha.DetectEdges();
	}

	var binarize = () => {
		Captcha.Binarize(254);
	}



     for (let i = 0; i < 256; i++) {
     	for (let j = 0; j < 9; j++) {
     		cLabel[i] = i + 0.1;
     	}
     }

     var showChart = data => {
     	console.log('eof');
     	let ctx = document.getElementById("myChart").getContext('2d');
     	var myChart = new Chart(ctx, {
     		type: 'line',
     		data: {
     			labels: cLabel,
     			datasets: [{
     				label: 'Grey Scale Histogram',
     				data: cData,
     				backgroundColor: [
     					'rgba(255, 99, 132, 0.2)',
     					'rgba(54, 162, 235, 0.2)',
     					'rgba(255, 206, 86, 0.2)',
     					'rgba(75, 192, 192, 0.2)',
     					'rgba(153, 102, 255, 0.2)',
     					'rgba(255, 159, 64, 0.2)'
     				],
     				borderColor: [
     					'rgba(255,99,132,1)',
     					'rgba(54, 162, 235, 1)',
     					'rgba(255, 206, 86, 1)',
     					'rgba(75, 192, 192, 1)',
     					'rgba(153, 102, 255, 1)',
     					'rgba(255, 159, 64, 1)'
     				],
     				borderWidth: 1
     			}]
     		},
     		options: {
     			scales: {
     				yAxes: [{
     					ticks: {
     						beginAtZero: true
     					}
     				}]
     			}
     		}
     	});
     }




     //media

     var filtroMedia = funcs.filtroMedia;


     //mediana
     /*
     var filtroMediana = (data, filterMaskMatrix) => {
     	for (let i = 0; i < filtermaskMatrix.length; i++) {
     		for (let j = 0; j < filtermaskMatrix[i].length; j++) {

     			if (j < filterMaskMatrix[i].length - 1) {
     				let at = filterMaskMatrix[i][j],
     					prox = filterMaskMatrix[i][j + 1];

     				for (let k = 0; k < at.length - 1; k++) {
     					if (at[k] > prox[k]) {
     						let aux = at[k];
     						at[k] = prox[k];
     						prox[k] = aux;
     					}
     				}
     			}


     		}
     	}
     	var newData = filterMaskMatrix;
     	return newData;

	 }*/


     var escalaCinza = funcs.escalaCinza;
     var inverterCores = funcs.inverterCores;
     var canalBlue = funcs.inverterCores;
     var canalRed = funcs.canalRed;
     var canalGreen = funcs.canalGreen;
     var histograma = {};
     var histoGram = funcs.histoGram;
     var fillChart = funcs.fillChart;
     var filtroHighPass = funcs.highPass;
	 var filtroLowPass = funcs.lowPass;
	 var filtroBandPass = funcs.bandPass;



     var generateMatrix = (ctx, data, selectedTrans, l, c) => {
     	//filtro

     		dataAux = ctx.getImageData(l - 1, c, 1, 1).data;
     		filterMask.push(
     			dataAux
     		);

     		dataAux = ctx.getImageData(l - 1, c - 1, 1, 1).data;
     		filterMask.push(
     			dataAux
     		);

     		dataAux = ctx.getImageData(l - 1, c + 1, 1, 1).data;
     		filterMask.push(
     			dataAux
     		);



     		filterMask.push(
     			data
     		);
     		var dataAux = ctx.getImageData(l, c - 1, 1, 1).data;
     		filterMask.push(
     			dataAux
     		);

     		dataAux = ctx.getImageData(l, c + 1, 1, 1).data;
     		filterMask.push(
     			dataAux
     		);





     		dataAux = ctx.getImageData(l + 1, c, 1, 1).data;
     		filterMask.push(
     			dataAux
     		);

     		dataAux = ctx.getImageData(l + 1, c - 1, 1, 1).data;
     		filterMask.push(
     			dataAux
     		);

     		dataAux = ctx.getImageData(l + 1, c + 1, 1, 1).data;
     		filterMask.push(
     			dataAux
     		);
     	//return filterMask;
     	//end filtro

	 }
	 
	 var drawImg = (img, canvas) => {
		console.log(canvas)
		var selectedTrans = document.getElementById("mySelect").value;
		canvas.width = img.width;
		canvas.height = img.height
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
	}

	//var drawByData = ()


     var desenhaTransform = (img, sobelData) => {
		var canvas = document.getElementById('canvas');
		console.log(img);
     	var selectedTrans = document.getElementById("mySelect").value;
     	canvas.width = img.width;
     	canvas.height = img.height
     	var ctx = canvas.getContext('2d');
		 //ctx.drawImage(img, 0, 0);
		 ctx.putImageData(sobelData, 0, 0);

     	for (var linha = 0; linha < img.width; linha++) {
     		for (var coluna = 0; coluna < img.height; coluna++) {

     			var pixel = ctx.getImageData(linha, coluna, 1, 1);
     			var data = pixel.data;
     			generateMatrix(ctx, data, selectedTrans, linha, coluna);
     			var dataConvertArray = [];

     			for (let k = 0; k < data.length; k++) {
     				dataConvertArray.push(data[k]);
     			}

     			if (linha === 0 && coluna === 0)
     				console.log(data);

     			if (selectedTrans === 'canalR')
     				data = canalRed(data);
     			else if (selectedTrans === 'canalG')
     				data = canalGreen(data);
     			else if (selectedTrans === 'canalB')
     				data = canalBlue(data);
     			else if (selectedTrans === 'inverterCores')
     				data = inverterCores(data);
     			else if (selectedTrans === 'escalaCinza')
     				data = escalaCinza(data);
     			else if (selectedTrans === 'histogram')
     				data = histoGram(data);
     			else if (selectedTrans === 'filtroMedia') {
     				data = filtroMedia(data, filterMask);
     				filterMask = [];
     			} else if (selectedTrans === 'filtroLowPass') {
					 data = filtroLowPass(data);
					 if (linha === 0 && coluna === 0)
     					console.log(data);
					 filterMask = [];
     			} else if (selectedTrans === 'filtroHighPass') {
					data = filtroHighPass(data);
					if (linha === 0 && coluna === 0)
						console.log(data);
					filterMask = [];
				} else if (selectedTrans === 'filtroBandPass') {
					data = filtroBandPass(data);
					if (linha === 0 && coluna === 0)
						console.log(data);
					filterMask = [];
				}


     			pixel.data = data;


     			if (linha === 0 && coluna === 0)
     				console.log(data);

     			ctx.putImageData(pixel, linha, coluna);
     			ctx.fillStyle = 'rgba(' + data[0] +
     				',' + data[1] +
     				',' + data[2] +
     				',' + (data[3] / 255) + ')';

     		}
     	}

     	if (selectedTrans === 'histogram')
     		fillChart();
		 console.log(ctx);
     	return data;
     }

     var drawFilters = (img, canvas) => {
		//desenhaTransform(img);
     	console.log(img);
     	var selectedTrans = document.getElementById("mySelect").value;
		 var canvas = document.getElementById('canvas');
		 console.log(canvas);
     	canvas.width = img.width;
     	canvas.height = img.height;
     	var ctx = canvas.getContext('2d');
     	ctx.drawImage(img, 0, 0);
     	var imgdata = ctx.getImageData(0, 0, img.width, img.height);
     	var sobelData = Sobel(imgdata)
     	var sobelImageData = sobelData.toImageData();
     	console.log(sobelImageData);
     	ctx.putImageData(sobelImageData, 0, 0);
		 console.log(ctx);
		 return desenhaTransform(img, sobelImageData);
     }


     var previewFile = function () {
     	var preview = document.querySelector('img'); //selects the query named img
     	var file = document.querySelector('input[type=file]').files[0]; //sames as here
     	var selectedTrans = document.getElementById("mySelect").value;
     	var reader = new FileReader();
     	var img = new Image();




     	reader.onloadend = function () {
     		preview.src = reader.result;
     		img.src = reader.result;
     		imgGlobal.src = reader.result;
     		let data;
     		if (selectedTrans !== 'filtroLowPass' && selectedTrans !== 'filtroHighPass'  && selectedTrans !== 'filtroBandPass') {
				data = desenhaTransform(img);
			 }

     		else {
				 data = drawFilters(img, canvas);
     			//data = desenhaTransform(img);
     		}



     		//console.log(ctx.getImageData());
     		console.log(data);


     		if (selectedTrans === 'histogram')
     			showChart(data);

     	}


     	if (file) {
     		reader.readAsDataURL(file); //reads the data as a URL
     	} else {
     		preview.src = "";
     	}


     }

     module.exports = {
		 previewFile: previewFile,
		 newCaptcha: newCaptcha,
		 detectEdges: detectEdges,
		 binarize: binarize,
     }