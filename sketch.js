var PLAY=1;
var END=0;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, stoneGroup
var score;
var gameState=PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(50,350,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  ground=createSprite(200,380,800,20);
  ground.velocityX=-2; 
  //monkey.debug=true;
  monkey.setCollider("circle",0,20,220);
  bananaGroup=createGroup()
  stoneGroup=createGroup()
  score=0
}


function draw() {
  background("white");
  
  text("Score: "+ score, 300,50);
  if (gameState===PLAY){
    
  score = score + Math.round(getFrameRate()/60);
  
  if(ground.x<0){
    ground.x=ground.width/2
  }
   
  if (keyDown("space")){
    monkey.velocityY=-10
  }
  if(bananaGroup.isTouching(monkey)){
        bananaGroup.destroyEach();
 }   
  
  monkey.velocityY=monkey.velocityY+0.8
  spawnBanana();
  spawnStone();
    if (stoneGroup.isTouching(monkey)){
      gameState=END
    }
  }
  else if (gameState===END){
    monkey.pause();
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    ground.velocityX=0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
  }
  monkey.collide(ground);
  drawSprites();
  
}
function spawnBanana() {
  //write code here to spawn the banana
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,300,40,10);
    banana.addImage(bananaImage)
    banana.y = Math.round(random(100,250))
    banana.scale = 0.1;
    banana.velocityX = -4;
    
    //assign lifetime to the variable
    banana.lifetime = 200;
    
    //add each banana to the group
    bananaGroup.add(banana);
    }
}

function spawnStone() {
  //write code here to spawn the banana
  if (frameCount % 60 === 0) {
    var stone = createSprite(600,360,40,10);
    stone.addImage(obstacleImage)
    stone.scale = 0.1;
    stone.velocityX = -6;
    
    //assign lifetime to the variable
    stone.lifetime = 200;
    
    //add each stone to the group
    stoneGroup.add(stone);
    }
}










