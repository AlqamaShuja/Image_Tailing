var cvs, ctx, column, row, tileWidth, tileHeight;
var xStart, yStart;
var renderableWidth, renderableHeight

cvs = document.getElementById('mycanvas');
ctx = cvs.getContext('2d');




columns = 3;
rows = 3;

var tileWidth  = Math.round(cvs.width / columns), tileHeight = Math.round(cvs.height / rows);

