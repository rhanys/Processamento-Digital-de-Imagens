     var imgGlobal = new Image();
     var ctrlTransp = 0;
     var ctrlTranspLess = 0;


     var inverterCores =  (data)=>{
        data[0] = 255 - data[0];
        data[1] = 255 - data[1];
        data[2] = 255 - data[2];
        var newData = data;


      return newData;
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



     function previewFile(){
       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var canvas = document.getElementById('canvas');
       var reader  = new FileReader();
       var img = new Image();
      
           
     

       reader.onloadend = function () {
            var p1 = {};
            var p2 = {};
            p1.x = document.getElementById("ponto1").value.split(",")[0];
            p1.y = document.getElementById("ponto1").value.split(",")[1];
            p2.x = document.getElementById("ponto2").value.split(",")[0];
            p2.y = document.getElementById("ponto2").value.split(",")[1];
            var selectedTrans = document.getElementById("mySelect").value;
           preview.src = reader.result;
           img.src = reader.result;
           imgGlobal.src = reader.result;
           var ctx = canvas.getContext('2d');
           ctx.drawImage(img, 0, 0);
           for (var linha = p1.x; linha < p1.y; linha++) {
             for (var coluna = p2.x; coluna< p2.y; coluna++) {
               var pixel = ctx.getImageData(linha, coluna, 1, 1);
               var data = pixel.data;

                if(linha === p1.x && coluna === p2.x)
                console.log(data);

               if(selectedTrans === 'cinza')
               data = escalaCinza(data);
                else if(selectedTrans === 'invert')
                  data = inverterCores(data);

               pixel.data = data;


               if(linha === p1.x && coluna === p2.x)
                console.log(data);

               ctx.putImageData(pixel, linha, coluna);
               ctx.fillStyle = 'rgba(' + data[0]
                        + ',' + data[1]
                        + ',' + data[2]
                        + ',' + (data[3]/255) + ')';

             }
           }
           console.log(ctx.getImageData());
           
       }


       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
  }

  //previewFile();  //calls the function named previewFile()
