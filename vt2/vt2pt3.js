     var imgGlobal = new Image();
     var ctrlTransp = 0;
     var ctrlTranspLess = 0;

      var showChart = data => {
    console.log('me');
    let ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data:  [{
        x: 10,
        y: 20
    }, {
        x: 15,
        y: 10
    }],
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
     }

     var histoGram = data => {
         var r, g, b;
      r = data[0];
       g = data[1];
        b = data[2];

        var cinza = (r+g+b)/3;
        //data[0] = cinza;
        //data[1] = cinza;
        data[2] = cinza;
        var newData = data;

      return newData;
     }



     function previewFile(){
       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var canvas = document.getElementById('canvas');
       var reader  = new FileReader();
       var img = new Image();
      
           
     

       reader.onloadend = function () {
            var selectedTrans = document.getElementById("mySelect").value;
           preview.src = reader.result;
           img.src = reader.result;
           imgGlobal.src = reader.result;
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
           //console.log(ctx.getImageData());

           showChart(data);
           
       }


       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }


  }



  //previewFile();  //calls the function named previewFile()
