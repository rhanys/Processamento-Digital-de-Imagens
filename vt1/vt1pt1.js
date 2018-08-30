var url = 'https://image.ibb.co/d8NSsp/imgcorte.png';
var image = new Image();
image.onload = cutImageUp;
image.setAttribute('crossOrigin', 'anonymous');
image.src =  url + '?' + new Date().getTime();

function cutImageUp() {
    console.log('teste');
    var widthOfOnePiece = 130;
    var heightOfOnePiece = 130;
    var nCutsColumn = 2;
    var nCutsRow=2;
    var imagePieces = [];
    for(var x = 0; x < nCutsColumn; ++x) {
        //widthOfOnePiece+=30;
        //heightOfOnePiece+=30;
        for(var y = 0; y < nCutsRow; ++y) {
            var canvas = document.getElementById('canvas');
            canvas.width = widthOfOnePiece;
            canvas.height = heightOfOnePiece;
            var context = canvas.getContext('2d');
            context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
        }
    }

    // imagePieces now contains data urls of all the pieces of the image

    // load one piece onto the page
    var anImageElement = document.getElementById('myImageElementInTheDom');

    imgElement1.src = imagePieces[1];
    imgElement2.src = imagePieces[2];
    imgElement3.src = imagePieces[0];
    //imgElement4.src = imagePieces[3];
}