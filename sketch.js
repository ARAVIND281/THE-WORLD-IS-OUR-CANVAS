var database;

var drawing=[];
var currentPath = [];
var canvas;
var isDrawing = false;


function setup(){
  database = firebase.database();
  canvas = createCanvas(500,500);
  canvas.mousePressed(startPath);
  canvas.mouseReleased(endPath);
  canvas.parent('canvascontainer');
  

  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

  var ref = database.ref('drawing');
  ref.on('value',gotData,errData); 
}

function startPath(){
  isDrawing = true;
   currentPath = [];
   drawing.push(currentPath);
}

function endPath(){
  isDrawing = false;
}

function draw(){
  background(0);

  if (isDrawing){
    var point = {
      x: mouseX,
      y: mouseY,
    }
    currentPath.push(point);
    var drawingRef = database.ref('drawing')
    drawingRef.set = ({
      "d" : drawing
    })
  }

  
  stroke(255);
  strokeWeight(4);
  noFill();
  for(var i = 0; i < drawing.length; i++){
    var path = drawing[i]
    beginShape();
    for(var j = 0; j < path.length; j++){
    vertex(path[j].x,path[j].y)
    }
    endShape();
  }

  

}

function saveDrawing(){
 var ref = database.ref('drawings');
 var data = {
   name: "Aswin",
   drawing:drawing
 }
 var result = ref.push(data,dataSent);
 console.log(result.key);

 function dataSent(err,  status){
    console.log(status);
 }
}

function gotData(data) {
  var drawing = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i < keys.length; i++){
    var Key = keys[i];
    console.log(key);
  }
}

function errData(err){
   console.log(err);
}