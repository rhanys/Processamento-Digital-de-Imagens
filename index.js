     var imgGlobal = new Image();
     var ctrlTransp = 0;
     var ctrlTranspLess = 0;

     var cData = [];
     var cLabel = [];

     for(i=0; i<256; i++){
      for(j=0; j<9; j++){
        cLabel[i] = i+0.1;
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
            data:  cData,
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
                    beginAtZero:true
                }
            }]
        }
    }
});
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    if(g)
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

  return "#" + componentToHex(r);
}

var escalaCinza = (data)=>{
      var r, g, b;
      r = data[0];
       g = data[1];
        b = data[2];
        var cinza = (r+g+b)/3;
        data[0] = cinza;
        data[1] = cinza;
        data[2] = cinza;
        var newData = data;

      return newData;
     }

     var inverterCores =  (data)=>{
        data[0] = 255 - data[0];
        data[1] = 255 - data[1];
        data[2] = 255 - data[2];
        var newData = data;


      return newData;
     }
    


   var canalBlue = (data)=>{
      var r, g, b;
      r = data[0];
       g = data[1];
        b = data[2];
        var colort = b;
        data[0] = 0;
        data[1] = 0;
        data[2] = colort;
        var newData = data;

      return newData;
     }

    

     var canalRed = (data)=>{
      var r, g, b;
      r = data[0];
       g = data[1];
        b = data[2];
        var colort = r;
        data[0] = colort;
        data[1] = 0;
        data[2] = 0;
        var newData = data;

      return newData;
     }

     var canalGreen = (data)=>{
      var r, g, b;
      r = data[0];
       g = data[1];
        b = data[2];
        var colort = g;
        data[0] = 0;
        data[1] = colort;
        data[2] = 0;
        var newData = data;

      return newData;
     };


      var histograma = {};
     var histoGram = data => {

         var r, g, b, hex;
      r = data[0];
       g = data[1];
        b = data[2];
      hex = rgbToHex(r, g, b);
      let greyScale = (0.2126*r+0.7152*g+0.0722*b);
      let hexGrey = rgbToHex(greyScale);




          if(!histograma[greyScale]) {
            histograma[greyScale] = 1;
          } else {
            histograma[greyScale]++;
          }
        var newData = data;

      return newData;
     }


     var fillChart = () => {

      for(var nv in histograma) {
        cData.push({x: nv, y:histograma[nv]});
      }

     }


     var desenhaTransform = (img, canvas) => {
      var selectedTrans = document.getElementById("mySelect").value;
      canvas.width=img.width;
      canvas.height=img.height
       var ctx = canvas.getContext('2d');
           ctx.drawImage(img, 0, 0);
           for (var linha = 0; linha < img.width; linha++) {
             for (var coluna = 0; coluna< img.height; coluna++) {
               var pixel = ctx.getImageData(linha, coluna, 1, 1);
               var data = pixel.data;
               var dataConvertArray = [];

               for (let k = 0; k < data.length; k++) {
                 dataConvertArray.push(data[k]);
               }

                if(linha === 0 && coluna === 0)
                console.log(data);

               if(selectedTrans === 'canalR')
               data = canalRed(data);
                else if(selectedTrans === 'canalG')
                  data = canalGreen(data);
                else if(selectedTrans === 'canalB')
                  data = canalBlue(data);
                 else if(selectedTrans === 'inverterCores')
                  data = inverterCores(data);
                 else if(selectedTrans === 'escalaCinza')
                  data = escalaCinza(data);
                else if(selectedTrans === 'histogram')
                  data = histoGram(data);

               pixel.data = data;


               if(linha === 0 && coluna === 0)
                console.log(data);

               ctx.putImageData(pixel, linha, coluna);
               ctx.fillStyle = 'rgba(' + data[0]
                        + ',' + data[1]
                        + ',' + data[2]
                        + ',' + (data[3]/255) + ')';

             }
           }
           if(selectedTrans === 'histogram')
            fillChart();

           return data;
     }



     function previewFile(){
       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var canvas = document.getElementById('canvas');
       var selectedTrans = document.getElementById("mySelect").value;
       var reader  = new FileReader();
       var img = new Image();
      
           
     

       reader.onloadend = function () {
           preview.src = reader.result;
           img.src = reader.result;
           imgGlobal.src = reader.result;
           let data = desenhaTransform(img, canvas);
          
           //console.log(ctx.getImageData());
           console.log(cData);


           if(selectedTrans === 'histogram')
            showChart(data);
           
       }


       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }


  }
