var PLAY= 1
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var ground;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(500,500);
  
  monkey = createSprite(100,250,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1
  
  ground = createSprite(250,300,1000,20);
  ground.x = width/2;
  ground.velocityX = -5;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
   background("white");
  
  if (gameState === PLAY)
    {
      foods();
  obstacles();
  
  if (ground.x < 0)
    {
      ground.x = width/2;
    }
  
  if(keyDown("space")&&monkey.y >200)
    {
      monkey.velocityY = -15;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  textSize(20);
  text("score  "+score,10,50);
  
  survivalTime = Math.ceil(frameCount/frameRate());
  text("survivalTime "+survivalTime,300,50);
    }
  
  if (gameState === END)
    {
      monkey.destroy();
      ground.destroy();
      textSize(20);
      text("GAME  OVER",200,250);
    }
  
  if (FoodGroup.isTouching(monkey))
    {
      score = score+1;
      FoodGroup.destroyEach();
    }
  if (obstacleGroup.isTouching(monkey))
    {
      gameState = END
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
    }
  
  

drawSprites(); 
  
  
  
}
function foods()
{
  if (frameCount%80 === 0)
    {
      banana = createSprite(500,200,20,20);
      banana.scale = 0.1;
      banana.addAnimation("ali",bananaImage);
      banana.y = Math.round(random(120,200));
      banana.setLifetime = 50;
      banana.velocityX = -8   
      FoodGroup.add(banana);
    }
}

function obstacles()
{
  if (frameCount%300 === 0)
    {
      obstacle = createSprite(500,275,20,20);
      obstacle.scale = 0.1;
      obstacle.addAnimation("ali",obstacleImage);
      obstacle.setLifetime = 100;
      obstacle.velocityX = -8    
      obstacleGroup.add(obstacle);
    }
}






