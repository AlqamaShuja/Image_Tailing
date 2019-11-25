
//Declearing Variables
var t=0;
var time;
var ratImage,catImage
var ctx,cvs
var image1
var imgwidth
var imgheight
function Init() {

  cvs=document.getElementById("mycanvas");
  ctx=cvs.getContext("2d");


  image1=new Image();

  image1.src="./images/cat.jpeg";
  window.onclick=function(e){
    var m=getMousePos(e)
    console.log("m",m)
    var startX,startY,endX,endY
    for(var j=0;j<cvs.width;j+=imgwidth){
      if(m.x>j && m.x<j+imgwidth){
        startX=j
        endX=j+imgwidth
      }
    }
    for(var j=0;j<cvs.height;j+=imgheight){
      if(m.y>j && m.y<j+imgheight){
        startY=j
        endY=j+imgwidth
      }
    }
    //ctx.drawRect(startX,startY,endX,endY)
    ctx.fillStyle = "magenta";
    ctx.fillRect(startX,startY,endX-startX,endY-startY);
    ctx.stroke()
  }
  image1.onload=function(){
    drawTile()
 }

}
function getMousePos(e){
  var r=cvs.getBoundingClientRect()
  return{
    x: e.clientX - r.left,
    y: e.clientY - r.top,
  }
}
function drawTile(){
   imgwidth=cvs.width/10
   imgheight=cvs.height/10
  console.log(imgwidth,imgheight)
  for(var i=0;i<cvs.width;i+=imgwidth){
    for(var j=0;j<cvs.height;j+=imgheight){
      ctx.drawImage(image1,i,j,imgwidth,imgheight)
      //ctx.rotate(Math.PI/2)
    }
  }
  
}

function animation(){
  if(t>1){
    clearInterval(time)
  }
  // for(var i=0;i<catImage.data.length;i+=4){
  //   canvasData.data[i]=catImage.data[i]+(ratImage.data[i]-catImage.data[i])*t;
  //   canvasData.data[i+1]=catImage.data[i+1]+(ratImage.data[i+1]-catImage.data[i+1])*t;
  //   canvasData.data[i+2]=catImage.data[i+2]+(ratImage.data[i+2]-catImage.data[i+2])*t;
  //   canvasData.data[i+3]=catImage.data[i+3]+(ratImage.data[i+3]-catImage.data[i+3])*t
  // }
 // resultCtx.putImageData(canvasData,0,0)
}


Init()