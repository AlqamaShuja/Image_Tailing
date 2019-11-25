
//Declearing Variables
var t=0;
var time;
var ratImage,catImage
var ctx
function Init() {

  var cvs=document.getElementById("mycanvas");
  ctx=cvs.getContext("2d");

  //setting a 2nd resultant canvas

  var resultCanvas=document.querySelector("#resultcanvas");
  var resultCtx=resultCanvas.getContext("2d");

  var canvasData=resultCtx.getImageData(0,0,300,400)

  //Instantiate Images
  var image1=new Image();
  var image2=new Image();

  image1.src="./images/rat.jpg";
  image2.src="./images/cat.jpeg";

  var divideCanvas=cvs.width/2;
  console.log(divideCanvas)

  var xStart=0,yStart=0;

  //drawing line on a partition
  ctx.moveTo(divideCanvas,0);
  ctx.lineTo(divideCanvas,cvs.height);
  ctx.stroke()

  image1.onload=function(){
    ctx.drawImage(image1,xStart,yStart,divideCanvas,cvs.height)
    catImage= ctx.getImageData(0,0,300,400)
 }

  image2.onload=function(){
    ctx.drawImage(image2,divideCanvas,yStart,divideCanvas,cvs.height)
    ratImage= ctx.getImageData(divideCanvas,yStart,divideCanvas,cvs.height)

  // console.log(catImage.data)
  // console.log(ratImage.data)
  //console.log(resultCtx.data)

  time=setInterval(function(){
    animation()
    t+=0.05
  },200);

}

function animation(){
  if(t>1){
    clearInterval(time)
  }
  for(var i=0;i<catImage.data.length;i+=4){
    canvasData.data[i]=catImage.data[i]+(ratImage.data[i]-catImage.data[i])*t;
    canvasData.data[i+1]=catImage.data[i+1]+(ratImage.data[i+1]-catImage.data[i+1])*t;
    canvasData.data[i+2]=catImage.data[i+2]+(ratImage.data[i+2]-catImage.data[i+2])*t;
    canvasData.data[i+3]=catImage.data[i+3]+(ratImage.data[i+3]-catImage.data[i+3])*t
  }
  resultCtx.putImageData(canvasData,0,0)
}
}

Init()