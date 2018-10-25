function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    if (g)
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

    return "#" + componentToHex(r);
}
var escalaCinza = (data) => {
    var r, g, b;
    r = data[0];
    g = data[1];
    b = data[2];
    var cinza = (r + g + b) / 3;
    data[0] = cinza;
    data[1] = cinza;
    data[2] = cinza;
    var newData = data;

    return newData;
}

var inverterCores = (data) => {
    data[0] = 255 - data[0];
    data[1] = 255 - data[1];
    data[2] = 255 - data[2];
    var newData = data;


    return newData;
}



var canalBlue = (data) => {
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



var canalRed = (data) => {
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

var canalGreen = (data) => {
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
    let greyScale = (0.2126 * r + 0.7152 * g + 0.0722 * b);
    let hexGrey = rgbToHex(greyScale);




    if (!histograma[greyScale]) {
        histograma[greyScale] = 1;
    } else {
        histograma[greyScale]++;
    }
    var newData = data;

    return newData;
}


var fillChart = () => {

    for (var nv in histograma) {
        cData.push({
            x: nv,
            y: histograma[nv]
        });
    }

}


var filtroMedia = (data, filterMask) => {

    var media = {
        r: 0,
        g: 0,
        b: 0
    };
    var rgb = [];
    for (let i = 0; i < filterMask.length; i++) {
        let d = filterMask[i];
        rgb.push({
            r: d[0],
            g: d[1],
            b: d[2]
        });
    }


    for (let i = 0; i < rgb.length; i++) {
        media.r += rgb[i].r;
        media.g += rgb[i].g;
        media.b += rgb[i].b;
    }

    media.r = media.r / 9;
    media.g = media.g / 9;
    media.b = media.b / 9;


    data[0] = media.r;
    data[1] = media.g;
    data[2] = media.b;

    var newData = data;
    return newData;
}


module.exports = {
    filtroMedia,
    escalaCinza,
    inverterCores,
    canalBlue,
    canalGreen,
    canalRed,
    histoGram,
    fillChart,


}