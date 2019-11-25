window.onload = myInit();

function myInit(){
     myDisplay();
};

function myDisplay(){
  //  alert("Inside myDisplay function");
    var cvs = document.getElementById('mycanvas');
    var ctx = cvs.getContext('2d');

    var columns = 3, rows = 3;

    //var tileWidth  = Math.round(cvs.width / columns), tileHeight = Math.round(cvs.height / rows);

    // var img1 = new Image();
    // var img2 = new Image();
    // img1.onload = function(){
    //     xIndex = 2, yIndex = 2;
    //     x = xIndex * tileWidth, y = yIndex * tileHeight;
    //     ctx.drawImage(img1, x, y, tileWidth, tileHeight);

    //     xIndex = 0, yIndex = 0;
    //     //x = xIndex * tileWidth, y = yIndex * tileHeight;
    //    // ctx.drawImage(img2, x, y, tileWidth, tileHeight);
    // };
    // img1.src = 'images/redParrot.jpg';
    // img2.src = 'images/ball.jpg'
};