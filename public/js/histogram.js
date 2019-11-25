window.onload = myInit();

function myInit(){
    document.getElementById("imageFile").addEventListener("change", handleFiles);
    
    myDisplay(); 
};

function drawLine(x1,y1,x2,y2,color){
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
    ctx.strokeStyle=color
    ctx.lineWidth=3;
	ctx.stroke();
}

function PlotAxis(O,l1,l2){
    drawLine(O.x,O.y,l1.x,l1.y,"#000")
    drawLine(O.x,O.y,l2.x,l2.y,"#000")
}

function histogram(rD,gD,bD){

    PlotAxis({x:20,y:(cvs.height)-20},{x:(cvs.width-180-20),y:(cvs.height)-20},{x:20,y:(cvs.height/2)+10})
	
	var value=0
	for(i=0;i<255;i++){
		if(rD[i]>value) {
            value=rD[i]
        }
		if(gD[i]>value) {
            value=gD[i]
        }
		if(bD[i]>value) {
            value=bD[i]
        }
    }	
    	
	var pLength=(value/((cvs.height/2)-40))
	

    for(i=0;i<256;i++){

        ctx.beginPath();
        
        ctx.lineWidth=2;
        ctx.moveTo(i+25,(cvs.height)-25);
        ctx.lineTo(i+25,(cvs.height)-25-(rD[i]/pLength));
        ctx.strokeStyle="rgba(255,0,0,255)"
        
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(i+25,(cvs.height)-25);
        ctx.lineTo(i+25,(cvs.height)-25-(gD[i]/pLength));
        ctx.strokeStyle="rgba(0,255,0,255)"
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(i+25,(cvs.height)-25);
        ctx.lineTo(i+25,(cvs.height)-25-(bD[i]/pLength));
        ctx.strokeStyle="rgba(0,0,255,255)"
        ctx.stroke();
    }
}
// function myDisplay(){
//     alert("Inside myDisplay function");
//     var cvs = document.getElementById('mycanvas');
//     var ctx = cvs.getContext('2d');

//     var columns = 3, rows = 3;

//     var tileWidth  = Math.round(cvs.width / columns), tileHeight = Math.round(cvs.height / rows);

//     var img1 = new Image();
//     var img2 = new Image();
//     img1.onload = function(){
//         xIndex = 2, yIndex = 2;
//         x = xIndex * tileWidth, y = yIndex * tileHeight;
//         ctx.drawImage(img1, x, y, tileWidth, tileHeight);

//         xIndex = 0, yIndex = 0;
//         x = xIndex * tileWidth, y = yIndex * tileHeight;
//         ctx.drawImage(img2, x, y, tileWidth, tileHeight);
//     };
//     img1.src = 'images/redParrot.jpg';
//     img2.src = 'images/ball.jpg'
// };

document.getElementById('imageFile').addEventListener('change', handleFiles);

function handleFiles(){
    var theGoods = document.getElementById('imageFile').files[0];
    var img = new Image();
    var reader = new FileReader();
    reader.addEventListener("load", function(){ img.src = reader.result; });

    let cv =  document.getElementById("mycanvas");
     let ctx = cv.getContext("2d");

    img.onload = function() { 
        // calcAndGraph(img);
        fitImageOn(cv,img,ctx);
    }

    if(theGoods) { reader.readAsDataURL(theGoods); }

};



function calcAndGraph(img){
    let rD = [], gD = [], bD = [] ;
    ctx.drawImage(img, xStart, yStart, renderableWidth, renderableHeight);
    const iD = ctx.getImageData(0,0,640,480).data;


    for(var i = 0; i<256; i++)
    { 
        rD[i]=0;
        gD[i]=0;
        bD[i]=0;
    }

    for(var i=0; i<iD.length; i+=4){
        rD[iD[i]]++;
        gD[iD[i+1]]++;
        bD[iD[i+2]]++;
    }
    console.log("rD",rD)
    console.log("gD",gD)
    console.log("bD",bD)

    histogram(rD, gD, bD);
};



var fitImageOn = function(canvas, imageObj, context) {
	var imageAspectRatio = imageObj.width / imageObj.height;
	var canvasAspectRatio = canvas.width / 480;
	var renderableHeight, renderableWidth, xStart, yStart;

	// If image's aspect ratio is less than canvas's we fit on height
	// and place the image centrally along width
	if(imageAspectRatio < canvasAspectRatio) {
		renderableHeight = 480;
		renderableWidth = imageObj.width * (renderableHeight / imageObj.height);
		xStart = (canvas.width - renderableWidth) / 2;
		yStart = 0;
	}
	else if(imageAspectRatio > canvasAspectRatio) {
		renderableWidth = canvas.width
		renderableHeight = imageObj.height * (renderableWidth / imageObj.width);
		xStart = 0;
		yStart = (480 - renderableHeight) / 2;
	}
	else {
		renderableHeight = 480;
		renderableWidth = canvas.width;
		xStart = 0;
		yStart = 0;
	}
    context.drawImage(imageObj, xStart, yStart, renderableWidth, renderableHeight);
    calcAndGraph(imageObj);
};



