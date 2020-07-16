var player, player_running;
var bananaGroup, bananaImg;
var obsGroup, obsImg;
var ground, invisibleGround, groundImg; 
var back, backImage;
var score;


var END = 0;
var PLAY = 1;
var GameState = PLAY;

var Gameover, restart, Gameover_img, restart_img;



function preload(){
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png",     "Monkey_03.png", "Monkey_04.png", "Monkey_05.png","Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  groundImg = loadAnimation("ground.jpg");
  
  bananaImg = loadImage("Banana.png");
  obsImg = loadImage("stone.png");
  
  Gameover_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
  
  
}


function setup() {
  createCanvas(600,300);
      

 
  background_1 = createSprite(300, 150, 600000000, 300);
  background_1.addImage("background", backImage);
  
  background_1.velocityX = -2;
  background_1.x = background_1.width/2;
 
  player = createSprite(50,280,20,50);
  player.addAnimation("running", player_running);
  player.scale = 0.1;
  
  invisibleGround = createSprite(210,290,400,10);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  obsGroup = new Group();
  
   score = 0;

  Gameover = createSprite(300, 150, 10, 10);  
  Gameover.addImage("over", Gameover_img);
  Gameover.scale = 0.5;
  
  Gameover.visible = false;
  
  restart = createSprite(300, 190, 10, 10);
  restart.addImage("restart", restart_img);
  restart.scale = 0.5;
  
  restart.visible = false;
}


function draw(){


  textSize(20);
  fill("white");
  text("Survival Time : " + score, 550, 50);
  
   if(GameState == PLAY) {
    
   if (bananaGroup.isTouching(player)){
  
    score = score + 2;
    bananaGroup.destroyEach();

    
    }
     
      if(background_1.x < 0){
        background_1.x = background_1.width/2;
      }
      
     
    if(keyDown("space")&& player.y >= 162) {
      player.velocityY = -15;  
      }           
    
    
    player.velocityY = player.velocityY + 0.8
     
     
 
        spawnBananas();
        spawnObs();
    
  if(obsGroup.isTouching(player)){
    
    GameState = END;
    
    }
   }
  
   else if(GameState == END) {
     
  
     obsGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     background_1.velocityX = 0;
    
     Gameover.visible = true;
     restart.visible = true;
     bananaGroup.setLifetimeEach(-1);
     obsGroup.setLifetimeEach(-1);
    
     if(mousePressedOver(restart)) {
      reset();
        }
     player.velocityY = 0;
  
   }
  
  player.collide(invisibleGround);
    
  
  drawSprites();
  
}

function reset(){
  GameState = PLAY;
  background_1.velocityX = -2;
  obsGroup.destroyEach();
  bananaGroup.destroyEach();
  Gameover.visible = false;
  restart.visible = false;
  player.changeAnimation("running", player_running);
  score = 0;
}



 

function spawnBananas() {

  if (frameCount % 160 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = player.depth;
    banana.depth = banana.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}

function spawnObs() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(600,255,10,40);
    obstacle.addImage(obsImg);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 10: player.scale = 0.12; 
              break;
      case 20: player.scale = 0.14;
              break;
      case 30: player.scale = 0.16;
              break;
      case 40: player.scale = 0.18;
              break;
       
      default: break;
    }
               
   
    
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    
    obsGroup.add(obstacle);
  }
}