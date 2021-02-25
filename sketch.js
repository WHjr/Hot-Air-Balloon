var database;
var balloon, position, bscale;
var balloonImg, bgImg;

function preload(){
  balloonImg = loadImage("Images/Hot Air Ballon-02.png")
  bgImg = loadImage("Images/Hot Air Ballon-01.png")
}

function setup() {
  createCanvas(800,800);

  database = firebase.database();

  balloon = createSprite(400,700,50,50)
  balloon.addImage(balloonImg)
  balloon.scale = 0.5

  database.ref("balloon").on("value",setPosition)
  
}

function draw() {
  background(bgImg);  

  if(position !== undefined){

    if(keyDown(UP_ARROW)){
      changeBalloon(0,-20,-0.01)
    }
    if(keyDown(DOWN_ARROW)){
      changeBalloon(0,20,0.01)
    }
    if(keyDown(RIGHT_ARROW)){
      changeBalloon(20,0,0)
    }
    if(keyDown(LEFT_ARROW)){
      changeBalloon(-20,0,0)
    }

    drawSprites();
  }


  
}

function setPosition(data){
  position = data.val().position;
  bscale = data.val().scale;

  balloon.x = position.x;
  balloon.y = position.y;
  balloon.scale = bscale

}

function changeBalloon(x,y,s){
  position.x += x
  position.y += y
  bscale += s

  database.ref('balloon').update({
    position: {x: position.x,y:position.y},
    scale: bscale
  })
}