var database;

var drawing=[];
var db_drawing;
//var currentPath = [];
var canvas;
//var isDrawing = false;


function setup(){
  database = firebase.database();
  canvas = createCanvas(500,500);
  //canvas.mousePressed(startPath);
  //canvas.mouseReleased(endPath);
  canvas.parent('canvascontainer');
  

  var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);

  var ref = database.ref('drawing');
  ref.on('value',gotData); 
}

function mousePressed{
  isDrawing = true;
  // currentPath = [];
   //drawing.push(currentPath);
}

function mouseReleased(){
  isDrawing = false;
}

function draw(){
  background(0);

  if (isDrawing){
    var point = {
      x: mouseX,
      y: mouseY,
    }
    drawing.push(point);
    var drawingRef = database.ref('drawing')
    drawingRef.set = ({
      "d" : drawing
    })
  }

  
  stroke(255);
  strokeWeight(4);
  noFill();
      beginShape();
  for(var i = 0; i < db_drawing.length; i++){
    vertex(db_drawing[j].x,db_drawing[j].y)
  
    endShape();
  }

  

}

function saveDrawing(){

}

function gotData(data) {
  
        db_drawing = data.val().d
    
  
}

